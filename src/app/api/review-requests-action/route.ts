import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import PaperModel from "@/model/PaperSchema";
import mongoose from "mongoose";

export async function POST(request: NextRequest) {


  const { searchParams } = new URL(request.url);
  const paperId = searchParams.get("paperId");
  const action = searchParams.get("action");
  const reviewerId = searchParams.get("reviewerId");
  try {
    // Retrieve the user session
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    // Check for user session
    if (!session || !session.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized access. Please log in to proceed.",
        },
        { status: 401 }
      );
    }



    if (!["accept", "reject"].includes(action as string)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid action. Action must be 'accept' or 'reject'.",
        },
        { status: 400 }
      );
    }

    if (!paperId || !reviewerId) {
      return NextResponse.json(
        {
          success: false,
          message: "Both paperId and reviewerId are required.",
        },
        { status: 400 }
      );
    }

    // Ensure database connection
    await dbConnect();

    // Find the paper by ID
    console.log(new mongoose.Types.ObjectId(paperId))
    const paper = await PaperModel.findById(new mongoose.Types.ObjectId(paperId));
    console.log(paper)

    if (!paper) {
      return NextResponse.json(
        { success: false, message: "Paper not found." },
        { status: 404 }
      );
    }

    // Find the review request
    const request = paper.reviewRequests.find(
      (req) => {
        console.log(req.reviewerId.toString())
        console.log(reviewerId)
        return (req.reviewerId.toString() === reviewerId)}
    );

    console.log(request)
    if (!request) {
      return NextResponse.json(
        { success: false, message: "Review request not found." },
        { status: 404 }
      );
    }

    if (request.reviewerId.toString() !== user._id) {
      return NextResponse.json(
        { success: false, message: "You are not authorized to modify this request." },
        { status: 403 }
      );
    }

    if (action === "accept") {
      // Update review request status to 'accepted'
      request.status = "accepted";
      request.resolvedAt = new Date();

      // Add the reviewer to the `reviewers` array if not already added
      const isReviewerAlreadyAdded = paper.reviewers.some(
        (reviewer) => reviewer.Id.toString() === request.reviewerId.toString()
      );

      if (!isReviewerAlreadyAdded) {
        paper.reviewers.push({
          Id: request.reviewerId,
          status: "review",
          assignedAt: new Date(),
        });
      }
    } else if (action === "reject") {
      // Update review request status to 'rejected'
      request.status = "rejected";
      request.resolvedAt = new Date();
    }

    // Save changes to the paper document
    await paper.save();

    return NextResponse.json(
      { success: true, message: `Request has been ${action}ed successfully.` },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error processing review request action:", error);
    return NextResponse.json(
      { success: false, message: error.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

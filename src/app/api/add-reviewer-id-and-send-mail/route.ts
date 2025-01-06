import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import PaperModel from "@/model/PaperSchema";
import { sendReviewRequestEmails } from "@/helpers/sendReviewEmail";
import { User } from "next-auth";
import { ObjectId } from "mongoose";

export async function PATCH(request: NextRequest) {
  try {
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

    await dbConnect();

    const { reviewerIds } = await request.json();
    console.log(reviewerIds)
    const { searchParams } = new URL(request.url);
    const paperID = searchParams.get("paperID");

    // Validate input
    if (!paperID || !Array.isArray(reviewerIds) || reviewerIds.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Paper ID and a list of reviewer IDs are required.",
        },
        { status: 400 }
      );
    }

    // Find the paper
    const paper = await PaperModel.findOne({ paperID });
    if (!paper) {
      return NextResponse.json(
        {
          success: false,
          message: "No paper found with the provided ID.",
        },
        { status: 404 }
      );
    }

    paper.paperStatus="review";

    // Filter out duplicate reviewers
    const newReviewers = reviewerIds.filter((reviewerId) => {
      return !paper.reviewRequests.some(
        (request) => request.reviewerId.toString() === reviewerId.toString()
      );
    });

    if (newReviewers.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "All provided reviewers have already been requested.",
        },
        { status: 400 }
      );
    }

    // Add new reviewers to reviewRequests
    newReviewers.forEach((reviewerId) => {
      paper.reviewRequests.push({ reviewerId: reviewerId, status: "pending",requestedBy:user._id as any});
    });
    console.log(newReviewers)

    await paper.save();

    // // Send email notifications
    try {
      await sendReviewRequestEmails(paperID, newReviewers);
    } catch (emailError:any) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send emails to reviewers.",
          error: emailError.message || "An unexpected email error occurred.",
        },
        { status: 500 }
      );
    }

    // Return a success response
    return NextResponse.json(
      {
        success: true,
        message: "Reviewers added successfully, and emails sent.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "An unexpected error occurred.",
      },
      { status: 500 }
    );
  }
}

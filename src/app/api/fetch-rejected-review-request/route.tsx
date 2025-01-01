import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import PaperModel from "@/model/PaperSchema";

export async function GET(request: NextRequest) {
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

    // Ensure database connection
    await dbConnect();

    // Fetch all pending review requests for the current user
    const papers = await PaperModel.find({
      "reviewRequests.reviewerId": user._id,
      "reviewRequests.status": "rejected",
    }).select("paperTitle reviewRequests")
    .populate([
      {
        path: "reviewRequests.reviewerId",
        model: "User", // Ensure the model name matches exactly
        select: "fullname email", // Fetch specific fields
      },
      {
        path: "reviewRequests.requestedBy",
        model: "User", // Ensure the model name matches exactly
        select: "fullname email", // Fetch specific fields
      },
    ])
      console.log(papers)

    // If no papers found with pending review requests
    if (!papers || papers.length === 0) {
      return NextResponse.json(
        {
          success: true,
          message: "No pending review requests found.",
          requests: [],
        },
        { status: 200 }
      );
    }

    // Transform data into user-friendly structure
    const formattedRequests = papers.map((paper) => ({
      paperId: paper._id,
      paperTitle: paper.paperTitle,
      reviewRequests: paper.reviewRequests.filter((req) => (
            req.reviewerId && req.reviewerId._id.toString() === user._id && req.status === "rejected"
      ))
    }));

       // Check for papers with non empty review requests
       const actualRequests = formattedRequests.filter(
        (req) => req.reviewRequests.length != 0
      );

    return NextResponse.json(
      {
        success: true,
        message: "Pending review requests retrieved successfully.",
        //yaha pe hamesha ek hi aayega kyuki searching hori hai
        requests: actualRequests,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching review requests:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "An unexpected error occurred.",
      },
      { status: 500 }
    );
  }
}

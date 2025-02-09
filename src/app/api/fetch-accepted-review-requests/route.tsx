import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { getServerSession, User } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import PaperModel from '@/model/PaperSchema';

export async function GET() {
  try {
    // Retrieve the user session
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    // Check for user session
    if (!session || !session.user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Unauthorized access. Please log in to proceed.',
        },
        { status: 401 },
      );
    }

    // Ensure database connection
    await dbConnect();

    // Fetch all accepted review requests for the current user
    const papers = await PaperModel.find({
      'reviewers.Id': user._id,
    });

    // If no papers found with accepted review requests
    if (!papers || papers.length === 0) {
      return NextResponse.json(
        {
          success: true,
          message: 'No accepted review requests found.',
          requests: [],
        },
        { status: 200 },
      );
    }

    // Transform data into user-friendly structure
    const formattedRequests = papers.map(paper => {
      const acceptedRequest = paper.reviewers.find(
        req => req.Id && req.Id.toString() === user._id,
      );

      return {
        paperId: paper._id,
        paperTitle: paper.paperTitle,
        reviewer: {
          id: acceptedRequest && acceptedRequest.Id,
          assignedAt: acceptedRequest && acceptedRequest.assignedAt,
        },
        status: acceptedRequest && acceptedRequest.status,
        ActualPaperId: paper.paperID,
      };
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Accepted review requests retrieved successfully.',
        requests: formattedRequests,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('Error fetching accepted review requests:', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'An unexpected error occurred.',
      },
      { status: 500 },
    );
  }
}

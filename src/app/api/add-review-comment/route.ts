import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import PaperModel from '@/model/PaperSchema';

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    // Ensure user is authenticated
    if (!session || !user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Unauthorized access. Please log in to proceed.',
        },
        { status: 401 },
      );
    }

    await dbConnect();

    const { searchParams } = new URL(request.url);
    const paperID = searchParams.get('paperId');
    const reviewerId = searchParams.get('reviewerId');
    const status = searchParams.get('status');

    if (!paperID || !reviewerId) {
      return NextResponse.json(
        {
          success: false,
          message: 'Both paperID and reviewerId are required.',
        },
        { status: 400 },
      );
    }

    const { comment } = await request.json();

    if (!comment || typeof comment !== 'string' || comment.trim() === '') {
      return NextResponse.json(
        {
          success: false,
          message: 'A valid comment is required.',
        },
        { status: 400 },
      );
    }

    // Find the paper
    const paper = await PaperModel.findOne({ paperID });
    if (!paper) {
      return NextResponse.json(
        {
          success: false,
          message: 'No paper found with the provided ID.',
        },
        { status: 404 },
      );
    }

    // Find the reviewer in the reviewers array
    const reviewer = paper.reviewers.find(r => r.Id.toString() === reviewerId);

    if (!reviewer) {
      return NextResponse.json(
        {
          success: false,
          message: 'Reviewer not found in the specified paper.',
        },
        { status: 404 },
      );
    }

    // Add the comment
    reviewer.comments = comment;
    reviewer.status = status as any;
    reviewer.reviewedAt = new Date();

    await paper.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Comment added successfully.',
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'An unexpected error occurred.',
      },
      { status: 500 },
    );
  }
}

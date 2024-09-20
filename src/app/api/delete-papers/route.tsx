import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import PaperModel from '@/model/PaperSchema';
import { getServerSession, User } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';

export async function DELETE(request: NextRequest) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  // Check if user is authenticated
  if (!session || !session.user) {
    return NextResponse.json(
      {
        success: false,
        message: 'Not Authenticated',
      },
      { status: 401 }
    );
  }

  try {
    // Parse request body
    const { paperIdList } = await request.json();

    // Validate paperIdList
    if (!paperIdList || paperIdList.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please add at least one paper to delete.',
        },
        { status: 400 }
      );
    }

    // Delete papers in bulk
    const result = await PaperModel.deleteMany({
      paperID: { $in: paperIdList }
    });

    // Log how many papers were deleted
    console.log(`${result.deletedCount} papers deleted`);

    // Send success response with deleted count
    return NextResponse.json({
      success: true,
      message: `${result.deletedCount} paper(s) deleted successfully`,
    });
  } catch (error: any) {
    // Error handling with descriptive message
    console.error('Error deleting papers:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete papers. Please try again later.',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

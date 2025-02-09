import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import UserModel from '@/model/User';

export async function GET(request: NextRequest) {
  try {
    // Establish database connection
    await dbConnect();

    // Authenticate user
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Unauthorized access. Please log in to proceed.',
        },
        { status: 401 },
      );
    }

    // Parse the email from the request
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get('userEmail');

    if (!userEmail) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid request. Email parameter is missing.',
        },
        { status: 400 },
      );
    }

    // Find user and check if they are a reviewer
    const user = await UserModel.findOne(
      { email: userEmail },
      { isReviewer: 1 },
    );
    console.log(user);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'The specified user is not registered on the platform.',
        },
        { status: 404 },
      );
    }

    if (!user.isReviewer) {
      return NextResponse.json(
        {
          success: false,
          message:
            'The specified user is registered but is not a reviewer.Please ask them to be a reviewer by turn on the option in reviewer section of dashboard',
        },
        { status: 403 },
      );
    }

    // Success response
    return NextResponse.json({
      success: true,
      message: 'The user is a valid reviewer and can be added.',
      id: user._id,
    });
  } catch (error: any) {
    console.error('Error in validating user and reviewer:', error.message);

    return NextResponse.json(
      {
        success: false,
        message:
          'An error occurred while processing your request. Please try again later.',
      },
      { status: 500 },
    );
  }
}

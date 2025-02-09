import dbConnect from '@/lib/dbConnect';
import { getServerSession, User } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import ConferenceModel from '@/model/Conference';

export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    console.log(session);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Not Authenticated',
      }),
      { status: 401 },
    );
  }

  try {
    const organizedConferences = await ConferenceModel.find({
      conferenceOrganizer: user._id,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message:
          organizedConferences.length > 0
            ? 'Organized conferences found'
            : 'No organized conferences found',
        data: { organizedConferences },
      }),
      { status: 200 },
    );
  } catch (error) {
    console.log('An unexpected error occurred: ', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Error occurred while fetching organized conferences',
      }),
      { status: 500 },
    );
  }
}

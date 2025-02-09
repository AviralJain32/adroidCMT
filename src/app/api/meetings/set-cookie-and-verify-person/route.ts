import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import MeetingModel from "@/model/Meeting";
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }

  try {

    const {meeting_id,meeting_password}=await request.json();
    const cookieStore = await cookies()

    // Validate request body
    if (!meeting_id || !meeting_password) {
      return NextResponse.json(
        { success: false, message: "Meeting ID and password are required" },
        { status: 400 }
      );
    }

    
    const joinLink = await MeetingModel.findOne({ meeting_id,meeting_password }).select("join_link");
    console.log(joinLink)
    if (!joinLink) {
      return NextResponse.json(
        {
          success: false,
          message: "Meeting Id or password is wrong",
        },
        { status: 401 }
      );
    }

    cookieStore.set('meet-config',meeting_id,{maxAge:86400,httpOnly: true,secure: true})

    
    return NextResponse.json(
      {
        success: true,
        data:joinLink,
        message: "Scheduled Meetings found for the conference",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

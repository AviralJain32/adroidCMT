import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import MeetingModel from "@/model/Meeting";

export async function GET(request: NextRequest) {
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

  const url = new URL(request.url);
  const confAcronym = url.searchParams.get("confAcronym");

  if (!confAcronym) {
    return NextResponse.json(
      {
        success: false,
        message: "Missing required field: confAcronym",
      },
      { status: 400 }
    );
  }

  try {
    const meetings = await MeetingModel.find({ meeting_conference_acronym: confAcronym });

    if (meetings.length === 0) {
      return NextResponse.json(
        {
          success: true,
          meetings: [],
          message: "No Scheduled Meetings found for the conference",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        meetings,
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

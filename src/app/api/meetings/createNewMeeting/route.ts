import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import MeetingModel from "@/model/Meeting";
import PaperModel from "@/model/PaperSchema";
import ConferenceModel from "@/model/Conference";
import { cookies } from "next/headers";
// import sendEmail from "@/lib/sendEmail";

export async function POST(request: NextRequest) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const cookieStore = await cookies()

  if (!session || !session.user) {
    return NextResponse.json(
      { success: false, message: "Not Authenticated" },
      { status: 401 }
    );
  }

  try {
    const { confAcronym, meeting_id, join_link, title, description, start_time, end_time, timezone,password } = await request.json();
        
    
    if (!confAcronym || !meeting_id || !join_link || !title || !description || !start_time || !end_time || !timezone) {
      return NextResponse.json(
        { success: false, message: "Insufficient Data" },
        { status: 400 }
      );
    }

    const pipeline = [
      {
        $match: { conferenceAcronym: confAcronym } // Match the correct conference
      },
      {
        $lookup: {
          from: "paper", // Correct case-sensitive collection name
          localField: "_id",
          foreignField: "conference",
          as: "conferencePapers"
        }
      },
      {
        $unwind: "$conferencePapers" // Convert array to individual documents
      },
      {
        $match: { "conferencePapers.paperStatus": "accepted" } // Filter only accepted papers
      },
      {
        $lookup: {
          from: "users", // Correct case-sensitive collection name
          localField: "conferencePapers.paperAuthor",
          foreignField: "_id",
          as: "paperAuthors"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "conferencePapers.correspondingAuthor",
          foreignField: "_id",
          as: "correspondingAuthors"
        }
      },
      {
        $project: {
          authorsEmails: {
            $concatArrays: [
              { $map: { input: "$paperAuthors", as: "author", in: "$$author.email" } },
              { $map: { input: "$correspondingAuthors", as: "author", in: "$$author.email" } }
            ]
          }
        }
      }
    ];
    
    const authorsData = await ConferenceModel.aggregate(pipeline);
    
    // Extract unique emails
    console.log(authorsData)
    const authorEmails = Array.from(new Set(authorsData.flatMap((data) => data.authorsEmails)));
    
    if (authorEmails.length === 0) {
      return NextResponse.json(
        { success: false, message: "No accepted paper authors found" },
        { status: 404 }
      );
    }

    // Generate a random meeting password
    // const meeting_password = Math.random().toString(36).slice(-8);

    cookieStore.set('meet-owner',session.user._id,{httpOnly: true,secure: true})


    // Create the meeting
    const newMeeting = await MeetingModel.create({
      meeting_conference_acronym: confAcronym,
      meeting_id,
      meeting_password:password,
      title,
      description,
      start_time,
      end_time,
      organizer_id: session.user._id,
      participants: authorEmails.map((email) => ({
        email,
        role: "Attendee",
      })),
      room_id: meeting_id,
      join_link,
      status: "Scheduled",
      timezone,
      created_at: new Date(),
      updated_at: new Date(),
    });

    // // Send email invitations
    // const emailSubject = `Invitation to Join Meeting: ${title}`;
    // const emailBody = `
    //   <p>Dear Participant,</p>
    //   <p>You are invited to join the meeting <strong>${title}</strong> scheduled as part of the conference <strong>${confAcronym}</strong>.</p>
    //   <p><strong>Start Time:</strong> ${new Date(start_time).toLocaleString()} <br>
    //   <strong>End Time:</strong> ${new Date(end_time).toLocaleString()} <br>
    //   <strong>Join Link:</strong> <a href="${join_link}">${join_link}</a> <br>
    //   <strong>Meeting Password:</strong> ${meeting_password}</p>
    //   <p>We look forward to your participation.</p>
    // `;

    // for (const email of authorEmails) {
    //   await sendEmail(email, emailSubject, emailBody);
    // }

    return NextResponse.json(
      { success: true, message: "Meeting created and invitations sent", meeting: newMeeting },
      { status: 201 }
    );

  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

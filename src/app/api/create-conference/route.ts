import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { User } from "next-auth";
import ConferenceModel from "@/model/Conference";
import UserModel from "@/model/User";

export async function POST(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !session.user) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "Not Authenticated",
            }),
            { status: 401 }
        );
    }

    const {
        conferenceEmail,
        conferenceOrganizerWebPage,
        conferenceOrganizerPhoneNumber,
        conferenceOrganizerRole,
        conferenceAnyOtherInformation,
        conferenceAcronym,
        conferenceWebpage,
        conferenceVenue,
        conferenceCity,
        conferenceCountry,
        conferenceEstimatedNumberOfSubmissions,
        conferenceFirstDay,
        conferenceLastDay,
        conferencePrimaryArea,
        conferenceSecondaryArea,
        conferenceAreaNotes,
        conferenceTitle,
        conferencePaperSubmissionLink,
    } = await request.json();

    if (!conferenceTitle || !conferenceAcronym || !conferenceWebpage || !conferenceVenue || !conferenceCity || !conferenceCountry || !conferenceFirstDay || !conferenceLastDay || !conferencePrimaryArea || !conferenceTitle || !conferencePaperSubmissionLink) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "Missing required fields",
            }),
            { status: 400 }
        );
    }

    const foundConference = await ConferenceModel.findOne({
        $or: [
            { conferenceTitle: conferenceTitle },
            { conferenceAcronym: conferenceAcronym }
        ]
    });

    if (foundConference) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "Conference already exists with this Title or Acronym. Try to use a different title or acronym.",
            }),
            { status: 400 }
        );
    }

    try {
        const newConference = new ConferenceModel({
            conferenceOrganizer: user._id,
            conferenceOrganizerWebPage,
            conferenceOrganizerPhoneNumber,
            conferenceOrganizerRole,
            conferenceTitle,
            conferenceEmail,
            conferenceAnyOtherInformation,
            conferenceSubmittedPapers:[],
            conferenceAcronym,
            conferenceWebpage,
            conferenceVenue,
            conferenceCity,
            conferenceCountry,
            conferenceEstimatedNumberOfSubmissions,
            conferenceFirstDay,
            conferenceLastDay,
            conferencePrimaryArea,
            conferenceSecondaryArea,
            conferenceAreaNotes,
            conferencePaperSubmissionLink,
            conferenceIsAcceptingPaper:true,
            conferenceStatus:"submitted"
        });

        await newConference.save();

        await UserModel.findByIdAndUpdate(user._id, {
            $push: { Organizedconferences: newConference._id },
          });

          
        return new Response(
            JSON.stringify({
                success: true,
                message: "Conference created successfully",
            }),
            { status: 201 }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error creating conference",
            }),
            { status: 500 }
        );
    }
}

import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { User } from "next-auth";
import ConferenceModel from "@/model/Conference";
import { sendConferenceCreationMail } from "@/helpers/sendConferenceCreationMail";


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
        conferenceCategory,
        // conferenceEmail,
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
        conferenceSubmissionsDeadlineDate
    } = await request.json();

    if (!conferenceCategory || !conferenceSubmissionsDeadlineDate || !conferenceTitle || !conferenceAcronym || !conferenceWebpage || !conferenceVenue || !conferenceCity || !conferenceCountry || !conferenceFirstDay || !conferenceLastDay || !conferencePrimaryArea || !conferenceTitle ) {
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
            conferenceCategory,
            conferenceOrganizer: user._id,
            conferenceOrganizerWebPage,
            conferenceOrganizerPhoneNumber,
            conferenceOrganizerRole,
            conferenceTitle,
            conferenceEmail:user.email,
            conferenceAnyOtherInformation,
            conferenceAcronym,
            conferenceWebpage,
            conferenceVenue,
            conferenceCity,
            conferenceCountry,
            conferenceEstimatedNumberOfSubmissions,
            conferenceFirstDay,
            conferenceLastDay,
            conferenceSubmissionsDeadlineDate,
            conferencePrimaryArea,
            conferenceSecondaryArea,
            conferenceAreaNotes,
            conferenceIsAcceptingPaper:true,
            conferenceStatus:"submitted"
        });

        await newConference.save();

        // await UserModel.findByIdAndUpdate(user._id, {
        //     $push: { Organizedconferences: newConference._id },
        //   });
        // const organizer = await UserModel.findById(user._id);

        //email bhejna hai conference ka
        console.log(user)
        const emailResponse=await sendConferenceCreationMail(
            user.email as string,
            user.fullname as string,
            conferenceTitle,
            conferenceFirstDay
        )

        if(!emailResponse.success){
            return Response.json({
                success:false,
                message:emailResponse.message
            },{
                status:500
            })
        }
          
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

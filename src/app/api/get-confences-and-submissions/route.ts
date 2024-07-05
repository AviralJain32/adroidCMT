import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import ConferenceModel from "@/model/Conference";
import PaperModel from "@/model/PaperSchema";


export async function GET(request:Request) {
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

    try {
        const organizedConferences = await ConferenceModel.find({
            conferenceOrganizer:user._id,
        })
    
        const submittedPapers=await PaperModel.find({
            paperAuthor:user._id
        })
    
        if(!organizedConferences || !submittedPapers){
                return new Response(
                    JSON.stringify({
                        success: false,
                        message: "No organized conferences and submitted papers found",
                    }),
                    { status: 404 }
                ); 
            }
            else if (!organizedConferences){
                return new Response(
                    JSON.stringify({
                        success: true,
                        message: "No organized conferences found",
                        data: {submittedPapers}
                    }),
                    { status: 404 }
                );
            }
            else if (!submittedPapers){
                return new Response(
                    JSON.stringify({
                        success: true,
                        message: "No organized conferences found",
                        data: {organizedConferences}
                    }),
                    { status: 404 }
                );
            }
        
        return new Response(
            JSON.stringify({
                success: true,
                message: "organized conferences and submitted papers found",
                data: {organizedConferences,submittedPapers}
            }),
            { status: 200 }
        ); 
    } catch (error) {
        console.log("An unexpected error occured : ",error);
        return Response.json({
            success:true,
            message:"Error occurring in get conference and submitted papers"
        },{status:500})
    }
}
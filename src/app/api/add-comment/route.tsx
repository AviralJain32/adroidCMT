import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import PaperModel from "@/model/PaperSchema";
import { sendCommentMail } from "@/helpers/sendCommentMail";

export async function PATCH(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);

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
        const { comment, status,paperID,authorEmails} = await request.json();

        console.log(authorEmails)

        if (!comment || !paperID) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Comment or PaperId is missing",
                }),
                { status: 400 }
            );
        }

        // Prepare the review object to be pushed into the history
        const commentObject = {
            comment,
            updatedAt: new Date(), // Add a timestamp
        };

        // Determine which review field to update (paperReview1History or paperReview2History)

        const updateQuery = { $push: { paperCommentHistory: commentObject } };

        // Update the paper document by pushing the new review into the appropriate history array
        const updatedPaper = await PaperModel.findOneAndUpdate(
            { paperID },
            updateQuery,
            { new: true } // Return the updated document
        );

        if (!updatedPaper) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Paper not found",
                }),
                { status: 404 }
            );
        }

        const updatePaperStatus= await PaperModel.findOneAndUpdate(
            {paperID},
            {paperStatus:status}
        )

        if (!updatePaperStatus) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Paper status not updated",
                }),
                { status: 404 }
            );
        }
        

        return new Response(
            JSON.stringify({
                success: true,
                message: "Comment added and status updated successfully",
            }),
            { status: 200 }
        );

        // const emailResponse=await sendCommentMail(
        //     conferenceEmail,
        //     user.fullname as string,
        //     conferenceTitle,
        //     conferenceFirstDay
        // )

        // if(!emailResponse.success){
        //     return Response.json({
        //         success:false,
        //         message:emailResponse.message
        //     },{
        //         status:500
        //     })
        // }

    } catch (error) {
        console.log("An unexpected error occurred: ", error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error occurred while adding comment",
            }),
            { status: 500 }
        );
    }
}

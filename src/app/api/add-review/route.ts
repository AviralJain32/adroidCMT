import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import PaperModel from "@/model/PaperSchema";

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
        const { review,reviewType } = await request.json();
        const { searchParams } = new URL(request.url);
        const paperID = searchParams.get('paperID');

        if (!review || !paperID) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Review or Paper ID is missing",
                }),
                { status: 400 }
            );
        }

        // Update the paper document by adding the review
        const updatedPaper =reviewType==="review1"
        ? await PaperModel.findOneAndUpdate(
            { paperID },
            // { $push: { reviews: review } }, // Assuming `reviews` is an array in the schema
            { paperReview1: review }, // Assuming `reviews` is an array in the schema
            { new: true } // Return the updated document
        ) : 
        await PaperModel.findOneAndUpdate(
            { paperID },
            // { $push: { reviews: review } }, // Assuming `reviews` is an array in the schema
            { paperReview2: review }, // Assuming `reviews` is an array in the schema
            { new: true } // Return the updated document
        )

        if (!updatedPaper) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Paper not found",
                }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: "Review added successfully",
                // data: updatedPaper,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.log("An unexpected error occurred: ", error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error occurred while adding review",
            }),
            { status: 500 }
        );
    }
}

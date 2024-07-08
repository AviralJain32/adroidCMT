import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import PaperModel from "@/model/PaperSchema";

export async function GET(request: Request) {
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
        const submittedPapers = await PaperModel.find({
            paperAuthor: user._id,
        }).populate("conference","conferenceAcronym");

        if (!submittedPapers || submittedPapers.length === 0) {
            return new Response(
                JSON.stringify({
                    success: true,
                    message: "No submitted papers found",
                }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: "Submitted papers found",
                data: { submittedPapers },
            }),
            { status: 200 }
        );
    } catch (error) {
        console.log("An unexpected error occurred: ", error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error occurred while fetching submitted papers",
            }),
            { status: 500 }
        );
    }
}

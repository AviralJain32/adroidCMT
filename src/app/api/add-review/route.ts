// import dbConnect from "@/lib/dbConnect";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/options";
// import PaperModel from "@/model/PaperSchema";

// export async function PATCH(request: Request) {
//     await dbConnect();

//     const session = await getServerSession(authOptions);

//     if (!session || !session.user) {
//         return new Response(
//             JSON.stringify({
//                 success: false,
//                 message: "Not Authenticated",
//             }),
//             { status: 401 }
//         );
//     }

//     try {
//         const { review, reviewType } = await request.json();
//         const { searchParams } = new URL(request.url);
//         const paperID = searchParams.get('paperID');

//         if (!review || !paperID) {
//             return new Response(
//                 JSON.stringify({
//                     success: false,
//                     message: "Review or Paper ID is missing",
//                 }),
//                 { status: 400 }
//             );
//         }

//         // Prepare the review object to be pushed into the history
//         const reviewObject = {
//             review,
//             updatedAt: new Date(), // Add a timestamp
//         };

//         // Determine which review field to update (paperReview1History or paperReview2History)
//         let updateQuery;

//         if (reviewType === "review1") {
//             updateQuery = { $push: { paperReview1History: reviewObject } };
//         } else if (reviewType === "review2") {
//             updateQuery = { $push: { paperReview2History: reviewObject } };
//         } else {
//             return new Response(
//                 JSON.stringify({
//                     success: false,
//                     message: "Invalid review type",
//                 }),
//                 { status: 400 }
//             );
//         }

//         // Update the paper document by pushing the new review into the appropriate history array
//         const updatedPaper = await PaperModel.findOneAndUpdate(
//             { paperID },
//             updateQuery,
//             { new: true } // Return the updated document
//         );

//         if (!updatedPaper) {
//             return new Response(
//                 JSON.stringify({
//                     success: false,
//                     message: "Paper not found",
//                 }),
//                 { status: 404 }
//             );
//         }

//         return new Response(
//             JSON.stringify({
//                 success: true,
//                 message: "Review added successfully",
//             }),
//             { status: 200 }
//         );
//     } catch (error) {
//         console.log("An unexpected error occurred: ", error);
//         return new Response(
//             JSON.stringify({
//                 success: false,
//                 message: "Error occurred while adding review",
//             }),
//             { status: 500 }
//         );
//     }
// }

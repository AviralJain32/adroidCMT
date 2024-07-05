import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";


export async function POST(request:Request){
    await dbConnect()

    const session=await getServerSession(authOptions)
    const user:User=session?.user as User

    if(!session || !session.user){
        return Response.json({
            success:false,
            message:"Not Authenticated"
        },{status:401})
    }

    const userID=user._id
    const {acceptMessages}=await request.json()

    try {
        const updatedUser=await UserModel.findByIdAndUpdate(
            userID,
            {isAcceptingMessage:acceptMessages},
            {new:true}
        )
        if(!updatedUser){
            return Response.json({
                success:false,
                message:"failed to update user status to accept messages"
            },{status:401})
        }
        else{
            return Response.json({
                success:true,
                message:"Message acceptance status updated sucessfully",
                updatedUser
            },{status:200})

        }
        
    } catch (error) {
        console.log("failed to update user status to accept messages");
        
        return Response.json({
            success:false,
            message:"failed to update user status to accept messages"
        },{status:500})
    }

}

export async function GET(request:Request){
    await dbConnect()

    const session=await getServerSession(authOptions)
    const user:User=session?.user as User

    if(!session || !session.user){
        return Response.json({
            success:false,
            message:"Not Authenticated"
        },{status:401})
    }

    const userID=user._id
    const foundUser=await UserModel.findById(userID)

    try {
        if(!foundUser){
            return Response.json({
                success:false,
                message:"failed to found the user"
            },{status:404})
        }
        return Response.json({
            success:true,
            isAcceptingMessages:foundUser.isAcceptingMessage,
        },{status:200})
    } catch (error) {
        console.log("error in getting message acceptance status");
        
        return Response.json({
            success:false,
            message:"error in getting message acceptance status"
        },{status:500})
    }
}
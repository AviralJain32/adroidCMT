
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";


export async function POST(request:Request) {
    await dbConnect()

    try {
        const {email,code}=await request.json()
        const decodedEmail=decodeURIComponent(email)
        const user=await UserModel.findOne({
            email:decodedEmail
        })
        if(!user){
            return Response.json({
                success:true,
                message:"Email not found"
            },{status:500})
    
        }
        const isCodeValid=user.verifyCode===code
        const isCodeNotExpired=new Date(user.verifyCodeExpiry as Date)>new Date()

        if(isCodeValid && isCodeNotExpired){
            user.isVerified=true;
            user.verifyCode=undefined;
            user.verifyCodeExpiry=undefined;
            await user.save()
            return Response.json({
                success:true,
                message:"Account verified successfully"
            },{status:200})
        }
        else if(!isCodeNotExpired && !isCodeValid){
            return Response.json({
                success:false,
                message:"Verification code has expired , you are already verified"
            },{status:400})
        }
        else if(!isCodeNotExpired){
            return Response.json({
                success:false,
                message:"Verification code has expired , please signup again to get a new code"
            },{status:400})
        }
        else {
            return Response.json({
                success:false,
                message:"Verification code is incorrect"
            },{status:400})
        }
    } catch (error) {
        console.log("Error Verifying User",error);
        return Response.json({
            success:false,
            message:"Error Verifying User"
        },
        {status:500}
        )
    }
}
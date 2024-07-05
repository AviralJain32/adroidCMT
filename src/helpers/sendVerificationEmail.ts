import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string
):Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: 'MystryFeedback <onboarding@resend.dev>',
            to: "adroidpublications@gmail.com",
            subject: 'MystryFeedback Verification code',
            react: VerificationEmail({username,otp:verifyCode}),
          });
        return {success:true,message:"failed to send verification email"}
    } catch (emailError) {
        console.log("error sending verification email",emailError)
        return {success:false,message:"failed to send verification email"}
    }
}


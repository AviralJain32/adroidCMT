import sgMail from '@sendgrid/mail';
import VerificationEmail from "../../emails/VerificationEmail";
import { render } from '@react-email/components';
import { ApiResponse } from '@/types/ApiResponse';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);



export async function sendCommentMail(
    email:string,
    username:string,
    verifyCode:string
):Promise<ApiResponse>{
    try {
        console.log(email)
        await sgMail.send({
            from: 'adroidconnectz@gmail.com',
            to: email,
            subject: 'Adroid CMT Account Verification code',
            html:render(VerificationEmail({username,otp:verifyCode})),
          });
          console.log("Your mail have sned sucessfully")
        return {success:true,message:"verification email send sucessfully"}
    } catch (emailError) {
        console.log("error sending verification email",emailError)
        return {success:false,message:"failed to send verification email"}
    }
}
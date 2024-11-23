import sgMail from '@sendgrid/mail';

import { render } from '@react-email/components';
import { ApiResponse } from '@/types/ApiResponse';
import ResetPasswordEmailTemplate from '../../emails/ResetPasswordEmailTemplate';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);



export async function sendPasswordResetLinkEmail(
    hashedToken:string,
    email:string
):Promise<ApiResponse>{
    try {
        await sgMail.send({
            from: 'adroidconnectz@gmail.com',
            to: email,
            subject: 'Adroid CMT Account Reset Link',
            html:render(ResetPasswordEmailTemplate({hashedToken})),
          });
          console.log("Your mail have send sucessfully")
        return {success:true,message:"verification email send sucessfully"}
    } catch (emailError) {
        console.log("error sending verification email",emailError)
        return {success:false,message:"failed to send verification email"}
    }
}
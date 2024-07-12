import sgMail from '@sendgrid/mail';
import VerificationEmail from "../../emails/VerificationEmail";
import { render } from '@react-email/components';
import { ApiResponse } from '@/types/ApiResponse';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);



export async function sendConferenceCreationMail(
    ConferenceEmail:string,
    conferenceOrganizer:string,
):Promise<ApiResponse>{
    try {
        console.log(ConferenceEmail)
        await sgMail.send({
            from: 'adroidconnectz@gmail.com',
            to: ConferenceEmail,
            subject: 'New Conference Created',
            html:render(ConferenceCreationEmailTemplate(conferenceOrganizer)),
          });
          console.log("Your mail have sned sucessfully")
        return {success:true,message:"verification email send sucessfully"}
    } catch (emailError) {
        console.log("error sending verification email",emailError)
        return {success:false,message:"failed to send verification email"}
    }
}
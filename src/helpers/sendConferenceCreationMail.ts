import sgMail from '@sendgrid/mail';
import { render } from '@react-email/components';
import { ApiResponse } from '@/types/ApiResponse';
import ConferenceCreationEmailTemplate from '../../emails/ConferenceCreationEmailTemplate';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function sendConferenceCreationMail(
    conferenceEmail:string,
    conferenceOrganizer:string,
    conferenceTitle:string,
    conferenceStartDate:string,
):Promise<ApiResponse>{
    console.log(conferenceEmail,conferenceOrganizer,conferenceTitle,conferenceStartDate)
    try {
        await sgMail.send({
            from: 'conference@adroidcms.com',
            to: conferenceEmail,
            subject: 'New Conference Created',
            html:render(ConferenceCreationEmailTemplate({username:conferenceOrganizer,conferenceTitle,conferenceDate:conferenceStartDate})),
          });
          console.log("Your mail have send sucessfully")
        return {success:true,message:"conference creation email send sucessfully"}
    } catch (emailError) {
        console.log("error sending verification email",emailError)
        return {success:false,message:"failed to send confernece creation email"}
    }
}
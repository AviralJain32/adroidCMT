import sgMail from '@sendgrid/mail';
import { render } from '@react-email/components';
import { ApiResponse } from '@/types/ApiResponse';
import SendCommentMailTemplate from '../../emails/SendCommentMailTemplate';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function sendCommentMail(
    authorEmails: { email: string; fullname: string }[], // Array of authors with email and name
    paperID: string,
    status: string,
    conferenceAcronmym: string,
    comment:string,
    paperReview1:{ review: string; updatedAt: Date; },
    paperReview2:{ review: string; updatedAt: Date; }
): Promise<ApiResponse> {
    try {
        for (const author of authorEmails) {
            const { email, fullname } = author;

            // Render email with author-specific details
            const emailHtml = render(SendCommentMailTemplate({
                username: fullname, 
                status: status,  
                paperID:paperID,
                comment:comment,
                paperReview1:paperReview1.review,
                paperReview2:paperReview2.review,
            }));

            // Send the email
            await sgMail.send({
                from: 'adroidconnectz@gmail.com',
                to: email,  // Send to individual author's email
                subject: `${conferenceAcronmym}: Paper Notification ${paperID}`,
                html: emailHtml,  // Use the rendered HTML
            });

            console.log(`Email sent to ${fullname} (${email})`);
        }

        const generalEmailHtml = render(SendCommentMailTemplate({
            username: 'Conference Team', // You can use a generic name here
            status: status,
            paperID: paperID,
            comment: comment,
            paperReview1: paperReview1.review,
            paperReview2: paperReview2.review,
        }));

        await sgMail.send({
            from: 'adroidconnectz@gmail.com',
            to: "adroidconnectz@gmail.com",  // Send to the additional email ID
            subject: `${conferenceAcronmym}: Paper Notification ${paperID}`,
            html: generalEmailHtml,
        });

        console.log(`Email sent to additional email`);

        return { success: true, message: "Emails sent successfully to all authors" };
    } catch (emailError) {
        console.log("Error sending emails to authors", emailError);
        return { success: false, message: "Failed to send emails to authors" };
    }
}

import sgMail from '@sendgrid/mail';
import { render } from '@react-email/components';
import { ApiResponse } from '@/types/ApiResponse';
import sendEmailToAuthorForLoginTemplate from '../../emails/sendEmailToAuthorForLoginTemplate';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function sendEmailToAuthorForLogin(
  email: string,
  isCorrespondingAuthor: boolean,
  paperTitle: string
): Promise<ApiResponse> {
  try {
    await sgMail.send({
      from: 'conference@adroidcms.com',
      to: email,
      subject: `You’ve been added as ${isCorrespondingAuthor ? 'the Corresponding Author' : 'an Author'} for "${paperTitle}" — Create your Adroid CMS account`,
      html: render(
        sendEmailToAuthorForLoginTemplate({
          email,
          isCorrespondingAuthor,
          paperTitle,
        }),
      ),
    });

    console.log('Email sent successfully');
    return {
      success: true,
      message: 'Conference author invitation email sent successfully',
    };
  } catch (emailError) {
    console.log('Error sending author email:', emailError);
    return {
      success: false,
      message: 'Failed to send conference author email',
    };
  }
}

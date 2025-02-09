import sgMail from '@sendgrid/mail';
import ReviewerNotificationEmail from '../../emails/AddReviewerMailTemplate';
import { render } from '@react-email/components';
import { ApiResponse } from '@/types/ApiResponse';
import UserModel from '@/model/User';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function sendReviewRequestEmails(
  paperID: string,
  reviewerIds: string[],
): Promise<ApiResponse> {
  try {
    const emailPromises = reviewerIds.map(async reviewerId => {
      const reviewer = await UserModel.findOne({ _id: reviewerId });

      if (reviewer) {
        const emailHtml = render(
          ReviewerNotificationEmail({
            username: reviewer.fullname || 'Reviewer',
            paperID,
          }),
        );

        await sgMail.send({
          to: reviewer.email,
          from: 'conference@adroidcms.com',
          subject: `Review Request for Paper ID: ${paperID}`,
          html: emailHtml,
        });

        console.log(`Review request email sent to ${reviewer.email}`);
      } else {
        console.log(`No Reviewer found with id: ${reviewer}`);
      }
    });

    await Promise.all(emailPromises);

    return {
      success: true,
      message: 'Review request emails sent successfully.',
    };
  } catch (emailError) {
    console.error('Error sending review request emails', emailError);
    return {
      success: false,
      message: 'Failed to send review request emails.',
    };
  }
}

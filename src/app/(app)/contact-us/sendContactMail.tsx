"use server"

import sgMail from '@sendgrid/mail';
import { ApiResponse } from '@/types/ApiResponse';
import { render } from '@react-email/components';
import ContactUsEmailTemplate from '../../../../emails/ContactUsQueryEmailTemplate'; // Assume you have an email template for Contact Us

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export const sendContactUsMail = async (email: string, name: string, message: string): Promise<ApiResponse> => {
  try {
    // Ensure the email, name, and message are provided
    if (!email || !name || !message) {
      return { success: false, message: "All fields are required" };
    }

    // Render the contact us email template with the necessary fields
    const emailContent = render(ContactUsEmailTemplate({ name, email, message }));

    // Send email using SendGrid
    await sgMail.send({
      from:'customer@adroidcms.com',
      to: 'support@adroidcms.com', // This is the support team's email
      subject: 'Query From Adroid CMS web platform',
      html: emailContent,
    });

    console.log("Your message has been sent successfully");

    return { success: true, message: "Your message has been sent successfully" };
  } catch (emailError) {
    console.error("Error sending contact us email", emailError);
    return { success: false, message: "Failed to send contact us email" };
  }
};

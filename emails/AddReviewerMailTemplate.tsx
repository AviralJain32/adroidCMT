import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Section,
    Text,
  } from "@react-email/components";
  import * as React from "react";
  
  interface ReviewerNotificationEmailProps {
    username: string;
    paperID: string;
  }
  
  export const ReviewerNotificationEmail = ({
    username,
    paperID,
  }: ReviewerNotificationEmailProps) => (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Text style={header}>Reviewer Assignment Notification</Text>
  
          <Heading style={heading}>You Have a New Paper to Review</Heading>
  
          <Text style={description}>
            Dear {username},<br />
            We are pleased to inform you that you have been added as a reviewer
            for a paper in our system. Please find the details below:
          </Text>
  
          <Section style={infoContainer}>
            <Text style={label}>Paper ID:</Text>
            <Text style={value}>{paperID}</Text>
          </Section>
  
          <Text style={description}>
            Kindly log in to your dashboard to review the paper and provide your
            valuable feedback.
          </Text>
  
          <Text style={cta}>
            <a href="https://adroidcms.com/dashboard" style={ctaLink}>
              Review Now
            </a>
          </Text>
  
          <Text style={paragraph}>
            Thank you for your contribution to maintaining the quality of
            submissions in our system. If you have any questions, feel free to
            contact our support team.
          </Text>
        </Container>
  
        <Text style={footer}>Powered securely by AdroidCMS</Text>
      </Body>
    </Html>
  );
  
  ReviewerNotificationEmail.PreviewProps = {
    username: "Reviewer Name",
    paperID: "123456",
  } as ReviewerNotificationEmailProps;
  
  export default ReviewerNotificationEmail;
  
  // Styles
  const main = {
    backgroundColor: "#f6f9fc",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  };
  
  const container = {
    backgroundColor: "#ffffff",
    border: "1px solid #eaeaea",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    padding: "40px 20px",
    maxWidth: "600px",
    margin: "0 auto",
  };
  
  const header = {
    color: "#0a85ea",
    fontSize: "12px",
    fontWeight: "bold" as const,
    textTransform: "uppercase" as const,
    textAlign: "center" as const,
    marginBottom: "10px",
  };
  
  const heading = {
    color: "#333",
    fontSize: "22px",
    fontWeight: 600,
    textAlign: "center" as const,
    marginBottom: "20px",
  };
  
  const description = {
    color: "#555",
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "center" as const,
    marginBottom: "30px",
  };
  
  const infoContainer = {
    backgroundColor: "#f1f3f5",
    borderRadius: "8px",
    padding: "10px",
    marginBottom: "15px",
  };
  
  const label = {
    color: "#777",
    fontSize: "14px",
    fontWeight: "bold" as const,
    textTransform: "uppercase" as const,
  };
  
  const value = {
    color: "#333",
    fontSize: "16px",
    marginTop: "5px",
  };
  
  const cta = {
    textAlign: "center" as const,
    marginTop: "20px",
  };
  
  const ctaLink = {
    display: "inline-block",
    backgroundColor: "#0a85ea",
    color: "#ffffff",
    padding: "10px 20px",
    borderRadius: "5px",
    textDecoration: "none",
    fontWeight: "bold" as const,
  };
  
  const paragraph = {
    color: "#777",
    fontSize: "14px",
    textAlign: "center" as const,
    lineHeight: "22px",
    marginTop: "20px",
    padding: "0 20px",
  };
  
  const footer = {
    color: "#888",
    fontSize: "12px",
    textAlign: "center" as const,
    marginTop: "30px",
  };
  
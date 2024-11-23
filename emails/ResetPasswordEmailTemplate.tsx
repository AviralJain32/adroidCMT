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
  
  interface ForgotPasswordEmailProps {
    hashedToken: string;
  }
  
  const url = process.env.WEBSITE_URL;
  
  export const ResetPasswordEmailTemplate = ({
    hashedToken,
  }: ForgotPasswordEmailProps) => (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Text style={tertiary}>Reset Your Password</Text>
  
          <Heading style={secondary}>Forgot Your Password?</Heading>
  
          <Text style={description}>
            Don’t worry! You can reset your password by clicking the button below.
          </Text>
  
          <Section style={buttonContainer}>
            <a
              href={`${url}/reset-password?token=${hashedToken}`}
              style={button}
            >
              Reset Password
            </a>
          </Section>
  
          <Text style={paragraph}>
            If you didn’t request a password reset, you can safely ignore this
            email. This reset link will expire in 24 hours.
          </Text>
        </Container>
  
        <Text style={footer}>Need help? Contact our support team.</Text>
      </Body>
    </Html>
  );
  
  export default ResetPasswordEmailTemplate;
  
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
    maxWidth: "400px",
    margin: "0 auto",
  };
  
  const tertiary = {
    color: "#d9534f",
    fontSize: "12px",
    fontWeight: "bold" as const,
    textTransform: "uppercase" as const,
    textAlign: "center" as const,
    marginBottom: "10px",
  };
  
  const secondary = {
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
  
  const buttonContainer = {
    textAlign: "center" as const,
    marginBottom: "20px",
  };
  
  const button = {
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "16px",
    fontWeight: 600,
    textDecoration: "none",
    padding: "12px 24px",
    borderRadius: "6px",
  };
  
  const paragraph = {
    color: "#777",
    fontSize: "14px",
    textAlign: "center" as const,
    lineHeight: "22px",
    marginTop: "10px",
    padding: "0 20px",
  };
  
  const footer = {
    color: "#888",
    fontSize: "12px",
    textAlign: "center" as const,
    marginTop: "30px",
  };
  
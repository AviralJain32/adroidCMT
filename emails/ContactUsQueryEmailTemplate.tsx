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
  
  interface ContactUsEmailProps {
    name: string;
    email: string;
    message: string;
  }
  
  export const ContactUsEmailTemplate = ({
    name,
    email,
    message,
  }: ContactUsEmailProps) => (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Optional: Add your logo */}
          {/* <Img src={`${baseUrl}/static/logo.png`} width="150" height="50" alt="Logo" style={logo} /> */}
          
          <Text style={tertiary}>Contact Us Submission</Text>
          
          <Heading style={secondary}>
            New Message from {name}
          </Heading>
          
          <Text style={description}>
            You have received a new message from the contact us form. Here are the details:
          </Text>
          
          <Section style={infoContainer}>
            <Text style={infoText}><strong>Name:</strong> {name}</Text>
            <Text style={infoText}><strong>Email:</strong> {email}</Text>
            <Text style={infoText}><strong>Message:</strong></Text>
            <Text style={messageText}>{message}</Text>
          </Section>
          
          <Text style={footer}>Thank you for reaching out to us! We will get back to you as soon as possible.</Text>
        </Container>
        
        <Text style={footerBottom}>Powered securely by Android CMT</Text>
      </Body>
    </Html>
  );
  
  ContactUsEmailTemplate.PreviewProps = {
    name: "John Doe",
    email: "johndoe@example.com",
    message: "I need help with my account. Please contact me.",
  } as ContactUsEmailProps;
  
  export default ContactUsEmailTemplate;
  
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
    maxWidth: "500px",
    margin: "0 auto",
  };
  
  const tertiary = {
    color: "#0a85ea",
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
  
  const infoContainer = {
    backgroundColor: "#f1f3f5",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "20px",
  };
  
  const infoText = {
    color: "#333",
    fontSize: "16px",
    lineHeight: "24px",
    marginBottom: "10px",
  };
  
  const messageText = {
    color: "#555",
    fontSize: "16px",
    lineHeight: "24px",
    padding: "10px 20px",
    borderRadius: "5px",
    backgroundColor: "#ffffff",
    border: "1px solid #eaeaea",
  };
  
  const footer = {
    color: "#777",
    fontSize: "14px",
    textAlign: "center" as const,
    marginTop: "20px",
    padding: "0 20px",
  };
  
  const footerBottom = {
    color: "#888",
    fontSize: "12px",
    textAlign: "center" as const,
    marginTop: "30px",
  };
  
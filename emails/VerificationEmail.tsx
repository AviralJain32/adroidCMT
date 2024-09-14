// import {
//     Html,
//     Head,
//     Font,
//     Preview,
//     Heading,
//     Row,
//     Section,
//     Text,
//     Button,
//   } from '@react-email/components';
  
//   interface VerificationEmailProps {
//     username: string;
//     otp: string;
//   }
  
//   export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
//     return (
//       <Html lang="en" dir="ltr">
//         <Head>
//           <title>Verification Code</title>
//           <Font
//             fontFamily="Roboto"
//             fallbackFontFamily="Verdana"
//             webFont={{
//               url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
//               format: 'woff2',
//             }}
//             fontWeight={400}
//             fontStyle="normal"
//           />
//         </Head>
//         <Preview>Here&apos;s your verification code: {otp}</Preview>
//         <Section>
//           <Row>
//             <Heading as="h2">Hello {username},</Heading>
//           </Row>
//           <Row>
//             <Text>
//               Thank you for registering. Please use the following verification
//               code to complete your registration:
//             </Text>
//           </Row>
//           <Row>
//             <Text>{otp}</Text> 
//           </Row>
//           <Row>
//             <Text>
//               If you did not request this code, please ignore this email.
//             </Text>
//           </Row>
//         </Section>
//       </Html>
//     );
//   }

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

interface PlaidVerifyIdentityEmailProps {
  otp?: string;
}

export const PlaidVerifyIdentityEmail = ({
  otp,
}: PlaidVerifyIdentityEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        {/* Optional: Add your logo */}
        {/* <Img src={`${baseUrl}/static/logo.png`} width="150" height="50" alt="Logo" style={logo} /> */}
        
        <Text style={tertiary}>Identity Verification</Text>
        
        <Heading style={secondary}>
          Welcome to Android CMT
        </Heading>
        
        <Text style={description}>
          Thank you for registering with Android CMT. Please use the following one-time code to verify your identity:
        </Text>
        
        <Section style={codeContainer}>
          <Text style={code}>{otp || "------"}</Text>
        </Section>
        
        <Text style={paragraph}>
          If you did not request this, please disregard this email or contact our support.
        </Text>
      </Container>
      
      <Text style={footer}>Powered securely by Android CMT</Text>
    </Body>
  </Html>
);

PlaidVerifyIdentityEmail.PreviewProps = {
  otp: "123456",
} as PlaidVerifyIdentityEmailProps;

export default PlaidVerifyIdentityEmail;

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

const codeContainer = {
  backgroundColor: "#f1f3f5",
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "20px",
  textAlign: "center" as const,
};

const code = {
  color: "#333",
  fontSize: "28px",
  fontWeight: 700,
  letterSpacing: "5px",
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

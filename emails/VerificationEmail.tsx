import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface PlaidVerifyIdentityEmailProps {
  otp?: string;
  username?: string;
}

export const PlaidVerifyIdentityEmail = ({
  otp,
  username,
}: PlaidVerifyIdentityEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        {/* Optional: Add your logo */}
        {/* <Img src={`${baseUrl}/static/logo.png`} width="150" height="50" alt="Logo" style={logo} /> */}

        <Text style={tertiary}>Identity Verification</Text>

        <Heading style={secondary}>Welcome to Adroid CMS</Heading>

        <Text style={description}>
          Thank you {username} for registering with Adroid CMS. Please use the
          following one-time code to verify your identity:
        </Text>

        <Section style={codeContainer}>
          <Text style={code}>{otp || '------'}</Text>
        </Section>

        <Text style={paragraph}>
          If you did not request this, please disregard this email or contact
          our support.
        </Text>
      </Container>

      <Text style={footer}>Powered securely by Adroid CMS</Text>
    </Body>
  </Html>
);

PlaidVerifyIdentityEmail.PreviewProps = {
  otp: '123456',
} as PlaidVerifyIdentityEmailProps;

export default PlaidVerifyIdentityEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: 'Arial, sans-serif',
  padding: '20px',
};

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #eaeaea',
  borderRadius: '10px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  padding: '40px 20px',
  maxWidth: '400px',
  margin: '0 auto',
};

const tertiary = {
  color: '#0a85ea',
  fontSize: '12px',
  fontWeight: 'bold' as const,
  textTransform: 'uppercase' as const,
  textAlign: 'center' as const,
  marginBottom: '10px',
};

const secondary = {
  color: '#333',
  fontSize: '22px',
  fontWeight: 600,
  textAlign: 'center' as const,
  marginBottom: '20px',
};

const description = {
  color: '#555',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'center' as const,
  marginBottom: '30px',
};

const codeContainer = {
  backgroundColor: '#f1f3f5',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '20px',
  textAlign: 'center' as const,
};

const code = {
  color: '#333',
  fontSize: '28px',
  fontWeight: 700,
  letterSpacing: '5px',
};

const paragraph = {
  color: '#777',
  fontSize: '14px',
  textAlign: 'center' as const,
  lineHeight: '22px',
  marginTop: '10px',
  padding: '0 20px',
};

const footer = {
  color: '#888',
  fontSize: '12px',
  textAlign: 'center' as const,
  marginTop: '30px',
};

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface PaymentReceiptProps {
  recipientName: string;
  amount: number;
  transactionId: string;
  date: string;
}

export const PaymentReceiptEmail = ({
  recipientName,
  amount,
  transactionId,
  date,
}: PaymentReceiptProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        {/* Optional: Add a logo */}
        {/* <Img src={`${baseUrl}/static/logo.png`} width="150" height="50" alt="Company Logo" style={logo} /> */}

        <Heading style={title}>Payment Receipt</Heading>
        <Section style={content}>
          <Text style={greeting}>Hello {recipientName},</Text>
          <Text style={paragraph}>
            Thank you for your payment. We have successfully received ₹{amount}{' '}
            as a security deposit.
          </Text>
          <Text style={paragraph}>
            <strong>Transaction ID:</strong> {transactionId}
          </Text>
          <Text style={paragraph}>
            <strong>Date:</strong> {date}
          </Text>
          <Text style={paragraph}>
            If you have any questions or need further assistance, feel free to
            contact us.
          </Text>
        </Section>
        <Section style={footerContainer}>
          <Text style={footer}>Thank you for your prompt payment.</Text>
          <Text style={footerNote}>
            This receipt is for your records. Please keep it for future
            reference.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

PaymentReceiptEmail.PreviewProps = {
  recipientName: 'John Doe',
  amount: 2000,
  transactionId: 'TX123456789',
  date: '2024-09-15',
} as PaymentReceiptProps;

export default PaymentReceiptEmail;

const main = {
  backgroundColor: '#f8f9fc',
  fontFamily: 'Arial, sans-serif',
  padding: '20px',
};

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #e0e0e0',
  borderRadius: '10px',
  boxShadow: '0 8px 16px rgba(0,0,0,0.05)',
  maxWidth: '480px',
  margin: '0 auto',
  padding: '40px',
};

const title = {
  color: '#333',
  fontSize: '22px',
  fontWeight: 700,
  textAlign: 'center' as const,
  marginBottom: '30px',
};

const content = {
  marginBottom: '30px',
};

const greeting = {
  color: '#444',
  fontSize: '16px',
  fontWeight: 500,
  marginBottom: '20px',
};

const paragraph = {
  color: '#555',
  fontSize: '14px',
  lineHeight: '22px',
  marginBottom: '16px',
};

const footerContainer = {
  marginTop: '30px',
  borderTop: '1px solid #eeeeee',
  paddingTop: '20px',
};

const footer = {
  color: '#333',
  fontSize: '14px',
  fontWeight: 600,
  textAlign: 'center' as const,
  marginBottom: '10px',
};

const footerNote = {
  color: '#888',
  fontSize: '12px',
  textAlign: 'center' as const,
};

const logo = {
  display: 'block',
  margin: '0 auto 20px',
};

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

type ReviewComment = { [key: string]: string }; // Key-value pair for comments (e.g., "review 1": "Excellent work")
interface SendCommentMailTemplateProps {
  username: string;
  status: string;
  paperID: string;
  comment: string;
  reviewerComments: ReviewComment;
}

export const SendCommentMailTemplate = ({
  username,
  status,
  paperID,
  comment,
  reviewerComments,
}: SendCommentMailTemplateProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Text style={tertiary}>Paper Review Notification</Text>

        <Heading style={secondary}>Update on Your Paper</Heading>

        <Text style={description}>
          Dear {username}, we wanted to inform you about the recent updates on
          your paper (ID: {paperID}). Below are the details:
        </Text>

        <Section style={infoContainer}>
          <Text style={label}>Paper Status:</Text>
          <Text style={value}>{status}</Text>
        </Section>

        <Section style={infoContainer}>
          <Text style={label}>Comment:</Text>
          <Text style={value}>{comment || 'No comments available'}</Text>
        </Section>

        {Object.entries(reviewerComments).map(([review, comment]) => (
          <Section style={infoContainer}>
            <Text style={label}>{review}</Text>
            <Text style={value}>{comment}</Text>
          </Section>
        ))}

        <Text style={paragraph}>
          Thank you for your submission, and please contact us if you have any
          questions.
        </Text>
      </Container>

      <Text style={footer}>Powered securely by Adroid CMS</Text>
    </Body>
  </Html>
);

SendCommentMailTemplate.PreviewProps = {
  username: 'Author Name',
  status: 'Approved',
  paperID: '123456',
  comment: 'Great work! Please address the minor feedback.',
} as SendCommentMailTemplateProps;

export default SendCommentMailTemplate;

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
  maxWidth: '600px',
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

const infoContainer = {
  backgroundColor: '#f1f3f5',
  borderRadius: '8px',
  padding: '10px',
  marginBottom: '15px',
};

const label = {
  color: '#777',
  fontSize: '14px',
  fontWeight: 'bold' as const,
  textTransform: 'uppercase' as const,
};

const value = {
  color: '#333',
  fontSize: '16px',
  marginTop: '5px',
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

import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
  } from '@react-email/components';
  
  interface ConferenceCreationEmailProps {
    username: string;
    conferenceTitle: string;
    conferenceDate: string;
  }
  
  export default function ConferenceCreationEmailTemplate({
    username,
    conferenceTitle,
    conferenceDate,
  }: ConferenceCreationEmailProps) {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <title>Conference Successfully Created</title>
          <Font
            fontFamily="Roboto"
            fallbackFontFamily="Verdana"
            webFont={{
              url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
              format: 'woff2',
            }}
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>
        <Preview>Your conference "{conferenceTitle}" has been successfully created.</Preview>
        <Section>
          <Row>
            <Heading as="h2">Dear {username},</Heading>
          </Row>
          <Row>
            <Text>
              We are pleased to confirm that your conference, "<strong>{conferenceTitle}</strong>", has been successfully created on our platform. Below are the key details for your reference:
            </Text>
          </Row>
          <Row>
            <Text>
              <strong>Conference Title:</strong> {conferenceTitle}
            </Text>
          </Row>
          <Row>
            <Text>
              <strong>Date:</strong> {conferenceDate}
            </Text>
          </Row>
          <Row>
            <Text>
              You can access and manage your conference through your dashboard at any time. Should you have any questions or require assistance, our support team is always here to help.
            </Text>
          </Row>
          <Row>
            <Text>
              Thank you for choosing our platform to host your event. We look forward to supporting the success of your conference.
            </Text>
          </Row>
          <Row>
            <Text>Best regards,</Text>
          </Row>
          <Row>
            <Text>The Conference Management Team</Text>
          </Row>
        </Section>
      </Html>
    );
  }
  
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
  
  interface AuthorLoginEmailProps {
    email: string;
    isCorrespondingAuthor: boolean;
    paperTitle: string;
  }
  
  const url = process.env.WEBSITE_URL;
  
  const sendEmailToAuthorForLoginTemplate = ({
    email,
    isCorrespondingAuthor,
    paperTitle,
  }: AuthorLoginEmailProps) => (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Text style={tagline}>You're Invited as an Author</Text>
  
          <Heading style={heading}>
            Welcome to Adroid CMS!
          </Heading>
  
          <Text style={paragraph}>
            Hi {email},
          </Text>
  
          <Text style={paragraph}>
            You’ve been added as {isCorrespondingAuthor ? 'the Corresponding Author' : 'an Author'} for the paper:
          </Text>
  
          <Text style={highlight}>
            "{paperTitle}"
          </Text>
  
          <Text style={paragraph}>
            To manage this paper and receive updates, please create your account on Adroid CMS.
          </Text>
  
          <Section style={buttonContainer}>
            <a href={`${url}/signup`} style={button}>
              Create Your Account
            </a>
          </Section>
  
          <Text style={smallText}>
            Already have an account with us? Simply log in using your existing credentials.
          </Text>
  
          <Text style={footer}>Need help? Contact our support team anytime.</Text>
        </Container>
      </Body>
    </Html>
  );
  
  export default sendEmailToAuthorForLoginTemplate;
  
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
    maxWidth: '500px',
    margin: '0 auto',
  };
  
  const tagline = {
    color: '#007bff',
    fontSize: '12px',
    fontWeight: 'bold' as const,
    textTransform: 'uppercase' as const,
    textAlign: 'center' as const,
    marginBottom: '10px',
  };
  
  const heading = {
    color: '#333',
    fontSize: '22px',
    fontWeight: 600,
    textAlign: 'center' as const,
    marginBottom: '20px',
  };
  
  const paragraph = {
    color: '#555',
    fontSize: '16px',
    lineHeight: '24px',
    marginBottom: '16px',
  };
  
  const highlight = {
    color: '#000',
    fontSize: '17px',
    fontWeight: 'bold' as const,
    fontStyle: 'italic',
    textAlign: 'center' as const,
    margin: '10px 0',
  };
  
  const buttonContainer = {
    textAlign: 'center' as const,
    margin: '20px 0',
  };
  
  const button = {
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 600,
    textDecoration: 'none',
    padding: '12px 24px',
    borderRadius: '6px',
  };
  
  const smallText = {
    color: '#777',
    fontSize: '13px',
    textAlign: 'center' as const,
  };
  
  const footer = {
    color: '#888',
    fontSize: '12px',
    textAlign: 'center' as const,
    marginTop: '30px',
  };
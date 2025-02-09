import Link from 'next/link';
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Privacy Policy</h1>

      {/* Privacy Policy Section */}
      <section className="mb-12">
        <ol className="list-decimal list-inside space-y-4">
          <li>
            <strong>Introduction:</strong> This Privacy Policy outlines how
            adroid CMS collects, uses, discloses, and safeguards the personal
            data submitted through our Conference Management System (CMS). By
            using the system for paper submission, registration, or other
            activities related to the conference, you agree to the terms of this
            Privacy Policy.
          </li>
          <li>
            <strong>Data Collection:</strong> We collect the following personal
            data from users:
            <ul className="list-disc list-inside ml-6 space-y-2">
              <li>
                Personal Information: Name, email address, affiliation, phone
                number, and mailing address.
              </li>
              <li>
                Submission Information: Paper title, abstract, manuscript,
                author details, and any other information related to the paper
                submission process.
              </li>
              <li>
                Payment Information: For registration or other fees, we may
                collect payment details, which will be processed through a
                third-party payment gateway.
              </li>
            </ul>
          </li>
          <li>
            <strong>Use of Personal Data: </strong>Personal data is collected
            and processed to facilitate the submission, review, registration,
            and participation process for the conference. Data may also be used
            for communication regarding conference updates, proceedings
            publication, and future event invitations.
          </li>
          <li>
            <strong>Data Sharing:</strong> Data may be shared internally with
            organizers and externally with third-party vendors. These third
            parties follow our data protection policies.
          </li>
          <li>
            <strong>Data Security:</strong>
            <ul className="list-disc list-inside ml-6 space-y-2">
              <li>
                Internal Sharing: Your data may be shared with conference
                organizers, committee members, reviewers, and other key
                personnel for the purpose of conference management
              </li>
              <li>
                Third-Party Services: We may share your data with third-party
                vendors (e.g., payment processors, publication services) as
                necessary. These third parties are required to follow our data
                protection policies and maintain data security.
              </li>
            </ul>
          </li>
          <li>
            <strong>Cookies and Tracking: </strong>Our Conference Management
            System may use cookies and tracking technologies to improve user
            experience. This may include tracking session data, preferences, and
            login credentials.
          </li>
          <li>
            <strong>Data Retention:</strong> We retain personal data for as long
            as necessary to fulfill the purpose for which it was collected, or
            as required by legal obligations. This typically includes retaining
            data for conference archives, follow-up communications, and
            proceedings publication.
          </li>
          <li>
            <strong>Your Rights:</strong> You have the right to access, correct,
            or delete your personal data at any time. To exercise these rights,
            contact us at{' '}
            <Link href="mailto:adroidconnetz@gmail.com">
              adroidconnetz@gmail.com
            </Link>{' '}
            . We will respond within a reasonable timeframe.
          </li>
          <li>
            <strong>Changes to Privacy Policy:</strong> adroid CMS reserves the
            right to modify this Privacy Policy at any time. Any changes will be
            posted on the conference website and will become effective
            immediately.
          </li>
        </ol>
      </section>

      {/* Terms and Conditions Section */}
    </div>
  );
};

export default PrivacyPolicy;

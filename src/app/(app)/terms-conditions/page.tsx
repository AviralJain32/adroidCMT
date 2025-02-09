import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Terms & Conditions
      </h1>
      <ol className="list-decimal list-inside space-y-4">
        <li>
          <strong>Introduction:</strong> By using the Conference Management
          System (CMS) provided by adroid CMS, you agree to comply with the
          following terms and conditions. These terms govern the use of the
          system for activities such as paper submission, registration, and
          communication with the conference organizers.
        </li>
        <li>
          <strong>Eligibility:</strong> Only individuals who meet the
          conference&apos;s submission guidelines and deadlines are eligible to
          use the system. By submitting content through the system, you confirm
          that the work is original and does not violate any third-party
          intellectual property rights.
        </li>
        <li>
          <strong>Submission Process:</strong>
          <ul className="list-disc list-inside ml-6 space-y-2">
            <li>
              All submissions must adhere to the conference&apos;s specified
              guidelines in terms of format, content, and deadlines.
            </li>
            <li>
              Submissions are subject to peer review, and the decision of the
              review committee is final. No appeals will be accepted once
              decisions have been made.
            </li>
          </ul>
        </li>
        <li>
          <strong>Payment Terms:</strong> If the CMS is used for conference
          registration or other fee-related services, users must make payments
          through our secure, third-party payment gateway.Refund policies (if
          applicable) will be detailed during the registration process.
        </li>
        <li>
          <strong>Intellectual Property:</strong>
          <ul className="list-disc list-inside ml-6 space-y-2">
            <li>
              Authors retain the copyright to their submitted works. However, by
              submitting, authors grant Adroid CMS the right to publish their
              work in conference proceedings or other related media.
            </li>
            <li>
              o Authors agree that their submitted works do not infringe any
              copyrights, trademarks, or other intellectual property rights of
              third parties.
            </li>
          </ul>
        </li>
        <li>
          <strong>Privacy:</strong> Your use of the CMS is governed by our
          Privacy Policy. By submitting any personal or professional
          information, you agree to the terms outlined in the Privacy Policy.
        </li>
        <li>
          <strong>Data Security and Accuracy:</strong>
          <ul className="list-disc list-inside ml-6 space-y-2">
            <li>
              We strive to ensure that all data in the CMS is accurate and up to
              date. However, users are responsible for providing correct
              information during submissions and registration.
            </li>
            <li>
              While we take security seriously, we are not liable for any
              unauthorized access to user data due to system breaches beyond our
              control.
            </li>
          </ul>
        </li>
        <li>
          <strong>Withdrawal and Cancellation:</strong> Authors may withdraw
          their papers or cancel their registrations by contacting the
          conference organizers within the specified timeframes. Withdrawal
          after acceptance may have penalties, as determined by conference
          policies.
        </li>
        <li>
          <strong>Limitation of Liability:</strong> Adroid CMS will not be
          liable for any damages, losses, or inconveniences caused by the
          malfunction of the CMS, including submission errors, missed deadlines,
          or unauthorized access to personal data.
        </li>
        <li>
          <strong>Termination of Access:</strong> We reserve the right to
          terminate or restrict access to the CMS if users violate these Terms
          and Conditions, engage in fraudulent activities, or misuse the system
          in any way.
        </li>
        <li>
          <strong>Amendments to Terms:</strong> Adroid CMS reserves the right to
          update these Terms and Conditions at any time. Changes will be
          effective immediately and communicated through the system or
          conference website.
        </li>
      </ol>
    </div>
  );
};

export default PrivacyPolicy;

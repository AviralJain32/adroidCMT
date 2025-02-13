'use client';
import Loader from '@/components/Loader';
import PaperTable from '@/app/(app)/dashboard/[confName]/PaperTable';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { IConference } from '@/model/Conference';
import { useParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { useGetConferencePapersQuery } from '@/store/features/PaperApiSlice';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { useRouter } from 'next/router';
import Link from 'next/link';
// import { ConferenceMeetingSchedule } from '@/app/(videoMeetingRoom)/meetings/ConferenceMeetingSchedule';

// UnderSubmission.tsx
const UnderSubmission = () => (
  <div className="flex min-w-full min-h-[80vh] justify-center items-center">
    <Card className="bg-yellow-50 border border-yellow-200 p-4 ">
      <CardHeader>
        <CardTitle className="flex items-center text-yellow-800 font-semibold text-lg">
          🚀 Your Conference is Under Submission!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mt-2 text-yellow-700">
          We are currently reviewing your submission. We will notify you soon on
          the Email.
        </p>
      </CardContent>
    </Card>
  </div>
);

// RejectedConference.tsx
interface TypeRejectedConf {
  conferenceStatusComment: { comment: String; updatedAt: Date }[];
}

const RejectedConference = ({ conferenceStatusComment }: TypeRejectedConf) => (
  <div className="flex min-w-full min-h-[80vh] justify-center items-center">
    <Card className="bg-red-50 border border-red-200 p-4">
      <CardHeader>
        <CardTitle className="flex items-center text-red-800 font-semibold text-lg">
          ❌ Your Conference Submission Has Been Rejected
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mt-2 text-red-700">
          {conferenceStatusComment[conferenceStatusComment.length - 1].comment}
        </p>
        <p className="mt-2 text-red-700">
          Unfortunately, your conference did not meet the necessary criteria for
          acceptance.
        </p>
        <p className="mt-2 text-red-700">
          Please contact support for more information.
        </p>
      </CardContent>
    </Card>
  </div>
);

// ReviewConference.tsx
interface TypeReviewConf {
  conferenceStatusComment: { comment: String; updatedAt: Date }[];
}

const ReviewConference = ({ conferenceStatusComment }: TypeReviewConf) => (
  <div className="flex min-w-full min-h-[80vh] justify-center items-center">
    <Card className="bg-blue-50 border border-blue-200 p-4">
      <CardHeader>
        <CardTitle className="flex items-center text-blue-800 font-semibold text-lg">
          ✏️ Your Conference Requires a Review
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mt-2 text-blue-700">
          Adroid CMS System have left the following comments for you to review:
        </p>
        <ul className="mt-2 list-disc list-inside text-blue-700">
          {conferenceStatusComment[conferenceStatusComment.length - 1].comment}
        </ul>
        <p className="mt-4 text-blue-700">
          Please address the comments and resubmit your conference for review.
        </p>
      </CardContent>
    </Card>
  </div>
);

// Page Component
const Page = () => {
  const params = useParams<{ confName: string }>();
  const confName = params.confName;

  const { data, error, isLoading } = useGetConferencePapersQuery(confName);
  const [conferenceDetails, setConferenceDetails] =
    useState<IConference | null>(null);

  useEffect(() => {
    if (data) {
      setConferenceDetails(data.getConferenceDetails);
    }
  }, [data]);

  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/submit-paper/${confName}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: 'Submission Link Copied!',
      description: 'Submission Link has been copied to clipboard.',
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    toast({
      title: 'Error',
      description:
        (error as { message: string }).message || 'Failed to load papers',
      variant: 'destructive',
    });
    return <div>Error occurred while fetching conference papers.</div>;
  }

  if (!conferenceDetails) {
    return <Loader />;
  }

  return conferenceDetails.conferenceStatus === 'submitted' ? (
    <UnderSubmission />
  ) : conferenceDetails.conferenceStatus === 'accepted' ? (
    <div className="container min-h-[80vh]">
      <div className="mt-6 flex justify-end">
        <Link href={`/meetings/${confName}`}>
          <Button>Your Scheduled Conference Meetings</Button>
        </Link>
      </div>
      <div className="mb-4 p-9">
        <h2 className="text-lg font-semibold mb-2">
          Copy Your Paper Submission Link
        </h2>
        <div className="flex items-center">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="input input-bordered w-full p-2 mr-2"
          />
          <Button onClick={copyToClipboard}>Copy</Button>
        </div>
      </div>

      {data?.paperSubmittedInConference &&
      data.paperSubmittedInConference.length !== 0 ? (
        <div>
          <PaperTable
            data={data?.paperSubmittedInConference}
            ispaidSecurityAmountof2000={
              data.getConferenceDetails.conferenceSecurityDeposit2000Paid
            }
          />
        </div>
      ) : (
        <div>No paper to show</div>
      )}
    </div>
  ) : conferenceDetails.conferenceStatus === 'review' ? (
    <ReviewConference
      conferenceStatusComment={conferenceDetails.conferenceStatusComment || []}
    />
  ) : (
    <RejectedConference
      conferenceStatusComment={conferenceDetails.conferenceStatusComment || []}
    />
  );
};

export default Page;

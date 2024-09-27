"use client";
import Loader from '@/components/Loader';
import PaperTable from '@/app/(app)/dashboard/[confName]/[paperID]/PaperTable';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { IConference } from '@/model/Conference';
import { useParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { useGetConferencePapersQuery } from '@/store/features/PaperApiSlice';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { List, ListItem } from '@/components/ui/list';
// UnderSubmission.tsx

const UnderSubmission = () => {
    return (
        <div className='flex min-w-full min-h-[80vh] justify-center items-center'>
        <Card className="bg-yellow-50 border border-yellow-200 p-4 ">
            <CardHeader>
                <CardTitle className="flex items-center text-yellow-800 font-semibold text-lg">
                    🚀 Your Conference is Under Submission!
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="mt-2 text-yellow-700">We are currently reviewing your submission. We will notify you soon on the Email.</p>
                {/* <p className="mt-2 font-bold text-yellow-800">Your Conference Details:</p> */}
                {/* <List className="list-disc ml-5 mt-2">
                    {conferenceDetails && Object.entries(conferenceDetails).map(([key, value]) => (
                        <ListItem key={key} className="flex">
                            <strong>{key}:</strong> <span className="ml-1">{value}</span>
                        </ListItem>
                    ))}
                </List> */}
            </CardContent>
        </Card>
        </div>
    );
};

const RejectedConference = () => {
    return (
        <div className='flex min-w-full min-h-[80vh] justify-center items-center'>
        <Card className="bg-red-50 border border-red-200 p-4">
            <CardHeader>
                <CardTitle className="flex items-center text-red-800 font-semibold text-lg">
                    ❌ Your Conference Submission Has Been Rejected
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="mt-2 text-red-700">Unfortunately, your conference did not meet the necessary criteria for acceptance.</p>
                <p className="mt-2  text-red-700">Please contact support for more information.</p>
            </CardContent>
        </Card>
        </div>
    );
};


const Page = () => {
    const params = useParams<{ confName: string }>();
    const confName = params.confName;

    const { data, error, isLoading } = useGetConferencePapersQuery(confName);
    const [conferenceDetails, setConferenceDetails] = useState<IConference | null>(null);

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
            description: (error as { message: string }).message || 'Failed to load papers',
            variant: 'destructive',
        });
        return <div>Error occurred while fetching conference papers.</div>;
    }

    if (!conferenceDetails) {
        return <Loader />;
    }

    return conferenceDetails.conferenceStatus === "submitted" ? (
        // <div>
        //     <p>Your Conference is submitted and under our checking. We will notify you after some time.</p>
        //     <p>Your submitted conference details are:</p>
        //     <ul>
        //         {conferenceDetails && Object.entries(conferenceDetails).map(([key, value]) => (
        //             <li key={key}><strong>{key}:</strong> {value}</li>
        //         ))}
        //     </ul>
        // </div>
        <UnderSubmission />
    ) : conferenceDetails.conferenceStatus === "accepted" ? (
        <div className='container min-h-[80vh]'>
            <div className="mb-4 p-9">
                <h2 className="text-lg font-semibold mb-2">Copy Your Paper Submission Link</h2>
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
            {data?.paperSubmittedInConference && data.paperSubmittedInConference.length !== 0 ? (
              <div>
                <PaperTable data={data?.paperSubmittedInConference} />
              </div>
            ) : (
              <div>No paper to show</div>
            )}
        </div>
    ) : (
        <RejectedConference />
        // <div>Sorry, your conference has been rejected by us due to the issue</div>
    );
};

export default Page;

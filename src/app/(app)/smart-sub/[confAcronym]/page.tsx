'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import moment from 'moment';
import { useParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { IConference } from '@/model/Conference';
import { useGetConferenceByConferenceIDQuery } from '@/store/features/ConferenceApiSlice';
import Loader from '@/components/Loader';

const ConferencePage = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [conferenceDetails, setConferenceDetails] =
    useState<IConference | null>(null);

  // const baseUrl = `${window.location.protocol}//${window.location.host}`;
  // const profileUrl = `${baseUrl}/submit-paper/${params.confAcronym}`;

  const [baseUrl, setBaseUrl] = useState('hello');

  useEffect(() => {
    setBaseUrl(`${window.location.protocol}//${window.location.host}`);
  }, []);

  const profileUrl = `${baseUrl}/submit-paper/${params.confAcronym}`;
  console.log(profileUrl);
  // const { data:conferenceDetails, error, isLoading } = useGetConferenceByConferenceIDQuery(params.confAcronym as string);

  const getConferenceByConferenceID = async (conferenceAcronym: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/get-conference-by-conference-id?conferenceAcronym=${conferenceAcronym}`,
      );
      if (response.data.success) {
        setConferenceDetails(response.data.data);
        console.log(response);
        return response.data.data; // Returning the conference details
      } else {
        throw new Error(response.data.message); // Throwing an error if not successful
      }
    } catch (error) {
      setLoading(false);
      console.error('Error fetching conference details:', error);
      throw error; // Propagating the error for the caller to handle
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(params.confAcronym);
    getConferenceByConferenceID(params.confAcronym as string);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!conferenceDetails) {
    return (
      <div className="text-center py-10">No conference details found.</div>
    );
  }

  const {
    conferenceCategory,
    conferenceTitle,
    conferenceOrganizer,
    conferenceOrganizerWebPage,
    conferenceOrganizerPhoneNumber,
    conferenceOrganizerRole,
    conferenceEmail,
    conferenceAnyOtherInformation,
    conferenceAcronym,
    conferenceWebpage,
    conferenceVenue,
    conferenceCity,
    conferenceCountry,
    conferenceEstimatedNumberOfSubmissions,
    conferenceFirstDay,
    conferenceLastDay,
    conferencePrimaryArea,
    conferenceSecondaryArea,
    conferenceAreaNotes,
    conferenceIsAcceptingPaper,
    conferenceStatus,
    conferenceStatusComment,
    conferenceSubmissionsDeadlineDate,
  } = conferenceDetails;

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg">
      <div className="shadow p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">{conferenceTitle}</h1>
          {conferenceIsAcceptingPaper && (
            <Link href={profileUrl} target="_blank">
              <Button>Submit Paper</Button>
            </Link>
          )}
        </div>
        <Table className="min-w-full">
          <TableBody>
            {/* <TableRow>
              <TableHead>Organizer</TableHead>
              <TableCell className="font-medium">
                <a href={conferenceOrganizerWebPage} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  {conferenceOrganizer.fullname}
                </a> ({conferenceOrganizerRole})<br />
                Phone: {conferenceOrganizerPhoneNumber}
              </TableCell>
            </TableRow> */}
            {/* <TableRow>
              <TableHead>Email</TableHead>
              <TableCell className="font-medium">{conferenceEmail}</TableCell>
            </TableRow> */}
            {conferenceOrganizerWebPage && <TableRow>
              <TableHead>Conference website</TableHead>
              <Link href={conferenceOrganizerWebPage}>
                <TableCell className="font-medium">
                  {conferenceOrganizerWebPage}
                </TableCell>
              </Link>
            </TableRow>}
            <TableRow>
              <TableHead>Submission link</TableHead>
              <Link href={profileUrl}>
                <TableCell className="font-medium">{profileUrl}</TableCell>
              </Link>
            </TableRow>
            
            <TableRow>
              <TableHead>{conferenceCategory==="Book"?"Abstract Submission Date":"Conference Start Date"}</TableHead>
              <TableCell className="font-medium">
                {moment(conferenceFirstDay).format('MMMM Do YYYY')}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>{conferenceCategory==="Book"?"Full Chapter Submission Date":"Submission Deadline"}</TableHead>
              <TableCell className="font-medium">
                {moment(conferenceSubmissionsDeadlineDate).format(
                  'MMMM Do YYYY',
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>{conferenceCategory==="Book"?"Final Notification Date":"Conference End Date"}</TableHead>
              <TableCell className="font-medium">
                {moment(conferenceLastDay).format('MMMM Do YYYY')}
              </TableCell>
            </TableRow>
            {conferenceVenue && <TableRow>
              <TableHead>Venue</TableHead>
              <TableCell className="font-medium">
                {conferenceVenue}, {conferenceCity}, {conferenceCountry}
              </TableCell>
            </TableRow>}
            <TableRow>
              <TableHead>Primary Area</TableHead>
              <TableCell className="font-medium">
                {conferencePrimaryArea}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Secondary Area</TableHead>
              <TableCell className="font-medium">
                {conferenceSecondaryArea}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Area Notes</TableHead>
              <TableCell className="font-medium">
                {conferenceAreaNotes ||
                  'No Area Notes are present for this conference'}
              </TableCell>
            </TableRow>
            {/*             
            <TableRow>
              <TableHead>Status</TableHead>
              <TableCell className="font-medium">
                <Badge variant={conferenceStatus}>
                  {conferenceStatus && conferenceStatus.charAt(0).toUpperCase() + conferenceStatus.slice(1)}
                </Badge> - {conferenceStatusComment}
              </TableCell>
            </TableRow> */}
            <TableRow>
              <TableHead>Additional Information</TableHead>
              <TableCell className="font-medium">
                {conferenceAnyOtherInformation}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ConferencePage;

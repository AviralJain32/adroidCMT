"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import moment from 'moment'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useGetOrganizedConferencesQuery } from '@/store/features/ConferenceApiSlice';
import Loader from '@/components/Loader';
import EditPopup from './EditPopup';
import { useGetSubmittedPapersQuery } from '@/store/features/PaperApiSlice';
import  EditConferencePopup  from "./EditConferencePopup";
import { useState } from "react";
import { Toggle } from "@/components/ui/toggle";


const OrganizedConferenceComponent=()=>{
  const { data: organizedConferences, error: conferencesError, isLoading: loadingConferences } = useGetOrganizedConferencesQuery()

  return (
    <div className='flex justify-center items-center'>
    <Card className='w-full md:w-3/4'>
          <CardHeader>
            <CardTitle>Organized Conferences</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Conference</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loadingConferences ? (
                  <TableRow>
                    <TableCell colSpan={3}>Loading...</TableCell>
                  </TableRow>
                ) :organizedConferences && organizedConferences.length > 0 ? (
                  organizedConferences.map((organizedConference:any) => (
                    
                    <TableRow key={organizedConference._id}>
                      <TableCell className="font-medium">{organizedConference.conferenceAcronym}</TableCell>
                      <TableCell>{organizedConference.conferenceOrganizerRole}</TableCell>
                      <TableCell>{moment(organizedConference.conferenceCreatedAt).calendar()}</TableCell>
                      <TableCell><Link href={`/dashboard/${organizedConference.conferenceAcronym}`}><Button variant={'outline'}>Open</Button></Link></TableCell>
                      <TableCell><EditConferencePopup conferenceDetails={organizedConference}/></TableCell>

                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3}>No organized conferences found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        </div>
  )
}

const SubmittedPaperComponent=()=>{
  const { data: submittedPapers, error: SubmittedPaperError, isLoading: loadingPapers } = useGetSubmittedPapersQuery()
  return (
    <div className='flex justify-center items-center'>
    <Card className='w-full md:w-3/4'>
          <CardHeader>
            <CardTitle>Submitted Papers</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead >Paper Title</TableHead>
                  <TableHead >Conference</TableHead>
                  <TableHead>Submitted At</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loadingPapers ? (
                  <TableRow>
                    <TableCell colSpan={3}>Loading...</TableCell>
                  </TableRow>
                ) : submittedPapers && submittedPapers.length > 0 ? (
                  submittedPapers.map((submittedPaper) => (
                    <TableRow key={submittedPaper.paperTitle}>
                      <TableCell className="font-medium">{submittedPaper.paperTitle}</TableCell>
                      <TableCell className="font-medium">{submittedPaper.conference.conferenceAcronym}</TableCell>
                      <TableCell>{moment(submittedPaper.paperSubmissionDate).calendar()}</TableCell>
                      <TableCell>
                         {(() => {
                            switch (submittedPaper.paperStatus) {
                              case "submitted":
                                return <Badge variant="submitted">Submitted</Badge>;
                              case "accepted": 
                                return <Badge variant="accepted">Accepted</Badge>;
                              case "rejected":
                                return <Badge variant="rejected">Rejected</Badge>;
                              case "review":
                                return <Badge variant="review">Review</Badge>;
                              default:
                                return <Badge variant="submitted">Submitted</Badge>;
                            }
                          })()}
                      </TableCell>
                      <TableCell><EditPopup {...submittedPaper}/></TableCell>
                      
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3}>No submitted papers found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        </div>
  )
}
const Page: React.FC = () => {
  const [showConferences, setShowConferences] = useState(true);

  const handleToggle = () => {
    setShowConferences((prev) => !prev);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-around items-center mb-6">
        <div className="w-14"></div>
        <h1 className="text-4xl font-bold text-center text-gray-800">Dashboard</h1>
        <div className="flex items-center gap-2">
          {/* Your Toggle Button */}
          <Toggle
            aria-label="Toggle between organized conferences and submitted papers"
            onClick={handleToggle}
            className={`flex items-center px-4 py-2 bg-gray-200 rounded-lg cursor-pointer transition-colors duration-300
              ${showConferences ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
          >
            {showConferences ? (
              
              <span className="font-medium text-sm transition-opacity duration-300">Submitted Papers</span>
            ) : (
              <span className="font-medium text-sm transition-opacity duration-300">Organized Conferences</span>
            )}
          </Toggle>
        </div>
      </div>

      {showConferences ? (
        <OrganizedConferenceComponent />
      ) : (
        <SubmittedPaperComponent />
      )}
    </div>
  );
};


export default Page;
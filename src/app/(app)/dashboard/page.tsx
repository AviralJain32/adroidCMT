"use client";
import { toast } from '@/components/ui/use-toast'
import { ApiResponse } from '@/types/ApiResponse'
import axios, { AxiosError } from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
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

interface OrganizedConference {
  _id: string;
  conferenceAcronym: string;
  conferenceOrganizerRole: string;
  conferenceCreatedAt: Date;
}

interface SubmittedPaper {
  paperAuthor: [];
  correspondingAuthor:[];
  paperTitle: string;
  paperFile: string;
  paperKeywords: string[];
  paperAbstract: string;
  paperSubmissionDate: Date;
  conference: {conferenceAcronym:string};
  paperStatus: 'submitted' | 'accepted' | 'rejected' | 'review';
  paperID:string
}
const Page: React.FC = () => {
  // const [organizedConferences, setOrganizedConferences] = useState<OrganizedConference[]>([])
  // const [loadingConferences, setLoadingConferences] = useState(false)
  const [submittedPapers, setSubmittedPapers] = useState<SubmittedPaper[]>([])
  const [loadingPapers, setLoadingPapers] = useState(false)

  const { data: organizedConferences, error: conferencesError, isLoading: loadingConferences } = useGetOrganizedConferencesQuery()
  console.log(organizedConferences)

  useMemo(() => {
    const getSubmittedPapers = async () => {
      setLoadingPapers(true)
      try {
        const response = await axios.get('/api/get-submitted-papers')
        setSubmittedPapers(response.data.data.submittedPapers)
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>
      } finally {
        setLoadingPapers(false)
      }
    }
    getSubmittedPapers()
  }, [])

  // const editPaperDetails=(paperID:string)=>{
  //   console.log(paperID)
  //   return 
  // }
  console.log(submittedPapers)
  return (
    <div className='container mx-auto p-4'>
      <div className='flex flex-col gap-8 md:flex-row'>
        <Card className='w-full md:w-1/2'>
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
                      <TableCell><Link href={`/conference/${organizedConference.conferenceAcronym}`} replace><Button variant={'outline'}>Open</Button></Link></TableCell>
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

        <Card className='w-full md:w-1/2'>
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
                ) : submittedPapers.length > 0 ? (
                  submittedPapers.map((submittedPaper) => (
                    <TableRow key={submittedPaper.paperTitle}>
                      <TableCell className="font-medium">{submittedPaper.paperTitle}</TableCell>
                      <TableCell className="font-medium">{submittedPaper.conference.conferenceAcronym}</TableCell>
                      <TableCell>{moment(submittedPaper.paperSubmissionDate).calendar()}</TableCell>
                      <TableCell>
                        {/* {submittedPaper.paperStatus === "submitted" ? (
                          <Badge variant="submitted">Submitted</Badge>
                        ) : submittedPaper.paperStatus === "accepted" ? (
                          <Badge variant="accepted">Accepted</Badge>
                        ) : (
                          <Badge variant="rejected">Rejected</Badge>
                        )} */}
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
                                return <Badge variant="submitted">Submitted</Badge>; // or some default Badge if you want to handle unexpected statuses
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
    </div>
  )
}

export default Page

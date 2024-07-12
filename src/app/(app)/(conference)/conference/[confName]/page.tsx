"use client"
import PaperTable from '@/components/PaperTable'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { IConference } from '@/model/Conference'
import { IPaper } from '@/model/PaperSchema'
import { ApiResponse } from '@/types/ApiResponse'
import { ColumnDef } from '@tanstack/react-table'
import axios, { AxiosError } from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'



const page = ({}) => {
    const params=useParams<{ confName: string }>()
    const confName=params.confName

    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [conferenceDetails, setConferenceDetails] = useState<IConference | null>(null)


    useEffect(()=>{
      const fetchPapers=async()=>{
        setLoading(true)
      try {
        const response = await axios.get(`/api/get-conference-papers?confName=${confName}`)
        console.log(response)
        setPapers(response.data.data.paperSubmittedInConference || [])
        setConferenceDetails(response.data.data.getConferenceDetails || null)
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>
        toast({
          title: "Fetch Failed",
          description: axiosError.response?.data.message,
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
      }
      fetchPapers()
    },[])

    const baseUrl = `${window.location.protocol}//${window.location.host}`;
    const profileUrl = `${baseUrl}/submit-paper/${confName}`;

    const copyToClipboard = () => {
      navigator.clipboard.writeText(profileUrl);
      toast({
        title: 'Submission Link Copied!',
        description: 'Submission Link has been copied to clipboard.',
      });
    };
    console.log(papers)


  return (
    conferenceDetails?.conferenceStatus==="submitted" ? 

      <div>
      <p>Your Conference is submitted and under our checking. We will notify you after some time.</p>
      <p>Your submitted conference details are:</p>
      <ul>
        {conferenceDetails && Object.entries(conferenceDetails).map(([key, value]) => (
          <li key={key}><strong>{key}:</strong> {value}</li>
        ))}
      </ul>
    </div>

    :
    (conferenceDetails?.conferenceStatus==="accepted" ?
    
    <div className='container'>
      <div className="mb-4 p-9">
        <h2 className="text-lg font-semibold mb-2">Copy Your Paper Submission Link</h2>{' '}
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
      {papers.length==0 ? <div>No paper to show</div>: 
        <div>
          {/* //table  */}
          <PaperTable data={papers}/>
        </div>}
    </div>

    :

    <div>Sorry, your conference has been rejected by us due to the issue</div>
    //yaha issue add krna hai
  ))
}

export default page


//conference acronym paper id
// submitted paper id,comment,edit
// comment dalne ka option - accept reject revise
// mulltiple author

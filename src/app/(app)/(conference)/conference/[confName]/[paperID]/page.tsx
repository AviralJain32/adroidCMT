"use client"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import moment from 'moment'

interface paperDetails{
    paperTitle:string,
    paperKeywords:string[],
    paperKeyphrases:string[],
    paperAuthor:object,
    paperAbstract:string,
    paperSubmissionDate:Date,
    paperStatus:string,
    paperID:string,
    paperFile:string

}

import { useParams } from "next/navigation"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import axios from 'axios'

const page = () => {
  const params=useParams()
  const [loadingPaper, setLoadingPaper] = useState(true);
  const [paperDetails, setPaperDetails] = useState<paperDetails>([])

  useEffect(()=>{
    const loadPaperDetails=async()=>{
      setLoadingPaper(true)
      try {
        const response=await axios.get(`/api/get-paper-details-by-paper-id?paperID=${params.paperID}`)
        setPaperDetails(response.data.data)

      } catch (error) {
        
      }
      finally{
        setLoadingPaper(false)
      }
    }
    loadPaperDetails()
  },[])
  console.log(paperDetails)
  const {paperTitle,paperKeywords,paperKeyphrases,
    paperAuthor,
    paperAbstract,
    paperSubmissionDate,
    paperStatus,
    paperID}=paperDetails

  if(loadingPaper){
    return <div>Loading...</div>
  }
  return (
    <div className='container'>
    {/* <AlertDialog >
    <AlertDialogTrigger><Button variant={"outline"}>Open</Button></AlertDialogTrigger>
    <AlertDialogContent >
        <AlertDialogHeader>
        <AlertDialogTitle>Submission {paperID.split("-")[2]}</AlertDialogTitle>
        <AlertDialogDescription> */}
        <Table>
        <TableCaption>Paper Details</TableCaption>
        <TableBody>
            <TableRow>
            <TableHead >Title</TableHead>
            <TableCell className="font-medium">INV001</TableCell>
            </TableRow>
            <TableRow>
            <TableHead >Author keywords</TableHead>
            <TableCell className="font-medium">{paperKeywords.map((keyword,index)=>( <Badge className='m-1' key={index} variant="outline">{keyword}</Badge>))}</TableCell>
            </TableRow>
            <TableRow>
            <TableHead >Adroid CMT keyphrases</TableHead>
            <TableCell className="font-medium">{paperKeyphrases.map((keyword,index)=>( <Badge className='m-1' key={index} variant="outline">{keyword}</Badge>))}</TableCell>
            </TableRow>
            <TableRow>
            <TableHead >Abstract</TableHead>
            <TableCell className="font-medium">{paperAbstract}</TableCell>
            </TableRow>
            <TableRow>
            <TableHead >Submitted</TableHead>
            <TableCell className="font-medium">{moment(paperSubmissionDate).format("MMMM Do YYYY, h:mm:ss a")}</TableCell>
            </TableRow>
            <TableRow>
            <TableHead >Decision</TableHead>
            <TableCell className="font-medium">{paperStatus}</TableCell>
            </TableRow>
        </TableBody>
        </Table>

        {/* </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        {/* <AlertDialogAction>Continue</AlertDialogAction> */}
        {/* </AlertDialogFooter>
    </AlertDialogContent>
    </AlertDialog> */}


</div>
  )
}

export default page

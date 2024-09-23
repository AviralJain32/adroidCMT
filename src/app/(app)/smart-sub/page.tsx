"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TableSmartSub from './TableSmartSub';
import { useGetAllAcceptedConferencesQuery } from '@/store/features/ConferenceApiSlice';
import Loader from '@/components/Loader';
import { IConference } from '@/model/Conference';

const SmartSubPage = () => {

  const { data, error, isLoading } = useGetAllAcceptedConferencesQuery();

  if(isLoading ){
    return <Loader/>
  }
  return (
    <div>
    {!error || !data ? <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">SmartSub</h1>
        <p className="text-lg text-gray-600 mt-4">
          Simplifying the process of publishing and finding calls for papers.
        </p>
      </div>

      {/* <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle>About SmartSub</CardTitle>
          <CardDescription>
            SmartSub is a powerful feature within Android CMT that enables
            conference organizers to effortlessly publish calls for papers. It
            allows authors to easily discover relevant calls, streamlining the
            submission process. Fully integrated with the Android CMT platform,
            SmartSub enhances the conference experience for both organizers and
            authors.
          </CardDescription>
        </CardHeader>
      </Card> */}

      <TableSmartSub conferences={data as IConference[]}/>
    </div>
  :
  <>Somthing went wrong</>
  }
  </div>
  )
}

export default SmartSubPage;

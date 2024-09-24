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
    {!error || !data ? <div className="container mx-auto py-12 min-h-[80vh]">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">SmartSub</h1>
        <p className="text-lg text-gray-600 mt-4">
          Simplifying the process of publishing and finding calls for papers.
        </p>
      </div>

      <TableSmartSub conferences={data as IConference[]}/>
    </div>
  :
  <>Somthing went wrong</>
  }
  </div>
  )
}

export default SmartSubPage;

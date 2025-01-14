// "use client";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import moment from 'moment'
// import { Badge } from '@/components/ui/badge'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { useGetOrganizedConferencesQuery } from '@/store/features/ConferenceApiSlice';
// import Loader from '@/components/Loader';
// import EditPopup from './EditPopup';
// import { useGetSubmittedPapersQuery } from '@/store/features/PaperApiSlice';
// import  EditConferencePopup  from "./EditConferencePopup";
// import { useState } from "react";
// import { Toggle } from "@/components/ui/toggle";
// import { PulseLoader } from "react-spinners";


// const OrganizedConferenceComponent=()=>{
//   const { data: organizedConferences, error: conferencesError, isLoading: loadingConferences } = useGetOrganizedConferencesQuery()

//   return (
//     <div className='flex justify-center'>
//     <Card className='w-full md:w-3/4 '>
//           <CardHeader>
//             <CardTitle>Organized Conferences</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Conference</TableHead>
//                   <TableHead>Role</TableHead>
//                   <TableHead>Created At</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {loadingConferences ? (
//                   <TableRow className="w-full justify-center items-center text-center ">
//                     <TableCell colSpan={3}><span className="">Loading <PulseLoader className="inline-block" size={6}/></span></TableCell>
//                   </TableRow>
//                 ) :organizedConferences && organizedConferences.length > 0 ? (
//                   organizedConferences.map((organizedConference:any) => (
                    
//                     <TableRow key={organizedConference._id}>
//                       <TableCell className="font-medium">{organizedConference.conferenceAcronym}</TableCell>
//                       <TableCell>{organizedConference.conferenceOrganizerRole}</TableCell>
//                       <TableCell>{moment(organizedConference.conferenceCreatedAt).calendar()}</TableCell>
//                       <TableCell><Link href={`/dashboard/${organizedConference.conferenceAcronym}`}><Button variant={'outline'}>Open</Button></Link></TableCell>
//                       <TableCell><EditConferencePopup conferenceDetails={organizedConference}/></TableCell>

//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={3}>No organized conferences found</TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//         </div>
//   )
// }

// const SubmittedPaperComponent=()=>{
//   const { data: submittedPapers, error: SubmittedPaperError, isLoading: loadingPapers } = useGetSubmittedPapersQuery()
//   return (
//     <div className='flex justify-center items-start'>
//     <Card className='w-full md:w-3/4'>
//           <CardHeader>
//             <CardTitle>Submitted Papers</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead >Paper Title</TableHead>
//                   <TableHead >Conference</TableHead>
//                   <TableHead>Submitted At</TableHead>
//                   <TableHead>Status</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {loadingPapers ? (
//                   <TableRow className="w-full justify-center items-center text-center ">
//                   <TableCell colSpan={3}><span className="">Loading <PulseLoader className="inline-block" size={6}/></span></TableCell>
//                 </TableRow>
//                 ) : submittedPapers && submittedPapers.length > 0 ? (
//                   submittedPapers.map((submittedPaper) => (
//                     <TableRow key={submittedPaper.paperTitle}>
//                       <TableCell className="font-medium">{submittedPaper.paperTitle}</TableCell>
//                       <TableCell className="font-medium">{submittedPaper.conference.conferenceAcronym}</TableCell>
//                       <TableCell>{moment(submittedPaper.paperSubmissionDate).calendar()}</TableCell>
//                       <TableCell>
//                          {(() => {
//                             switch (submittedPaper.paperStatus) {
//                               case "submitted":
//                                 return <Badge variant="submitted">Submitted</Badge>;
//                               case "accepted": 
//                                 return <Badge variant="accepted">Accepted</Badge>;
//                               case "rejected":
//                                 return <Badge variant="rejected">Rejected</Badge>;
//                               case "review":
//                                 return <Badge variant="review">Review</Badge>;
//                               default:
//                                 return <Badge variant="submitted">Submitted</Badge>;
//                             }
//                           })()}
//                       </TableCell>
//                       <TableCell><EditPopup {...submittedPaper}/></TableCell>
                      
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={3}>No submitted papers found</TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//         </div>
//   )
// }
// const Page: React.FC = () => {
//   const [showConferences, setShowConferences] = useState(true);

//   const handleToggle = () => {
//     setShowConferences((prev) => !prev);
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <div className="flex justify-around items-center mb-6">
//         <div className="w-14"></div>
//         <h1 className="text-4xl font-bold text-center text-gray-800">Dashboard</h1>
//         <div className="flex items-center gap-2">
//           {/* Your Toggle Button */}
//           <Toggle
//             aria-label="Toggle between organized conferences and submitted papers"
//             onClick={handleToggle}
//             className={`flex items-center px-4 py-2 bg-gray-200 rounded-lg cursor-pointer transition-colors duration-300
//               ${showConferences ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
//           >
//             {showConferences ? (
              
//               <span className="font-medium text-sm transition-opacity duration-300">Login as Author</span>
//             ) : (
//               <span className="font-medium text-sm transition-opacity duration-300">Login as Conference Chair</span>
//             )}
//           </Toggle>
//         </div>
//       </div>
//       <div className="min-h-screen">
//       {showConferences ? (
//         <OrganizedConferenceComponent />
//       ) : (
//         <SubmittedPaperComponent />
//       )}
//       </div>
//     </div>
//   );
// };


// export default Page;


"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useGetOrganizedConferencesQuery } from "@/store/features/ConferenceApiSlice";
import { useGetSubmittedPapersQuery } from "@/store/features/PaperApiSlice";
// import { useGetReviewedPapersQuery } from "@/store/features/ReviewerApiSlice"; // Add Reviewer API
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PulseLoader } from "react-spinners";
import ReviewedPapersComponent from "./(reviewSystem)/ReviewPaperComponent";
import { useSession } from "next-auth/react";

// Organized Conferences Component
const OrganizedConferenceComponent = () => {
  const { data: organizedConferences, isLoading } =
    useGetOrganizedConferencesQuery();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Organized Conferences</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Conference Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Conference Dates</TableHead>
              <TableHead>Submissions Deadline</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Loading <PulseLoader size={6} />
                </TableCell>
              </TableRow>
            ) : organizedConferences && organizedConferences?.length > 0 ? (
              organizedConferences.map((conference: any) => (
                <TableRow key={conference._id}>
                  <TableCell className="font-bold">
                    {conference.conferenceAcronym}
                  </TableCell>
                  <TableCell>{conference.conferenceOrganizerRole}</TableCell>
                  <TableCell>
                    {moment(conference.conferenceFirstDay).calendar()} to {moment(conference.conferenceLastDay).calendar()}
                  </TableCell>
                  <TableCell>
                    {moment(conference.conferenceSubmissionsDeadlineDate).calendar() }
                  </TableCell>
                  <TableCell>
                    {moment(conference.conferenceCreatedAt).calendar() }
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/dashboard/${conference.conferenceAcronym}`}
                      passHref
                    >
                      <Button variant="outline">Open</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No organized conferences found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

// Submitted Papers Component
const SubmittedPaperComponent = () => {
  const { data: submittedPapers, isLoading } = useGetSubmittedPapersQuery();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submitted Papers</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Paper Id</TableHead>
              <TableHead>Paper Title</TableHead>
              <TableHead>Conference</TableHead>
              <TableHead>Submitted At</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Loading <PulseLoader size={6} />
                </TableCell>
              </TableRow>
            ) : submittedPapers && submittedPapers?.length > 0 ? (
              submittedPapers.map((paper: any) => (
                
                <TableRow key={paper.paperTitle}>
                  <TableCell className="font-bold">
                    {paper.paperID}
                  </TableCell>
                  <TableCell className="font-medium">
                    {paper.paperTitle}
                  </TableCell>
                  <TableCell>{paper.conference.conferenceAcronym}</TableCell>
                  <TableCell>
                    {moment(paper.paperSubmissionDate).calendar()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={paper.paperStatus}>{paper.paperStatus}</Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No submitted papers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

// Main Page
const Page: React.FC = () => {
    const { data: session } = useSession()
    console.log(session)
  return (
    <div className="container mx-auto p-8">

{/* temp code */}
<div>
  <pre>{JSON.stringify(session, null, 2)}</pre>
</div>
{/* temp code */}


      <div className="flex flex-col items-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-8">
          Dashboard
        </h1>
        <p className="text-lg text-gray-600 mb-12 text-center">
          Manage your conferences, papers, and reviews seamlessly.
        </p>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <Tabs defaultValue="organized" className="w-full">
          <TabsList className="flex justify-center gap-6 mb-8">
            <TabsTrigger
              value="organized"
              className="px-6 py-3 text-lg font-semibold text-gray-700 hover:text-blue-500 transition-all border-b-2 border-transparent focus:border-blue-500"
            >
              Organized Conferences
            </TabsTrigger>
            <TabsTrigger
              value="submitted"
              className="px-6 py-3 text-lg font-semibold text-gray-700 hover:text-blue-500 transition-all border-b-2 border-transparent focus:border-blue-500"
            >
              Submitted Papers
            </TabsTrigger>
            <TabsTrigger
              value="reviewed"
              className="px-6 py-3 text-lg font-semibold text-gray-700 hover:text-blue-500 transition-all border-b-2 border-transparent focus:border-blue-500"
            >
              Reviewed Papers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="organized">
            <OrganizedConferenceComponent />
          </TabsContent>
          <TabsContent value="submitted">
            <SubmittedPaperComponent />
          </TabsContent>
          <TabsContent value="reviewed">
            <ReviewedPapersComponent />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;


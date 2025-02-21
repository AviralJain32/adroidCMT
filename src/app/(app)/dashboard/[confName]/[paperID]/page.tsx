// "use client";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import moment from "moment";
// import { useParams } from "next/navigation";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { CommentDialog } from "./CommentDialog";
// import { Review1Dialog } from "./Review1";
// // import { Review2Dialog } from "./Review2";
// import { useGetPaperDetailsByPaperIDQuery } from "@/store/features/ConferenceDashboardPaperSlice";
// import { toast } from "@/components/ui/use-toast";

// interface PaperDetails {
//   correspondingAuthor: AuthorDetails[];
//   paperTitle: string;
//   paperKeywords: string[];
//   paperAuthor: AuthorDetails[];
//   paperAbstract: string;
//   paperSubmissionDate: Date;
//   paperStatus: "submitted" | "accepted" | "rejected" | "review" | "outline" | null | undefined,
//   paperID: string;
//   paperFile: string;
//   paperReview1:string,
//   comment:string,
// }

// interface AuthorDetails {
//   fullname: string;
//   email: string;
//   country: string;
//   affilation: string;
//   webpage: string; // ye abhi dalega,
// }
// type params={
//   paperID:string
// }
// const Page = () => {
//   const params = useParams() as params;
//   // const [reviewerAndReviewRequestsDetails, setReviewerAndReviewRequestsDetails] = useState(null);

//   const {data:paperDetails,isLoading,error}=useGetPaperDetailsByPaperIDQuery(params.paperID)

//   // useEffect(()=>{
//   //   const fetchAllReviewerAndReviewRequestByPaperId=async()=>{
//   //     try {
//   //       const response=await axios.get(`/api/fetch-all-reviewer-and-review-request-by-paper-id?paperId=${params.paperID}`);
//   //       setReviewerAndReviewRequestsDetails(response.data.data);

//   //     } catch (error) {
//   //       console.error("Error fetching reviewerAndReviewRequestsDetails:", error);
//   //       toast({
//   //         title: "Error",
//   //         description: "Failed to fetch reviewer And Review Requests Details",
//   //         variant: "destructive",
//   //       });
//   //     }

//   //   }
//   //   fetchAllReviewerAndReviewRequestByPaperId()
//   // },[])

//   if(error){
//     return <div className="text-center py-10 text-red-400 text-lg">Sorry, An Unexpected Error has been occured</div>
//   }
//   if (isLoading) {
//     return <div className="text-center py-10">Loading...</div>;
//   }

//   if (!paperDetails) {
//     return <div className="text-center py-10">No paper details found.</div>;
//   }

//   const {
//     paperTitle,
//     paperKeywords,
//     paperAbstract,
//     paperSubmissionDate,
//     paperStatus,
//     paperAuthor,
//     correspondingAuthor,
//   } = paperDetails;

//   return (
//     <div className="container mx-auto p-6 bg-white rounded-lg">
//       <div className="shadow p-4">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-semibold">Paper Details</h1>
//           <div className="space-x-2">
//             <CommentDialog paperID={params.paperID as string} comment={paperDetails.comment} Authors={[...paperAuthor,...correspondingAuthor]}/>
//             <Review1Dialog paperID={params.paperID as string} Review1={paperDetails.paperReview1}/>
//             {/* <Review2Dialog paperID={params.paperID as string} Review1={paperDetails.paperReview1}/> */}
//           </div>
//         </div>
//         <Table className="min-w-full">
//           <TableBody>
//             <TableRow>
//               <TableHead>Title</TableHead>
//               <TableCell className="font-medium">{paperTitle}</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableHead>Author Keywords</TableHead>
//               <TableCell className="font-medium">
//                 {paperKeywords.map((keyword, index) => (
//                   <Badge className="m-1" key={index} variant="outline">
//                     {keyword}
//                   </Badge>
//                 ))}
//               </TableCell>
//             </TableRow>
//             <TableRow>
//               <TableHead>Abstract</TableHead>
//               <TableCell className="font-medium">{paperAbstract}</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableHead>Submitted</TableHead>
//               <TableCell className="font-medium">
//                 {moment(paperSubmissionDate).format("MMMM Do YYYY, h:mm:ss a")}
//               </TableCell>
//             </TableRow>
//             <TableRow>
//               <TableHead>Decision</TableHead>
//               <TableCell className="font-medium">
//                 <Badge variant={paperStatus}>
//                   {paperStatus && paperStatus.charAt(0).toUpperCase() + paperStatus.slice(1)}
//                 </Badge>
//               </TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </div>

//       <div className="shadow my-4 p-4">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-semibold">Author Details</h1>
//         </div>
//         <Table className="min-w-full">
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[200px]">Name</TableHead>
//               <TableHead>Email</TableHead>
//               <TableHead>Country</TableHead>
//               <TableHead>Affiliation</TableHead>
//               <TableHead>Webpage</TableHead>
//               <TableHead>Corresponding Author</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {paperAuthor.map((author: AuthorDetails, index: number) => (
//               <TableRow key={index}>
//                 <TableCell className="font-medium">{author.fullname}</TableCell>
//                 <TableCell>{author.email}</TableCell>
//                 <TableCell>{author.country}</TableCell>
//                 <TableCell>{author.affilation}</TableCell>
//                 <TableCell>
//                   <a
//                     href={author.webpage}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-500 underline"
//                   >
//                     {author.webpage}
//                   </a>
//                 </TableCell>
//               </TableRow>
//             ))}
//             {correspondingAuthor.map(
//               (corresponding: AuthorDetails, index: number) => (
//                 <TableRow key={index + paperAuthor.length}>
//                   <TableCell className="font-medium">
//                     {corresponding.fullname}{" "}

//                   </TableCell>
//                   <TableCell>{corresponding.email}</TableCell>
//                   <TableCell>{corresponding.country}</TableCell>
//                   <TableCell>{corresponding.affilation}</TableCell>
//                   <TableCell>
//                     <a
//                       href={corresponding.webpage}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-500 underline"
//                     >
//                       {corresponding.webpage}
//                     </a>
//                   </TableCell>
//                   <Badge className="mt-4 ml-4" variant="outline">
//                       Corresponding Author
//                   </Badge>
//                 </TableRow>
//               )
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default Page;

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
import { CommentDialog } from './CommentDialog';
import { Review1Dialog } from './Review1';
import { useGetPaperDetailsByPaperIDQuery } from '@/store/features/ConferenceDashboardPaperSlice';
import { toast } from '@/components/ui/use-toast';

interface PaperDetails {
  correspondingAuthor: AuthorDetails[];
  paperTitle: string;
  paperKeywords: string[];
  paperAuthor: AuthorDetails[];
  paperAbstract: string;
  paperSubmissionDate: Date;
  paperStatus:
    | 'submitted'
    | 'accepted'
    | 'rejected'
    | 'review'
    | 'outline'
    | null
    | undefined;
  paperID: string;
  paperFile: string;
  paperReview1: string;
  comment: string;
  reviewers: ReviewerDetails[];
  reviewRequests: ReviewRequestDetails[];
}

interface AuthorDetails {
  fullname: string;
  email: string;
  country: string;
  affilation: string;
  webpage: string;
}

interface ReviewerDetails {
  Id: { fullname: string; email: string };
  status: 'accepted' | 'review' | 'rejected';
  assignedAt: Date;
  reviewedAt?: Date;
  comments?: string;
}

interface ReviewRequestDetails {
  reviewerId: { fullname: string; email: string };
  status: 'pending' | 'accepted' | 'rejected';
  requestedAt: Date;
  resolvedAt?: Date;
}

type params = {
  paperID: string;
};

const Page = () => {
  const params = useParams() as params;

  const {
    data: paperDetails,
    isLoading,
    error,
  } = useGetPaperDetailsByPaperIDQuery(params.paperID);

  if (error) {
    return (
      <div className="text-center py-10 text-red-400 text-lg">
        Sorry, An Unexpected Error has been occurred.
      </div>
    );
  }
  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }
  if (!paperDetails) {
    return <div className="text-center py-10">No paper details found.</div>;
  }

  const {
    paperTitle,
    paperKeywords,
    paperAbstract,
    paperSubmissionDate,
    paperStatus,
    paperAuthor,
    correspondingAuthor,
    reviewers,
    reviewRequests,
  } = paperDetails;

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg">
      <div className="shadow p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Paper Details</h1>
          <div className="space-x-2">
            <CommentDialog
              paperID={params.paperID as string}
              comment={paperDetails.comment}
              Authors={[...paperAuthor, ...correspondingAuthor]}
            />
            <Review1Dialog
              paperID={params.paperID as string}
              Review1={paperDetails.paperReview1}
            />
          </div>
        </div>
        <Table className="min-w-full">
          <TableBody>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableCell className="font-medium">{paperTitle}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Author Keywords</TableHead>
              <TableCell className="font-medium">
                {paperKeywords.map((keyword, index) => (
                  <Badge className="m-1" key={index} variant="outline">
                    {keyword}
                  </Badge>
                ))}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Abstract</TableHead>
              <TableCell className="font-medium">{paperAbstract}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Submitted</TableHead>
              <TableCell className="font-medium">
                {moment(paperSubmissionDate).format('MMMM Do YYYY, h:mm:ss a')}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Decision</TableHead>
              <TableCell className="font-medium">
                <Badge variant={paperStatus}>
                  {paperStatus &&
                    paperStatus.charAt(0).toUpperCase() + paperStatus.slice(1)}
                </Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="shadow my-4 p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Author Details</h1>
        </div>
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Affiliation</TableHead>
              <TableHead>Webpage</TableHead>
              <TableHead>Corresponding Author</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paperAuthor.map((author: AuthorDetails, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{author.fullname}</TableCell>
                <TableCell>{author.email}</TableCell>
                <TableCell>{author.country}</TableCell>
                <TableCell>{author.affilation}</TableCell>
                <TableCell>
                  <a
                    href={author.webpage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {author.webpage}
                  </a>
                </TableCell>
              </TableRow>
            ))}
            {correspondingAuthor.map(
              (corresponding: AuthorDetails, index: number) => (
                <TableRow key={index + paperAuthor.length}>
                  <TableCell className="font-medium">
                    {corresponding.fullname}{' '}
                  </TableCell>
                  <TableCell>{corresponding.email}</TableCell>
                  <TableCell>{corresponding.country}</TableCell>
                  <TableCell>{corresponding.affilation}</TableCell>
                  <TableCell>
                    <a
                      href={corresponding.webpage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      {corresponding.webpage}
                    </a>
                  </TableCell>
                  <Badge className="mt-4 ml-4" variant="outline">
                    Corresponding Author
                  </Badge>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </div>

      <div className="shadow my-4 p-4">
        <h1 className="text-2xl font-semibold mb-4">Reviewer Details</h1>
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Reviewer Name</TableHead>
              <TableHead>Reviewer Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned At</TableHead>
              <TableHead>Reviewed At</TableHead>
              <TableHead>Comments</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviewers.map((reviewer, index) => (
              <TableRow key={index}>
                <TableCell>{reviewer.Id.fullname}</TableCell>
                <TableCell>{reviewer.Id.email}</TableCell>
                <TableCell>
                  <Badge variant={reviewer.status}>
                    {reviewer.status.charAt(0).toUpperCase() +
                      reviewer.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  {moment(reviewer.assignedAt).format(
                    'MMMM Do YYYY, h:mm:ss a',
                  )}
                </TableCell>
                <TableCell>
                  {reviewer.reviewedAt
                    ? moment(reviewer.reviewedAt).format(
                        'MMMM Do YYYY, h:mm:ss a',
                      )
                    : 'Not Reviewed'}
                </TableCell>
                <TableCell>{reviewer.comments || 'No Comments'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="shadow my-4 p-4">
        <h1 className="text-2xl font-semibold mb-4">Review Requests</h1>
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Requested By</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Requested At</TableHead>
              <TableHead>Resolved At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviewRequests.map((request, index) => (
              <TableRow key={index}>
                <TableCell>{request.reviewerId.fullname}</TableCell>
                <TableCell>{request.reviewerId.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      request.status === 'pending'
                        ? 'submitted'
                        : request.status
                    }
                  >
                    {request.status.charAt(0).toUpperCase() +
                      request.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  {moment(request.requestedAt).format(
                    'MMMM Do YYYY, h:mm:ss a',
                  )}
                </TableCell>
                <TableCell>
                  {request.resolvedAt
                    ? moment(request.resolvedAt).format(
                        'MMMM Do YYYY, h:mm:ss a',
                      )
                    : 'Not Resolved'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;

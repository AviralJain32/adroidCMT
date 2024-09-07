
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
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { CommentDialog } from "./CommentDialog";
import { Review1Dialog } from "./Review1";
import { Review2Dialog } from "./Review2";

interface PaperDetails {
  correspondingAuthor: AuthorDetails[];
  paperTitle: string;
  paperKeywords: string[];
  paperAuthor: AuthorDetails[];
  paperAbstract: string;
  paperSubmissionDate: Date;
  paperStatus: string;
  paperID: string;
  paperFile: string;
  paperReview1:string,
  comment:string,
}

interface AuthorDetails {
  fullname: string;
  email: string;
  country: string;
  affilation: string;
  webpage: string; // ye abhi dalega,
}

const Page = () => {
  const params = useParams();
  const [loadingPaper, setLoadingPaper] = useState(true);
  const [paperDetails, setPaperDetails] = useState<PaperDetails | null>(null);

  useEffect(() => {
    const loadPaperDetails = async () => {
      setLoadingPaper(true);
      try {
        const response = await axios.get(
          `/api/get-paper-details-by-paper-id?paperID=${params.paperID}`
        );
        setPaperDetails(response.data.data);
      } catch (error) {
        console.error("Error loading paper details:", error);
      } finally {
        setLoadingPaper(false);
      }
    };
    loadPaperDetails();
  }, [params.paperID]);

  if (loadingPaper) {
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
  } = paperDetails;

  console.log(params)

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg">
      <div className="shadow p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Paper Details</h1>
          <div className="space-x-2">
            <CommentDialog paperID={params.paperID as string} comment={paperDetails.comment} Authors={[...paperAuthor,...correspondingAuthor]}/>
            <Review1Dialog paperID={params.paperID as string} Review1={paperDetails.paperReview1}/>
            <Review2Dialog paperID={params.paperID as string} Review1={paperDetails.paperReview1}/>
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
                {moment(paperSubmissionDate).format("MMMM Do YYYY, h:mm:ss a")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Decision</TableHead>
              <TableCell className="font-medium">
                <Badge variant={paperStatus}>
                  {paperStatus.charAt(0).toUpperCase() + paperStatus.slice(1)}
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
                    {corresponding.fullname}{" "}
                    
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
              )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;

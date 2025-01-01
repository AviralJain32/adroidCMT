"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import moment from "moment";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { Download } from "lucide-react";
import { useGetPaperDetailsByPaperIDQuery } from "@/store/features/ConferenceDashboardPaperSlice";

interface PaperDetails {
  correspondingAuthor: AuthorDetails[];
  paperTitle: string;
  paperKeywords: string[];
  paperAuthor: AuthorDetails[];
  paperAbstract: string;
  paperSubmissionDate: Date;
  paperStatus:
    | "submitted"
    | "accepted"
    | "rejected"
    | "review"
    | "outline"
    | null
    | undefined;
  paperID: string;
  paperFile: string;
  comment: string;
}

interface AuthorDetails {
  fullname: string;
  email: string;
  country: string;
  affilation: string;
  webpage: string;
}

type params = {
  paperId: string;
};

const DownloadFile = (file: string) => {
  try {
    fetch(file)
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        const nameSplit = file.split("/").pop();
        a.download = nameSplit ?? "download";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) =>
        console.log("Error while downloading the file", error.message)
      );
  } catch (error: any) {
    console.log("Error while downloading the file", error.message);
  }
};

const Page = () => {
  const params = useParams() as params;
  const searchParams=useSearchParams();
  const { data: paperDetails, isLoading, error } =
    useGetPaperDetailsByPaperIDQuery(params.paperId);
    const reviewerId=searchParams.get("reviewer");

  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim()) {
      alert("Comment cannot be empty");
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.patch(`/api/add-review-comment?reviewerId=${reviewerId}&paperId=${params.paperId}`, {
        comment,
      });
      alert("Comment submitted successfully!");
      setComment("");
    } catch (err) {
      console.error("Error submitting comment:", err);
      alert("Failed to submit comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) {
    return (
      <div className="text-center py-10 text-red-400 text-lg">
        Sorry, an unexpected error has occurred.
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
    paperFile,
  } = paperDetails;

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg">
      <div className="grid md:grid-cols-2 gap-5">
      <div className="shadow p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Paper Details</h1>
          <div className="space-x-2">
            <Button
              variant="ghost"
              onClick={() => DownloadFile(paperFile)}
              className="flex items-center"
            >
              <Download className="mr-2" />
              Download Paper
            </Button>
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
                {moment(paperSubmissionDate).format(
                  "MMMM Do YYYY, h:mm:ss a"
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Decision</TableHead>
              <TableCell className="font-medium">
                <Badge variant={paperStatus}>
                  {paperStatus &&
                    paperStatus.charAt(0).toUpperCase() +
                      paperStatus.slice(1)}
                </Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="shadow my-4 p-4">
        <h1 className="text-2xl font-semibold mb-6">Add Your Comment</h1>
        <Textarea
          placeholder="Write your comment here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mb-4"
          
        />
        <div className="flex justify-center w-full"> 
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="right bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isSubmitting ? "Submitting..." : "Submit Comment"}
        </Button>
        </div>
      </div>

      </div>

      <div className="shadow my-4 p-4">
        <h1 className="text-2xl font-semibold mb-6">Author Details</h1>
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Affiliation</TableHead>
              <TableHead>Webpage</TableHead>
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
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
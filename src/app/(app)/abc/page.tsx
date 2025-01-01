
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
import { useParams, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { useGetPaperDetailsByPaperIDQuery } from "@/store/features/ConferenceDashboardPaperSlice";

interface PaperDetails {
  correspondingAuthor: AuthorDetails[];
  paperTitle: string;
  paperKeywords: string[];
  paperAuthor: AuthorDetails[];
  paperAbstract: string;
  paperSubmissionDate: Date;
  paperStatus: "submitted" | "accepted" | "rejected" | "review" | "outline" | null | undefined,
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
type params={
  paperID:string
}
const Page = () => {
  const params = useSearchParams();
  const paperId=String(params.get("paperId"));
  // const [paperDetails, setPaperDetails] = useState<PaperDetails | null>(null);
  const {data:paperDetails,isLoading,error}=useGetPaperDetailsByPaperIDQuery(paperId)
  console.log(error)
  if(error){
    return <div className="text-center py-10 text-red-400 text-lg">Sorry, An Unexpected Error has been occured</div>
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
  } = paperDetails;


  return (
    <div className="container mx-auto p-6 bg-white rounded-lg">
      <div className="shadow p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Paper Details</h1>
          <div className="space-x-2">
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
                  {paperStatus && paperStatus.charAt(0).toUpperCase() + paperStatus.slice(1)}
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

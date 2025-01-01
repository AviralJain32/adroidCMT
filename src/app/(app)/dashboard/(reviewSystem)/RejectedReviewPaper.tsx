import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Button } from "@/components/ui/button";
  import { format } from "date-fns";
  import { useEffect, useState } from "react";
  import axios from "axios";
  import { toast } from "@/components/ui/use-toast"; // Adjust based on your toast implementation
  
  interface User {
    _id: string;
    fullname: string;
    email: string;
  }
  
  interface ReviewRequest {
    reviewerId: { _id: string };
    requestedBy: User;
    requestedAt: string; // ISO Date string
    status: string; // "pending", "accepted", or "rejected"
  }
  
  interface Paper {
    paperId: string;
    paperTitle: string;
    reviewRequests: ReviewRequest[];
  }
  
  const RejectedReviewRequestTable = () => {
    const [requests, setRequests] = useState<Paper[] | null>(null);
    const [loading, setLoading] = useState(false);
  
    const fetchRejectedReviewRequests = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/fetch-rejected-review-request");
        setRequests(response.data.requests);
      } catch (error) {
        console.error("Error fetching review requests:", error);
        toast({
          title: "Error",
          description: "Failed to fetch rejected review requests.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchRejectedReviewRequests();
    }, []);
  
    if (loading) {
      return <p className="text-center text-gray-500">Loading...</p>;
    }
  
    if (!requests || requests.length === 0) {
      return <p className="text-center text-gray-500">No rejected review requests available.</p>;
    }
  
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Paper Title</TableHead>
            <TableHead>Reviewer</TableHead>
            <TableHead>Requested By</TableHead>
            <TableHead>Requested At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((paper) =>
            paper.reviewRequests
              .filter((request) => request.status === "rejected")
              .map((request) => (
                <TableRow key={`${paper.paperId}-${request.reviewerId._id}`}>
                  <TableCell>{paper.paperTitle}</TableCell>
                  <TableCell>{request.reviewerId?._id || "N/A"}</TableCell>
                  <TableCell>
                    {request.requestedBy.fullname} ({request.requestedBy.email})
                  </TableCell>
                  <TableCell>
                    {request.requestedAt
                      ? format(new Date(request.requestedAt), "dd MMM yyyy, hh:mm a")
                      : "N/A"}
                  </TableCell>
                </TableRow>
              ))
          )}
        </TableBody>
      </Table>
    );
  };
  
  export default RejectedReviewRequestTable;
  
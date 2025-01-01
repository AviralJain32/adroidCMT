"use client";

import { PulseLoader } from "react-spinners";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import ReviewRequestTable from "./RequestsReviewPaper";
import AcceptedPapersTable from "./AcceptedReviewPaper";
import RejectedReviewRequestTable from "./RejectedReviewPaper";

const ReviewedPapersComponent = () => {
  const [isReviewer, setIsReviewer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchReviewerStatus = async () => {
      try {
        const response = await axios.get("/api/get-reviewer-status");
        setIsReviewer(response.data.isReviewer);
      } catch (error) {
        console.error("Error fetching reviewer status:", error);
        toast({
          title: "Error",
          description: "Failed to fetch reviewer status.",
          variant: "destructive",
        });
      }
    };

    fetchReviewerStatus();
  }, []);

  const handleSwitchChange = async (value: boolean) => {
    setIsReviewer(value);

    try {
      await axios.post("/api/update-reviewer-status", {
        isReviewer: value,
      });
      toast({
        title: "Success",
        description: `Reviewer status updated to ${value ? "Enabled" : "Disabled"}.`,
        variant: "default",
      });
    } catch (error) {
      console.error("Error updating reviewer status:", error);
      toast({
        title: "Error",
        description: "Failed to update reviewer status.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (isReviewer) {
      fetchReviewRequests();
    }
  }, [isReviewer]);

  const fetchReviewRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/get-review-requests");
      setRequests(response.data.requests);
    } catch (error) {
      console.error("Error fetching review requests:", error);
      toast({
        title: "Error",
        description: "Failed to fetch review requests.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (
    reviewerId: string,
    action: "accept" | "reject",
    paperId: string
  ): Promise<void> => {
    try {
      const response = await axios.post(
        `/api/review-requests-action?action=${action}&paperId=${paperId}&reviewerId=${reviewerId}`
      );

      const { success, message } = response.data;

      toast({
        title: success ? "Success" : "Notice",
        description: message || `Request has been ${action === "accept" ? "accepted" : "rejected"}.`,
        variant: success ? "default" : "destructive",
      });

      if (success) {
        fetchReviewRequests();
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to process the request due to an unexpected error.";

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6  rounded-lg ">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="reviewer-status" className="text-lg font-semibold">
            Reviewer Status
          </Label>
          <Switch
            id="reviewer-status"
            checked={isReviewer}
            onCheckedChange={handleSwitchChange}
            className="transition-all"
          />
        </div>
        <p className="text-gray-600 mt-1">
          {isReviewer
            ? "You are currently a reviewer. Toggle off to disable."
            : "You are not a reviewer. Toggle on to enable."}
        </p>
      </div>
      <Tabs defaultValue="requests" className="w-full">
        <TabsList className="mb-4 flex justify-center space-x-4">
          <TabsTrigger value="requests" className="flex-1 text-center">
            Incoming Requests
          </TabsTrigger>
          <TabsTrigger value="accepted" className="flex-1 text-center">
            Accepted
          </TabsTrigger>
          <TabsTrigger value="rejected" className="flex-1 text-center">
            Rejected
          </TabsTrigger>
        </TabsList>
        <TabsContent value="requests" className="rounded-lg p-4 bg-white shadow-md">
          {loading ? (
            <div className="flex justify-center items-center py-4">
              <PulseLoader size={10} color="#4A90E2" />
            </div>
          ) : requests && requests.length === 0 ? (
            <p className="text-center text-gray-500">No pending review requests.</p>
          ) : (
            <ReviewRequestTable requests={requests} handleAction={handleAction} />
          )}
        </TabsContent>
        <TabsContent value="accepted" className="rounded-lg p-4 bg-white shadow-md">
          <AcceptedPapersTable />
        </TabsContent>
        <TabsContent value="rejected" className="rounded-lg p-4 bg-white shadow-md">
          <RejectedReviewRequestTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReviewedPapersComponent;

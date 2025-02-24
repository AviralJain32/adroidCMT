"use client"
import React, { useEffect, useState } from "react";
import { ConferenceMeetingSchedule } from "../ConferenceMeetingSchedule";
import { useParams } from "next/navigation";
import axios from "axios";
import { useConferenceSocket } from "@/context/VideoCallConferenceContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Meeting {
  meeting_id: string;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  room_id:string
  join_link: string;
  status: "Scheduled" | "Ongoing" | "Completed" | "Cancelled";
}

const MeetingPage = () => {
  const params = useParams<{ conferenceAcronym: string }>();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const {socket} = useConferenceSocket();

  const initRoom=(roomId:string)=>{
    console.log(socket)
    console.log("Room is created in the backend")
    socket?.emit("create-room",{roomId:roomId})
}

  const fetchMeetings = async () => {
    // ${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1
    try {
      const response = await axios.get(
        `/api/meetings/getAllScheduledMeetings?confAcronym=${params.conferenceAcronym}`
      );
      setMeetings(response.data.meetings);
    } catch (err: any) {
      setError("Failed to fetch meetings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, [params]);

  console.log(meetings)

  return (
    <div className="container mx-auto min-h-[80vh] p-6">
      <h1 className="text-2xl font-bold text-center">
        Scheduled Meetings for {params.conferenceAcronym}
      </h1>
      <ConferenceMeetingSchedule confAcronym={params.conferenceAcronym}/>


      {loading ? (
        <p className="text-center mt-4">Loading meetings...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) :meetings && meetings.length !== 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {meetings && meetings.map((meeting) => (
            <div
              key={meeting.meeting_id}
              className="bg-white p-4 rounded-xl shadow-md border border-gray-200"
            >
              <h2 className="text-lg font-semibold">{meeting.title}</h2>
              {meeting.description && (
                <p className="text-sm text-gray-600 mt-2">{meeting.description}</p>
              )}
              <p className="text-sm mt-2">
                <strong>Start:</strong> {new Date(meeting.start_time).toLocaleString()}
              </p>
              <p className="text-sm">
                <strong>End:</strong> {new Date(meeting.end_time).toLocaleString()}
              </p>
              <p className={`mt-2 font-semibold ${
                meeting.status === "Scheduled"
                  ? "text-blue-500"
                  : meeting.status === "Ongoing"
                  ? "text-green-500"
                  : "text-gray-500"
              }`}>
                Status: {meeting.status}
              </p>
              <Button
                onClick={() => {
                  initRoom(meeting.room_id);
                  window.open(meeting.join_link, "_blank", "noopener,noreferrer");
                }}
                className="block mt-4 bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition"
              >
                Join Meeting
              </Button>
            </div>
          ))}
        </div>
      ) :
        <p className="text-center mt-4">No meetings scheduled.</p>
      }

    </div>
  );
};

export default MeetingPage;

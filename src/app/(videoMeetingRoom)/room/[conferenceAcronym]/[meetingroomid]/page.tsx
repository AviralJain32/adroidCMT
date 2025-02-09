"use client"

import { useConferenceSocket } from "@/context/VideoCallConferenceContext";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const { socket, user, stream, peers} = useConferenceSocket();
  const params=useParams()
  const id=params.meetingroomid

  const fetchParticipantsList=({roomId,participants}:{roomId:string,participants:string[]})=>{
    console.log("fetched room paricipants");
    console.log(roomId,participants)

}

  useEffect(()=>{ 
    //emitting this event so that either creator of the room or joinee in the room
    //anyone is added the server knows that people have been added to this room

    // if(user) socket?.emit("joined-room",{roomId:id,peerId:user._id});

    // socket.on("get-users",fetchParticipantsList);
},[id,user,socket])

  return (
    <div>
      {/* <h2>My Video</h2>
      {stream && <video srcObject={stream} autoPlay muted />}
      <h2>Peers</h2>
      {Object.keys(peers).map((peerId) => (
        <video key={peerId} srcObject={peers[peerId]} autoPlay />
      ))} */}
    </div>
  );
};

export default Page

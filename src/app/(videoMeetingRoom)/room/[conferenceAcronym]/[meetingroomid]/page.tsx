"use client"

import UserFeedPlayer from "@/components/UserFeedPlayer";
import { useConferenceSocket } from "@/context/VideoCallConferenceContext";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import { v4 as UUIDv4 } from "uuid";
 

const Page = () => {

  const { socket} = useConferenceSocket();
  // i am thing this thing will work

  const peerRef = useRef<Peer | null>(null);
  const [user, setUser] = useState<Peer | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [peers, setPeers] = useState<{ [peerId: string]: MediaStream }>({});
  
    useEffect(()=>{
      const userId = UUIDv4();

    if (!peerRef.current) {
      const newPeer = new Peer(userId, {
        host: "localhost",
        port: 9000,
        path: "/myapp",
      });
      console.log(newPeer)

      peerRef.current = newPeer;
      setUser(newPeer);
    }

    // Get user media
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((userStream) => {
      setStream(userStream);
    });

    return () => {
      // Do not disconnect global socket to avoid reconnects elsewhere
      if (peerRef.current) {
        peerRef.current.destroy();
        peerRef.current = null;
      }
      setUser(null);
      setStream(null);
      setPeers({});
    };
    },[])

    useEffect(() => {
      if (!peerRef.current || !stream) return;
  
      socket?.on("user-joined", ({ peerId }) => {
          console.log(`🔵 User joined: ${peerId}`);
  
          const call = peerRef.current!.call(peerId, stream);
          
          call?.on("stream", (peerStream) => {
              console.log(`🔴 Receiving stream from ${peerId}`);
              setPeers((prev) => ({ ...prev, [peerId]: peerStream }));
          });
  
          call?.on("close", () => {
              console.log(`🛑 Call with ${peerId} closed`);
              setPeers((prev) => {
                  const updatedPeers = { ...prev };
                  delete updatedPeers[peerId];
                  return updatedPeers;
              });
          });
      });
  
      peerRef.current.on("call", (call) => {
          console.log(`📞 Incoming call from ${call.peer}`);
          call.answer(stream); // Answer the call with the user's stream
  
          call.on("stream", (peerStream) => {
              console.log(`✅ Receiving peer stream from ${call.peer}`);
              setPeers((prev) => ({ ...prev, [call.peer]: peerStream }));
          });
  
          call.on("close", () => {
              console.log(`🛑 Call with ${call.peer} closed`);
              setPeers((prev) => {
                  const updatedPeers = { ...prev };
                  delete updatedPeers[call.peer];
                  return updatedPeers;
              });
          });
      });
  
      socket?.emit("ready");
  }, [stream]);

  // *************************









  const params = useParams();
  const id = params.meetingroomid;
  const { data: session, status } = useSession(); // Get session status

  const fetchParticipantsList = ({ roomId, participants }: { roomId: string; participants: string[] }) => {
    console.log("Fetched room participants:");
    console.log(roomId, participants);
  };

  useEffect(() => { 
    if (status === "loading") return; // Wait until session is fully loaded
    if (!session || !user) return; // Ensure both session and user are available

    socket?.emit("joined-room", { roomId: id, peerId: user.id, userId: session.user._id });
    socket?.on("get-users", fetchParticipantsList);

    return () => {
      socket?.off("get-users", fetchParticipantsList);
    };
  }, [id, user, session, status, socket]); // Include status in dependencies

  console.log("ye peers hai",peers)

  return (
    <div>
      <div>
            room:{id}
            Your Own User Feed
            <UserFeedPlayer stream={stream}/>

            <div>
                Other Users Feed
                {Object.keys(peers).map((peerId)=>(
                    <>
                        <UserFeedPlayer key={peerId} stream={peers[peerId]} />
                    </>
                ))}
            </div>
        </div>
    </div>
  );
};

export default Page;



















// "use client"

// import UserFeedPlayer from "@/components/UserFeedPlayer";
// import { useConferenceSocket } from "@/context/VideoCallConferenceContext";
// import { useSession } from "next-auth/react";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import Peer from "peerjs";


// const Page = () => {



//   // i am thing this thing will work
//   const [user, setUser] = useState<Peer | null>(null);
//     const [stream, setStream] = useState<MediaStream | null>(null);
//     const [peers, setPeers] = useState<{ [peerId: string]: MediaStream }>({});
  

//   // *************************















//   const { socket, user, stream, peers } = useConferenceSocket();
//   const params = useParams();
//   const id = params.meetingroomid;
//   const { data: session, status } = useSession(); // Get session status

//   const fetchParticipantsList = ({ roomId, participants }: { roomId: string; participants: string[] }) => {
//     console.log("Fetched room participants:");
//     console.log(roomId, participants);
//   };

//   useEffect(() => { 
//     if (status === "loading") return; // Wait until session is fully loaded
//     if (!session || !user) return; // Ensure both session and user are available

//     socket?.emit("joined-room", { roomId: id, peerId: user.id, userId: session.user._id });
//     socket?.on("get-users", fetchParticipantsList);

//     return () => {
//       socket?.off("get-users", fetchParticipantsList);
//     };
//   }, [id, user, session, status, socket]); // Include status in dependencies

//   console.log("ye peers hai",peers)

//   return (
//     <div>
//       <div>
//             room:{id}
//             Your Own User Feed
//             <UserFeedPlayer stream={stream}/>

//             <div>
//                 Other Users Feed
//                 {Object.keys(peers).map((peerId)=>(
//                     <>
//                         <UserFeedPlayer key={peerId} stream={peers[peerId]} />
//                     </>
//                 ))}
//             </div>
//         </div>
//     </div>
//   );
// };

// export default Page;

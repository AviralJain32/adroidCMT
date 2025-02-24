// "use client";
// import { createContext, useContext, useEffect, useRef, useState } from "react";
// import { io, Socket } from "socket.io-client";
// import Peer from "peerjs";
// import { v4 as UUIDv4 } from "uuid";
// import { useSession } from "next-auth/react";

// const WS_Server = "http://localhost:5000";

// // Global socket instance to prevent multiple connections
// let globalSocket: Socket | null = null;

// // Context Type
// interface SocketContextType {
//   socket: Socket;
//   user: Peer | null;
//   stream: MediaStream | null;
//   peers: { [peerId: string]: MediaStream };
// }

// // Create Context
// const ConferenceSocketContext = createContext<SocketContextType | null>(null);

// // Hook for consuming context
// export const useConferenceSocket = () => {
//   const context = useContext(ConferenceSocketContext);
//   if (!context) throw new Error("useConferenceSocket must be used within ConferenceSocketProvider");
//   return context;
// };

// // Provider Component (Only Active Inside Conference)
// export const ConferenceSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<Peer | null>(null);
//   const [stream, setStream] = useState<MediaStream | null>(null);
//   const [peers, setPeers] = useState<{ [peerId: string]: MediaStream }>({});

//   const socket = useRef<Socket | null>(null);
//   const peerRef = useRef<Peer | null>(null);


//   const initialize = async () => {
//     // Ensure only one socket connection exists
//     if (!globalSocket) {
//       globalSocket = io(WS_Server);
//       console.log("🔵 New Socket Connection Established");
//     } else {
//       console.log("🟢 Using Existing Socket Connection");
//     }
//     socket.current = globalSocket;

//     const userId = UUIDv4();

//     if (!peerRef.current) {
//       const newPeer = new Peer(userId, {
//         host: "localhost",
//         port: 9000,
//         path: "/myapp",
//       });
//       console.log(newPeer)

//       peerRef.current = newPeer;
//       setUser(newPeer);
//     }

//     // Get user media
//     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((userStream) => {
//       setStream(userStream);
//     });
//   };

//   useEffect(() => {
//     initialize();

//     return () => {
//       // Do not disconnect global socket to avoid reconnects elsewhere
//       if (peerRef.current) {
//         peerRef.current.destroy();
//         peerRef.current = null;
//       }
//       setUser(null);
//       setStream(null);
//       setPeers({});
//     };
//   }, []);

//   useEffect(() => {
//     if (!peerRef.current || !stream) return;

//     socket.current?.on("user-joined", ({ peerId }) => {
//         console.log(`🔵 User joined: ${peerId}`);

//         const call = peerRef.current!.call(peerId, stream);
        
//         call?.on("stream", (peerStream) => {
//             console.log(`🔴 Receiving stream from ${peerId}`);
//             setPeers((prev) => ({ ...prev, [peerId]: peerStream }));
//         });

//         call?.on("close", () => {
//             console.log(`🛑 Call with ${peerId} closed`);
//             setPeers((prev) => {
//                 const updatedPeers = { ...prev };
//                 delete updatedPeers[peerId];
//                 return updatedPeers;
//             });
//         });
//     });

//     peerRef.current.on("call", (call) => {
//         console.log(`📞 Incoming call from ${call.peer}`);
//         call.answer(stream); // Answer the call with the user's stream

//         call.on("stream", (peerStream) => {
//             console.log(`✅ Receiving peer stream from ${call.peer}`);
//             setPeers((prev) => ({ ...prev, [call.peer]: peerStream }));
//         });

//         call.on("close", () => {
//             console.log(`🛑 Call with ${call.peer} closed`);
//             setPeers((prev) => {
//                 const updatedPeers = { ...prev };
//                 delete updatedPeers[call.peer];
//                 return updatedPeers;
//             });
//         });
//     });

//     socket.current?.emit("ready");
// }, [stream]);


//   return (
//     <ConferenceSocketContext.Provider value={{ socket: globalSocket!, user, stream, peers }}>
//       {children}
//     </ConferenceSocketContext.Provider>
//   );
// };
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const WS_Server = "http://localhost:5000";

// Global socket instance to prevent multiple connections
let globalSocket: Socket | null = null;

// Context Type
interface SocketContextType {
  socket: Socket | null;
}

// Create Context
const ConferenceSocketContext = createContext<SocketContextType | null>(null);

// Hook for consuming context
export const useConferenceSocket = () => {
  const context = useContext(ConferenceSocketContext);
  if (!context) throw new Error("useConferenceSocket must be used within ConferenceSocketProvider");
  return context;
};

// Provider Component
export const ConferenceSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!globalSocket) {
      globalSocket = io(WS_Server);
      console.log("🔵 New Socket Connection Established", globalSocket);
    } else {
      console.log("🟢 Using Existing Socket Connection", globalSocket);
    }

    setSocket(globalSocket);
  }, []);


  return (
    <ConferenceSocketContext.Provider value={{ socket }}>
      {children}
    </ConferenceSocketContext.Provider>
  );
};

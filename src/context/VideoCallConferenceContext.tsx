"use client"
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import Peer from "peerjs";
import { v4 as UUIDv4 } from "uuid";

const WS_Server = "http://localhost:5500";

// Context Type
interface SocketContextType {
  socket: Socket;
  user: Peer | null;
  stream: MediaStream | null;
  peers: { [peerId: string]: MediaStream };
}

// Create Context
const ConferenceSocketContext = createContext<SocketContextType | null>(null);

// Hook for consuming context
export const useConferenceSocket = () => {
  const context = useContext(ConferenceSocketContext);
  if (!context) throw new Error("useConferenceSocket must be used within ConferenceSocketProvider");
  return context;
};

// Provider Component (Only Active Inside Conference)
export const ConferenceSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Peer | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [peers, setPeers] = useState<{ [peerId: string]: MediaStream }>({});

  const socket = useRef<Socket | null>(null);
  const peerRef = useRef<Peer | null>(null);

  useEffect(() => {
    // Initialize only when the conference starts
    socket.current = io(WS_Server);
    const userId = UUIDv4();

    const newPeer = new Peer(userId, {
      host: "localhost",
      port: 9000,
      path: "/myapp",
    });

    peerRef.current = newPeer;
    setUser(newPeer);

    // Get user media
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((userStream) => {
      setStream(userStream);
    });

    return () => {
      // Clean up socket and peer connection when leaving the conference
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
      }
      if (peerRef.current) {
        peerRef.current.destroy();
        peerRef.current = null;
      }
      setUser(null);
      setStream(null);
      setPeers({});
    };
  }, []);

  useEffect(() => {
    if (!peerRef.current || !stream) return;

    socket.current?.on("user-joined", ({ peerId }) => {
      const call = peerRef.current!.call(peerId, stream);
      call.on("stream", (peerStream) => {
        setPeers((prev) => ({ ...prev, [peerId]: peerStream }));
      });
    });

    peerRef.current.on("call", (call) => {
      call.answer(stream);
      call.on("stream", (peerStream) => {
        setPeers((prev) => ({ ...prev, [call.peer]: peerStream }));
      });
    });

    socket.current?.emit("ready");
  }, [stream]);

  return (
    <ConferenceSocketContext.Provider value={{ socket: socket.current!, user, stream, peers }}>
      {children}
    </ConferenceSocketContext.Provider>
  );
};

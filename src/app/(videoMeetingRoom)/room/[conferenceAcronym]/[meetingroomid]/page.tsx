"use client"

import { useConferenceSocket } from "@/context/VideoCallConferenceContext";

const page = () => {
  const { stream, peers } = useConferenceSocket();

  return (
    <div>
      <h2>My Video</h2>
      {stream && <video srcObject={stream} autoPlay muted />}
      <h2>Peers</h2>
      {Object.keys(peers).map((peerId) => (
        <video key={peerId} srcObject={peers[peerId]} autoPlay />
      ))}
    </div>
  );
};

export default page

import Navbar from "@/components/Navbar";
import { ConferenceSocketProvider } from "@/context/VideoCallConferenceContext";

const ConferencePage = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    console.log("in the layout")
  return (
    <>
      {/* <body> */}
      <Navbar />
      {children}
    {/* </body> */}
    </>
  );
};

export default ConferencePage;
import { useEffect, useRef } from "react"

const UserFeedPlayer:React.FC<{stream:MediaStream | undefined}>=({stream})=>{
    const videoRef=useRef<HTMLVideoElement>(null)
    //chunk by chunk aati hai video thats why everytime chunk changes we attach the stream by useref
    useEffect(()=>{
        if(videoRef.current && stream){
            videoRef.current.srcObject=stream
        }
    })
    return(
        <video
            ref={videoRef}
            style={{width:'300px',height:"200px"}}
            muted={true}
            autoPlay
        />
    )
}
export default UserFeedPlayer
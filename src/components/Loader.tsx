import React from 'react'
import {ClipLoader} from "react-spinners"
const Loader = () => {
  return (
    <div className='min-h-screen min-w-full flex justify-center items-center'>
      <ClipLoader
  color="#007cf7"
  size={50}
  speedMultiplier={2}
/>
    </div>
  )
}

export default Loader

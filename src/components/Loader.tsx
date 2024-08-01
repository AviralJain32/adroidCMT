import React from 'react'

const Loader = () => {
  return (
    <div>
      <Watch
        visible={true}
        height="80"
        width="80"
        radius="48"
        color="#4fa94d"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClass=""
        />
    </div>
  )
}

export default Loader

import React from 'react'

const Status = ({isLoading, isError}) => {
  return (<>
    {isLoading && <p>loading</p>}
    {isError && <p>an error has occurred</p>}
    </>
  )
}

export default Status
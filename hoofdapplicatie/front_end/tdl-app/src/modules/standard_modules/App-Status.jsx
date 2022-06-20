import React from 'react'

const Status = ({isLoading, isError}) => {
  return (<>
    {isLoading && <div className="loadingholder"><div className="loadingholder__imgholder"><span className="loadingholder__imgholder__text">Loading...</span><img className="loadingholder__imgholder__loading" src="./src/images/loading.gif"/></div></div>}
    {isError && <p className="error-center">an error has occurred</p>}
    </>
  )
}

export default Status
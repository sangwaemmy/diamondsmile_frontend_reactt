import React from 'react'

export function DataListLoading() {
   return(
      <div className='container pt-0 mt-0 '>
        <div className='row pt-0 mt-0' style={{ fontWeight: "bolder", color: "#000" }}>
          <div className='col-12 d-flex justify-content-center  dataLoader' style={{ fontSize: "60PX", color: "#cfcfcfda" }}>
            
          </div>
        </div>
      </div>
    
   )
}



function Loader() {
  return (
    <div className='row d-flex justify-content-center'>
      <div className='col-5 loader'>    </div>
    </div>

  )
}

export default Loader
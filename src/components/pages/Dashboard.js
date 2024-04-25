import React, { useEffect } from 'react'
import DiamondSmile_dashboard from '../imgz/DiamondSmile_dashboard.JPG'

function Dashboard() {


    useEffect(()=>{
        document.body.classList.add(
            'removescrol' 
          );
          
          document.body.classList.add('bgImage');

    })

    const overlayText = {
        zIndex: 1, position: 'absolute', left: '10%', top: '40%'
    }
    const overlayText_2 = {
        zIndex: 1, position: 'absolute', left: '0%', top: '50%', textAlign: 'center', width:'100%'
    }
    const overlayText_3 = {
        zIndex: 1, position: 'absolute', left: '0%', top: '60%', fontSize: '13px', width:'100%', color: '#4a765be8', textAlign: 'center'
    }

    const oerlaBg = {
        zIndex: 0, position: 'absolute', top: '0px', left: '0px', height: '120vh', width: '100%', backgroundColor: '#000', opacity: '.5'
    }
    const top_1={
        zIndex: 1
    }
    const top_2={}
    return (
        <>
            {/* <img src={DiamondSmile_dashboard} className="card-img-top" alt="..." /> */}
            <div className='dashboardHome  d-flex align-items-center justify-content-center'
                style={{ height: '100vh' }}  >
                <span>
                    <h1 style= { overlayText}   className={`text-white title ${top_1}`}>  THEDIAMONDSMILE APPOINTMENT SYSTEM</h1>
                    <p style= { overlayText_2}  className='text-white sms_txt_14' >Professional Dental Clinic</p>
                    <p style= { overlayText_3}  className='text-white' >Copyrights 2023</p>
                </span>
                <br />
                <div style={oerlaBg} >

                </div>
            </div>
        </>
    )
}

export default Dashboard

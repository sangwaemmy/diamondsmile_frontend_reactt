import React from 'react'
import CustomStyles from "../Styles/OtherStyles"

function PrintCompanyInfo() {
    return (
        <div className='printHeader'>
            <div className='container printHeaderBoxParent' >
                <div className='row printHeaderBox d-flex justify-content-between' style={{height:"70px"}}>
                    <div className="col-3 LogoOnPrintBox   logo">
                        <div className='LogoOnPrint' style={CustomStyles.LogoOnPrint()}>  </div>
                    </div>
                    <div className='col-4   Date'>
                        {CustomStyles.DateOnPrint()}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default PrintCompanyInfo

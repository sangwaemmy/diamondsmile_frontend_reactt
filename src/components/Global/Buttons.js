import React from 'react'

function Buttons(props) {
    return (
        <div>
            <div className="row">
                <div className='col-6'>
                    <button type='button' className='mt-4 btn btn-danger'>Cancel</button>
                </div>
                <div className='col-6'>
                    <button type="submit" className="mt-4 btn btn-info offset-8 col-4 float-right ">{props.caption}</button>
                </div>
            </div>
        </div>
    )
}

export default Buttons

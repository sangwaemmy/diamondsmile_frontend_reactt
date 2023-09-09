import React from 'react'

function PagesWapper(props) {
    return (<>
        <div className='container-fluid  pageWrapper' >
            {props.children}
        </div>
    </>
    )
}

export default PagesWapper

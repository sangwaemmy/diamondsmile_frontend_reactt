import React, { createContext } from 'react'

function BareInput(props) {

   
    return (
        <>
            <input type='text' getName={props.changedText} copied={props.copied} value={props.txtval} onChange={props.changedText} />
        </>
    )
}

export default BareInput

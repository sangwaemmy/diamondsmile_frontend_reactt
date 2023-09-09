import React from 'react'

function Counter2(props) {
    return (
        <>
            <button style={{color:"red"}} onClick={props.incCount}>
                {props.count}
            </button>

        </>
    )
}

export default Counter2

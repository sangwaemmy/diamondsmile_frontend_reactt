import React from 'react'

function Counter1(props) {
    return (
        <>
            <button onClick={props.incCount}>
                {props.count}
            </button>
        </>
    )
}

export default Counter1

import React, { useState } from 'react'


function UpdatedComponent(OriginalComponent) {
    function NewComponent() {
        const [pubId, setPubId] = useState(2)

        const handleGetId = () => {
            setPubId(pubId => pubId*2)
        }
 
        return <OriginalComponent
            handleGetId={handleGetId}
            pubId={pubId} />
    }
    return NewComponent 
}
export default UpdatedComponent

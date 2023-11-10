import axios from "axios"
import { useEffect, useState } from "react"
import Repository from "../../services/Repository"

const ProdImage = () => {
    const [image,setImage] = useState('')
    
    return <>
        {/* <form onSubmit={(e) => {handleSubmit(e)}}> */}
            <input type="file" onChange={(e) => {setImage(e.target.files[0])}} />
           
        {/* </form> */}
      
    </>
}

export default ProdImage
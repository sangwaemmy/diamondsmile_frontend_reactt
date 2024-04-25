import { useState } from "react"
import Conn from "../../services/Conn";
import axios from "axios";

const ImageSample = () => {
  const [image,setImage] = useState({})
  const [name,setName] = useState('')
  const [description,setDescription] = useState("")


  const imageHandler = (e) => {
    setImage(e.target.files)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    
      var formData = new FormData()
      console.log(image)
      formData.append('file',image)
      // formData.append("name",name)
      // formData.append("description",description)
      axios.post("http://localhost:8081/appointment/api/files",formData,{headers: {
      ...Conn.GetToken,
      "Content-Type":"multipart/form-data"
      }}).then((res) => {
        alert(res.data)
      })
    }

  return(<>

    <h2>insert image</h2>
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => {setName(e.target.value)}} /><br />
      <textarea id="" cols="50" rows="2" value={description} onChange={(e) => {setDescription(e.target.value)}} /><br />
      <input type="file" accept="image/*" onChange={imageHandler} /><br />
      <button>send</button>
    </form>
  </>)
}
export default ImageSample
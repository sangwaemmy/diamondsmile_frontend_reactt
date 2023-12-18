import axios from "axios"
import Conn from "../../services/Conn";
import { useState } from "react";

export const Check = () => {
    var images = []
    const [name,setName] = useState("")
    const [desc,setDesc] = useState("")
    const handleChangle = (e) => {
        images.push(e.target.files)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    
        var formData = new FormData();
        formData.append('name',name)
        formData.append("description",desc)
        images.forEach((imageFiles) => {
            Array.from(imageFiles).forEach((file) => {
                formData.append("file", file);
            });
        });
        
        axios.post("http://localhost:8081/appointment/api/check/files", formData,{headers: {
            ...Conn.GetToken,
            "Content-Type":"multipart/form-data"
        }}).then((res) => {
            alert("done");
            formData= new FormData()
            images= []
        });
    
        console.log(images);
    };
    
    return <>
        <form encType="multipart/form-data" onSubmit={e=>handleSubmit(e)}>
            <input type="text" onChange={e=>setName(e.target.value)} />
            <input type="text" onChange={e=>setDesc(e.target.value)} />
            <input type="file" multiple onChange={e => handleChangle(e)} />
            <button>submit</button>
        </form>
    </>
}
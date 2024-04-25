import axios from "axios"

export const Check = () => {
    var images = []
    const handleChangle = (e) => {
        images.push(e.target.files)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    
        var formData = new FormData();
        images.forEach((imageFiles) => {
            Array.from(imageFiles).forEach((file) => {
                formData.append("images", file);
            });
        });
    
        axios.post("http://localhost:8081/appointment/api/files", formData).then((res) => {
            alert("done");
            formData= new FormData()
            images= []
        });
    
        console.log(images);
    };
    
    return <>
        <form encType="multipart/form-data" onSubmit={e=>handleSubmit(e)}>
            <input type="file" multiple onChange={e => handleChangle(e)} />
            <button>submit</button>
        </form>
    </>
}
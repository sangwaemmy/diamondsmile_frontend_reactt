  // import React, { useEffect, useState } from "react";
  // import axios from "axios";
  // import Conn from "../../services/Conn";
  // import Repository from "../../services/Repository";

// import { useState } from "react"

  
  // const Product = () => {
  //   const [height, setHeight] = useState(0);
  //   const [clearBtn, setClearBtn] = useState(false);
  //   const [showLoader, setShowLoader] = useState(false);
  //   const [showAlert, setShowAlert] = useState(false);
  //   const [id, setId] = useState(null);
  //   const [images, setImages] = useState([]);
  //   const [name, setName] = useState("");
  //   const [description, setDescription] = useState("");
  //   const [image, setImage] = useState(null);
  //   const [product, setProduct] = useState([]);
  //   const [autoRefresh, setAutoRefresh] = useState(true);
  
  //   const UpdateById = (id) => {
  //     setId(id);
  //     setHeight("auto");
  //   };
  
  //   const handleFileChange = (e) => {
  //     setImage(e.target.files[0]);
  //   };
  
  //   const onSubmitHandler = (e) => {
  //     e.preventDefault();
  //     const productInserting = { name, description };
  
  //     if (id) {
  //       // Update an existing product
  //       axios
  //         .put(Conn.product.name + "update/" + id, productInserting, {
  //           headers: Conn.GetToken,
  //         })
  //         .then((res) => {
  //           alert(res.data);
  //           setId(null);
  //           setAutoRefresh(!autoRefresh);
  //           setHeight(0);
  //         });
  //     } else {
  //       // Create a new product
  //       if (image) {
  //         const formData = new FormData();
  //         formData.append("file", image);
  //         // Upload the image
  //         axios
  //           .post(Conn.image.name + "/img", formData, {
  //             headers: {
  //               ...Conn.GetToken,
  //               "Content-Type": "multipart/form-data",
  //             },
  //           })
  //           .then((imageResponse) => {
  //             alert(imageResponse.data);
  //             // Now, create the product with the image
  //             axios
  //               .post(Conn.product.name, { ...productInserting, imageId: imageResponse.data.id }, {
  //                 headers: Conn.GetToken,
  //               })
  //               .then((productResponse) => {
  //                 alert(productResponse.data);
  //                 setId(null);
  //                 setAutoRefresh(!autoRefresh);
  //                 setHeight(0);
  //                 setName("");
  //                 setDescription("");
  //                 setImage(null);
  //               });
  //           });
  //       } else {
  //         // Handle the case when no image is selected
  //         alert("Please select an image for the product.");
  //       }
  //     }
  //   };
  
  //   const clearHandle = () => {
  //     // Add any clear logic you need
  //   };
  
  //   const DeleteById = (id) => {
  //     axios
  //       .delete(Conn.product.name + "product/" + id, {
  //         headers: Conn.GetToken,
  //       })
  //       .then((result) => {
  //         alert(result.data);
  //         setAutoRefresh(!autoRefresh);
  //       });
  //   };
  
  //   useEffect(() => {
  //     axios.get(Conn.product.name, { headers: Conn.GetToken }).then((res) => {
  //       setProduct(res.data);
  //     });
  
  //     Repository.findImages().then((res) => {
  //       setImages(res.data);
  //     });
  //   }, [autoRefresh]);
  
  //   return (
  //     <div className="form-div">
  //       {/* ... Your form code ... */}
  //     </div>
  //   );
  // };
  
  // export default Product;
import { useState } from "react"
import Conn from "../../services/Conn";
import axios from "axios";

const ImageSample = () => {
  const [image,setImage] = useState({})
  const [name,setName] = useState('')
  const [description,setDescription] = useState('')


  const imageHandler = (e) => {
    setImage(e.target.files)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    
    const length = image.length

    for (let index = 0; index < length; index++) {
      var formData = new FormData()
      console.log(image[index])
      formData.append('file',image[index])
      formData.append("name",name)
      formData.append("description",description)
      axios.post("http://localhost:8081/appointment/api/check/",formData,{headers: {
      ...Conn.GetToken,
      "Content-Type":"multipart/form-data"
      }}).then((res) => {
        alert(res.data)
      })
    }
  }

  return(<>

    <h2>insert image</h2>
    <form encType="multipart/form-data" onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => {setName(e.target.value)}} /><br />
      <textarea id="" cols="50" rows="2" value={description} onChange={(e) => {setDescription(e.target.value)}} /><br />
      <input type="file" accept="image/*" multiple onChange={imageHandler} /><br />
      <button>send</button>
    </form>
  </>)
}
export default ImageSample

import { useEffect, useState } from "react"
import { ClearBtnSaveStatus, ContainerRowBtwn, FormInnerRightPane, FormInnerRightPaneFile, SaveUpdateBtns } from "../Global/ContainerRow"
import AnimateHeight from "react-animate-height"
import FormTools from "../Global/Forms/PubFnx"
import BootResponsiveMain from "./BootResposive"
import ListToolBar from "../Global/ListToolBar"
import ListOptioncol, { TableOpen } from "../Global/ListTable"
import TableHead from "../Global/TableHead"
import Conn from "../../services/Conn"
import axios from "axios"
import Icon from "react-icons-kit"
import ProdImage from "./image"
import Repository from "../../services/Repository"
import { ic_broken_image_twotone as img } from 'react-icons-kit/md/ic_broken_image_twotone'
import { Form } from "react-router-dom"

const Product = () => {
    const [height, setHeight] = useState(0) //form height
    const [clearBtn, setClearBtn] = useState(false) //form title
    const [showLoader, setShowLoader] = useState(false) //unknown
    const [showAlert, setShowAlert] = useState(false) //generating alert
    const [id, setId] = useState(null)
    const [images, setImages] = useState([])
    //inputs
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [imageToUpload, setImageToUpload] = useState([])
    const [alliimage, setAllimages] = useState({})
    //outputs
    const [product, setProduct] = useState([])
    const [autoRefresh, setAutoRefresh] = useState(true)

    const imageLink = Conn.image.name + "/img"
    //onSubmit
    const UpdateById = (id) => {
        setId(id)
        setHeight('auto')
    }

    // const handleFileChange = (e) =>{
    //     setImages([...images])
    // }
    const onSubmitHandler = (e) => {
        e.preventDefault()
        const productInserting = { "name": name, "description": description }
        const formData = new FormData()
        if (id) {

            axios.put(Conn.product.name + "update/" + id, productInserting, { headers: Conn.GetToken }).then((res) => {
                alert(res.data)
                setId(null)
                setAutoRefresh(!autoRefresh)
                setHeight(0)

            })

        } else {
            if (imageToUpload) {

                // [...imageToUpload].forEach((file, i) => {
                //     console.log(i)
                //     formData.append(`file-${i}`, file, file.name)
                // })
                
                
                setAllimages('file', imageToUpload)

                formData.append("file",alliimage)
                console.log(formData)
                // formData.append("file",images)
                formData.append("name", name)
                formData.append("description", description)

                console.log('All files: ' + images.length);

                axios.post(imageLink, formData, {
                    headers: {
                        ...Conn.GetToken,
                        "Content-Type": "multipart/form-data", // Set the content type for file upload
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                }).then((res) => {
                    alert("product and image successfully inserted")
                    setClearBtn(true)
                    setShowLoader(false)
                    setShowAlert(true)
                    setId(null)
                    setName('')
                    setDescription('')
                    setAutoRefresh(!autoRefresh)
                    setHeight(0)
                })

            }

        }
    }
    const clearHandle = () => {

    }
    useEffect(() => {
        axios.get(Conn.product.name, { headers: Conn.GetToken }).then((res) => {
            setProduct(res.data)
        })

        //display images

        Repository.findImages().then((res) => {
            setImages(res.data)
        })
    }, [autoRefresh])

    const DeleteById = (id) => {

        axios.delete(Conn.product.name + "product/" + id, { headers: Conn.GetToken }).then((result) => {
            alert(result.data)
            setAutoRefresh(!autoRefresh)
        })

    }
    return <>
        <div className="form-div">
            <AnimateHeight duration={300} animationOpacity={true} height={height}>
                <ContainerRowBtwn clearBtn={clearBtn} form="Product" showLoader={showLoader}>
                    <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
                    <FormInnerRightPaneFile onSubmitHandler={(e) => { onSubmitHandler(e) }}>
                        <div className="row">
                            <label htmlFor="name" className="col-sm-3 mb-2 p">product name:</label>
                            <div className="col-sm-9 mb-2">
                                <input type="text" id="name" value={name} onChange={(e) => { setName(e.target.value) }} className="form-control" />
                            </div>
                        </div>
                        <div className="row">
                            <label htmlFor="description" className="col-sm-3 p">description:</label>
                            <div className="col-sm-9">
                                <textarea type="text" id="description" value={description} onChange={(e) => { setDescription(e.target.value) }} className="form-control" />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <label htmlFor="description" className="col-sm-3 p">Image:</label>
                            <div className="col-sm-9">
                                <input type="file" name="file" className="form-control" multiple accept="image/*" onChange={(e) => setImageToUpload(e.target.files)} />
                            </div>
                        </div>
                        <div className="row">
                            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
                        </div>
                    </FormInnerRightPaneFile>
                </ContainerRowBtwn>
            </AnimateHeight>
            <div className="body">
                <div className="container">
                    <BootResponsiveMain col="col-sm-12" >
                        <ListToolBar listTitle='Products list' height={height} entity='Product' changeFormHeightClick={() => setHeight(height == 0 ? 'auto' : 0)} />
                    </BootResponsiveMain>
                    <BootResponsiveMain col="col-sm-12">
                        <TableOpen>
                            <TableHead>
                                <th>product name</th>
                                <th>product description</th>
                                <th>options</th>
                            </TableHead>
                            <tbody>
                                {
                                    product.map((result) => (
                                        <tr key={result.id}>
                                            <td>{result.name}</td>
                                            <td>{result.description}</td>
                                            <td>
                                                <ListOptioncol getEntityById={() => UpdateById(result.id)} delEntityById={() => DeleteById(result.id)} />
                                                <td>
                                                    <Icon title="edit images" size={16} style={{ cursor: 'pointer', color: '#0fd120', marginRight: "10px" }} icon={img} />

                                                </td>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </TableOpen>
                        {
                            images.map((img) => (
                                <img key={img.id} src={`data:image/${img.fileExtension};base64,${img.path}`} style={{ width: "200px", height: "200px" }} alt="images" />
                            ))
                        }
                    </BootResponsiveMain>
                </div>
            </div>
        </div>
    </>
}

export default Product
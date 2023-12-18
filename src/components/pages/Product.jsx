
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
    var imagesIn = []
    const [name,setName] = useState("")
    const [desc,setDesc] = useState("")
    //outputs
    const [product, setProduct] = useState([])
    const [autoRefresh, setAutoRefresh] = useState(true)

    const imageLink = Conn.image.name + "/img"
    //onSubmit
    const UpdateById = (id) => {
        setId(id)
        setHeight('auto')
    }
    const handleChangle = (e) => {
        imagesIn.push(e.target.files)
    }
    const onSubmitHandler = (e) => {
        e.preventDefault()

        var formData = new FormData();
        formData.append('name',name)
        formData.append("description",desc)
        imagesIn.forEach((imageFiles) => {
            Array.from(imageFiles).forEach((file) => {
                formData.append("file", file);
            });
        });

        if (id) {

            axios.put(Conn.product.name + "update/" + id, productInserting, { headers: Conn.GetToken }).then((res) => {
                alert(res.data)
                setId(null)
                setAutoRefresh(!autoRefresh)
                // setHeight(0)

            })

        } else {
            
            axios.post("http://localhost:8081/appointment/api/check/files", formData,{headers: {
                ...Conn.GetToken,
                "Content-Type":"multipart/form-data"
            }}).then((res) => {
                alert("done");
                setAutoRefresh(!autoRefresh)
                formData= new FormData()
                images= []
                
            });

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
    
// multiple accept="image/*"
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
                                <textarea type="text" id="description" value={desc} onChange={(e) => { setDesc(e.target.value) }} className="form-control" />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <label htmlFor="description" className="col-sm-3 p">Image:</label>
                            <div className="col-sm-9">
                                <input type="file" name="file" className="form-control" multiple  onChange={(e) => {handleChangle(e)}} />
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
                        <ListToolBar listTitle='Products list' height={height} entity='Product' changeFormHeightClick={() => setHeight(height == 0 ? 'auto' : 0)}/>
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
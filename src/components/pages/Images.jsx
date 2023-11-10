import axios from "axios"
import { useEffect, useState } from "react"
import Conn from "../../services/Conn"
import AnimateHeight from "react-animate-height"
import { ClearBtnSaveStatus, ContainerRowBtwn, FormInnerRightPane, SaveUpdateBtns } from "../Global/ContainerRow"
import { DropDownInput, FileInputRow } from "../Global/Forms/InputRow"

import FormTools from "../Global/Forms/PubFnx"
import BootResponsiveMain from "./BootResposive"
import ListToolBar from "../Global/ListToolBar"
import { TableOpen } from "../Global/ListTable"
import { TableHead } from "@mui/material"

const Images = () => {

    const [image, setImage] = useState('')
    const [product_id,setProduct_id] = useState("")
    const [id,setId] = useState(null)
    
    const [imageDatabase,setImageDatabase] = useState([])
    const [productDatabase, setProductDatabase] = useState([])

    const [autoRefresh,setAutoRefresh] = useState(true)
    const [showAlert,setShowAlert] = useState(false)
    const [height, setHeight] = useState("auto")
    const [showLoader,setShowLoader] = useState(false)
    const [clearBtn,setClearBtn] = useState(false)

    const onSubmitHandler = (e) =>{
        e.preventDefault()

        const formData = new FormData()
        formData.append('file', image)
        console.log(formData)
        if(id){

        }else{
            axios.post(Conn.image.name + "/1",formData,{headers:Conn.GetToken}).then((res) => {
                alert(res.data)
                setAutoRefresh(!autoRefresh)
            })
        }
    }

    const clearHandle = () => {

    }
    const  productDisplaying = () => {
        axios.get(Conn.product.name,{headers:Conn.GetToken}).then((res) => {
            setProductDatabase(res.data)
        })
    }
    useEffect(()=>{
        productDisplaying()
    },[autoRefresh])
    return(
        <>
            <AnimateHeight duration={300} animationOpacity={true} height={height}>
                <ContainerRowBtwn clearBtn={clearBtn} form="Image" showLoader={showLoader}>
                    <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
                    <FormInnerRightPane onSubmitHandler={(e) => { onSubmitHandler(e) }}>

                        <div className="row mt-3">
                            <DropDownInput handle={(e) => setProduct_id(e.target.value)} name='Product:' label='product' >
                                {productDatabase.map((product) => (
                                    <option value={product.id} val={product.id} key={product.id}> {product.name} </option>
                                ))}
                            </DropDownInput>
                        </div>
                        <div className="row mt-3">
                            <FileInputRow handle={(e) => {setImage(e.target.files[0])}} name="Image:" label="image" />
                            
                        </div>
                        <div className="row">
                            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
                        </div>
                    </FormInnerRightPane>
                </ContainerRowBtwn>
            </AnimateHeight>
            <div className="body">
                <div className="container">
                    <BootResponsiveMain col="col-sm-12" >
                        <ListToolBar listTitle='Images list'  height={height} entity='Image' changeFormHeightClick={() => setHeight(height == 0 ? 'auto' : 0)} />
                    </BootResponsiveMain>
                    <BootResponsiveMain col="col-sm-12">
                        <TableOpen>
                            <TableHead>
                                <th>product name</th>
                                <th>product image</th>
                                
                            </TableHead>
                            <tbody>
                                
                                {
                                    imageDatabase.map((img)=>(
                                        <tr>
                                            <td></td>
                                            <td>
                                                <img style={{Width: "10em",height:"10em"}} src={`data:image/${img.fileExtension};base64,${img.imageData}`} alt="not displaying" />
                                            </td>
                                                                                 
                                        </tr>
                                        ))
                                }
                                
                            </tbody>
                        </TableOpen>
                    </BootResponsiveMain>
                </div>
            </div>
        </>
    )
}
export default Images
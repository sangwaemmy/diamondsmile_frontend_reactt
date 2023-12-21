
import { useEffect, useState } from "react"
import { ClearBtnSaveStatus, ContainerRowBtwn, FormInnerRightPane, SaveUpdateBtns } from "../Global/ContainerRow"
import AnimateHeight from "react-animate-height"
import FormTools from "../Global/Forms/PubFnx"
import BootResponsiveMain from "./BootResposive"
import ListToolBar from "../Global/ListToolBar"
import ListOptioncol, { TableOpen } from "../Global/ListTable"
import TableHead from "../Global/TableHead"
import Conn from "../../services/Conn"
import axios from "axios"
import Icon from "react-icons-kit"
import Repository from "../../services/Repository"
import { DropDownInput, NumberInputRow } from "../Global/Forms/InputRow"

const Orders = () => {
    const [height, setHeight] = useState(0) //form height
    const [clearBtn, setClearBtn] = useState(false) //form title
    const [showLoader, setShowLoader] = useState(false) //unknown
    const [showAlert, setShowAlert] = useState(false) //generating alert
    const [id, setId] = useState(null)

    //inputs
    const [quantity, setQuantity] = useState('')
    const [user, setUser] = useState(0)
    const [product_id, setProduct_id] = useState('')

    //outputs
    const [productDatabase, setProductDatabase] = useState([])
    const [userDatabase, setUserDatabase] = useState([])
    const [orderDatabase, setOrderDatabase] = useState([])
    const [autoRefresh, setAutoRefresh] = useState(true)
    const account_id = localStorage.getItem('userid');

    //onSubmit
    const UpdateById = (id) => {
        setId(id)
        setHeight('auto')
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
       
        const savedDate = new Date()
        const year = savedDate.getFullYear()
        const month = savedDate.getMonth() + 1
        const day = savedDate.getDate()
        const hours = savedDate.getHours()
        const minutes = savedDate.getMinutes()
        const seconds = savedDate.getSeconds()
        const fullTime = year + "/" + month + "/" + day + " " + hours + ":" + minutes + ":" + seconds

        const mdl_orders = { "date_time": fullTime, 'qty_ordered': quantity, "served": 'false', "user": user }

        if (id) {

            axios.put(Conn.orders.name + `/${id}/${account_id}/${product_id}`,mdl_orders,{headers:Conn.GetToken}).then((res) => {
                alert('order updated')
                setId(id)
                setHeight('auto')
                setAutoRefresh(!autoRefresh)

            })
        } else {

            // "appoint/api/orders/", {}
            axios.post(Conn.orders.name +"/"+ account_id + "/" + product_id,mdl_orders, { headers: Conn.GetToken }).then((res) => {
                alert("new order saved")
                setAutoRefresh(!autoRefresh)
                setQuantity('')
                setUser("")
                setProduct_id('')
            })

        }
    }
    const productRetrieval = () => {
        axios.get(Conn.product.name, { headers: Conn.GetToken }).then((res) => {
            setProductDatabase(res.data)
        })
    }
    const ordersRetrieval = () => {
        axios.get(Conn.orders.name + "/", { headers: Conn.GetToken }).then((res) => {
            setOrderDatabase(res.data)
        })
    }
    const customerRetrieval = () => {
        Repository.findCustomers().then((res) => {
            setUserDatabase(res.data);
        });
    }
    const clearHandle = () => {

    }
    function getDatas() {

    }
    useEffect(() => {
        ordersRetrieval()
        getDatas()
        productRetrieval()
        customerRetrieval()
    }, [autoRefresh])

    const DeleteById = (id) => {

        axios.delete(Conn.orders.name+"/"+id,{headers:Conn.GetToken}).then((result) => {
            alert("order removed")
            setAutoRefresh(!autoRefresh)
        })
    }

    console.log(orderDatabase)
    return <>
        <div className="form-div">
            <AnimateHeight duration={300} animationOpacity={true} height={height}>
                <ContainerRowBtwn clearBtn={clearBtn} form="Order" showLoader={showLoader}>
                    <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
                    <FormInnerRightPane onSubmitHandler={(e) => { onSubmitHandler(e) }}>

                        <div className="row mt-3">
                            <DropDownInput handle={(e) => setUser(e.target.value)} name='Customer:' label='customer' >
                                {userDatabase.map((grp) => (
                                    <option value={grp.id} val={grp.id} key={grp.id}> {grp.names} </option>
                                ))}
                            </DropDownInput>
                        </div>
                        <div className="row">
                            {/* <div className="col-sm-4">
                                <label htmlFor="product" className="form-label">Product:</label>
                            </div>
                            <div className="col-sm-8"> */}
                            <DropDownInput handle={(e) => setProduct_id(e.target.value)} name='Product:' label='product' >
                                {productDatabase.map((grp) => (
                                    <option value={grp.id} val={grp.id} key={grp.id}> {grp.name} </option>
                                ))}
                            </DropDownInput>
                        </div>
                        {/* </div> */}
                        <div className="row mt-3">
                            <NumberInputRow handle={(e) => { setQuantity(e.target.value) }} name="Quantity:" label="quantity" />
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
                        <ListToolBar listTitle='Orders list'  height={height} entity='Order' changeFormHeightClick={() => setHeight(height == 0 ? 'auto' : 0)} />
                    </BootResponsiveMain>
                    <BootResponsiveMain col="col-sm-12">
                        <TableOpen>
                            <TableHead>
                                <th>User name</th>
                                <th>Product name</th>
                                <th>Quantity</th>
                                <th>Date</th>
                                <th>account</th>
                                <th>option</th>
                            </TableHead>
                            <tbody>
                                {
                                    orderDatabase && orderDatabase.map((orderDb) => (
                                        <tr key={orderDb.id}>
                                            <td>{orderDb.user}</td>
                                            <td>{ orderDb.mdl_product!=null? orderDb.mdl_product.name :''}</td>
                                            <td>{orderDb.qty_ordered}</td>
                                            <td>{orderDb.date_time}</td>
                                            <td>{ orderDb.mdl_account!=null?  orderDb.mdl_account.username:''}</td>
                                            <td>
                                                <ListOptioncol getEntityById={() => UpdateById(orderDb.id)} delEntityById={() => DeleteById(orderDb.id)} />
                                            </td>
                                        </tr>

                                    ))
                                }
                            </tbody>
                        </TableOpen>
                    </BootResponsiveMain>
                </div>
            </div>
        </div>
    </>
}

export default Orders


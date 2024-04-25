
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
import { ic_download_done_outline as tick } from 'react-icons-kit/md/ic_download_done_outline'
import { ic_countertops_twotone as count } from 'react-icons-kit/md/ic_countertops_twotone'
import { ic_delete_twotone as delet } from 'react-icons-kit/md/ic_delete_twotone'
import { ic_date_range_outline as caldr } from 'react-icons-kit/md/ic_date_range_outline'

import Repository from "../../services/Repository"
import { DropDownInput, NumberInputRow } from "../Global/Forms/InputRow"
import { Button, Card, Col, Container, Modal, Row, Tab, Tabs } from "react-bootstrap"
import CommonLook from "../Global/CommonLook"
import { ic_perm_phone_msg_outline as phone } from 'react-icons-kit/md/ic_perm_phone_msg_outline'
import Commons from "../../services/Commons"
import OrdersList from "./orders/OrdersList"
import { ic_bookmark as confirmed } from 'react-icons-kit/md/ic_bookmark'

const Orders = () => {


    /* #region ----------------------- DECLARATIONS -------------------------------------- */
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
    const [ordersByStatus, setordersByStatus] = useState([])

    const [userInDb, setUserInDb] = useState([])
    const [orderDatabase, setOrderDatabase] = useState([])
    const [autoRefresh, setAutoRefresh] = useState(true)
    const account_id = localStorage.getItem('userid');

    const [confirmorReject, setConfirmorReject] = useState('')//this differentiate the status of wether it is to confirm or to reject the order, so that the alert know what to show to the user

    const [key, setKey] = useState('home') // this is used on the tabs
    const [Mdl_orders, setMdl_orders] = useState({})
    // const [served,setServed] = useState("false")

    const [servedOrders, setservedOrders] = useState([])
    const [pendingOrders, setpendingOrders] = useState([])
    const [rejectedOrders, setrejectedOrders] = useState([])
    /* #endregion */
    //onSubmit

    /* #region  --------------------------- LISTING AND FILTERING THE DATA AND USEEFFECT -------------------------------------- */
    const productRetrieval = () => {
        Repository.findProduct().then((res) => {
            setProductDatabase(res.data)
        })
    }
    const ordersRetrieval = () => {
        Repository.findOrdersNoStatus().then((res) => {
            setOrderDatabase(res.data)
        })
    }
    const customerRetrieval = () => {
        Repository.findCustomers().then((res) => {
            setUserInDb(res.data);
            console.log(res.data);
        });
    }
    const clearHandle = () => {

    }

    const UpdateById = (id) => {
        setId(id)
        setHeight('auto')
    }
    const ordersByServed = () => {
        Repository.findOrdersByStatus('served').then((res) => {
            setservedOrders(res.data)
        })
        Repository.findOrdersByStatus('false').then((res) => {
            setpendingOrders(res.data)
        })
        Repository.findOrdersByStatus('rejected').then((res) => {
            setrejectedOrders(res.data)
        })
    }
    const formatDateFn = (date) => {
        const selectedDate = new Date(date)
        return selectedDate.getFullYear() + '-' + parseInt(selectedDate.getMonth() + 1).toString().padStart(2, "0") + '-' + selectedDate.getDate().toString().padStart(2, "0");

    }

    useEffect(() => {
        document.body.classList.add('orderbg')

        ordersByServed()


        productRetrieval()
        customerRetrieval()
    }, [autoRefresh])
    /* #endregion */

    /* #region -----------------------------SAVING AND DELETING -------------------------------------------------------- */
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

        const mdl_orders = { "date_time": fullTime, 'qty_ordered': quantity, "served": "false", "user": user }

        if (id) {

            axios.put(Conn.orders.name + `/${id}/${account_id}/${product_id}`, mdl_orders, { headers: Conn.GetToken }).then((res) => {
                alert('order updated')
                setId(id)
                setHeight('auto')
                setAutoRefresh(!autoRefresh)
            })
        } else {
            // "appoint/api/orders/", {}
            axios.post(Conn.orders.name + "/" + account_id + "/" + product_id, mdl_orders, { headers: Conn.GetToken }).then((res) => {
                alert("new order saved")
                setAutoRefresh(!autoRefresh)
                setQuantity('')
                setUser("")
                setProduct_id('')
            })

        }
    }
    const DeleteById = (id) => {

        axios.delete(Conn.orders.name + "/" + id, { headers: Conn.GetToken }).then((result) => {
            alert("order removed")
            setAutoRefresh(!autoRefresh)
        })
    }
    /* #endregion */

    /* #region ------------------------------Modal , confirm and reject by clicking the list item ---------------------- */
    const [chosenorderId, setChosenOrderId] = useState('')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [product, setProductId] = useState();
    const [qty_ordered, setQty_ordered] = useState(0)
    const [OrderStatus, setOrderStatus] = useState('')
    const setValuesOfChosenOrder = (e, id, user, product_id, qty_ordered) => {
        e.preventDefault()
        setChosenOrderId(id)
        setUser(user)
        setProductId(product_id)
        setQty_ordered(qty_ordered)

    }

    async function chooseOrder(e, id, user, product_id, qty_ordered) { // this is only to show the modal popup and set the selected order states
        await setValuesOfChosenOrder(e, id, user, product_id, qty_ordered)
        await setConfirmorReject('confirm')
        await setOrderStatus((confirmorReject === 'confirm') ? 'served' : ((confirmorReject === 'reject') ? 'rejected' : 'false'))
        await setMdl_orders({ id: id, date_time: 'now', user: user, qty_ordered: qty_ordered, served: OrderStatus })
        setShow(true) // to show the dialog modal
    }
    async function rejectOrder(e, id, user, product_id, qty_ordered) { // this is only to show the modal popup and set the selected order states
        await setValuesOfChosenOrder(e, id, user, product_id, qty_ordered)
        await setConfirmorReject('reject')
        await setOrderStatus((confirmorReject === 'confirm') ? 'served' : ((confirmorReject === 'reject') ? 'rejected' : 'false'))
        await setMdl_orders({ id: id, date_time: 'now', user: user, qty_ordered: qty_ordered, served: OrderStatus })
        setShow(true) // to show the dialog modal
    }
    
    async function findOrderToEdit(e, id, user, product_id, qty_ordered) {
        await setValuesOfChosenOrder(e, id, user, product_id, qty_ordered)
        await setConfirmorReject('false') // this is back to inital, it can be set back to that when someone has done that by mistake
        await setOrderStatus((confirmorReject === 'confirm') ? 'served' : ((confirmorReject === 'reject') ? 'rejected' : 'false'))
        await setMdl_orders({ id: id, date_time: 'now', user: user, qty_ordered: qty_ordered, served: OrderStatus })
        setShow(true) // to show the dialog modal

    }

    const updateOrder = () => { // this is to send data to backend
        var id = chosenorderId

        Commons.updateOrder(id, user, product, Mdl_orders).then(res => {
            setShow(false)
            setAutoRefresh(!autoRefresh)
        })
    }


    /* #endregion */


    return <>
        <div className="form-div">
            {/* The modal to confirm the order to be saved */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> {confirmorReject == 'confirm' ? 'CONFIRM ORDER' : 'REJECT ORDER'}    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p> Do you really want to {confirmorReject} this order ?   </p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="success" onClick={() => updateOrder(chosenorderId)}>Confirm</Button>
                </Modal.Footer>
            </Modal>

            <AnimateHeight duration={300} animationOpacity={true} height={height}>
                <ContainerRowBtwn clearBtn={clearBtn} form="Order" showLoader={showLoader}>
                    <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
                    <FormInnerRightPane onSubmitHandler={(e) => { onSubmitHandler(e) }}>

                        <div className="row mt-3">
                            <DropDownInput handle={(e) => setUser(e.target.value)} name='Customer:' label='customer' >
                                {userInDb.map((grp) => (
                                    <option value={grp.id} val={grp.id} key={grp.id}> {grp.username} </option>
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
            <div className="body" >
                <div className="container">

                    <BootResponsiveMain col="col-sm-12" >
                        <ListToolBar listTitle='Orders list' height={height} entity='Order' changeFormHeightClick={() => setHeight(height == 0 ? 'auto' : 0)} />
                    </BootResponsiveMain>
                    <BootResponsiveMain col="col-sm-12">
                        <Container>
                            <Row>

                            </Row>
                        </Container>
                    </BootResponsiveMain>

                </div>
                <Container fluid style={{ backgroundColor: '' }}>
                </Container>
                <Container>

                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="mb-3"    >
                        <Tab eventKey="home" title="pending">
                            <Row className="d-flex    justify-content-around   ">
                                {pendingOrders.map((orderDb) => (
                                    <OrdersList key={orderDb.id} orderDb={orderDb}
                                        chooseOrder={(e) => chooseOrder(e, orderDb.id, orderDb.user, orderDb.prodId, orderDb.qty_ordered)}
                                        rejectOrder={(e) => rejectOrder(e, orderDb.id, orderDb.user, orderDb.prodId, orderDb.qty_ordered)}
                                        findOrderToEdit={(e) => findOrderToEdit(e, orderDb.id, orderDb.user, orderDb.prodId, orderDb.qty_ordered)} />
                                ))
                                }
                            </Row>
                        </Tab>
                        <Tab eventKey="profile" title="Served">
                            <Row className="d-flex    justify-content-around   "> {servedOrders.map((orderDb) => (
                                <OrdersList key={orderDb.id} orderDb={orderDb}
                                    chooseOrder={(e) => chooseOrder(e, orderDb.id, orderDb.user, orderDb.prodId, orderDb.qty_ordered)}
                                    rejectOrder={(e) => rejectOrder(e, orderDb.id, orderDb.user, orderDb.prodId, orderDb.qty_ordered)}
                                    findOrderToEdit={(e) => findOrderToEdit(e, orderDb.id, orderDb.user, orderDb.prodId, orderDb.qty_ordered)} />
                            ))
                            }
                            </Row>
                        </Tab>
                        <Tab eventKey="contact" title="Rejected" >
                            <Row className="d-flex    justify-content-around   "> {rejectedOrders.map((orderDb) => (
                                <OrdersList key={orderDb.id} orderDb={orderDb}
                                    chooseOrder={(e) => chooseOrder(e, orderDb.id, orderDb.user, orderDb.prodId, orderDb.qty_ordered)}
                                    rejectOrder={(e) => rejectOrder(e, orderDb.id, orderDb.user, orderDb.prodId, orderDb.qty_ordered)}
                                    findOrderToEdit={(e) => findOrderToEdit(e, orderDb.id, orderDb.user, orderDb.prodId, orderDb.qty_ordered)} />
                            ))
                            }
                            </Row>
                        </Tab>
                    </Tabs>

                </Container>

            </div>
        </div>
    </>
}

export default Orders


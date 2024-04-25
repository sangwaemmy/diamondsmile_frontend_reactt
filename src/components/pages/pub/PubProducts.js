import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import './PubStyles.css'
import Repository from '../../../services/Repository';
import BootResponsiveMain from '../BootResposive';
import ListToolBar from '../../Global/ListToolBar';
import Commons from '../../../services/Commons';
import Conn from '../../../services/Conn';
import { useNavigate } from 'react-router-dom';
function PubProducts() {

    const [images, setImages] = useState([])
    const [height, setHeight] = useState(0) //form height
    const [username, setUsername] = useState()
    const [userType, setUserType] = useState()
    const [show, setShow] = useState(false);
    const [reset, setReset] = useState(false)

    // const [quantity, setQuantity] = useState('')
    // const [user, setUser] = useState(0)
    // const [product_id, setProduct_id] = useState('')


    const [product_id, setSelectedProdId] = useState();
    const [date_time, setDate_time] = useState('');
    const [user, setUser] = useState();

    const [selectedProdName, setSelectedProdName] = useState();
    const [qty_ordered, setProdQty] = useState(0);
    const [telephone, setTelephone] = useState();
    const [saveResponse,setSaveResponse]= useState()
    const [pageLoaded, setPageLoaded] = useState(false);

    const navigate = useNavigate(); 

    const getOrderForm = (id, name) => {
        setShow(true);
        setSelectedProdId(id)
        setSelectedProdName(name)

    }

    const getProductDetails=(id,name)=>{

        const dataToSendDetailsFor = {
            id: id,
            name: name,
          };
          navigate('/pubproductDetails', { state: dataToSendDetailsFor });
    }
    const sendOrder = () => {
        // String telephone, String date_time, Integer user, Integer qty_ordered
        var account_id=0;
        var recePubOrderDTO = {
                date_time:date_time,
                user:0,
                qty_ordered: qty_ordered,
                telephone:telephone
        }
        Commons.savePubOrder(recePubOrderDTO,account_id,product_id).then((res) => {
            if(res.status ===201 ){
                setSaveResponse('You order has been placed')
                setShow(false)
                setReset(!reset)
            }
        })

    }
    const closeForm = () =>{
         setShow(false)
         setSaveResponse('')
    }

    useEffect(() => {
        setTelephone('')
        setSelectedProdName('')
        setProdQty(0)
        

        document.body.classList.remove(
            'loginBg', 'removescrol', 'bg_pubAppointment', 'bg_createAccount'
        );
        setUsername(localStorage.getItem('token'))
        setUserType(localStorage.getItem('catname'))
        Repository.findPubImagesProduct().then((res) => {
            setImages(res.data.ImagesPerProd)
        })
        setPageLoaded(true)

    }, [reset])
    return (
     <div>
            <Modal show={show} onHide={closeForm}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                      {saveResponse &&   <Row>
                            <Alert variant="primary">
                                <Alert.Heading>
                                        {saveResponse}
                                </Alert.Heading>
                            </Alert>
                        </Row>}
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                                Telephone
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control required value={telephone} onChange={(e) => setTelephone(e.target.value)} type="text" placeholder="Telephone" />
                            </Col>
                        </Form.Group>


                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                                Product
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control value={selectedProdName} disabled onChange={(e) => setSelectedProdName(e.target.value)} type="text" placeholder="Quantity" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                                Quantity
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control required value={qty_ordered} onChange={(e) => setProdQty(e.target.value)} type="number" placeholder="Quantity" />
                            </Col>
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => closeForm()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => sendOrder()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

             {pageLoaded &&
            <Container className='border'>
                <Row>
                    <h2 className='fw-bold'>Our Products</h2>
                    <div className="body">
                        <div className="container">

                            <BootResponsiveMain col="col-sm-12">
                                <div id="imageList" className="row  imageList d-flex justify-items-around">
                                    {
                                        images.map((img) => (
                                            <div className="col-md-3 mt-3" key={img.id} >
                                               <div className="card prodCard mt-3" style={{ position: 'relative', width: "200px" }}>
                                                    <span className="fw-bold p-1" style={{ fontSize: '12px', position: 'absolute', top: '0px', right: '-10px', color: '#fff', backgroundColor: 'red' }}>
                                                        -27%
                                                    </span>
                                                    {/* <img className="card-img-top" width={190} height={180} key={img.id} src={`data:image/png;base64,${img.path}`} alt="images" /> */}
                                                    <img className="card-img-top" width={190} height={150} key={img.id} src={ `${Conn.server.name+ Conn.port.val}images/${img.path}`} alt="images" />
                                                    <div className="card-body " >
                                                        <h5 className="card-title fw-bold" style={{ color: '#e64a07e8' }}>{img.name}</h5>
                                                        <p className="card-text short_desc" style={{ color: '#0062ffe8' }}>
                                                            {img.description}
                                                        </p>
                                                       {/* <a  onClick={(e) => getProductDetails(img.id, img.name)} className="btn mx-2  btn-primary p-1 fs-6">Details</a>*/}
                                                        {userType !== null && (userType === 'admin' || userType === 'doctor') &&
                                                            <a   className="btn mx-2 btn-primary p-1 fs-6">Delete</a>
                                                        }
                                                        <a onClick={(e) => getOrderForm(img.product_id, img.name)} className="btn btn-info mx-2  btn-primary p-1 fs-6">Order</a>
                                                    </div>
                                                </div>

                                            </div>
                                        ))
                                    }
                                </div>
                            </BootResponsiveMain>
                        </div>
                    </div>
                </Row>
            </Container>
             }
        </div>
 
    )   
}

export default PubProducts
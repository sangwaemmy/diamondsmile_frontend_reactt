import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Repository from '../../../services/Repository';
import Conn from '../../../services/Conn';
import CommonLook from '../../Global/CommonLook';
import Commons from '../../../services/Commons';

function PubProductDetails() {
    const location = useLocation();




    const [products, setProduct] = useState([])

    const [date_time, setDate_time] = useState('');
    const [user, setUser] = useState();
    const [qty_ordered, setProdQty] = useState(0);
    const [telephone, setTelephone] = useState();
    const [saveResponse, setSaveResponse] = useState()



    const getOrderForm2 = (id, name) => {
        setShow(true);
        setSelectedProdId(id)
        setSelectedProdName(name)
    }
    useEffect(() => {
        const data = location.state;

        Repository.findProductById(data.id).then((res) => {
            console.log('---------------------' + data.id + '-------------------------')
            console.log(res.data)

            setProduct(res.data)
        })
    }, [])


    const img_styles = {
        border: '1px solid #fff',
        boxShadow: '0px 0px 5px blue'
    }

    const [product_id, setSelectedProdId] = useState();
    const [selectedProdName, setSelectedProdName] = useState();
    const [show, setShow] = useState(false);
    const [reset, setReset] = useState(false)

    const sendOrder = () => {
        // String telephone, String date_time, Integer user, Integer qty_ordered
        var account_id = 0;
        var recePubOrderDTO = {
            date_time: date_time,
            user: 0,
            qty_ordered: qty_ordered,
            telephone: telephone
        }

        Commons.savePubOrder(recePubOrderDTO, account_id, product_id).then((res) => {
            if (res.status === 201) {
                setSaveResponse('You order has been placed')
                setShow(false)
                setReset(!reset)
            }
        })

        const mdl_messageValues = {
            message: "Thank you, your appointment for  " + date_time + " at Diamond Smile dental clinic is booked",
            destination: telephone,
            source: "Diamond"
        }

        Commons.sendSms(mdl_messageValues).then(res => {
            
        })
    }


    const closeForm = () => {
        setShow(false)
        setSaveResponse('')
    }


    return (
        <>

            <Modal show={show} onHide={closeForm}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {saveResponse && <Row>
                            <Alert variant="primary">
                                <Alert.Heading>
                                    {saveResponse}
                                </Alert.Heading>
                            </Alert>
                        </Row>}
                        <Form.Group as={Row} className="mb-3" controlId="formTel">
                            <Form.Label column sm="2">
                                Telephone
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control required value={telephone} onChange={(e) => setTelephone(e.target.value)} type="text" placeholder="Telephone" />
                            </Col>
                        </Form.Group>


                        <Form.Group as={Row} className="mb-3" controlId="formProd">
                            <Form.Label column sm="2">
                                Product
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control value={selectedProdName} disabled onChange={(e) => setSelectedProdName(e.target.value)} type="text" placeholder="Quantity" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formQty">
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

            <Container >



                <Row className='mt-lg-5'>
                    <Row>
                        <Col md={12}>
                            {products.map((prod) => (
                                <>
                                    <Row key={prod.id}>
                                        <Col md={6} className='border-bottom'>
                                            <img style={img_styles} src={`${Conn.server.name + Conn.port.val}images/${prod.path}`} height="400" width="400" />
                                        </Col>

                                        <Col md={6}>
                                            <h2 className={`fw-bold border-bottom`} style={{ color: CommonLook.Commonskin.color }}>{prod.name}</h2>
                                            <p className='prodDetails_desc'>{prod.description}</p>
                                            <p>
                                                <div className="d-grid">
                                                    <a className='btn btn-success' href='/pubproduct'>Go back to Products List</a>
                                                    <a onClick={() => getOrderForm2(prod.id, prod.name)} className='btn btn-info mt-2' href='#'>order</a>
                                                </div>
                                            </p>
                                        </Col>
                                    </Row>
                                </>))}
                        </Col>

                    </Row>





                    = {products.name}
                </Row>
            </Container>
        </>

    )
}

export default PubProductDetails
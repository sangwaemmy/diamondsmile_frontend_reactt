import React from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import Carousel from 'react-multi-carousel'
import { Slide } from 'react-reveal'

function ProdDetailsModal(props) {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"

        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <b className='text-capitalize'>   {props.prodName} </b>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4 className='text-capitalize'>  Description</h4>
                <p>
                    {props.description}
                </p>


                <hr /> <p>Images</p>
                <Row className='border  '>
                    {props.images.map((img) => (
                        <Col md={4}>
                            <img className="card-img-top" width={190} height={150} key={img.id} src={`//localhost:8081/images/${img.path}`} alt="images" />
                        </Col>
                    ))
                    }
                  
                </Row>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>

    )
}

export default ProdDetailsModal
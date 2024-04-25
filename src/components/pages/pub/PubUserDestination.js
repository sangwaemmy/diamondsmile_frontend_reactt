import React, { useEffect } from 'react'
import { Accordion, Col, Container, Row } from 'react-bootstrap'
import Icon from 'react-icons-kit'
import { ic_check_box_outline as tick } from 'react-icons-kit/md/ic_check_box_outline'
import CommonLook from '../../Global/CommonLook'
import { ic_home_outline as home } from 'react-icons-kit/md/ic_home_outline'
function PubUserDestination() {

    useEffect(() => {
        document.body.classList.add('userDestinations')
        // document.removeAttribute('class')
    })
    return (
        <Container >
            <Row className='d-flex justify-content-center mt-5 ' >

                <Col border-1 border-dark md={6}   className='border relate p-5 round round-3'>
                    <div className='overlay'></div>
                    <h1 className='text-center fw-bold underoverlay' style={{ color: CommonLook.lightblue }}>
                        Thank for making an appointment
                    </h1>
                    <p className='text-center fw-bold underoverlay'>
                        <Icon style={{ color: CommonLook.Commonskin.color }} size={80} icon={tick} />
                    </p>
                    <p className='text-center fw-bold underoverlay  '>
                        <a href='/'>
                            <Icon style={{ color: '#ccc' }} size={60} icon={home} /> Home</a>
                    </p>

                </Col>
            </Row>
        </Container>
    )
}

export default PubUserDestination
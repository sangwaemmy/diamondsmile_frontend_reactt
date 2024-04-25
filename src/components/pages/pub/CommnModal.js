import React, { Children } from 'react'
import { Alert, Button, Col, Form, Modal, Row } from 'react-bootstrap'

function CommnModal(show, closeForm, saveResponse, telephone, setTelephoneHandle) {
    return (
        <div>CommnModal</div>
    )
}

export default CommnModal

export const ModalForm = (saveResponse) => {
    return <Form>
        {saveResponse && <Row>
            <Alert variant="primary">
                <Alert.Heading>
                    {saveResponse}
                </Alert.Heading>
            </Alert>
        </Row>}
        {Children}
    </Form>

}

export const ModalFormGrp = (label, value, event) => {
    return <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
            {label}
        </Form.Label>
        <Col sm="10">
            <Form.Control required value={value} onChange={event} type="text" placeholder="label" />
        </Col>
    </Form.Group>
}


export const Modal_Footer = (closeEvt,SendEvt) => {
    return <Modal.Footer>
        <Button variant="secondary" onClick={closeEvt}>
            Close
        </Button>
        <Button variant="primary" onClick={SendEvt}>
            Save Changes
        </Button>
    </Modal.Footer>
}

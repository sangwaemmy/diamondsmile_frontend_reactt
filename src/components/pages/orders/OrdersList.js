
import React, { useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import Icon from 'react-icons-kit'
import { ic_bookmark as confirmed } from 'react-icons-kit/md/ic_bookmark'
import CommonLook from '../../Global/CommonLook'
import { ic_download_done_outline as tick } from 'react-icons-kit/md/ic_download_done_outline'
import { ic_countertops_twotone as count } from 'react-icons-kit/md/ic_countertops_twotone'
import { ic_delete_twotone as delet } from 'react-icons-kit/md/ic_delete_twotone'
import { ic_date_range_outline as caldr } from 'react-icons-kit/md/ic_date_range_outline'

import { ic_perm_phone_msg_outline as phone } from 'react-icons-kit/md/ic_perm_phone_msg_outline'
import { ic_mode_edit as edit } from 'react-icons-kit/md/ic_mode_edit'
import { ic_refresh as revert } from 'react-icons-kit/md/ic_refresh'
import { ic_cancel_outline as canceled } from 'react-icons-kit/md/ic_cancel_outline'
import { isRejected } from '@reduxjs/toolkit'
import { ic_cancel_twotone as cancel } from 'react-icons-kit/md/ic_cancel_twotone'
function OrdersList({ orderDb, chooseOrder, rejectOrder, findOrderToEdit }) {
    const [orderStatus, setOrderStatus] = useState('')

    const changeBorderPerStatus = (orderDb) => {
        return orderDb.served === 'rejected' ? '#ff1100' : (
            (orderDb.served === 'served' ? '#00d5ff' : '#fff')
        )

    }

    return (

        <Col md={3} className="mt-5">
            <Card style={{ width: '14rem', border: '1px solid ' + changeBorderPerStatus(orderDb) }} className="p-2 orderCard" >
                <Card.Body>
                    <Card.Title className="border p-2 fw-bold title">{ orderDb.prodName }</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted mt-3 fs-6">
                        <Icon size={20} style={{ color: CommonLook.lightblue }} icon={caldr} />
                        {orderDb.date_time}
                    </Card.Subtitle>
                    <Card.Text style={{ color: '#ec640a' }} className="fw-bold">
                        <Icon size={20} style={{ color: '#ec640a' }} icon={phone} title='Quantity' />
                        {orderDb.name} {orderDb.tel}
                    </Card.Text>
                    <Card.Text>
                        <Icon size={20} style={{ color: 'green' }} icon={count} title='Quantity' />
                        {orderDb.qty_ordered} Items
                    </Card.Text>
                    <Card.Link href="#">
                        {orderDb.served === 'served' ?
                            <Icon size={20} style={{ color: 'green' }} icon={confirmed} title='Confirmed' />
                            : ((orderDb.served === 'rejected') ?
                                <Icon size={22} style={{ color: 'red' }} icon={cancel} title='Rejected' />

                                : <Icon size={20} onClick={(e) => chooseOrder(e, orderDb.id, orderDb.user, orderDb.prodId, orderDb.qty_ordered)} style={{ color: '#af960b' }} icon={tick} title='Click to Confirm' />
                            )
                        }

                    </Card.Link>
                    <Card.Link href="#">
                        {(orderDb.served === 'rejected'   ) ?
                            <Icon size={20} onClick={(e) => chooseOrder(e, orderDb.id, orderDb.user, orderDb.prodId, orderDb.qty_ordered)} style={{ color: '#af960b' }} icon={tick} title='Click to Confirm' />
                            :  
                                <Icon size={20} onClick={(e) => rejectOrder(e, orderDb.id, orderDb.user, orderDb.prodId, orderDb.qty_ordered)} style={{ color: 'red' }} icon={delet} title='Click to reject the order' />
                                 
                        }
                    </Card.Link>

                    <Card.Link href="#">
                        <Icon size={20} onClick={(e) => findOrderToEdit(e, orderDb.id, orderDb.user, orderDb.prodId, orderDb.qty_ordered)}
                            style={{ color: 'green' }}
                            icon={revert} title='Revert To Pending' />
                    </Card.Link>
                </Card.Body>
            </Card>
        </Col>

    )
}

export default OrdersList
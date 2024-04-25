import React from 'react'


// Icons
import { Icon } from 'react-icons-kit'
import { printer } from 'react-icons-kit/icomoon/printer'
import { floppyDisk as save } from 'react-icons-kit/icomoon/floppyDisk'
import { cancelCircle as cancel } from 'react-icons-kit/icomoon/cancelCircle'
import { plus as add } from 'react-icons-kit/icomoon/plus'
import { search } from 'react-icons-kit/icomoon/search'
import { pencil as edit } from 'react-icons-kit/icomoon/pencil'
import { cross as remove } from 'react-icons-kit/icomoon/cross'
import { forward as point } from 'react-icons-kit/icomoon/forward'
import { arrowRight as Mainpoint } from 'react-icons-kit/icomoon/arrowRight'

import { calendar } from 'react-icons-kit/icomoon/calendar'
import { Link } from 'react-router-dom'
import AnimateHeight from 'react-animate-height'
import OtherStyles from '../Styles/OtherStyles'
import Commons from '../../services/Commons'
import CommonLook from './CommonLook'


function ListToolBar(props) {
    return (
        <>
            <div className='col-12 '><h2 className='boldTitle h4 weight-4 text-capitalize' style={{fontFamily:"timesNewRoman"}}> {props.listTitle}  </h2></div>
            <div className='col-12'>
                <div className='row'>
                    <div className='col-6'>

                        <button id='addREc' className='btn'
                            aria-expanded={props.height !== 0} aria-controls="animForm" onClick={props.changeFormHeightClick}
                            style={{ marginRight: "15px", backgroundColor: CommonLook.Commonskin.color, fontSize: "12px", color: '#fff', fontWeight: "bold" }}>
                            <Icon size={11} style={{ marginRight: "8px", color: '#fff' }} icon={add} />
                            {(localStorage.getItem('catname') !== 'admin') ? 'Fiil ' : 'Add'}
                            {props.entity}
                        </button>

                        <button onClick={props.handlePrint} style={{ marginRight: "10px", fontSize: "12px" }} className='btn btn-dark ms-1'>
                            <Icon style={{ marginRight: "8px", color: '#fff' }} icon={printer} />
                            Print
                        </button>
                         <button className='btn btn-outline-success ms-1'
                            aria-expanded={props.searchHeight !== 0} aria-controls="animSearchBox" onClick={props.changeSearchheight}>
                            <Icon style={{ color: 'black' }} icon={search} />
                        </button>
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    )
}

export const SearchformAnimation = (props) => {
    return (
        <div className='row '>
            <div className='col-12'>
                <AnimateHeight id="animSearchBox" // animating the search box
                    duration={250} animateOpacity={true}
                    height={props.searchHeight} >

                    {props.children}
                </AnimateHeight>
            </div>
        </div>
    )
}

export default ListToolBar

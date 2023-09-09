import Title from './Title'
import React from 'react'
import Loader from './Loader'
import { EditTitle } from './Title'


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




export default function ContainerRow(props) {
    return (
        <div>
            <div className='container'>
                <div className="row">
                    {props.children}

                </div>
            </div>
        </div>
    )
}
export  function ContainerRowFull(props) {
    return (
        <div>
            <div className='container-fluid'>
                <div className="row">
                    {props.children}

                </div>
            </div>
        </div>
    )
}


export const ContainerRowHalf = (props) => {
    return <ContainerRow>
        <div className='col-6  '>
            {props.children}
        </div>
    </ContainerRow>
}
export const SaveUpdateBtns = (props) => {
    return (
        <div className='row'>
            <div className='col-6 d-flex   justify-content-start '>
                {props.clearBtn &&
                    <button type='button' onClick={props.clearHandle} className='mt-4 btn btn-danger'>
                        <Icon style={{ color: '#fff', marginRight: "10px" }} icon={cancel} />
                        Cancel</button>
                }

            </div>
            <div className='col-6   d-flex   justify-content-start'>
                <button type="submit" className="mt-4 btn   offset-6 col-6  " style={{ fontSize: "12px", backgroundColor: "#470343", color: "#fff", fontWeight: "bolder" }} >
                    <Icon style={{ color: '#fff', marginRight: "10px" }} icon={save} />
                    {props.saveOrUpdate}</button>
            </div>
        </div>
    )
}
export const SaveUpdateBtnsBtnNear = (props) => {
    return (
        <div className='col-6   d-flex   justify-content-start'>
            <button type="submit"  className="mt-2 btn   offset-6 col-6  " style={{ fontSize: "12px", backgroundColor: "#470343", color: "#fff", fontWeight: "bolder" }} >
                <Icon style={{ color: '#fff', marginRight: "10px" }} icon={save} />
                {props.saveOrUpdate}</button>
        </div>
    )
}

export const ContainerForm = (props) => {
    return (
        <div className="container">
            <div className='form-row'>
                {props.children}
            </div>
        </div>
    )
}
export const FormInnerRightPane = (props) => {
    return (
        <div className={`box col-lg-8 col-md-8 ms-3   formBox p-3 mt-${props.mt}`}  >
            <div className='form-row'>
                <form onSubmit={props.onSubmitHandler} id="Form">
                    {props.children}
                </form>
            </div>
        </div>
    )
}

export const ContainerRowBtwn = (props) => { /*Thsi is on the form fields*/
    return (
        <>
            <div className="container" classname="formPane">
                <div className='row  d-flex justify-content-between align-top'>
                    {props.clearBtn && <EditTitle name={props.form} />}
                    {!props.clearBtn && <Title name={props.form} />}
                    {props.children}


                </div>
            </div>
        </>
    )
}
export const FormSidePane = () => {
    return (
        <div className='col-lg-3 d-flex align-start align-items-start   fs-1  rounded-circle col-md-3  totalBox  g-light'>
            <ul className='totalBoxList '>
                <li>
                    <h6><Icon icon={Mainpoint} />   DataItem 1</h6>
                    <p><Icon size={12} style={{ marginLeft: "20px", marginRight: "6px" }} icon={point} />
                        45 &nbsp;&nbsp;    <Link className='text-white' to="#"> <Icon size={12} icon={calendar} />    {new Date().getFullYear()} </Link> </p>
                </li>
                <li><h6><Icon icon={Mainpoint} />  Data item 2 </h6>
                    <p><Icon style={{ marginLeft: "20px", marginRight: "6px" }} icon={point} />
                        23 &nbsp;&nbsp;
                        <Link className='text-white' to="#"> <Icon size={12} icon={calendar} /> {new Date().getFullYear()} </Link>
                    </p>
                </li>
            </ul>
        </div>)
}

export const ClearBtnSaveStatus = (props) => {
    return (<div className='box col-lg-8 col-md-8  ms-3  ' >
        {props.showLoader && <Loader />}
        {props.showAlert && (props.height == 0) &&
            <div class="alert alert-primary" role="alert">
                Record Saved Successfully!
            </div>
        }

    </div>
    )
}

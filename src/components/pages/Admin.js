import React, { useEffect, useState } from 'react'

import p1 from '../imgz/products/p1.PNG'
import p2 from '../imgz/products/p2.PNG'
import p3 from '../imgz/products/p3.PNG'
import p4 from '../imgz/products/p4.PNG'
import Commons from '../../services/Commons'
import axios from 'axios'
import Conn from '../../services/Conn'
import Repository from '../../services/Repository'
import PrintCompanyInfo from '../Global/PrintCompanyInfo'
import TableHead from '../Global/TableHead'
import { TableOpen } from '../Global/ListTable'
function Admin() {

    useEffect(() => {
        if (localStorage.getItem('token') === '' || localStorage.getItem('token') == undefined) {
            Commons.RedirectToLogin()
        } else {
            console.log('The login token is: ' + localStorage.getItem('token'))
        }
    }, [])
    const [mark, setMark] = useState(1)

    const [skin, setSkin] = useState('#e64a07e8')

    const theadStyle = {
        backgroundColor: '#e64a07e8'
    }

    const products = [
        {
            name: 'peoduct 1',
            image: p1,
            description: 'My product'
        },
        {
            name: 'peoduct 2',
            image: p2,
            description: 'My product'
        },
        {
            name: 'peoduct 3',
            image: p3,
            description: 'My product'
        },
        {
            name: 'peoduct 4',
            image: p4,
            description: 'My product'
        },


    ]







    const changeTitle = (n) => {
        return (n === 1
            ? 'Today appointments' : (n === 2 ? 'Upcoming appointments' : 'Products'))
    }

    const clickHandle = (n) => {
        setMark(n)
        changeTitle(n)
    }
    const [datas,setDatas] = useState([])
   
    for(let one in datas){
        let date = one.date_time_come
        console.log(date);
    }
    const [appointments,setAppointments] = useState([])
    useEffect(() => {
    // const getAllAppointments = () => {
        Repository.findAppointment().then((res) => {
          setAppointments(res.data);
          setDataLoad(true)
        });






        


    //   }
},[])
    
   
    return (
        <div className='container' style={{ color: '#000' }}>
            <h3 className='fw-bold my-1'>Welcome To DiamondSmile Dental clinic</h3>
            <div className='row d-flex justify-content-around mt-3'>
                <div onClick={() => clickHandle(1)} className={`card border-4 ${(mark === 1) ? 'border-success shadow-sm' : ''}   `} style={{ width: "18rem" }}>
                    <div className="card-body">
                        <h5 className="card-title fw-bold" style={{ color: '#e64a07e8' }}>Today Appointments </h5>
                        <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                        <p className="card-text">2 beforenoon / 5 afternoon</p>
                        <p>
                            
                        </p>
                        <a href="#" className="card-link">Card link</a>
                        <a href="#" className="card-link">Another link</a>
                    </div>
                </div>

                <div onClick={() => clickHandle(2)} className={`card border-4 ${(mark === 2) ? 'border-success shadow-sm' : ''} `} style={{ width: "22rem" }}>
                    <div className="card-body">
                        <h5 className="card-title fw-bold" style={{ color: '#e64a07e8' }}>All Upcoming appointments</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                        <p className="card-text">2 beforenoon / 5 afternoon</p>
                        <a href="#" className="card-link">Card link</a>
                        <a href="#" className="card-link">Another link</a>
                    </div>
                </div>
                <div onClick={() => clickHandle(3)} className={`card border-4 ${(mark === 3) ? 'border-success shadow-sm' : ''} `} style={{ width: "18rem" }}>
                    <div className="card-body">
                        <h5 className="card-title fw-bold" style={{ color: '#e64a07e8' }}>Products</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                        <p className="card-text">2 beforenoon / 5 afternoon</p>
                        <a href="#" className="card-link">Card link</a>
                        <a href="#" className="card-link">Another link</a>
                    </div>
                </div>
                <p className='mt-3'> <h4> {changeTitle(mark)} </h4></p>


                {mark == 1 &&
                <>
                    <table class="table  clinicTable table-striped table-bordered" >
                        <thead style={theadStyle}>
                            <tr >
                                <td>id</td> <td>Names </td> <td>Telephone</td>  <td>DateTime</td>      <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr> <td>  1</td>  <td>  Patrick Mugabo</td>  <td>  +250 784568684</td>  <td>2023-03-08 10:00:00</td>    <td>  <a className='btn p-1 btn-success' href='#'>Confirm</a></td></tr>
                            <tr>  <td>  2</td>  <td>  Patrick Mugabo</td>  <td>  +250 784568684</td><td>2023-03-08 10:00:00</td><td>  <a className='btn p-1 btn-success' href='#'>Confirm</a></td> </tr>
                            <tr>  <td>  2</td>  <td>  Patrick Mugabo</td> <td> +250 784568684</td><td>2023-03-08 10:00:00</td> <td>  <a className='btn p-1 btn-success' href='#'>Confirm</a></td> </tr>
                        </tbody>
                    </table>
                    <div className="dataTableBox">
                        <h3 className="appointmentTitles">Patients Coming today (All)   </h3>
                        <PrintCompanyInfo />
                        <TableOpen>
                        <TableHead>
                            <AppintmentHead />
                        </TableHead>
                        <tbody>
                            {appointments.map((appointment) => {
                            return (
                                <tr key={appointment.id}>
                                <AppointmentTableRows appointment={appointment} />
                                {/* <ListOptioncol getEntityById={() => getAppointmentById(appointment.id)} delEntityById={() => delAppointmentById(appointment.id)} /> */}

                                </tr>
                            )
                            })}</tbody>
                        </TableOpen>
                    </div>
                </>
                }

                {mark == 2 &&
                    <table class="table  clinicTable table-striped table-bordered" >
                        <thead style={theadStyle}>
                            <tr >
                                <td>id</td> <td>Names </td> <td>Telephone</td><td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr> <td>  1</td>  <td>  Patrick Mugabo</td>  <td>  +250 784568684</td> <td>  <a className='btn p-1 btn-success' href='#'>Confirm</a></td></tr>
                            <tr>  <td>  2</td>  <td>  Patrick Mugabo</td>  <td>  +250 784568684</td><td>  <a className='btn p-1 btn-success' href='#'>Confirm</a></td> </tr>
                            <tr>  <td>  2</td>  <td>  Patrick Mugabo</td> <td> +250 784568684</td> <td>  <a className='btn p-1 btn-success' href='#'>Confirm</a></td> </tr>
                        </tbody>
                    </table>}
                {mark == 3 && (
                    products.map((prod) => {
                        return <div className="card" style={{ width: "18rem" }}>
                            <img src={prod.image} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <p className="card-text">  {prod.description} </p>
                            </div>
                        </div>
                    })
                )




                }



            </div>
        </div >
    )
}

export default Admin

export const AppintmentHead = (props) => {
    return <>

    <td>Recorded Date</td>
    <td>Treatment Date</td>
    <td>Patient</td>
    <td>Done By</td>
    <td>status</td>
    <td>service group</td>
    <td className='delButton d-none'>Option</td>
    {/* more button */}
    {props.mbtn === 'yes' && <td className=' '>Action</td>}

  </>
}

export const AppointmentTableRows = ({ appointment }) => {
    return <>
      <td>{appointment.date_time_done}   </td>
      <td>{appointment.date_time_come}   </td>
      <td>{appointment.mdl_customer.names} 📞 {appointment.mdl_customer.telephone} </td>
      <td>{appointment.mdl_account.mdl_profile.name} {appointment.mdl_account.mdl_profile.surname}   </td>
      <td>{appointment.status}   </td>
      <td>{appointment.mdl_serv_group.group_name}   </td>

    </>
  }
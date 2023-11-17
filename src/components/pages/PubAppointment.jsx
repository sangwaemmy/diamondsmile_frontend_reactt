import React, { useState, useRef, useEffect, useContext } from 'react'
import PagesWapper from '../Global/PagesWapper'
import { useReactToPrint } from "react-to-print"
import SessionTime from '../../services/SessionTime'
import axios from 'axios'
import Commons from '../../services/Commons'
import Repository from "../../services/Repository"
import VertNavBar from '../Navbar/VertNavBar'
import AnimateHeight from 'react-animate-height'

import UpdatedComponent from '../Global/HOCForm'
import { Link, Route, Routes, useParams } from 'react-router-dom';



import PrintCompanyInfo from '../Global/PrintCompanyInfo'
import Loader, { DataListLoading } from '../Global/Loader';
import TableHead from '../Global/TableHead'
import SearchBox from '../Global/SearchBox'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

import SideBar from '../Navbar/SideBar'
import Dashboard from './Dashboard'
import About from './About'

import ContainerRow, { ClearBtnSaveStatus, ContainerRowBtwb, ContainerRowBtwn, ContainerRowHalf, FormInnerRightPane, FormSidePane, SaveUpdateBtns } from '../Global/ContainerRow'
import InputRow, { DateInputRow, DropDownInput, EmptyInputRow } from '../Global/Forms/InputRow'
import FormTools from '../Global/Forms/PubFnx'
import ListToolBar, { SearchformAnimation } from '../Global/ListToolBar'
import ListOptioncol, { TableOpen } from '../Global/ListTable'
import Utils from '../Global/Utils'
import Delete from '../../services/Delete'
import TimePicker from 'react-time-picker'
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import PubRequests from '../../services/PubRequests'
import Conn from '../../services/Conn'

function pubAppointment() {


  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  const [id, setId] = useState()
  const [date_time_done, setDate_time_done] = useState()
  const [date_time_come, setDate_time_come] = useState(new Date())
  const [customer, setCustomer] = useState()
  const [doctor, setDoctor] = useState()
  const [user_id, setUser_id] = useState()
  const [status, setStatus] = useState('pending')
  const [service_grp_id, setService_grp_id] = useState()

  /*#endregion Listing data*/

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [appointments, setAppointments] = useState([]) //Data List
  const [pendingAppointments, setPendingAppointments] = useState([]) //Data List
  const [confirmedAppointments, setConfirmedAppointments] = useState([]) //Data List
  const [appointmentsByrecordedDate, setAppointmentsByrecordedDate] = useState([]) //Data List
  const [doctors, setDoctors] = useState([]) //Data List
  const [customers, setCustomers] = useState([]) //Data List
  const [clearBtn, setClearBtn] = useState(false) //The cancel button

  const [dataLoad, setDataLoad] = useState(false)
  const [height, setHeight] = useState(0);
  const [searchHeight, setSearchHeight] = useState(0);
  const [type, setType] = useState();
  const [name, setName] = useState()
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [searchProgress, setSearchProgress] = useState()

  const [serv_groups, setServ_groups] = useState([]) //Data List
  const [time_come, onChange] = useState('10:00');

  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)

    var mdl_appointment = {
      id: id, date_time_done: date_time_done, date_time_come: formatDateFn(date_time_come) + ` ${time_come}:00`,
      customer: customer, user_id: doctor, status: status, service_grp_id: service_grp_id
    }
    if (id) {
      Commons.updateUnit(mdl_appointment, id).then((res) => {
        resetAfterSave()
      })
    } else {
      var mdl_messageValues={
        message:'test', destination:'0790390472', source:'diamondsmile'
      }
      PubRequests.saveAppointment(mdl_appointment, service_grp_id,mdl_messageValues).then((res) => {
        console.log(res.data)
        alert("successfully done")
        if (res.data != null) {
          // resetAfterSave()
        }
        // var mdl_messageValues = {
        //   message: 'Thank you for booking',
        //   destination: '0784113888',
        //   source: 'DSCLINIC'
        // }

        // Commons.sendSms(mdl_messageValues).then((res) => {
        //   alert('An sms has been sent to you!')

        // })
      }).catch((error) => {
        console.log('-----------')
      })
    }
  }
  /*#endregion Listing data*/

  /*#region ------------All Records, Deleting and By Id------------------------*/
  const getAllServ_groups = () => {
    PubRequests.serviceGroup().then((res) =>{
      setServ_groups(res.data)
      setDataLoad(true)
    })

  }
  
  useEffect(() => {
    setClearBtn(false)
    getAllServ_groups()
    getAllDoctors()
    getACustomers()
    // setUser_id(localStorage.getItem('userid'))
    console.log('userid: ' + user_id)


    document.body.classList.remove('bgImage');
    
      
  }, []);


  const getACustomers = () => {
    PubRequests.customers().then((res) => {
      setCustomers(res.data);
      setDataLoad(true)
    });
  }
  const getAllDoctors = () => {
    PubRequests.doctors('doctor').then((res) => {
      setDoctors(res.data);
      setDataLoad(true)
    });
  }
  /*#endregion Listing data*/

  /*#region ---------Show Height, reset all and clear Button   ------------*/
  function showheight(type) {
    setHeight(type)
  }
  const resetAfterSave = () => {
    document.getElementById("Form").reset();
    getTodayAppointments()
    setShowLoader(false)
    setShowAlert(true)
    setHeight(0)
    setId(null)
    setDate_time_done("")
    setDate_time_come("")
    setCustomer("")
    setService_grp_id("")
  }
  const clearHandle = () => {
    setId(null)
    setDate_time_done("")
    setDate_time_come("")
    setCustomer("")
    setUser_id("")
    setStatus("")
    setService_grp_id("")
  }




  const refreshClick = (e) => {
    setSearchProgress(false)
    setName('')
  }


  const getCommonSearchByDate = (startDate, endDate, name, type) => {
    setSearchProgress(true)
    var SearchByDateOnly = {
      startDate: startDate,
      endDate: endDate
    }
    let recDate = 'recorded'
    if (type === 'Appointment') {// this is the reference number taken from dropdown list
      Commons.getTodayAppointments(SearchByDateOnly, recDate).then((res) => {
        setAppointments([])
        setAppointments(res.data);
        setDataLoad(true)
      });
    } else if (type = 'name' && (startDate !== 'NaN-NaN-NaN' && endDate !== 'NaN-NaN-NaN')) { // this is the name of the item

    } else if (type = 'name' && (startDate == 'NaN-NaN-NaN' && endDate == 'NaN-NaN-NaN')) {//  no date jus thte item

    } else {
      alert('You have to select an option')
    }
  }
  const updateConfirm = (id) => {
    let status = 'confirmed'
    Commons.updateAppointmentStatus(id, status).then(res => {
      alert('Appointment Confirmed successfully')
      getTodayPendingAppointments()
      getTodayConfirmedAppointments()
    })
  }
  const ReverseToConfirm = (id) => {
    let status = 'pending'
    Commons.updateAppointmentStatus(id, status).then(res => {
      alert('Appointment Confirmed successfully')
      getTodayPendingAppointments()
      getTodayConfirmedAppointments()
    })
  }


  const formatDateFn = (date) => {
    const selectedDate = new Date(date)
    return selectedDate.getFullYear() + '-' + parseInt(selectedDate.getMonth() + 1).toString().padStart(2, "0") + '-' + selectedDate.getDate().toString().padStart(2, "0");

  }

  const rejectConfirm = () => {
    let status = 'rejected'
    Commons.updateAppointmentStatus(id, status).then(res => {
      alert('Appointment rejected successfully')
    })
  }

 


  /*#endregion Listing data*/


  /*#region Printing */
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'emp-data'
  });
  /*#endregion Listing data*/




  return (
    <PagesWapper>

      <AnimateHeight id="animForm" duration={300} animateOpacity={true} height="100%">
        <ContainerRowBtwn clearBtn={clearBtn} form='Appointment' showLoader={showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>

            <DateInputRow label='Date' name='Date' val={date_time_come} handle={(date) => setDate_time_come(date)} />
            <div class="form-group row m-1">
              <label for='time' class="col-sm-3 col-form-label">Time</label>
              <div class="col-sm-9">
                <TimePicker className='form-control' onChange={onChange} id='time' value={time_come} />
              </div>
            </div>
            <DropDownInput handle={(e) => setService_grp_id(e.target.value)} name='Service group' label='servicegroup' >
              {serv_groups.map((grp) => (
                <option value={grp.id} val={grp.id} key={grp.id}> {grp.group_name} </option>
              ))}
            </DropDownInput>

            <DropDownInput handle={(e) => setCustomer(e.target.value)} name='Customer' label='Customer' >
              {customers.map((customer) => (
                <option value={customer.id} val={customer.id} key={customer.id}> {customer.names}   </option>
              ))}
            </DropDownInput>

            <DropDownInput handle={(e) => setDoctor(e.target.value)} name='Doctor' label='doctor' >
              {doctors.map((customer) => (
                <option value={customer.id} val={customer.id} key={customer.id}> {customer.surname}  {customer.name}    </option>
              ))}
            </DropDownInput>

            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
          </FormInnerRightPane>
          {/* <FormSidePane /> */}
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        {/* <ListToolBar listTitle='Appointment List' height={height} entity='Unit' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} /> */}
        
      </ContainerRow>
    </PagesWapper >


  );
}

export default pubAppointment;





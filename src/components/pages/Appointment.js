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
import { Row } from 'react-bootstrap'
import { Alert } from 'react-bootstrap'

function Appointment() {

  const [action, setAction] = useState(true)

  /*#region ---------- ENTITY FIELDS DECLARATIONS ---------------------------*/
  const [id, setId] = useState()
  const [date_time_done, setDate_time_done] = useState()
  const [date_time_come, setDate_time_come] = useState(new Date())
  const [customer, setCustomer] = useState()
  const [doctor, setDoctor] = useState()
  const [user_id, setUser_id] = useState()
  const [status, setStatus] = useState('pending')
  const [service_grp_id, setService_grp_id] = useState()
  const [names, setNames] = useState("")
  const [telephone, setTelephone] = useState("")
  const [gender, setGender] = useState("")

  /*#endregion Listing data*/

  const [showLoader, setShowLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [appointments, setAppointments] = useState([]) //Data List
  const [pendingAppointments, setPendingAppointments] = useState([]) //Data List
  const [confirmedAppointments, setConfirmedAppointments] = useState([]) //Data List
  const [appointmentsByrecordedDate, setAppointmentsByrecordedDate] = useState([]) //Data List
  const [rejectedAppointments, setRejectedAppointments] = useState([])
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

  const [isUpdateAppointment, setIsUpdateAppointment] = useState(1)

  const [refreshAftersave,setRefreshAftersave]= useState(false)
  /*#region ---------- SAVING DATA TO DB--------------------------------------*/
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setShowLoader(true)

    if (isUpdateAppointment == 0) {
      var appointmentRequestDto = {
        id: id, date_time_done: date_time_done, date_time_come: formatDateFn(date_time_come) + ` ${time_come}:00`,
        customer: customer, user_id: doctor, status: status, service_grp_id: service_grp_id
        , message: 'Thank you, your appointment for ' + formatDateFn(date_time_come) + ' ' + time_come + ' at Diamond Smile dental clinic is booked.',
        source: 'D.SMILE'
      }

      // this is not understandable
      if (id) {
        Commons.updateUnit(appointmentRequestDto, id).then((res) => {
          resetAfterSave()
        })
      } else {
        Commons.saveAppointment(appointmentRequestDto, service_grp_id).then((res) => {
          console.log(res.data)
         
          if (res.data != null) {
            resetAfterSave()
            getTodayAppointments()
            findAppntByRecordedDate()
            getTodayPendingAppointments()
            getTodayConfirmedAppointments()
            getTodayRejectedAppointments()
          }
          var mdl_messageValues = {
            message: 'Thank you for booking',
            destination: '0784113888',
            source: 'DSCLINIC'
          }



        }).catch((error) => {
          console.log('-----------')
        })
      }
    } else {
      var appointmentRequestDto = {
        id: id, names: names, gender: gender, telephone: telephone, date_time_done: date_time_done, date_time_come: formatDateFn(date_time_come) + ` ${time_come}:00`,
        customer: customer, user_id: doctor, status: status, service_grp_id: service_grp_id
        , message: 'Thank you, your appointment for ' + formatDateFn(date_time_come) + ' ' + time_come + ' at Diamond Smile dental clinic is booked.',
        source: 'D.SMILE'
      }
      Commons.saveAppointment(appointmentRequestDto, service_grp_id).then((res) => {
        resetAfterSave()
      })
    }

  }
  /*#endregion Listing data*/

  /*#region ------------All Records, Deleting and By Id------------------------*/
  const getAllAppointments = () => {
    Repository.findAppointment().then((res) => {
      setAppointments(res.data);
      setDataLoad(true)
    });
  }
  const getAllServ_groups = () => {
    Repository.findServ_group().then((res) => {
      setServ_groups(res.data);
      setDataLoad(true)
    });
  }
  const getTodayAppointments = () => {
    var SearchByDateOnly = {
      startDate: startDate,
      endDate: endDate
    }
    Commons.getTodayAppointments(SearchByDateOnly).then((res) => {
      setAppointments(res.data);
      setDataLoad(true)
    });
  }
  const getTodayPendingAppointments = () => {
    var SearchByDateOnly = {
      startDate: startDate,
      endDate: endDate
    }
    Commons.findAppointByStatus(SearchByDateOnly, 'pending').then((res) => {
      setPendingAppointments(res.data);
      setDataLoad(true)
      setAction(!action)
    });
  }
  const getTodayConfirmedAppointments = () => {
    var SearchByDateOnly = {
      startDate: startDate,
      endDate: endDate
    }
    Commons.findAppointByStatus(SearchByDateOnly, 'confirmed').then((res) => {
      setConfirmedAppointments(res.data);
      setDataLoad(true)
      setAction(!action)
    });
  }

  const getTodayRejectedAppointments = () => {
    var SearchByDateOnly = {
      startDate: startDate,
      endDate: endDate
    }
    Commons.findAppointByStatus(SearchByDateOnly, 'rejected').then((res) => {
      setRejectedAppointments(res.data);
      // console.log(res.data)
      // console.log("_____________________")
      // console.log(rejectedAppointments)
      setDataLoad(true)
    });
  }

  useEffect(() => {
    getTodayPendingAppointments()
    getTodayAppointments()
    findAppntByRecordedDate()
    getTodayConfirmedAppointments()
    getTodayRejectedAppointments()
    getAllServ_groups()
    getAllDoctors()
    getACustomers()
    setUser_id(localStorage.getItem('userid'))
    setClearBtn(false)
  }, [refreshAftersave]);

  console.log('userid: ' + user_id)

  const findAppntByRecordedDate = () => {
    var SearchByDateOnly = {
      startDate: startDate,
      endDate: endDate
    }
    Commons.findAppointmentByRecordedDate(SearchByDateOnly).then(res => {
      setAppointmentsByrecordedDate(res.data)
    })
  }

  const getAppointmentById = (id) => {
    Repository.findAppointmentById(id).then((res) => {
      setId(res.data.id)
      setDate_time_done(res.data.id)
      setDate_time_come(res.data.id)
      setCustomer(res.data.id)
      setUser_id(res.data.id)
      setStatus(res.data.id)
      setService_grp_id(res.data.id)
      setClearBtn(true)
      showheight('auto')
    })
  }
  const delAppointmentById = (id) => {
    Utils.Submit(() => {
      Delete.deleteAppointmentById(id, () => { getAllAppointments() })
    }, () => { })
  }

  const getAllDoctors = () => {
    Repository.findUserAndProfileByCategory('doctor').then((res) => {
      setDoctors(res.data);
      setDataLoad(true)
    });
  }
  const getACustomers = () => {
    Repository.findusersByCategory('patient', "customer").then((res) => {
      setCustomers(res.data);
      setDataLoad(true)
    });
  }
  /*#endregion Listing data*/

  /*#region ---------Show Height, reset all and clear Button   ------------*/
  function showheight(type) {
    setHeight(type)
  }
  const resetAfterSave = () => {
    setRefreshAftersave(!refreshAftersave)
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

  const rejectConfirm = (id) => {
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

      <AnimateHeight id="animForm" duration={300} animateOpacity={true} height={height}>
        <ContainerRowBtwn clearBtn={clearBtn} form='Appointment' showLoader={showLoader}  >
          <ClearBtnSaveStatus height={height} showLoader={showLoader} showAlert={showAlert} />
          <FormInnerRightPane onSubmitHandler={onSubmitHandler}>
            <Row>
              <Alert variant='primary'>
                The username of the patient will be his username and the default password is 123
              </Alert>
            </Row>

            <div>
              <InputRow name='Names' val={names} handle={(e) => setNames(e.target.value)} label='lblname' />
              <InputRow name='Telephone' val={telephone} handle={(e) => setTelephone(e.target.value)} label='lblname' />
              <DropDownInput handle={(e) => setGender(e.target.value)} name='gender' label='Geender' >
                <option selected={gender === 'Male'} value='Male' key={2}> Male </option>
                <option selected={gender === 'Female'} value='Female' key={3}> Female </option>
              </DropDownInput>
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
              <DropDownInput handle={(e) => setDoctor(e.target.value)} name='Doctor' label='doctor' >
                {doctors.map((customer) => (
                  <option value={customer.id} val={customer.id} key={customer.id}> {customer.surname}  {customer.name}    </option>
                ))}
              </DropDownInput>
            </div>

            <SaveUpdateBtns clearBtn={clearBtn} clearHandle={clearHandle} saveOrUpdate={FormTools.BtnTxt(clearBtn)} />
            {/* <button><Link to="/">add new</Link></button> */}
          </FormInnerRightPane>
          {/* <FormSidePane /> */}
        </ContainerRowBtwn>
      </AnimateHeight>
      <ContainerRow mt='3'>
        <ListToolBar listTitle='Appointment List' height={height} entity='Appointment' changeFormHeightClick={() => setHeight(height === 0 ? 'auto' : 0)} changeSearchheight={() => setSearchHeight(searchHeight === 0 ? 'auto' : 0)} handlePrint={handlePrint} searchHeight={searchHeight} />
        <SearchformAnimation searchHeight={searchHeight}>
          <SearchBox getCommonSearchByDate={getCommonSearchByDate} refreshClick={refreshClick} />
        </SearchformAnimation>

        <div ref={componentRef} className="dataTableBox">
          {
            !dataLoad && <DataListLoading />
          }
          <h3 className="appointmentTitles mt-2">Patients Coming today (Pending)   </h3>
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>
              <AppintmentHead mbtn='yes' />
            </TableHead>
            <tbody>
              {pendingAppointments.map((appointment) => {
                return (
                  <tr key={appointment.id}>
                    <AppointmentTableRows appointment={appointment} />
                    {/* <ListOptioncol getEntityById={() => getAppointmentById(appointment.id)} delEntityById={() => delAppointmentById(appointment.id)} /> */}
                    <td>
                      <a onClick={() => updateConfirm(appointment.id)} className='btn p-1 btn-success' href='#'>Confirm  </a>
                      <a onClick={() => rejectConfirm(appointment.id)} className='btn ms-2 p-1 btn-danger' href='#'>Reject</a>
                    </td>
                  </tr>
                )
              })}</tbody>
          </TableOpen>
        </div>
        <div ref={componentRef} className="dataTableBox">
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
        <div ref={componentRef} className="dataTableBox">
          <h3 className="appointmentTitles">Patients recorded Today    </h3>
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>
              <AppintmentHead />
            </TableHead>
            <tbody>
              {appointmentsByrecordedDate.map((appointment) => {
                return (
                  <tr key={appointment.id}>
                    <AppointmentTableRows appointment={appointment} />
                    {/* <ListOptioncol getEntityById={() => getAppointmentById(appointment.id)} delEntityById={() => delAppointmentById(appointment.id)} /> */}
                  </tr>
                )
              })}</tbody>
          </TableOpen>
        </div>
        <div ref={componentRef} className="dataTableBox">
          <h3 className="appointmentTitles">Today Confirmed appointments</h3>
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>
              <AppintmentHead mbtn='yes' />

            </TableHead>
            <tbody>
              {confirmedAppointments.map((appointment) => {
                return (
                  <tr key={appointment.id}>
                    <AppointmentTableRows appointment={appointment} />
                    <td>
                      <a onClick={() => ReverseToConfirm(appointment.id)} className='btn p-1 btn-success' href='#'>Reverse Confirmation  </a>

                    </td>
                  </tr>
                )
              })}</tbody>
          </TableOpen>
        </div>
        <div ref={componentRef} className="dataTableBox">
          <h3 className="appointmentTitles">Today Rejected appointments</h3>
          <PrintCompanyInfo />
          <TableOpen>
            <TableHead>
              <AppintmentHead mbtn='yes' />

            </TableHead>
            <tbody>
              {rejectedAppointments.map((appointment) => {
                return (
                  <tr key={appointment.id}>
                    <AppointmentTableRows appointment={appointment} />
                    <td>
                      <a onClick={() => ReverseToConfirm(appointment.id)} className='btn p-1 btn-success' href='#'>Reverse Confirmation  </a>

                    </td>
                  </tr>
                )
              })}</tbody>
          </TableOpen>
        </div>
      </ContainerRow>
    </PagesWapper >


  );
}

export default Appointment;


export const AppintmentHead = (props) => {
  return <>

    <td>Recorded Date</td>
    <td>Treatment Date</td>
    <td>Patient</td>
    <td>Done By</td>
    <td>status</td>
    {/* <td>service group</td> */}
    <td className='delButton d-none'>Option</td>
    {/* more button */}
    {props.mbtn === 'yes' && <td className=' '>Action</td>}

  </>
}

export const AppointmentTableRows = ({ appointment }) => {
  console.log(appointment)
  return <>
    <td>{appointment.date_time_done}   </td>
    <td>{appointment.date_time_come}   </td>
    {/*<td>{appointment.mdl_customer.names} 📞 {appointment.mdl_customer.telephone} </td>*/}
    <td>
      {/*{appointment.mdl_account.mdl_profile.name} {appointment.mdl_account.mdl_profile.surname}*/}
    </td>
    <td>{appointment.status}   </td>
    <td>{appointment.mdl_serv_group.group_name}   </td>

  </>
}
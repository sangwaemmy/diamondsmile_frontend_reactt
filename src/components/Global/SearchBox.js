import React from 'react'
import { useState } from 'react'
import { Icon } from 'react-icons-kit'
import { search } from 'react-icons-kit/icomoon/search'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import { ic_refresh as refreshBtn } from 'react-icons-kit/md/ic_refresh'


function SearchBox({ getCommonSearchByDate, refreshClick }) {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [name, setName] = useState()
    const [type, setType] = useState()


    const bg = {
        backgroundColor: "#fff"
    }


    const formatDateFn = (date) => {
        const selectedDate = new Date(date)
        return selectedDate.getFullYear() + '-' + parseInt(selectedDate.getMonth() + 1) + '-' + selectedDate.getDate();

    }

    return (
        <div className='container'>
            <div className='row pb-2  '>
                <div className='col-12 p-2 m-1 mt-2 d-flex justify-content-around2' style={{ borderRadius: "5px", border: "1px solid #fff", boxShadow: "0px 0px 3px #000", height: "auto", backgroundColor: "#e4e8eb" }}>
                    <form onSubmit={(e) => { e.preventDefault() }} className="row d-flex justify-content-end p-0 m-0">
                        <div className="col-auto ">
                            <select onChange={(e) => setType(e.target.value)} class="form-select form-select-md" title="Criteria" aria-label=".form-select-lg example">
                                <option>Select Option</option>
                                <option value="1">name</option>
                                <option value="Appointment">Appointment</option>
                            </select>
                        </div>
                        <div className='col-auto'>
                            <input type="text"
                                title="Enter the value of the criteria" required onChange={(e) => setName(e.target.value)} className="form-control" style={bg} id="staticEmail2" placeholder='Value' />
                        </div>
                        <div className="col-auto ">
                            <DatePicker className="form-control" selected={startDate} title="Pick the Start date"
                                onChange={(date) => setStartDate(date)}
                                monthsShown={4} format='yyyy-MM-dd'
                                showYearDropdown />
                            {/* <input type="text" className="form-control" style={bg}  id="staticEmail2" placeholder='Start date' /> */}
                        </div>
                        <div className="col-auto ">
                            <DatePicker className="form-control" selected={endDate} title="Pick the End date"
                                onChange={(date) => setEndDate(date)}
                                monthsShown={4} format='yyyy-MM-dd'
                                showYearDropdown />
                        </div>
                        <div className="col-auto ">
                            <button type="submit" className="btn btn-success" onClick={(e) => getCommonSearchByDate(formatDateFn(startDate), formatDateFn(endDate), name, type)}   >
                                <Icon style={{ color: '#fff', marginRight: "10px" }} icon={search} />
                                Enter
                            </button>
                        </div>
                        <button onClick={(e) => refreshClick(e)} className='col-auto btn btn-infso' style={{ backgroundColor: '#e0520be8' }}>
                            <Icon icon={refreshBtn} size={19} style={{ color: '#fff' }} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SearchBox

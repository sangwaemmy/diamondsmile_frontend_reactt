import React from 'react'
import { useState } from 'react'
import { Icon } from 'react-icons-kit'
import { search } from 'react-icons-kit/icomoon/search'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import { ic_refresh as refreshBtn } from 'react-icons-kit/md/ic_refresh'
import { GenIputRow } from './Forms/InputRow';


function DateField(props,{ dateVal }) {
    const [refDate, setRefDate] = useState();
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
        <GenIputRow name={props.name} label={props.label}>
                <DatePicker className="form-control" selected={refDate} title="Pick the Start date"
                    onChange={(dateVal) =>dateVal}
                    monthsShown={4} format='yyyy-MM-dd'
                    showYearDropdown />
                {/* <input type="text" className="form-control" style={bg}  id="staticEmail2" placeholder='Start date' /> */}
        </GenIputRow>

    )
}

export default DateField
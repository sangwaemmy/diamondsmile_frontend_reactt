import React from 'react'
import OtherStyles from '../../Styles/OtherStyles'
import { search } from 'react-icons-kit/icomoon/search'
import { Icon } from 'react-icons-kit'
import ReactDatePicker from 'react-datepicker'

function InputRow(props) {
    return (
        <>
            <GenIputRow name={props.name} label={props.label}>
                <input type="text"   disabled={props.disabled==true?'disabled':''} autoComplete='false' required style={OtherStyles.txt()} value={props.val}
                    onChange={props.handle} className="form-control" id={props.label} />
            </GenIputRow>
        </>
    )
}
export function NumberInputRow(props) {
    return(
        <>
            <GenIputRow name={props.name} label={props.label}>
                <input type="number" autoComplete='false' required style={OtherStyles.txt()} value={props.val}
                    onChange={props.handle} className="form-control" id={props.label} />
            </GenIputRow>
        </>
    )
}
export function FileInputRow(props) {
    return(
        <>
            <GenIputRow name={props.name} label={props.label}>
                <input type="file" autoComplete='false' required style={OtherStyles.txt()} value={props.val}
                    onChange={props.handle} className="form-control" id={props.label} />
            </GenIputRow>
        </>
    )
}
export function PasswordInputRow(props) {
    return (
        <>
            <GenIputRow name={props.name} label={props.label}>
                <input type="password" autoComplete='false' required style={OtherStyles.txt()} value={props.val}
                    onChange={props.handle} className="form-control" id={props.label} />
            </GenIputRow>
        </>
    )
}
export function DateInputRow(props) {
    return (
        <>
            <GenIputRow name={props.name} label={props.label}>
                <ReactDatePicker monthsShown={4} style={OtherStyles.txt()} className="datepicker form-control" format='yyyy-MM-dd' selected={props.val}
                 onChange={props.handle} />

           </GenIputRow>
        </>
    )
}
export function InputRowPsw(props) {
    return (
        <>
            <GenIputRow name={props.name} label={props.label}>
                <input type="password" autoComplete='false' required style={OtherStyles.txt()} value={props.val}
                    onChange={props.handle} className="form-control" id={props.label} />
            </GenIputRow>
        </>
    )
}

export const BtnInputRow = (props) => {
    return (
        <div class="form-group row m-1">
            <button className='btn  col-sm-3 col-form-label' onClick={props.handle} style={{ color: "#000", fontWeight: "bolder", backgroundColor: "#b4c7f2da" }}> {props.name} </button>
            <div class="col-sm-9">
                <span className='p-2 mt-3'>
                    {props.status}
                </span>

            </div>
        </div>
    )
}

export const GenIputRow = (props) => {
    return (
        <div class="form-group row m-1">
            <label for={props.label} class="col-sm-3 col-form-label">{props.name}</label>
            <div class="col-sm-9">
                {props.children}

            </div>
        </div>
    )
}
export const InputAndSearch = (props) => {
    return (
        <>
            <GenIputRow name={props.name} label={props.labe}>
                <div className="input-group flex-nowrap">
                    <input type="text" className="form-control" onChange={props.changedContent} placeholder="Type item name" aria-label="Username" aria-describedby="addon-wrapping" />
                    <span className=" input-group-text" id="addon-wrapping" onClick={props.handle}>
                        <Icon style={{ color: '#230d02', marginRight: "10px" }} icon={search} />
                    </span>
                </div>

            </GenIputRow>
            <div className='row'>
                {props.children}
            </div>
        </>

    )
}



export const DropDownInputWithLoader = (props) => {
    return (<>

        <GenIputRow name={props.name} label={props.label}>
            <select required style={OtherStyles.txt()} onChange={props.handle} className="form-select" id={props.label} >
                <option></option>

                {props.children}
            </select>
        </GenIputRow>
    </>)

}
export const DropDownInput = (props) => {
    return (<>

        <GenIputRow name={props.name} label={props.label}>
            {props.showmoreload &&
                <div className='row'>
                    <div className='unitsLoading' style={{ backgroundColor: '#fff', position: 'relative', overflow: 'hidden', width: '380px', height: '40px' }}>
                    </div>
                </div>}
            <select required style={OtherStyles.txt()} onChange={props.handle} className="form-select" id={props.label} >
                <option></option>
                {props.children}
            </select>
        </GenIputRow>
    </>)
}

export const LoadSub = (props) => {
    return (
        <>
            {props.showmoreload &&
                <div className='row'>
                    <div className='unitsLoading' style={{ backgroundColor: '#fff', position: 'relative', overflow: 'hidden', width: '380px', height: '40px' }}>
                    </div>
                </div>
            }
        </>
    )
}
export const EmptyInputRow = (props) => {
    return (
        <>
            <GenIputRow name={props.name} label={props.label}>
                <input type="text" autoComplete='false' style={OtherStyles.txt()} value={props.val}
                    onChange={props.handle} className="form-control" id={props.label} />

            </GenIputRow>
        </>
    )
}



export default InputRow
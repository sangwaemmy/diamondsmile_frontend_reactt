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

 function ListOptioncol(props) {
    return (
        <>
            <td className='delButton optCol' >
                <div className='row d-flex justify-content-center'>
                    <button onClick={props.getEntityById} style={{ width: "20px" }} title="Update Record" className='mr-0 p-0 btn round-circle'>
                        <Icon size={16} style={{ color: '#0fd120', marginRight: "10px" }} icon={edit} />
                    </button>
                    <button onClick={props.delEntityById} style={{ width: "20px", marginLeft: "20px" }} title="Update Record" className=' ml-0 p-0 btn'>
                        <Icon size={10} style={{ color: '#ff0000', marginRight: "10px" }} icon={remove} />
                    </button>
                </div>
            </td>
        </>    )
}
export default ListOptioncol


export const TableOpen = (props) => {
    return (
        <div className='DataTableBox'>
            <table style={{backgroundColor: props.changedbgColor ==1?'#f7fdfa':'#fff'}} className='table clinicTable table-responsive table-striped dataTable table-bordered'>
                {props.children}

            </table>
        </div>
    )
}

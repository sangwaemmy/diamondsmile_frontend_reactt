import React from 'react'
import Icon from 'react-icons-kit'
import { ic_thumb_up_alt as ok } from 'react-icons-kit/md/ic_thumb_up_alt'

function TableCommons() {
    return (
        <div>TableCommons</div>
    )
}

export default TableCommons


// This is specific for purchase, sale and item
export const LocalTableHead = () => {
    return <>
        <LocalTableHeadCommon>
            <td>Select</td>
        </LocalTableHeadCommon>
    </>
}
export const LocalTableHeadItemsPage = () => {
    return <>
        <LocalTableHeadCommon>
            <td>Select</td>
        </LocalTableHeadCommon>
    </>
}

export const LocalTableHeadCommon = (props) => {
    return <> <td>ITEM</td>
        <td>Category</td>
        <td>Remaining</td>
        {props.children}
    </>
}



export const TableRows = ({ item, searchDone }) => {
    return <tr>
        <td>{item.name}       </td>
        <td>{item.item_name}</td>
        <td >{item.balance}</td>
        <Event item={item} searchDone={searchDone} />
    </tr>
}
export const TableRowsNoChoose = ({ item }) => {
    return <tr>
        <td>{item.name}       </td>
        <td>{item.item_name}</td>
        <td >{item.balance}</td>

    </tr>
}


export const Event = ({ item, searchDone }) => {
    return <td>
        <Icon onClick={(e) => searchDone(item.id, item.name)} size={30} className='handCursor'
            style={{ boxShadow: '0px 0px 4px #fff', color: '#e6540b', marginRight: "10px" }}
            icon={ok}
        />
    </td>
}

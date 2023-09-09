import React from 'react'
import OtherStyles from '../Styles/OtherStyles'

function TableHead(props) {

  
  return (
    <thead style={{backgroundColor: props.changedbgColor ==1?'#034e29':'#fff'}}>
    <tr style={OtherStyles.thead()}>
       {props.children}
    </tr>
</thead>
  )
}

export default TableHead

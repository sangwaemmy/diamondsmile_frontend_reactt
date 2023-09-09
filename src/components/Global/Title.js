import React from 'react'

export function EditTitle(props){
  const space={
    marginBottom: "15px"

  }
  return (
    <h4 class="boldTitle" style={space}>Edit  {props.name}</h4>
  )
}

function Title(props) {
  const space={
    marginBottom: "15px"

  }
  return (
    <h4 class="boldTitle" style={space} >Add new {props.name}</h4>
  )
}

export default Title
import React from 'react'

export function EditTitle(props){
  const space={
    marginBottom: "15px",
    fontFamily: "timesNewRoman"

  }
  return (
    <h4 class="boldTitle h4 font-weight-bolder text-uppercase" style={space}>Edit  {props.name}</h4>
  )
}

function Title(props) {
  const space={
    marginBottom: "15px",
    fontFamily: "timesNewRoman"

  }
  return (
    <h4 class="boldTitle h4 font-weight-bolder text-uppercase" style={space} >Add new {props.name}</h4>
  )
}

export default Title
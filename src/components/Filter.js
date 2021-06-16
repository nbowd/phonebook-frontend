import React from 'react'
import Inputs from './Inputs'


const Filter = ({text, value, setFunction}) => {
  return (
    <div>{text} <Inputs value={value} setFunction={setFunction}/></div>
  )
}

export default Filter
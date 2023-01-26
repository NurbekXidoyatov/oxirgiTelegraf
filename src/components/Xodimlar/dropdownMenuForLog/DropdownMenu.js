import React,{useState} from 'react'
import Dropdown from './Dropdown'

export default function DropdownMenu() {

    const [selected, setSelected] = useState("Log")
  return (
    <div>
        <Dropdown setSelected={setSelected} selected={selected}/>
    </div>
  )
}

import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import "./dropdown.css"

export default function Dropdown({selected, setSelected}) {

    const [isActive, setIsActive] = useState(false)
    const options = [
      {name:"Admin Log", path:"/adminlog"},
      {name:"MTU Log", path:"/departmentlog"},
      {name:"Manager Log", path:"/managerlog"},
      {name:"Korxona Log", path:"/organizationlog"},
      {name:"Ishchilar Log", path:"/employeelog"}
      ]


  return (
    <div className='dropdown'>
       <div className='dropdown_btn' onClick={() => setIsActive(!isActive)}>
           <span className='dropdown_edit_icon'><i class="fa-solid fa-pen-to-square"></i></span>
          {selected}
          <span  className='dropdown_down_icon'><i class="fa-solid fa-sort-down"></i></span>
       </div>   
      {isActive && (
         <div className='dropdown_content'>
        {options.map((item) => (
             <Link to={item.path} className='dropdown_item'
              onClick={() => {
                setSelected(item.name)
                setIsActive(false)}}>
                {item.name}
            </Link>
        ))}
      </div>
      )}
    </div>
  )
}

// const paths = ["Admin Log", "Department Log", "Employee Log", "Manager Log", "Organization Log"]
    

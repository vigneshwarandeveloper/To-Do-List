import React from 'react'
import { FaTrash } from "react-icons/fa";

const LineItem = ({item,handleDelete,handlecheck}) => {
  return (
    <li className='item' key={item.id}>
            <input
            type='checkbox'
            onChange={()=>handlecheck(item.id)}
            checked={item.checked}
            />

            <label 
            style={(item.checked)?{textDecoration:"line-through"}:null}
            onDoubleClick={()=>handlecheck(item.id)}
            >
            {item.item}
            </label>

            <FaTrash 
            onClick={()=>{handleDelete(item.id)}}
            role="button" />
            </li>
  )
}

export default LineItem
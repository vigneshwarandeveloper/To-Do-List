import React, { useRef } from 'react'
import {FaPlus} from "react-icons/fa"

const AddItem = ({newitem,setnewitem,handlesubmit}) => {
    const inputref=useRef();
  return (
   <form className="addForm" onSubmit={handlesubmit}>
    <label htmlFor='additem'>AddItem</label>
    <input 
    type='text'
    autoFocus
    ref={inputref}
    id='addItem'
    placeholder='Add item'
    required
    value={newitem}
    onChange={(e)=>setnewitem(e.target.value)}
    />

    <button 
    type='submit' 
    aria-label='Add Item'
    onClick={()=>inputref.current.focus()}
    >
        <FaPlus />
    </button>
   </form>
  )
}

export default AddItem
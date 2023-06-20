import React from 'react'
import ItemList from './ItemList';

const Content = ({items,handleDelete,handlecheck}) => {


  return (
    <>
    {items.length?(
    <ItemList 
    items={items} 
    handleDelete={handleDelete} 
    handlecheck={handlecheck}/>
    ):(
        <p style={{marginTop:"2rem"}}>Your List is Empty</p>
    )}
    </>
  )}

export default Content
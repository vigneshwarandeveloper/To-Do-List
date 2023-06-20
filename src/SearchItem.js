import React from 'react'

const SearchItem = ({search,setsearch}) => {
  return (
    <form className='searchForm' onSubmit={(e)=>e.preventDefault()}>
    <label htmlFor="search">Search</label>
    <input 
    type="text" 
    name="" 
    id="search" 
    role='searchbox'
    placeholder='Search Item'
    value={search}
    onChange={(e)=>setsearch(e.target.value)}
    />
    </form>
  )
}

export default SearchItem
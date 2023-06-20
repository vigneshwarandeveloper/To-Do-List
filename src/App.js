import React, { useEffect } from 'react'
import Content from './Content'
import Header from './Header'
import Footer from './Footer'
import { useState } from 'react'  
import AddItem from './AddItem'
import SearchItem from './SearchItem'
import apiRequest from './apiRequest'



const App = () => {
  const API_URL="http://localhost:3500/items";


  const [items,setitems]=useState([]);
const [newitem,setnewitem]=useState("");
const [search,setsearch]=useState("");
const [fetcherror,setfetcherror]=useState(null);
const [isLoading,setisLoading]=useState(true);


useEffect(()=>{

  const fetchitem=async()=>{
    try{
      const response=await fetch(API_URL);
      if(!response.ok){
        throw new Error("Something went wrong");
      }
      const listitems=await response.json();
      setitems(listitems);
      setfetcherror(null);
    }catch(err){
      setfetcherror(err.message)
    }finally{
      setisLoading(false);
    }
  }
  setTimeout(()=>{
    (async()=> await fetchitem())();
  },2000)
  
},[])



const handlecheck= async(id)=>{
  const listitems=items.map((item)=>item.id===id?{...item,checked:!item.checked}:item)
  setitems(listitems)



  const myitem=listitems.filter(item=>item.id===id);
  const updateOptions={
    method:"PATCH",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({checked:myitem[0].checked})
  }
  const reqUrl=`${API_URL}/${id}`;
  const result=await apiRequest(reqUrl,updateOptions)
  if(result)setfetcherror(result)
}

const handleDelete=async(id)=>{
  const listitems=items.filter((item)=>item.id !== id);
  setitems(listitems)

const deletOption={method:"DELETE"};
const reqUrl=`${API_URL}/${id}`;
const result=await apiRequest(reqUrl,deletOption)
if(result)setfetcherror(result)
}


const addItem= async (item)=>{
  const id=items.length?items[items.length-1].id+1:1;
  const mynewitem={id,checked:false,item};
  const listitems=[...items,mynewitem];
  setitems(listitems);
  const postOptions={
    method:'POST',
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(mynewitem)
  }
  const result=await apiRequest(API_URL,postOptions);
  if(result)setfetcherror(result);
}


const handlesubmit=(e)=>{
  e.preventDefault();   
  if(!newitem)return;
  addItem(newitem);
  setnewitem("");
}






  return (
    <div className='App'>
    <Header title="To-Do-List" />
    <AddItem 
      newitem={newitem}
      setnewitem={setnewitem}
      handlesubmit={handlesubmit}
    />
    <SearchItem 
      search={search}
      setsearch={setsearch}
    />
    <main>
    {isLoading && <p>Loading Items...</p>}
    {fetcherror && <p style={{color:"red"}}>{`Error:${fetcherror}`}</p>}
     {!fetcherror &&  !isLoading &&<Content 
      items={items.filter((item)=>((item.item).toLowerCase()).includes(search.toLowerCase()))}
      setitems={setitems}
      handlecheck={handlecheck}
      handleDelete={handleDelete}
      />}
    </main>
    <Footer 
   length={items.length}/>
    </div>
  )
}


export default App
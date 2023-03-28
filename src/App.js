import { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios'

function App() {
  const[foodName , setFoodName]  = useState('');
  const[days , setDays] = useState(0);
  const[foodList , setFoodList] = useState([]);
  const [isUpdate , setIsUpdate] = useState(false);
  const [newFood , setNewFood] = useState('');

 
  useEffect(()=>{
   Axios.get("http://localhost:8080/read").then((response)=>{
    console.log(response)
    setFoodList(response.data);
   })  
  },[])

  const addToList = ()=>{
    Axios.post('http://localhost:8080/insert', {foodName : foodName , days : days})
  }

  const deleteFood = (id)=>{
     Axios.delete(`http://localhost:8080/delete/${id}`);
  }

  const   updateFood = async (id)=>{
    setIsUpdate(!isUpdate);

      console.log(newFood)
      
      await Axios.put('http://localhost:8080/update' , {
      id:id,
      newFoodName : newFood
    })

     
  }

  return (
    <div className="App">
    <label > Food Name</label>
      <input type="text" onChange={(event)=> {setFoodName(event.target.value)} } ></input>
      <label > Days </label>
      <input type="number" onChange={(event)=> {setDays(event.target.value)} } ></input>
       <button onClick={addToList} >Add</button>

       <br />
       <h2>Reload the page after a task!</h2>
     <br />

     { foodList.length != 0 ? foodList.map((val , key)=>{
       return <div key={key}>
         <h1>{val.foodName} - {val.daysSinceIAte}</h1>
         {isUpdate ?  <input onChange={(event)=> {setNewFood(event.target.value)}} type="text" /> : ""}
         <button onClick={()=> updateFood(val._id)} >{isUpdate ? "Submit" : "Update"}</button>
         {isUpdate ? <button onClick={()=> setIsUpdate(false)} style={{"marginLeft": "10px"}}> Cancel </button> : <button onClick={() => deleteFood(val._id)} style={{"marginLeft": "10px"}}> Delete </button> }
       </div>
     }) : <div> <h1  >Enter some Food !</h1> </div>}

    </div>
  );
}

export default App;

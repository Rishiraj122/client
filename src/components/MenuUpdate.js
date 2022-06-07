import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useHistory } from 'react-router-dom'
import Header from '../components/Header.js'

const MenuUpdate = () =>{
    const history = useHistory();//history instance a react hook

    const [foodname,setFoodname]=useState('');
    const [main,setMain]=useState('');
    const [vegfood,setVegfood]=useState('');
    const [nonvegfood,setNonvegfood]=useState('');


    async function publishFood(event){
        event.preventDefault();

        const response = await fetch('https://hms-nist.herokuapp.com/api/foodtoday',{
            method: 'POST',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify({
                foodname,
                main,
                vegfood,
                nonvegfood
            }),
        })

        const data = await response.json();
        if(data.status=='ok'){
            alert("Food Published")
            window.location.href='/menuupdate'
        }

    }
    

    useEffect(() => { //useEffect react hook to tell React that 
        //components need to do something on render
        const token = localStorage.getItem('token');
        if(!token) {
            const user = jwt.decode(token) // for authentication
            history.push('/login'); //if authentication fails load the login page
        }
      })

    return (
        <div>
       <Header/>
            <div className="box">
                    <h1>Add Menu</h1>
  
                    <form onSubmit={publishFood}>
                    
                    <select className="dropdown-text input-control2 rounded-pill" id="dropdown" style={{padding:"12px", margin:"25px"}} onChange={(e) => setFoodname(e.target.value)}>
                        <option value="foodname" disabled selected hidden>Meal</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Snacks">Snacks</option>
                        <option value="Dinner">Dinner</option>
				    </select><br/>

                    <input className="input-control2 rounded-pill" value={main} name="main course" type="text" 
                        onChange={(e)=>setMain(e.target.value)} placeholder="&#xf2e7;  Main Course"></input><br/><br/>
                    <input className="input-control2 rounded-pill" value={vegfood}
                        onChange={(e) => setVegfood(e.target.value)} placeholder='&#xf787;  Veg' name='vegfood'></input><br/><br/>
                    <input className="input-control2 rounded-pill" value={nonvegfood}
                        onChange={(e) => setNonvegfood(e.target.value)} placeholder='&#xf7fb;  Non-veg' name='nonvegfood'></input><br/><br/>
                    <button className="btn btn-control btn-dark rounded-pill">Send</button>

                </form>
                <br/>
            </div>   
        </div>
    )
}

export default MenuUpdate
import React,{useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import Header from './Header'
import jwt from 'jsonwebtoken'

const MessBill=()=>{
    const history = useHistory()

    const [messbill,setMessbill]=useState('');
    const [roll,setRoll]=useState('');

    async function addMess(event){
        event.preventDefault();

        const response = await fetch('https://hms-nist.herokuapp.com/api/messbill',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                messbill,
                roll
            })
        })

        const data = await response.json()

        if(data.status=='ok'){
            alert("Bill Added");
            window.location.href="messbill"
        }

    }

    const goBack=()=>{
        window.location.href="/staffdashboard"
    }

    useEffect(() => { //useEffect react hook to tell React that 
        //components need to do something on render
        const token = localStorage.getItem('token');
        if(!token) {
            const user = jwt.decode(token) // for authentication
            history.push('/login'); //if authentication fails load the login page
        }
    })


    return(
        <div>
            <Header/>
            <div className="box">
            <h1>Mess Bill</h1>

                    <form onSubmit={addMess}>
                    
                    <input className="input-control2 rounded-pill" type="number" placeholder="Student Roll Number" value={roll} required onChange={(e)=>setRoll(e.target.value)}></input><br/><br/>

                        <label className="form-check-label">Breakfast:</label>
                        <input className="form-check-input" type="radio" name="food" value={messbill} onClick={(e)=>setMessbill(30)}></input>
                        <label className="form-check-label">Veg</label>
                        <input className="form-check-input" type="radio" name="food" value={messbill} onClick={(e)=>setMessbill(50)}></input>
                        <label className="form-check-label">Non-Veg</label>
                        <br/>
                    
                    <label className="form-check-label">Lunch: </label>
                    <input className="form-check-input" type="radio" name="food" value={messbill} onClick={(e)=>setMessbill(70)}></input>
                    <label className="form-check-label">Veg</label>
                    <input className="form-check-input" type="radio" name="food" value={messbill} onClick={(e)=>setMessbill(110)}></input>
                    <label className="form-check-label">Non-Veg</label>
                    <br/>
    
                    <label className="form-check-label">Snacks: </label>
                    <input className="form-check-input" type="radio" name="food" value={messbill} onClick={(e)=>setMessbill(25)}></input>
                    <label className="form-check-label">Veg</label>
                    <input className="form-check-input" type="radio" name="food" value={messbill} onClick={(e)=>setMessbill(50)}></input>
                    <label className="form-check-label">Non-Veg</label>
                    <br/>
    
                    <label className="form-check-label">Dinner: </label>
                    <input className="form-check-input" type="radio" name="food" value={messbill} onClick={(e)=>setMessbill(150)}></input>
                    <label className="form-check-label">Veg</label>
                    <input className="form-check-input" type="radio" name="food" value={messbill} onClick={(e)=>setMessbill(200)}></input>
                    <label className="form-check-label"> Non-Veg</label>
                    <br/><br/><br/>
    
                    <button className="btn-control btn btn-dark rounded-pill"><i className="fas fa-plus"></i> Add Amount</button><br/><br/>
                </form>
                <button className="btn-control btn btn-light rounded-pill" onClick={goBack}><i className="fas fa-arrow-left"></i> Go Back</button>
               
            </div>

            
        </div>
    )
}

export default MessBill;
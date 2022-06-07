import React,{useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import Header from './Header'
import jwt from 'jsonwebtoken'

const HostelBill=()=>{
    const history = useHistory()

    const [hostelbill,setHostelbill]=useState('');
    const [commonbill,setCommonbill]=useState('');
    const [roll,setRoll]=useState('');

    async function addHostel(event){
        event.preventDefault();

        const response = await fetch('https://hms-nist.herokuapp.com/api/hostelbill',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                hostelbill,
                roll
            })
        })

        const data = await response.json()

        if(data.status=='ok'){
            alert("Bill Added");
            window.location.href="hostelbill"
        }

    }
//This is The New Thing Made
    async function addCommonBill(event){
        event.preventDefault();

        const response = await fetch('https://hms-nist.herokuapp.com/api/billforall',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                commonbill,
            })
        })

        const data = await response.json()

        if(data.status=='ok'){
            alert("Bill Added");
            window.location.href="/wardendashboard"
        }

    }

    const goBack=()=>{
        window.location.href="/wardendashboard"
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
            <h1>Hostel Bill</h1>
            <form onSubmit={addHostel}>
                <label className="input-control2" style={{width:"17rem"}}>Student Roll Number:</label>
                <input className="input-control2 rounded-pill" style={{width:"20rem"}} type="number" placeholder="Enter Roll Number" required value={roll} onChange={(e)=>setRoll(e.target.value)}></input><br/><br/>
                
                <label className="input-control2" style={{width:"20rem"}}>Electricity & Maintenance Charges:</label>
                <input className="input-control2 rounded-pill" style={{width:"15rem"}} type="number" placeholder="Enter Amount" required value={hostelbill} onChange={(e)=>setHostelbill(e.target.value)}></input>
                <button className="btn btn-control btn-dark rounded-pill" style={{width:"8rem"}}><i className="fas fa-plus"></i>  Add</button><br/><br/>
            </form>

            <form onSubmit={addCommonBill}>
                <label className="input-control2" style={{width:"20rem"}}>Common Charges:</label>
                <input className="input-control2 rounded-pill" style={{width:"15rem"}} type="number" placeholder="Enter Amount" required value={commonbill} onChange={(e)=>setCommonbill(e.target.value)}></input>
                <button className="btn-control btn btn-dark rounded-pill" style={{width:"8rem"}}><i className="fas fa-plus"></i>  Add</button><br/><br/>
            </form>

            <button className="btn-control btn btn-light rounded-pill" style={{width:"10rem"}} onClick={goBack}><i className="fas fa-arrow-left"></i>  Go Back</button>
        </div>
        </div>
    )
}

export default HostelBill;
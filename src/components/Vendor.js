import React,{useEffect,useState} from "react";
import jwt from 'jsonwebtoken';
import { useHistory } from "react-router-dom";
import Header from "./Header";

const Vendor=()=>{
    const history = useHistory();

    const[name,setName]=useState('');
    const[phone,setPhone]=useState('');
    const[fooditem,setFooditem]=useState('');
    const[payment,setPayment]=useState('');

    async function addVendor(event){
        event.preventDefault();

        const response = await fetch('https://hms-nist.herokuapp.com/api/vendor',{
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify({
                name,
                phone,
                fooditem,
                payment,
                
            }),
        })
        const data=await response.json();
        if(data.status=='ok'){
            alert('Vendor Added')
            history.push('/staffdashboard');
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

    return(
        <div>
        <Header/>
            <h1>Add Vendor Data</h1>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6">
                        <img className="dashboard-img" src="../images/vendor.png"></img>
                    </div>
                    <div className="btn-col col-lg-6">
                    <form className="form1" onSubmit={addVendor}>
                        <p>
                        <label className="label1">Name:</label>
                        <input className="input1 rounded-pill" required value={name} onChange={(e)=>setName(e.target.value)} type="text"></input><br/>
                        </p>

                        <p>
                        <label className="label1">Phone Number:</label>
                        <input className="input1 rounded-pill" 
                                value={phone} 
                                onChange={(e)=>setPhone(e.target.value)} 
                                type="tel"
                                minLength="10"
                                maxLength="10" 
                                required
                                >
                        </input><br/>
                        </p>

                        <p>
                        <label className="label1">Food Item:</label>
                        <input className="input1 rounded-pill" required value={fooditem} onChange={(e)=>setFooditem(e.target.value)} type="text"></input><br/>
                        </p>

                        <p>
                        <label className="label1">Payment:</label>
                        <input className="input1 rounded-pill" required value={payment} onChange={(e)=>setPayment(e.target.value)} type="number"></input><br/><br/>
                        </p>

                        <button className="btn btn-dark rounded-pill"><i className="fas fa-plus"></i> Add</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
} 
export default Vendor;
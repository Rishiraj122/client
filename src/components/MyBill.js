import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import Header from './Header'

function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  
const MyBill=()=>{
    const navigate=useNavigate();
    const [messbill, setMessbill]=useState('');
    const [hostelbill, setHostelbill]=useState('');
    const [roll, setRoll]=useState('');
    const [roomFee, setRoomFee]=useState('');
    const [messFee, setMessFee]=useState('');

    useEffect(()=>{
        const token=localStorage.getItem('token');
        if(token){
            const user = jwt.decode(token)
            if(!user){
                localStorage.removeItem('token');
                navigate('/login')
            }
            getBill();
        }
        else{
            navigate('/login')
        }
    })

    const goBack=()=>{
        window.location.href="/studentdashboard"
    }

    const getBill=()=>{
        const token = localStorage.getItem('token');
        const user = jwt.decode(token)
        fetch('https://hms-nist.herokuapp.com/api/mybill',)
        .then((response)=>response.json())
        .then((json)=>{
            for(let i=0;i<json.user.length;i=i+1){
                if(user.roll==json.user[i].roll){
                    console.log(user.roll);
                    setRoll(user.roll);
                    setHostelbill(json.user[i].hostelbill);
                    setMessbill(json.user[i].messbill);
                }
            }
        })
    }

    //For Hostel Fee Payment

    async function showRazorpay() {
        const res = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
        );
    
        if (!res) {
          alert("Razorpay SDK failed to load. Are you online?");
          return;
        }
    
        const data = await fetch("https://hms-nist.herokuapp.com/api/razorpay", {
            method: "POST",
            headers:{
                'Content-Type':'application/json',
            },
                body: JSON.stringify({
                    amount:hostelbill,
            })
        }).then((t) => t.json());
    
        console.log(data);
    
        const options = {
          key: "rzp_test_0tpemkHKm5K1Bc",
          currency: data.currency,
          amount: roomFee*100,
          order_id: data.id,
          name: "Hostel Fees",
          description: "Amount To Be Paid For Hostel Mess Service",
          handler: function (response) {
            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature);
            deductAmount();
            async function deductAmount(event){
                const response = await fetch('https://hms-nist.herokuapp.com/api/billpayed',{
                    method: 'POST',
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify({
                        roomFee,
                        roll
                    })
                })
        
                const data = await response.json()
        
                if(data.status=='ok'){
                    alert("Fees Paid");
                    window.location.href="mybill"
                }
            }
          },
          prefill: {
            name: "Your Name",
            email: "email@example.com",
            phone_number: "1234567890",
          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      }

      //For Mess Fee Payment Functions
      async function showRazorpayMess() {
        const res = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
        );
    
        if (!res) {
          alert("Razorpay SDK failed to load. Are you online?");
          return;
        }
    
        const data = await fetch("https://hms-nist.herokuapp.com/api/razorpay", {
            method: "POST",
            headers:{
                'Content-Type':'application/json',
            },
                body: JSON.stringify({
                    amount:messbill,
            })
        }).then((t) => t.json());
    
        console.log(data);
    
        const options = {
          key: "rzp_test_0tpemkHKm5K1Bc",
          currency: data.currency,
          amount: messFee*100,
          order_id: data.id,
          name: "Mess Fees",
          description: "Amount To Be Paid For Hostel Room Service",
          handler: function (response) {
            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature);
            deductAmount();
            async function deductAmount(event){
                const response = await fetch('https://hms-nist.herokuapp.com/api/paymessbill',{
                    method: 'POST',
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify({
                        messFee,
                        roll
                    })
                })
        
                const data = await response.json()
        
                if(data.status=='ok'){
                    alert("Fees Paid");
                    window.location.href="mybill"
                }
        
            }

          },
          prefill: {
            name: "Your Name",
            email: "email@example.com",
            phone_number: "1234567890",
          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      }

    return(
        <div>
          <Header/>
          <div className="box">
            <h1>My Bill</h1>
            <p>Roll Number: {roll}</p>
            <p>Hostel Charges: {hostelbill}</p>
            <p>Mess Charges: {messbill}</p>
            <input className="input-control2 rounded-pill" type="number" placeholder="Enter Hostel Fee Amount" value={roomFee} onChange={(e)=>setRoomFee(e.target.value)}></input>
            <button className="btn-control btn btn-dark rounded-pill" onClick={showRazorpay}><i className="fas fa-money-check"></i> Pay Hostel Fee</button><br/><br/>
            <input className="input-control2 rounded-pill" type="number" placeholder="Enter Mess Fee Amount" value={messFee} onChange={(e)=>setMessFee(e.target.value)}></input>
            <button className="btn-control btn btn-light rounded-pill" onClick={showRazorpayMess}><i className="fas fa-money-check"></i> Pay Mess Fee</button><br/><br/>
            <button className="btn-control btn btn-dark rounded-pill" onClick={goBack}><i className="fas fa-arrow-left"></i>  Go Back</button>
          </div>
        </div>
    )
} 

export default MyBill;
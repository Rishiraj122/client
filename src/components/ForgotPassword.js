import React,{useState} from 'react';
import Header from './Header';

const ForgotPassword=()=>{

    const [email,setEmail]=useState('');
    const [phone,setPhone]=useState('');
    const [password,setPassword]=useState('');
    const [aadhar, setAadhar]=useState('');
    
    async function changePassword(event){
        event.preventDefault();

        const response = await fetch('https://hms-nist.herokuapp.com/api/forgotpassword',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                email,
                phone,
                password,
                aadhar
            })
        })

        const data = await response.json()

        if(data.status=='ok'){
            alert("Password Added");
            window.location.href="studentlogin"
        } else{
            alert("Could Not Update Password")
        }
    }

    return(
        <div>
            <Header/>
            <form onSubmit={changePassword}>
                <div className="box">
                    <h1>Change Password</h1>
                        <input className="input-control rounded-pill" value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="&#xf0e0;  E-mail"></input><br/>
                        <input className="input-control rounded-pill" value={phone} onChange={(e)=>setPhone(e.target.value)} type="number" minLength="10" maxLength="10" placeholder="&#xf095;  Phone Number"></input><br/>
                        <input className="input-control rounded-pill" value={aadhar} onChange={(e)=>setAadhar(e.target.value)} type="number" placeholder="&#xf2bb;  Aadhar Number"></input><br/>
                        <input className="input-control rounded-pill" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="&#xf023;  New Password"></input> <br/> <br/>
                        <button className="btn-control btn btn-dark rounded-pill">Reset</button>
                </div>
            </form>
        </div>
    )
}

export default ForgotPassword;
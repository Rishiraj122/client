import React,{useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import jwt from 'jsonwebtoken'

const StudentUpdate=()=>{

const history=useHistory();

const[roll,setRoll]=useState('');
const[name,setName]=useState('');
const[address,setAddress]=useState('');
const[gender,setGender]=useState('');
const[phone,setPhone]=useState('');
const[nemail,setNemail]=useState('');
const[dob, setDob] = useState('');


async function updateDetails(event){
    
    event.preventDefault();

    const response = await fetch('https://hms-nist.herokuapp.com/api/studentupdate',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            roll,
            name,
            address,
            gender,
            phone,
            dob,
            nemail
        })
    })

    const data = await response.json();
    if(data.status=='ok'){
        alert("Student Details Has Been Updated");
        window.location.href="admindashboard";
    }

}

useEffect(() => { //useEffect react hook to tell React that 
    //components need to do something on render
    const token = localStorage.getItem('token');
    if(!token) {
        const user = jwt.decode(token) // for authentication
        alert("Error")
        history.push('/admindashboard')//if authentication fails load the login page
    }
})

return(
    
    <div>
        <Header/>
        <div className="box">
        <h1>Update Student Details</h1>
        <form onSubmit={updateDetails}>
            <input className="input-control2 rounded-pill" type="number" placeholder="&#x23;  Roll No" required value={roll} onChange={(e)=>setRoll(e.target.value)}></input><br/>
            
            <input className="input-control2 rounded-pill" type="text" placeholder="&#xf007;  Fullname" required value={name} onChange={(e)=>setName(e.target.value)}></input><br/>
            
            <select className="dropdown-text input-control2 rounded-pill" id="dropdown" onChange={(e) => setGender(e.target.value)}>
                <option value="gender" disabled selected hidden style={{padding:"20%"}}>&#xf224;   Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
            </select>
            <br/>
            
            {/* <input className="input-control2 dropdown-text rounded-pill" type="date" placeholder="&#xf133;   Date of Birth" 
                value={dob}
				onChange={(e) => setDob(e.target.value)}
				type="text"
				max="2004-06-01"
				placeholder="&#xf133;   Date of Birth"
				onFocus={(e)=>(e.target.type="date")}
				onBlur={(e)=>(e.target.type="date")}
				class="dropdown-text input-control rounded-pill"
				required
            /> */}
            <br/>
            
            <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                placeholder="&#xf015;  Address"
                class="input-control rounded-pill"
                required
            />
             <br/>
                
            <input className="input-control2 rounded-pill" type="tel" minLength="10" maxLength="10" placeholder="&#xf095;  Phone Number" required value={phone} onChange={(e)=>setPhone(e.target.value)}></input><br/>
            
            <input className="input-control2 rounded-pill" type="email" placeholder="&#xf0e0;  E-mail ID" required value={nemail} onChange={(e)=>setNemail(e.target.value)}></input><br/><br/>
            
            <button className="btn-control btn btn-dark rounded-pill">Update Details</button>
        </form>
        </div>

    </div>
)
}
export default StudentUpdate;
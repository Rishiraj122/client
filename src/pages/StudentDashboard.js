import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useHistory } from 'react-router-dom'

const StudentDashboard = () => {
	const history = useHistory()

	const notice=()=>{
		window.location.href='/noticedisplay'
	}

	const logout=()=>{
        window.localStorage.clear();
        window.location.href='/studentlogin'
    }

	const myBill=()=>{
		window.location.href="/mybill"
	}

	const menu=()=>{
		window.location.href='/menudisplay'
	}
	
	const myDetails=()=>{
		window.location.href='/studentmydetails'
	}

	const [data, setData]= useState([])
	const [phone, setPhone] = useState([])
	const [email, setEmail] = useState([])
	const [address, setAddress] = useState([])
	const [roll, setRoll] = useState([])
	const [registration, setRegistration] = useState([])
	// const [clean, setClean] = useState([]);
	const [room, setRoom] = useState([]);
	const [isClean, setIsClean]=useState([]);
	const [gender, setGender] = useState([]);
	const [dob, setDob] = useState([]);
	const [aadhar, setAadhar] = useState([]);
	const [disable, setDisable] = React.useState(false);
    const item=[];

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const user = jwt.decode(token)
			if (!user) {
				localStorage.removeItem('token')
				history.replace('/studentlogin')
			} 
			apiGet();
		}
		else{
			history.push('/studentlogin')
		}
	}, [])

	const apiGet = ()=>{
		const token = localStorage.getItem('token')
		const user = jwt.decode(token) //This contains the values of logged user..
		// console.log it to view
		fetch('https://hms-nist.herokuapp.com/api/studentlogin')
        .then((response)=>response.json())
        .then((json)=>{
            for(let i=0;i<json.user.length;i=i+1){
                if(user.email==json.user[i].email){//It compares the value of 
					//logged in user and the fetched data set...
					//the matched email will find the user... 
					//as no two users can have the same email
					setData(json.user[i].name);
					setPhone(json.user[i].phone);
					setEmail(json.user[i].email);
					setAddress(json.user[i].address);
					setRoll(json.user[i].roll);
					setRegistration(json.user[i].registration);
					setRoom(json.user[i].rid);
					setGender(json.user[i].gender);
					setDob(json.user[i].dob);
					setAadhar(json.user[i].aadhar);
				}
            }		
		})

		checkRoomCleanStatus()
		return {item}
    }

	async function cleanRoom(event){
		event.preventDefault();

		const response = await fetch('https://hms-nist.herokuapp.com/api/clean',{
		method: 'POST',
		headers:{
			'Content-type':'application/json',
		},
		body: JSON.stringify({
			room,
			clean:'please Clean my room'
		}),
		})
		const data = await response.json()
		if(data.status=='ok'){
			window.location.reload(false);
		}
	}
//This will check if the request for the particular room cleaning is made previously or not
	async function checkRoomCleanStatus(){
		const token = localStorage.getItem('token')
		const user = jwt.decode(token)
		
		await fetch('https://hms-nist.herokuapp.com/api/clean')
		.then((response)=>response.json())
		.then((json)=>{
			for(let i=0;i<json.user.length;i++){
				if(user.rid==json.user[i].room){
					console.log("What is this?"+JSON.stringify(json.user[i]));
					console.log(user.rid);
					setIsClean("Request For Room Cleaning is Made");
					setDisable(true);
					break;
				} else if(room!=json.user[i].room){
					setDisable(false);
				}
			}
		})
	}

	return (
		<div >

		<nav className="sticky-top navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
        <a className="navbar-brand" href="/"><i class="nav-icon fas fa-building fa-1x"></i> HMS</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" onClick={logout} href="/studentlogin">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

			<h1>Student Dashboard</h1>
			<div  className="container-fluid">
				<div className="row">
					<div className="col-lg-6">
					<img className="dashboard-img" src="../images/student.png"></img>
					</div>
					<div className="btn-col col-lg-6">
					<button className="btn-dashboard btn btn-dark btn-md rounded-pill" onClick={myDetails}><i className="dashboard-icon fas fa-list"></i>My Details</button><br/>
					<button className="btn-dashboard btn btn-light btn-md btn-block rounded-pill" disabled={disable} onClick={cleanRoom}><i className="dashboard-icon fas fa-broom"></i>Request for Room Clean</button><br/>
					<button className="btn-dashboard btn btn-dark btn-md rounded-pill" onClick={myBill}><i className="dashboard-icon fas fa-money-bill"></i>My Bill</button><br/>
					<button className="btn-dashboard btn btn-light btn-md btn-block rounded-pill" onClick={notice}><i className="dashboard-icon fas fa-book-open"></i>View Notice</button><br/>
					<button className="btn-dashboard btn btn-dark btn-md btn-block rounded-pill" onClick={menu}><i className="dashboard-icon fas fa-utensils"></i>View Menu</button><br/><br/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default StudentDashboard

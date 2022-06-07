import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header.js'

const StudentMyDetails = () => {
	const navigate = useNavigate()

	const [data, setData]= useState([])
	const [phone, setPhone] = useState([])
	const [email, setEmail] = useState([])
	const [address, setAddress] = useState([])
	const [roll, setRoll] = useState([])
	const [block, setBlock] = useState([])

	const [registration, setRegistration] = useState([])
	const [clean, setClean] = useState([]);
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
				navigate('/studentlogin')
			} 
			apiGet();
		}
		else{
			navigate('/studentlogin')
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
					setBlock(json.user[i].block);
					setGender(json.user[i].gender);
					setDob(json.user[i].dob);
					setAadhar(json.user[i].aadhar);
				}
            }		
			
		})

		checkRoomCleanStatus();
		
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

		<Header/>
        
      <div className="container-fluid">
				<h1>My Details</h1>
			<table id="myDetails" className="details-table table table-borderless box">
				<tbody>
				<tr>
					<td><strong className='details'><i className="footer-icon fas fa-user"> </i>Name:</strong></td>
					<td><strong className='details-input'>{data}</strong></td>
				</tr>

				<tr>
					<td><strong className='details'><i className="footer-icon fas fa-phone"></i>Phone Number:</strong></td>
					<td><strong className='details-input'>{phone}</strong></td>
				</tr>

				<tr>
					<td><strong className='details'><i className="footer-icon fas fa-envelope"> </i>E-mail:</strong> </td>
					<td><strong className='details-input'>{email}</strong></td>
				</tr>
				
				<tr>
					<td><strong className='details'><i className="footer-icon fas fa-home"> </i>Address:</strong></td>
					<td><strong className='details-input'>{address}</strong></td>
				</tr>

				<tr>
					<td><strong className='details'><i className="footer-icon fas fa-venus-mars"> </i>Gender:</strong> </td>
					<td><strong className='details-input'>{gender}</strong></td>
				</tr>

				<tr>
					<td><strong className='details'><i className="footer-icon fas fa-calendar"> </i>Date of Birth:</strong> </td>
					<td><strong className='details-input'>{dob}</strong></td>
				</tr>

				<tr>
					<td><strong className='details'><i className="footer-icon fas fa-address-card"> </i>Aadhar Number:</strong> </td>
					<td><strong className='details-input'>{aadhar}</strong></td>
				</tr>

				<tr>
					<td ><strong className='details'><i className="footer-icon fas fa-hashtag"> </i>Roll Number:</strong> </td>
					<td><strong className='details-input'>{roll}</strong></td>
				</tr>

				<tr>
					<td><strong className='details'><i className="footer-icon fas fa-hashtag"> </i>Registration Number:</strong> </td>
					<td><strong className='details-input'>{registration}</strong></td>
				</tr>

				<tr>
					<td><strong className='details'><i className="footer-icon fas fa-building"> </i>Block:</strong> </td>
					<td><strong className='details-input'>{block}</strong></td>
				</tr>
				
				<tr>
					<td><strong className='details'><i className="footer-icon fas fa-door-closed"></i>Room:</strong> </td>
					<td><strong className='details-input'>{room}</strong></td>
				</tr>
				</tbody>
			</table>
			</div>
		</div>
	)
}

export default StudentMyDetails

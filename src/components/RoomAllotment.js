import React from "react";
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Header from './Header.js'
import jwt from 'jsonwebtoken'

function RoomAllotment() {
	const history = useHistory()

	const [room, setRoom]= useState([])
	const [roll, setRoll]=useState([])
	const [room2, setRoom2]= useState([])
	const [room3, setRoom3]=useState([])
	const [room4, setRoom4]= useState([])
	const [room5, setRoom5]=useState([])
	const [room6, setRoom6]= useState([])
	const [room7, setRoom7]=useState([])
	const [room8, setRoom8]= useState([])
	const [room9, setRoom9]=useState([])
	const [room10, setRoom10]= useState([])
	const [occupancy, setOccupancy] = useState([])
	const [occupancy2, setOccupancy2] = useState([])
	const [occupancy3, setOccupancy3] = useState([])
	const [occupancy4, setOccupancy4] = useState([])
	const [occupancy5, setOccupancy5] = useState([])
	const [occupancy6, setOccupancy6] = useState([])
	const [occupancy7, setOccupancy7] = useState([])
	const [occupancy8, setOccupancy8] = useState([])
	const [occupancy9, setOccupancy9] = useState([])
	const [occupancy10, setOccupancy10] = useState([])
	const [block, setBlock] = useState([])
	const [rid1, setRid1] = useState([])
	const [rid2, setRid2] = useState([])
	const [rid3, setRid3] = useState([])
	const [rid4, setRid4] = useState([])
	const [rid5, setRid5] = useState([])
	const [rid6, setRid6] = useState([])
	const [rid7, setRid7] = useState([])
	const [rid8, setRid8] = useState([])
	const [rid9, setRid9] = useState([])
	const [rid10, setRid10] = useState([])
	
    const item=[];

	async function registerUser(event) {
		
		event.preventDefault()

		const response = await fetch('https://hms-nist.herokuapp.com/api/allotroom', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
                roll,
				block,
				room
			}),
		})

		const response3 = await fetch('https://hms-nist.herokuapp.com/api/hostelbill',{
			method:'POST',
			headers:{
				'Content-Type':'application/json',
			},
			body: JSON.stringify({
				roll,
				hostelbill:2000
			})
		})

		const data = await response.json()
		const data3=await response3.json()

		if (data.status && data3.status=== 'ok') {
			alert("Room Allotted")
			window.location.href="/AllottedStudents" // if registration is successfull 
		}
	}

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const user = jwt.decode(token)
			if (!user) {
				localStorage.removeItem('token')
				history.replace('/studentlogin')
			} 

		}
		else{
			history.push('/studentlogin')
		}
	}, [])

	const apiGet = (e)=>{
		
		// alert(e.target.value);
		const token = localStorage.getItem('token')
		const user = jwt.decode(token) //This contains the values of logged user..
		// console.log it to view
		let flag=0;
		fetch('https://hms-nist.herokuapp.com/api/room')
        .then((response)=>response.json())
        .then((json)=>{
            for(let i=0;i<json.user.length;i=i+1){

				if(json.user[i].occupancy<4 && e.target.value=='Girls Wing'){
					// if(flag==2){
					// 	break;
					// }
					if(json.user[i].block=='Girls Wing'){

						setBlock(json.user[i].block);

						if(flag==0){
							setRoom(json.user[i].room);
							setRid1(json.user[i].rid);
							setOccupancy(json.user[i].occupancy);
							flag++;
						}
						else if(flag==1 && json.user[i].room!=room){
							setRoom2(json.user[i].room);
							setRid2(json.user[i].rid);
							setOccupancy2(json.user[i].occupancy);
							flag++;
						} 
						else if(flag==2 && json.user[i].room!=room2){
							setRoom3(json.user[i].room);
							setRid3(json.user[i].rid);
							setOccupancy3(json.user[i].occupancy);
							flag++;
						} 
						else if(flag==3 && json.user[i].room!=room3){
							setRoom4(json.user[i].room);
							setRid4(json.user[i].rid);
							setOccupancy4(json.user[i].occupancy);
							flag++;
						} 
						else if(flag==4 && json.user[i].room!=room4){
							setRoom5(json.user[i].room);
							setRid5(json.user[i].rid);
							setOccupancy5(json.user[i].occupancy);
							flag++;
						} 
						else if(flag==5 && json.user[i].room!=room5){
							setRoom6(json.user[i].room);
							setRid6(json.user[i].rid);
							setOccupancy6(json.user[i].occupancy);
							flag++;
						} 
						else if(flag==6 && json.user[i].room!=room6){
							setRoom7(json.user[i].room);
							setRid7(json.user[i].rid);
							setOccupancy7(json.user[i].occupancy);
							flag++;
						}
						else if(flag==7 && json.user[i].room!=room7){
							setRoom8(json.user[i].room);
							setRid8(json.user[i].rid);
							setOccupancy8(json.user[i].occupancy);
							flag++;
						} 
						else if(flag==8 && json.user[i].room!=room8){
							setRoom9(json.user[i].room);
							setRid9(json.user[i].rid);
							setOccupancy9(json.user[i].occupancy);
							flag++;
						}  
						else{
							setRoom10(json.user[i].room);
							setRid10(json.user[i].rid);
							setOccupancy10(json.user[i].occupancy);
							flag++;
						}
						// setAAroom(json.user[i].room);
						
					}
				} else if(json.user[i].occupancy<4 && e.target.value=='Boys Wing'){
					if(json.user[i].block=='Boys Wing'){

						setBlock(json.user[i].block);

						if(flag==0){
							setRoom(json.user[i].room);
							setRid1(json.user[i].rid);
							setOccupancy(json.user[i].occupancy);
							flag++;
						} 
						else if(flag==1 && json.user[i].room!=room){
							setRoom2(json.user[i].room);
							setRid2(json.user[i].rid);
							setOccupancy2(json.user[i].occupancy);
							flag++;
						} 
						else if(flag==2 && json.user[i].room!=room2){
							setRid3(json.user[i].rid);
							setRoom3(json.user[i].room);
							setOccupancy3(json.user[i].occupancy);
							flag++;
						}
						else if(flag==3 && json.user[i].room!=room3){
							setRid4(json.user[i].rid);
							setRoom4(json.user[i].room);
							setOccupancy4(json.user[i].occupancy);
							flag++;
						}
						else if(flag==4 && json.user[i].room!=room4){
							setRid5(json.user[i].rid);
							setRoom5(json.user[i].room);
							setOccupancy5(json.user[i].occupancy);
							flag++;
						}
						else if(flag==5 && json.user[i].room!=room5){
							setRid6(json.user[i].rid);
							setRoom6(json.user[i].room);
							setOccupancy6(json.user[i].occupancy);
							flag++;
						}
						else if(flag==6 && json.user[i].room!=room6){
							setRid7(json.user[i].rid);
							setRoom7(json.user[i].room);
							setOccupancy7(json.user[i].occupancy);
							flag++;
						}
						else if(flag==7 && json.user[i].room!=room7){
							setRid8(json.user[i].rid);
							setRoom8(json.user[i].room);
							setOccupancy8(json.user[i].occupancy);
							flag++;
						}
						else if(flag==8 && json.user[i].room!=room8){
							setRid9(json.user[i].rid);
							setRoom9(json.user[i].room);
							setOccupancy9(json.user[i].occupancy);
							flag++;
						}
						else if(flag==9 && json.user[i].room!=room10){
							setRid10(json.user[i].rid);
							setRoom10(json.user[i].room);
							setOccupancy10(json.user[i].occupancy);
							flag++;
						}
					}	
				}
            }
		})
		return {item}	
    }

	return (
		<div>
		<Header/>
		<div className="box">
			<h1>Room Allotment</h1>
			<form onSubmit={registerUser}>
                <input
					value={roll}
					onChange={(e) => setRoll(e.target.value)}
					type="number"
					placeholder="Roll Number"
					class="input-control rounded-pill" 
					required
				/>
				<br />
				<select className="dropdown-text input-control rounded-pill" id="dropdown" onChange={apiGet}>
						<option value="Block" disabled selected hidden>Block</option>
						<option value="Girls Wing" >Girls Wing</option>
						<option value="Boys Wing" >Boys Wing</option>
				</select>
				<br/>
				<select className="dropdown-text input-control rounded-pill" id="dropdown" onChange={(e)=>setRoom(e.target.value)}>
						<option value="Room" disabled selected hidden>Room</option>
						<option value={room} >Room: {rid1}, Occupancy: {occupancy}</option>
						<option value={room2}>Room: {rid2}, Occupancy: {occupancy2}</option>
						<option value={room3}>Room: {rid3}, Occupancy: {occupancy3}</option>
						<option value={room4}>Room: {rid4}, Occupancy: {occupancy4}</option>
						<option value={room5}>Room: {rid5}, Occupancy: {occupancy5}</option>
						<option value={room6}>Room: {rid6}, Occupancy: {occupancy6}</option>
						<option value={room7}>Room: {rid7}, Occupancy: {occupancy7}</option>
						<option value={room8}>Room: {rid8}, Occupancy: {occupancy8}</option>
						<option value={room9}>Room: {rid9}, Occupancy: {occupancy9}</option>
						<option value={room10}>Room: {rid10}, Occupancy: {occupancy10}</option>
				</select>
				<br />
				<input class="input-control btn btn-dark rounded-pill" type="submit" value="Allot"/>
			</form>
			</div>
		</div>
	)
}

export default RoomAllotment

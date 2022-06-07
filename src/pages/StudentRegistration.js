import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../components/Header.js'

//name phone address roll registration email password
function StudentRegistration() {
const history = useHistory()

const [name, setName] = useState('') //the first value is current state and second value is function used to update our state
const [phone, setPhone] = useState('')
const [address, setAddress] = useState('')
const [roll, setRoll] = useState('')
const [registration, setRegistration] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [gender, setGender] = useState('')
const [dob, setDob] = useState('');
const [aadhar, setAadhar] = useState('');

async function registerUser(event) {
	event.preventDefault()

	const response = await fetch('https://hms-nist.herokuapp.com/api/studentregister', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			name,
			gender,
			phone,
			address,
			roll,
			registration,
			dob,
			aadhar,
			email,
			password,
		}),
	})

	const data = await response.json()

	if (data.status === 'ok') {
		history.push('/studentlogin') // if registration is successfull 
	}
}

return (
	<div>
	<Header />
		<div className="box">
		<h1>Student Register</h1>
		<p>Create your Profile!</p>
		<form onSubmit={registerUser}>
			<input
				value={name}
				onChange={(e) => setName(e.target.value)}
				type="text"
				placeholder="&#xf007;  Fullname"
				class="input-control rounded-pill"
				required
			/>
			<br/>

			<input
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				type="email"
				placeholder="&#xf0e0;  E-mail"
				class="input-control rounded-pill"
				required
			/>
			<br/>
			<input
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				type="password"
				placeholder="&#xf023;  Password"
				class="input-control rounded-pill"
				required
			/>
			<br/>
			<input
				value={phone}
				onChange={(e) => setPhone(e.target.value)}
				type="tel"
				minlength="10" maxlength="10"
				placeholder="&#xf095;  Phone Number"
				class="input-control rounded-pill"
				required
			/>
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
			<select className="dropdown-text input-control rounded-pill" id="dropdown" onChange={(e) => setGender(e.target.value)}>
				<option value="gender" disabled selected hidden style={{padding:"20%"}}>&#xf224;   Gender</option>
				<option value="Male">Male</option>
				<option value="Female">Female</option>
				<option value="Others">Others</option>
			</select>
			<br/>
			<input
				value={dob}
				onChange={(e) => setDob(e.target.value)}
				type="text"
				max="2004-06-01"
				placeholder="&#xf133;   Date of Birth"
				onFocus={(e)=>(e.target.type="date")}
				onBlur={(e)=>(e.target.type="date")}
				class="dropdown-text input-control rounded-pill"
				required
			/>
			<br/>
			<input
				value={aadhar}
				onChange={(e) => setAadhar(e.target.value)}
				type="number"
				minlength="12" maxlength="12"
				placeholder="&#xf2bb;  Aadhar Number"
				class="input-control rounded-pill"
				required
			/>
			<br/>
			<input
				value={roll}
				onChange={(e) => setRoll(e.target.value)}
				type="number"
				minlength="9" maxlength="9"
				placeholder="&#x23;  Roll Number"
				class="input-control rounded-pill"
				required
			/>
			<br />
			<input
				value={registration}
				onChange={(e) => setRegistration(e.target.value)}
				type="number"
				minlength="10" maxlength="10"
				placeholder="&#x23;  Registration Number"
				class="input-control rounded-pill"
				required
			/>
			<br />
			<input class="input-control btn btn-dark rounded-pill" type="submit" value="Register" />
		</form>
		</div>
	</div>
)
}

export default StudentRegistration

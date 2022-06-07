import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

function Register() {
	const navigate = useNavigate()

	const [name, setName] = useState('') //the first value is current state and second value is function used to update our state
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

  const login=()=>{
    window.location.href='/login';
  }

	async function registerUser(event) {
		event.preventDefault()

		const response = await fetch('https://hms-nist.herokuapp.com/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		})

		const data = await response.json()

		if (data.status === 'ok') {
			navigate('/login') // if registration is successfull 
		}
	}

	return (
		<div>
		<Header />
		<div className="box">
			<h1>Register</h1>
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
				<br />
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="&#xf0e0;  E-mail"
					class="input-control rounded-pill"
					required

				/>
				<br />
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="&#xf023;  Password"
					class="input-control rounded-pill"
					required
				/>
				<br />
				<input class="btn btn-dark input-control rounded-pill" type="submit" value="Register" />
			</form>
      <button class="btn btn-light btn-control rounded-pill" onClick={login}>Login</button>
		</div>
		</div>
	)
}

export default Register

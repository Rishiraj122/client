import { useState } from 'react'
import Header from '../components/Header.js'

function App() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

    const register=()=>{
        window.location.href='/register'
    }

	async function loginUser(event) {
		event.preventDefault()

		const response = await fetch('https://hms-nist.herokuapp.com/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})

		const data = await response.json()
		if (email=='admin@gmail.com' && data.user){
			localStorage.setItem('token',data.user)
			window.location.href='/admindashboard'
		}
		else if(email=='warden@gmail.com' && data.user){
			localStorage.setItem('token',data.user)
			window.location.href='/wardendashboard'
		}
		else if (data.user) {
			localStorage.setItem('token', data.user)
			alert('Login successful')
			window.location.href = '/staffdashboard'
		} 
		else {
			alert('Please check your username and password')
		}
	}

	return (
		<div>
		<Header />
		<div className="box">
			<h1>Login</h1>
			<p>Welcome back! Log in to access your profile.</p>
			<form  onSubmit={loginUser}>
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
				<input class="btn btn-dark input-control rounded-pill" type="submit" value="Login" />
			</form>
            <button class="btn btn-light btn-control rounded-pill" onClick={register}>Register</button>
			</div>
		</div>
	)
}

export default App

import { useState } from 'react'
import Header from '../components/Header.js'

function App() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

    const register=()=>{
        window.location.href='/studentregistration'
    }

	async function loginUser(event) {
		event.preventDefault()

		const response = await fetch('https://hms-nist.herokuapp.com/api/studentlogin', {
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
		if (data.user) {
			localStorage.setItem('token', data.user)
			alert('Login successful')
			window.location.href = '/studentdashboard'
		} else{
			alert('Incorrect Password or Email')
			window.location.href = '/studentlogin'
		}
	}

	return (
		<div>
		<Header />
		<div className="box">
			<h1>Student Login</h1>
			<p>Welcome back! Log in to access your profile.</p>
			<form onSubmit={loginUser}>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					required
					placeholder="&#xf0e0;  E-mail"
					class="input-control rounded-pill"
				/>
				<br />
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					required
					placeholder="&#xf023;  Password"
					class="input-control rounded-pill"
				/>
				<br />
				<a className="forgot-password" href="/forgotpassword"><p>Forgot Password?</p></a>
				<input class="btn btn-dark input-control rounded-pill" type="submit" value="Login" />
			</form>
            <button class="btn btn-control btn-light rounded-pill" onClick={register}>Register</button><br/><br/>
		</div>
		</div>
	)
}

export default App

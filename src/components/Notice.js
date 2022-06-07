import React, {useEffect,useState} from 'react'
import axios from 'axios'
import Header from './Header.js'
import jwt from 'jsonwebtoken'
import { useHistory } from 'react-router-dom'

function Notice () {

    const [name,setName] = useState('')
    const [noticetitle,setNoticetite] = useState('')
    const [notice,setNotice] = useState('')

    const noticePage = () =>{
        window.location.href='/notice';
    }

    //Publish Notice
    axios({
        method: 'get',
        url: 'https://api.github.com/users/hacktivist123',
      });

    async function publishNotice(event){
        event.preventDefault()
        const response = await fetch('https://hms-nist.herokuapp.com/api/notice',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                name,
                noticetitle,
                notice,
                notices:[]
            }),
        })
        const data=await response.json()
        if (data.status == 'ok') {
            alert('Notice Published')
		}
    }

    useEffect(() => { //useEffect react hook to tell React that 
        //components need to do something on render
        const token = localStorage.getItem('token');
        if(!token) {
            const user = jwt.decode(token) // for authentication
            window.location.href="/login"
            // history.push('/login'); //if authentication fails load the login page
        }
    })


    return(
        <div>
        <Header />
        <section class="box container-fluid">
            <h1>Publish Notice</h1>
            <form onSubmit={publishNotice}>
            <input
					value={noticetitle}
                    onChange={(e) => setNoticetite(e.target.value)}
                    type="text"
                    placeholder="Notice Title"
                    class="input-control2 rounded-pill"
                    required
				/>
				<br />
                <input
					value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Undersigned Name"
                    class="input-control2 rounded-pill"
                    required
				/>
				<br />
				<textarea
					value={notice}
                    onChange ={(e) => setNotice(e.target.value)}
                    type="text"
                    placeholder="Notice"
                    class="input-control2 rounded"
                    style={{height:"150px"}}
                    required
				/>
				<br />
				<input className="btn btn-dark rounded-pill input-control2" type="submit"  placeholder="&#xf062; Publish" value="Publish" onClick={{noticePage}}/>
			</form>
            </section>

        </div>
    )
}

export default Notice
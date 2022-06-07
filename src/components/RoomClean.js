import React from "react";
import Header from './Header'
import axios from 'axios';
import jwt from 'jsonwebtoken'

const item=[];

export default class Fetch extends React.Component{

    state={
        loading: true,
        person: null,
    }

    async componentDidMount(){

        //For auth access
        const token = localStorage.getItem('token');
        if(!token) {
            const user = jwt.decode(token) // for authentication
            window.location.href="/login"
            // history.push('/login'); //if authentication fails load the login page
        }
        //

        const url="https://hms-nist.herokuapp.com/api/clean";
        const response = await fetch(url);
        const data = await response.json();
        let i = 0;

        while(i<=data.user.length){
            this.setState({person: data, loading: false})
            if(true){
                item.push(data.user[i]);
            }           
            i++;
        }
    }

    async delete(value){
        const room={room: value}
        const response = await axios.post('https://hms-nist.herokuapp.com/api/deleteclean',room);
        window.location.reload(false);
    }

    goBack(){
        window.location.href="/staffdashboard"
    }

    render(){
        return(
            <div>
                <Header/>
                <h1>Room Clean Requests</h1>
                <div>
                    {item.map(i=>
                    <div style={{marginBottom:"2%"}}>
                         <p><strong>Room:</strong> {i.room}, <strong>Message:</strong>{i.clean}</p> 
                         <button className="btn btn-light rounded-pill" onClick={()=>this.delete(i.room)}>Room Cleaned</button>
                    </div>   
                    )}
                </div>
                <button className="btn-control btn btn-dark rounded-pill" onClick={()=>this.goBack()}><i className="fas fa-arrow-left"></i>  Go Back</button>
            </div>
        )
    }

}

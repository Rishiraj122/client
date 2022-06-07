import React from 'react';
import axios from 'axios';
import Header from './Header.js'
import jwt from 'jsonwebtoken'

const item=[];

export default class Fetch extends React.Component{

    state={
        loading: true,
        person: null,
    }

    async delete(value){
        const nid={nid: value}
        const response = await axios.post('https://hms-nist.herokuapp.com/api/noticedelete',nid);
        window.location.reload(false);
    }

    async componentDidMount(){
        
        //To ensure the page is accessed by auth users
        const token = localStorage.getItem('token');
        if(!token) {
            const user = jwt.decode(token) // for authentication
            window.location='/login'; //if authentication fails load the login page
        }

        const url="https://hms-nist.herokuapp.com/api/notice";
        const response = await fetch(url);
        const data = await response.json();
        for(let i=data.user.length-1;i>=-1;i--){
            this.setState({person: data, loading: false})
            item.push(data.user[i]);
            console.log(data.user[0])
        }
    }

    render(){
        return <div>
        <Header/>
            <h1>Notice Board</h1>
            <p>Updates on upcoming events, important announcements and other reminders.</p>
            <div>{item.map(i => 
            <div class= "alert notice-box">
                <h6 className="notice-title"><strong>{i.noticetitle}</strong></h6>
                <hr className="notice-hr"/>
                <p className="notice"><i className="icon fas fa-calendar fa-1x"></i> <i>{i.date}</i></p>
                <p  className="notice-text">{i.notice}</p>
                <p  className="notice"><strong>By</strong> <i>{i.name}</i></p>
                <button className="notice-btn btn btn-dark rounded-pill" onDoubleClick={()=>this.delete(i.nid)}><i className="fas fa-trash fa-1x"></i> Delete</button>
            </div>
            )}</div> 
        </div>
    }
}
import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header.js'

const item=[];

export default class Fetch extends React.Component{

    state={
        loading: true,
        person: null,
    }

    async componentDidMount(){
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
        <Header />
            <h1>Notice Board</h1>
            <p>Updates on upcoming events, important announcements and other reminders.</p>
            <div>{item.map(i => 
            <div class= "alert notice-box">
                <h6 className="notice-title"><strong> {i.noticetitle}</strong></h6>
                <hr className="notice-hr"/>
                <p className="notice"><i className="icon fas fa-calendar fa-1x"></i> <i>{i.date}</i></p>
                <p className="notice-text">{i.notice}</p>
                <p className="notice"><strong>By </strong><i>{i.name}</i></p>
            </div>
            )}</div>
        </div>
    }
}
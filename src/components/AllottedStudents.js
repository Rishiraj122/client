import React, { useState } from 'react';
import {useHistory} from "react-router-dom";
import axios from 'axios';
import Header from './Header.js'
import jwt from 'jsonwebtoken'

const item=[];
const notAllotted=[];
const searchData=[];
const email='';

export default class AllottedStudents extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            inputValue:'',
        };
    }

    state={
        loading: true,
        person: null,
    }

    async componentDidMount(x){

        //To ensure it is auth
        const token = localStorage.getItem('token');
        if(!token) {
            const user = jwt.decode(token) // for authentication
            window.location="/login" //if authentication fails load the login page
        }
        //

        const url="https://hms-nist.herokuapp.com/api/studentlogin";
        const response = await fetch(url);
        
        const data = await response.json();
        if(x!=null){

            for(let i=0;i<data.user.length;i++){ // This will search for the 
                //particular student
                this.setState({person: data, loading: false})
                if(data.user[i].room==x ||  
                    data.user[i].block==x || 
                    data.user[i].phone==x ||
                    data.user[i].name.toLowerCase()==x.toLowerCase())
                    {
                        item.length=0;
                        item.push(data.user[i]);
                        console.log(item[0]);
                }
            }
        }
        else if(x==null){ //It will load everyone's data initially
            for(let i=data.user.length-1;i>=0;i--){
                this.setState({person: data, loading: false})
                if(data.user[i].room!=null){
                    item.push(data.user[i]);
                    console.log(data.user[0])
                }
                else if(data.user[i].room==null){
                    notAllotted.push(data.user[i]);
                }
            }
        }
    }

    refreshPage(){
        window.location.reload();
    } 

    updateInputValue(evt) {
        this.setState({
          inputValue: evt.target.value
        });
      }
    
    render(){
        return <div>
            <Header/>
            <h1>Allotted Students</h1>

            <input class="search-bar rounded-pill" type="text" placeholder=" &#xf002;  Search"
            onChange={(evt) => {var x=evt.target.value; 
            this.componentDidMount(x) }} />

            <button class="clr-btn btn btn-dark rounded-pill" onClick={this.refreshPage}>Clear</button>
            <br/><br/>
                
            <div className="tbl">
                    <table class="css-serial table table-borderless table-sm" style={{width:"60%", margin:"0 auto"}}>
                    <thead>
                        <tr style={{backgroundColor:"#46244C",color:"white"}}>
                            <th>#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Roll Number</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Block</th>
                            <th scope="col">Room</th>
                        </tr>
                    </thead>
                        <tbody>{item.map(user => 
                            <tr scope="row">
                                <td></td>
                                <td>{user.name}</td>
                                <td>{user.roll}</td>
                                <td>{user.phone}</td>
                                <td>{user.block}</td>
                                <td>{user.rid}</td>
                            </tr>
                        )}</tbody>             
                    </table> 
                    </div>
                    <br/><br/>               
            
            <h1>Unallotted Students</h1>
            <div className="tbl">
                <table class="css-serial table table-borderless table-sm" style={{width:"60%", textAlign:"center",margin:"2% auto"}}>
                    <thead >
                    <tr style={{backgroundColor:"#46244C",color:"white"}}>
                        <th>#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Roll Number</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Aadhar</th>
                        <th scope="col">Gender</th>
                    </tr>
                </thead>
                     <tbody>{notAllotted.map(user2 => 
                        <tr scope="row">
                            <td></td>
                            <td>{user2.name}</td>
                            <td>{user2.roll}</td>
                            <td>{user2.phone}</td>
                            <td>{user2.aadhar}</td>
                            <td>{user2.gender}</td>
                        </tr>
                    )}</tbody>             
                </table>   
                </div>
        </div>
    }
}
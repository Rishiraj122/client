import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header.js'
import jwt from 'jsonwebtoken'

const item=[];


export default class studentDetails extends React.Component{

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


    //This Makes Sure That The Admin Has Logged In
    const token = localStorage.getItem('token');
    if(!token) {
        const user = jwt.decode(token) // for authentication
        window.location="/login"; //if authentication fails load the login page
    }
    //

    const url="https://hms-nist.herokuapp.com/api/studentlogin";
    const response = await fetch(url);
    
    const data = await response.json();
    if(x!=null){

        for(let i=0;i<data.user.length;i++){ // This will search for the 
            //particular student
            this.setState({person: data, loading: false})
            if(data.user[i].roll==x || data.user[i].name.toLowerCase()==x.toLowerCase() || 
                data.user[i].registration==x || 
                data.user[i].phone==x ||
                data.user[i].email==x)
                {
                    item.length=0;
                    item.push(data.user[i]);
                    // console.log(item[0]);
            }
        }
    }
    else if(x==null){ //It will load everyone's data initially
        for(let i=data.user.length-1;i>=0;i--){
            this.setState({person: data, loading: false})
            item.push(data.user[i]);
            // console.log(data.user[0])
        }
    }
}

async delete(value,value2,value3){
    const roll={roll: value}
    const room={room:value2}
    const rid={rid: value3}
    const response = await axios.post('https://hms-nist.herokuapp.com/api/studentdelete',roll);
    const response2 = await axios.post('https://hms-nist.herokuapp.com/api/roomdeallocate',rid);
    window.location.reload(false);
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
        <h1>Student Details</h1>
        <input className="search-bar rounded-pill" id="number" type="text"  placeholder=" &#xf002;  Search"
        onChange={(evt) => {var x=evt.target.value; this.componentDidMount(x) }} />
        <button class="clr-btn btn btn-dark rounded-pill" onClick={this.refreshPage}>Clear</button><br/><br/>
        {this.state.loading || !this.state.person ? 
        <div>loading...</div> 
        :
        <div>        
            <div className="tbl">
            <table className="sortable css-serial table table-borderless table-sm" style={{width:"80%", textAlign:"center", margin:"1% auto"}}>
                <thead>
                    <tr style={{backgroundColor:"#46244C",color:"white"}}>
                        <th>#</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>E-mail</th>
                        <th>Address</th>
                        <th>Gender</th>
                        <th>DOB</th>
                        <th>Aadhar Number</th>
                        <th>Roll Number</th>
                        <th>Registration Number</th>
                        <th>Block</th>
                        <th>Room</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{item.map(student => 
                    <tr>
                        <td></td>
                        <td>{student.name}</td>
                        <td>{student.phone}</td>
                        <td>{student.email}</td>
                        <td>{student.address}</td>
                        <td>{student.gender}</td>
                        <td>{student.dob}</td>
                        <td>{student.aadhar}</td>
                        <td>{student.roll}</td>
                        <td>{student.registration}</td>
                        <td>{student.block}</td>
                        <td>{student.rid}</td>
                        <td> <button className="btn btn-sm btn-light" style={{paddingTop:"4%",marginTop:"5%"}}  onDoubleClick={()=>this.delete(student.roll,student.room,student.rid)}><i className="fas fa-ban"></i> Remove</button><br/>
                        </td>
                    </tr>
                    )}</tbody>
            </table>
            </div>
            </div>
        }
    </div>
}
}
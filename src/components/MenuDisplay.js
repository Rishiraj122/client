import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useHistory } from 'react-router-dom'
import Header from '../components/Header.js'

const MenuDisplay=()=>{
    const history=useHistory()

    const goback=()=>{
        window.location.href='/studentdashboard'
    }

    const [foodname,setFoodname]=useState([]);
    const [bvegfood,bsetVegfood]=useState([]);
    const [lvegfood,lsetVegfood] = useState([]);
    const [svegfood,ssetVegfood] = useState([]);
    const [dvegfood,dsetVegfood] = useState([]);
    const [bnonvegfood,bsetNonvegfood]=useState([]);
    const [lnonvegfood,lsetNonvegfood]=useState([]);
    const [snonvegfood,ssetNonvegfood]=useState([]);
    const [dnonvegfood,dsetNonvegfood]=useState([]);
    const [bmain,bsetMain]=useState([]);
    const [lmain,lsetMain]=useState([]);
    const [smain,ssetMain]=useState([]);
    const [dmain,dsetMain]=useState([]);
    
    const item=[];

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            const user = jwt.decode(token);
            if(!user){
                localStorage.removeItem('token');
                history.replace('/studentlogin');
            }else{
                getData();                
            }
        } else{
            history.push('/studentlogin');
        }
    })
    const getData=()=>{
        const token = localStorage.getItem('token')
        const user = jwt.decode(token);
        fetch('https://hms-nist.herokuapp.com/api/foodtoday')
        .then((response)=>response.json())
        .then((json)=>{
            for(let i=0;i<json.user.length;i=i+1){
                if(json.user[i].foodname=="Breakfast"){
                    bsetMain(json.user[i].main);
                    bsetVegfood(json.user[i].vegfood);
                    bsetNonvegfood(json.user[i].nonvegfood);
                } else if(json.user[i].foodname=='Lunch'){
                    lsetMain(json.user[i].main);
                    lsetVegfood(json.user[i].vegfood);
                    lsetNonvegfood(json.user[i].nonvegfood);
                } else if(json.user[i].foodname=='Snacks'){
                    ssetMain(json.user[i].main);
                    ssetVegfood(json.user[i].vegfood);
                    ssetNonvegfood(json.user[i].nonvegfood);
                } else if(json.user[i].foodname=='Dinner'){
                    dsetMain(json.user[i].main);
                    dsetVegfood(json.user[i].vegfood);
                    dsetNonvegfood(json.user[i].nonvegfood);
                }
            }
        })
    }
    return(
        <div>
        <Header/>

            <div className="container">
            <h1>Today's Menu!</h1>

                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <div class="card" style={{marginBottom:"15%"}}>
                            <img class="card-img-top" src="..//images/coffee.png"/>
                            <div class="card-body">
                                <h5 class="card-title">Breakfast</h5>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"><i className="footer-icon fas fa-utensils"></i> {bmain}</li>
                                <li class="list-group-item"><i className="footer-icon fas fa-utensils"></i> {bvegfood}</li>
                                <li class="list-group-item"><i className="footer-icon fas fa-utensils"></i> {bnonvegfood}</li>
                            </ul>
                            </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div class="card">
                        <img class="card-img-top" src="..//images/rice.png"/>
                        <div class="card-body">
                            <h5 class="card-title">Lunch</h5>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><i className="footer-icon fas fa-utensils"></i> {lmain}</li>
                            <li class="list-group-item"><i className="footer-icon fas fa-utensils"></i> {lvegfood}</li>
                            <li class="list-group-item"><i className="footer-icon fas fa-utensils"></i> {lnonvegfood}</li>
                        </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div class="card">
                            <img class="card-img-top" src="..//images/hamburger.png"/>
                            <div class="card-body">
                                <h5 class="card-title">Snacks</h5>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"><i className="footer-icon fas fa-utensils"></i> {smain}</li>
                                <li class="list-group-item"><i className="footer-icon fas fa-utensils"></i> {svegfood}</li>
                                <li class="list-group-item"><i className="footer-icon fas fa-utensils"></i> {snonvegfood}</li>
                            </ul>
                            </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div class="card">
                            <img class="card-img-top" src="..//images/dinner.png"/>
                            <div class="card-body">
                                <h5 class="card-title">Dinner</h5>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"><i className="footer-icon fas fa-utensils"></i> {dmain}</li>
                                <li class="list-group-item"><i className="footer-icon fas fa-utensils"></i> {dvegfood}</li>
                                <li class="list-group-item"><i className="footer-icon fas fa-utensils"></i> {dnonvegfood}</li>
                            </ul>
                            </div>
                    </div>
                </div>
            </div>   
        </div>
    )
}

export default MenuDisplay
import React, { useEffect} from 'react'
import jwt from 'jsonwebtoken'
import { useHistory } from 'react-router-dom'

const StaffDashboard = () =>{
    const history = useHistory();//history instance a react hook

    const logout=()=>{
        window.localStorage.clear();//to clear the localstorage of the user, so when 
                                    //a user logs out it's login local storage is cleared
        window.location.href='/login'
    }

    const allotVendor=()=>{
        window.location.href='/vendor'
    }

    const vendor=()=>{
        window.location.href='/vendordisplay'
    }

    const roomClean=()=>{
        window.location.href='/roomclean'
    }

    const messBill=()=>{
        window.location.href='/messbill'
    }

    const updateMenu=()=>{
        window.location.href='/menuupdate'
    }

    useEffect(() => { //useEffect react hook to tell React that 
        //components need to do something on render
        const token = localStorage.getItem('token');
        if(!token) {
            const user = jwt.decode(token) // for authentication
            history.push('/login'); //if authentication fails load the login page
        }
      })

    return (
        <div>
        <nav className="sticky-top navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
        <a className="navbar-brand" href="/"><i class="nav-icon fas fa-building fa-1x"></i> HMS</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" onClick={logout} href="/login">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

            <h1>Staff Dashboard</h1>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6">
                        <img className="dashboard-img" src="../images/mess-staff.png"></img>
                    </div>
                    <div className="btn-col col-lg-6">
                
                <button className="btn-dashboard btn btn-dark rounded-pill" onClick={updateMenu}><i className="dashboard-icon fas fa-utensils"></i>Update Menu</button><br/>
                <button className="btn-dashboard btn btn-light rounded-pill" onClick={allotVendor}><i className="dashboard-icon fas fa-shopping-basket"></i>Allot Vendor</button><br/>
                <button className="btn-dashboard btn btn-dark rounded-pill" onClick={vendor}><i className="dashboard-icon fas fa-list"></i>Vendor Details</button><br/>
                <button className="btn-dashboard btn  btn-light rounded-pill" onClick={roomClean}><i className="dashboard-icon fas fa-broom"></i>Room Clean Requests</button><br/>
                <button className="btn-dashboard btn btn-dark rounded-pill" onClick={messBill}><i className="dashboard-icon fas fa-money-bill"></i>Mess Bill</button><br/>
                    </div>
                </div>
            </div>    
        </div>
    )
}

export default StaffDashboard
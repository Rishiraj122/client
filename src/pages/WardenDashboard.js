import React, { useEffect} from 'react'
import jwt from 'jsonwebtoken'
import { useHistory } from 'react-router-dom'

const WardenDashboard = () =>{
    const history = useHistory();//history instance a react hook
    const logout=()=>{
        window.localStorage.clear();//to clear the localstorage of the user, so when 
        //a user logsout it's login local storage is cleared
        window.location.href='/login'
    }

    const allotRoom=()=>{
        window.location.href='/RoomAllotment'
    }

    const allotmentStatus=()=>{
        window.location.href='/AllottedStudents'
    }

    const uploadNotice=()=>{
        window.location.href='/notice'
    }

    const deleteNotice=()=>{
        window.location.href='/adminnotice'
    }

    const hostelbill=()=>{
        window.location.href='/hostelbill'
    }

    const generateReport=()=>{
        window.location.href='/generatereport'
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

            <h1>Warden Dashboard</h1>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6">
                        <img className="dashboard-img" src="../images/warden.png"></img>
                    </div>
                    <div className="btn-col col-lg-6">
                        <button className="btn-dashboard btn btn-dark rounded-pill" onClick={allotmentStatus}><i className="dashboard-icon fas fa-eye"></i>View Allotment Status</button><br/>
                        <button className="btn-dashboard btn btn-light rounded-pill" onClick={allotRoom}><i className="dashboard-icon fas fa-door-closed"></i>Allot Room</button><br/>
                        <button className="btn-dashboard btn btn-dark rounded-pill" onClick={uploadNotice}><i className="dashboard-icon fas fa-arrow-up"></i>Upload Notice</button><br/>
                        <button className="btn-dashboard btn btn-light rounded-pill" onClick={deleteNotice}><i className="dashboard-icon fas fa-trash"></i>Delete Notice</button><br/>
                        <button className="btn-dashboard btn btn-dark rounded-pill" onClick={hostelbill}><i className="dashboard-icon fas fa-money-bill"></i>Add Bill</button><br/>
                        <button className="btn-dashboard btn btn-light rounded-pill" onClick={generateReport}><i className="dashboard-icon fas fa-file"></i>Generate Report</button><br/><br/>
                    </div>   
                </div>
            </div>     
        </div>
    )
}

export default WardenDashboard
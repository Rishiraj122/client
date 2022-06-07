import React, { useEffect} from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () =>{
    const navigate = useNavigate();

    const addStudent=()=>{
        window.location.href='/studentregistration'
    }

    const logout=()=>{
        window.localStorage.clear();
        window.location.href='/login'
    }

    const studentDetails=()=>{
        window.location.href='/studentdetails'
    }

    const studentUpdate=()=>{
      window.location.href='/studentupdate'
  }
    const uploadNotice=()=>{
        window.location.href='/notice'
    }

    const deleteNotice=()=>{
        window.location.href='/adminnotice'
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token) {
            const user = jwt.decode(token)
            navigate('/login');
        }
      })

    return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-dark">
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

            <h1>Admin Dashboard</h1>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6">
                        <img className="dashboard-img" src="../images/admin.png"></img>
                    </div>
                    <div className="btn-col col-lg-6">
                        <button class="btn-dashboard btn btn-dark rounded-pill" onClick={addStudent}><i className="dashboard-icon fas fa-user"></i>Add Student</button><br/>
                        <button class="btn-dashboard btn btn-light rounded-pill" onClick={studentDetails}><i className="dashboard-icon fas fa-ban"></i>Remove Student</button><br/>
                        <button class="btn-dashboard btn btn-dark rounded-pill" onClick={studentUpdate}><i className="dashboard-icon fas fa-pen"></i>Update Student Details</button><br/>
                        <button class="btn-dashboard btn btn-light rounded-pill" onClick={uploadNotice}><i className="dashboard-icon fas fa-arrow-up"></i>Upload Notice</button><br/>
                        <button class="btn-dashboard btn btn-dark rounded-pill" onClick={deleteNotice}><i className="dashboard-icon fas fa-trash"></i>Delete Notice</button><br/> <br/>
                    </div>   
                </div>
            </div>  
        </div>
    )
}

export default AdminDashboard
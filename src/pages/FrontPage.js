import React from "react";
import "../frontpage.css"
import "bootstrap/dist/js/bootstrap.js"
import $ from "jquery"
import Popper from "popper.js"

function FrontPage(){

	const features =()=>{
		window.location.href="#features"
	}
	
    return(
		<div>
		
		{/*NAVBAR*/}
		<nav className="sticky-top navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
			<a className="navbar-brand" href="/"><i class="nav-icon fas fa-building fa-1x"></i> HMS</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                  </li>
				  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Login
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                      <li><a className="dropdown-item" href="/login">Staff</a></li>
                      <li><a className="dropdown-item" href="/studentlogin">Student</a></li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Register
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                      <li><a className="dropdown-item" href="/register">Staff</a></li>
                      <li><a className="dropdown-item" href="/studentregistration">Student</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

		{/*WELCOME*/}
		<section className="white-section container">
			<div className="row">
				<div className="col-lg-6">
					<h1 className="big-heading">Welcome!</h1>
					<p className="greeting-text">The best place for students to stay!</p>
					<button className="btn-explore btn btn-dark btn-lg rounded-pill" onClick={features}>Explore</button>
				</div>
				<div class="col-lg-6">
					<img src="../images/hostel.png"></img>
				</div>
			</div>
		</section>
		
		{/*FEATURES*/}
		<section className="colored-section" id="features">

		<div className="row">
			<h1>Key Features</h1>
			<div className="feature-box col-lg-4">
			<i className="f-icon icon fas fa-bed fa-2x"></i>
			<h3 className="feature-title">Comfort</h3>
			<p>Self contained rooms with AC and wi-fi facilities.</p>
			</div>

			<div className="feature-box col-lg-4">
			<i className="f-icon icon fas fa-briefcase-medical fa-2x"></i>
			<h3 className="feature-title">Hygiene</h3>
			<p>From food to laundry, cleanliness is our priority.</p>
			</div>

			<div className="feature-box col-lg-4">
			<i className="f-icon icon fas fa-check-circle fa-2x"></i>
			<h3 className="feature-title">Safety</h3>
			<p>24X7 complete student security.</p> 
			</div>

			<div className="feature-box col-lg-4">
			<i className="f-icon icon fas fa-gift fa-2x"></i>
			<h3 className="feature-title">Events</h3>
			<p>Engaging activities for refreshment.</p>
			</div>

			<div className="feature-box col-lg-4">
			<i className="f-icon icon fas fa-user fa-2x"></i>
			<h3 className="feature-title">Housekeeping</h3>
			<p>Friendly and interactive staff available for support.</p>
			</div>

			<div className="feature-box col-lg-4">
			<i className="f-icon icon fas fa-desktop fa-2x"></i>
			<h3 className="feature-title">Efficient Management</h3>
			<p>Paperless management of hostel activities.</p> 
			</div>

		</div>
		</section>

		{/*CONTACT AND INFORMATION*/}
		<footer className="container-fluid">
			<div className="row information ">
				<div className="info-col col-lg-6">
					<p className="info">CONTACT</p>
					<hr/>
					<p className="info"><i class="footer-icon icon fas fa-globe"></i>303M HMS Street</p>
					<p className="info"><i class="footer-icon icon fas fa-phone"></i>+91 9876543210</p>
					<p className="info"><i class="footer-icon icon fas fa-envelope"></i>hms@gmail.com</p>
				</div>

				<div className="info-col col-lg-6">
				<p className="info">WEBSITE CREATORS</p>
				<hr/>
				<p className="info"><i class="footer-icon icon fas fa-user"></i>Rishiraj Behera</p>
				<p className="info"><i class="footer-icon icon fas fa-user"></i>Shweta Anmesha Tripathy</p>
			</div>
			</div>
			<p className="copyright">© Copyright 2022 All Rights Reserved</p>
		</footer>
        </div>
    )
}

export default FrontPage
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-secondary justify-content-end">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                <b>HOME</b>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                <b>SIGN UP</b>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                <b>SIGN IN</b>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <b>CLASSROOMS</b>
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/classroomcse1/groundfloor">
                    <b>GROUND FLOOR</b>
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/classroomcse/first-floor">
                    <b>FIRST FLOOR</b>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/ab-1">
                    <b>ACADEMIC BLOCK-1</b>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/bookingform">
                <b>BOOKINGS</b>
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/viewbooking">
                <b>VIEW BOOKINGS</b>
              </Link>
            </li> */}
          </ul>
          <div className="container-fluid">
            <form className="d-flex justify-content-end" role="search">
            <Link className="nav-link view-bookings-link" to="/viewbooking">
                <b>VIEW BOOKINGS</b>
              </Link><br></br><br></br>
              
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

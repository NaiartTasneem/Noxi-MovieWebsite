import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({loginData,logout}) {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Noxi
        </a>
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
        {loginData?<><ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="home">
                Home{" "}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="movies">
                Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="tvShows">
                TvShows
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="people">
                People
              </Link>
            </li>
        
          </ul></>:''}
          
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          {loginData?<>
            <li className="nav-item">
              <Link className="nav-link" to="register">
                Welcome {loginData.name}
              </Link>
            </li>
          <li className="nav-item">
              <Link className="nav-link" onClick={logout} to="register">
                Loguot
              </Link>
            </li>
            </>:<> <li className="nav-item">
              <Link className="nav-link" to="login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="register">
                Register
              </Link>
            </li></>}
           
            
          </ul>
        </div>
      </div>
    </nav>
  );
}

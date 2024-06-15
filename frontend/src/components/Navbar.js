//frontend/src/components/Navbar.js

import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth0();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="https://as1.ftcdn.net/v2/jpg/04/55/12/90/1000_F_455129054_9oiFztF64ifXofv2aQVJkDHr0w7rjv5x.jpg" alt="NeuroFish Icon" className="img-fluid me-2" style={{ width: "40px", height: "40px" }} />
          Neuro Fish
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" activeClassName="active">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" activeClassName="active">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/classify" activeClassName="active">Classify</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/table" activeClassName="active">Image Table</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/fish-detail" activeClassName="active">Fish Detail</Link>
            </li>
            {isAuthenticated ? (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href='www.google.com' id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={user.picture} alt={user.name} className="rounded-circle" style={{ width: '32px', marginRight: '5px' }} />
                  {user.name}
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li><button className="dropdown-item" onClick={() => logout({ returnTo: window.location.origin })}>Logout</button></li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login" activeClassName="active">Login</Link>
              </li>
            )}
            
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css' 
import { UserContext } from '../../context/userContext';
import { useContext } from 'react';




export default function Navbar() {
  const { user, setUser } = useContext(UserContext);
  
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      {!user && <Link to="/register" className="nav-link">Register</Link>}
      {!user && <Link to="/login" className="nav-link">Login</Link>}
      <Link to="/dashboard" className="nav-link">Dashboard</Link>
      
    </nav>
  );
}


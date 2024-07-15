import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ logout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="nav-bar">
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/programs">Programs</Link></li>
        <li><Link to="/departments">Departments</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/add-users">Add Users</Link></li>
        <li><Link to="/analytics">Analytics</Link></li>
        <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
      </ul>
    </div>
  );
};

export default NavBar;

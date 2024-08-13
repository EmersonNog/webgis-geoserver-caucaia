import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      navigate('/login', { replace: true });
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-brand">REURB Caucaia</div>
      <div className="navbar-links">
        <div className="navbar-link-container">
          <a href="/map" className="navbar-link">
            Mapa
          </a>
          <a href="/about" className="navbar-link">
            Sobre
          </a>
        </div>
        <button onClick={handleLogout} className="navbar-link logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavBar;

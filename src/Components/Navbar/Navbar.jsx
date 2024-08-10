import React from 'react';
import './Navbar.css';

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="navbar-brand">REURB Caucaia</div>
      <div className="navbar-links">
        <a href="#map" className="navbar-link">
          Mapa
        </a>
        <a href="#about" className="navbar-link">
          Sobre
        </a>
      </div>
    </div>
  );
};

export default NavBar;

import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

const NavBar = ({ onRefresh }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="navbar">
      <a href="/map" className="navbar-brand">
        REURB Caucaia
      </a>
      <div className="navbar-links">
        <div className="navbar-link-container">
          <a href="/map" className="navbar-link">
            Mapa
          </a>
          <a href="/cadaster" className="navbar-link">
            Cadastros
          </a>
          <a href="/about" className="navbar-link">
            Sobre
          </a>
        </div>
        <button onClick={handleRefresh} className="navbar-link refresh-button">
          <FontAwesomeIcon icon={faSyncAlt} />
        </button>
        <button onClick={handleLogout} className="navbar-link logout-button">
          <FontAwesomeIcon icon={faSignOut} />
        </button>
      </div>
    </div>
  );
};

export default NavBar;

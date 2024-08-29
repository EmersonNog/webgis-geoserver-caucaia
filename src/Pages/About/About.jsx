import React from "react";
import "./About.css";
import NavBar from "../../Components/Navbar/Navbar";
import logo from "../../assets/images/certare.jpg";

function About() {
  return (
    <main role="main" className="background-about">
      <NavBar />
      <div className="main">
        <div className="about-container">
          <h1 className="about-title">
            <img src={logo} alt="Certare logo" />
            Sobre o SIG Web
            <img src={logo} alt="Certare logo" />
          </h1>
          <p className="about-description">
            O SIG Web é uma plataforma avançada que oferece um mapa dinâmico com
            dados georeferenciados da área de Caucaia, incluindo as regiões de
            Picuí e Cauípe.
          </p>
          <p className="about-description">
            Através deste sistema, é possível visualizar e interagir com
            informações geográficas detalhadas, proporcionando uma visão clara e
            precisa dos dados mapeados.
          </p>
          <p className="about-description">
            O SIG Web é projetado para atender a diversas necessidades de gestão
            e análise de dados espaciais.
          </p>
        </div>
      </div>
    </main>
  );
}

export default About;

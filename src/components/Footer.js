import React from "react";
import { Link } from "react-router-dom";
// import "./login.css"

export const Footer = () => {


  return (
    <div>
    <footer  className="container-fluid bg-black text-center p-3" >
      <div className="container">
      <p class="card-text">Fundacion Agrecol Andes.</p>
        <nav className="row">
          <a href='/login' className="text-white aling-items-center">&copy; Administrador</a>
        </nav>
      </div>
      </footer>
  </div> 

  );
};




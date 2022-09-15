import React from "react";
import { BrowserRouter as Router, Switch, Route, BrowserRouter, Link } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { About } from "./components/About";
import { Users } from "./components/Users";
import { Plantas_medicinales } from "./components/Plantas_medicinales";
import { Geolocalizacion } from "./components/Geolocalizacion/Geolocalizacion";
import { Login } from "./components/Login";
import { PlantaSingle } from "./components/information/PlantaSingle";
import { Camara } from "./components/Camara/Camara";
import { reconocerImagen } from "./components/Camara/reconocerImagen";

import 'bootstrap/dist/css/bootstrap.min.css';
import {Principal} from "./components/Principal";
import { Footer } from "./components/Footer";

// import {Pdf} from "./components/information/Pdf"
function App() {
  

  return (
    <div>
    <BrowserRouter>
      <Router>
        <Navbar />
        <Switch>
          <div className="container p-4">
            <Route path="/Users" component={Users} />
            <Route path="/About" component={About} />
            <Route path="/planta_medicinal/:plantaId" component={PlantaSingle} />
            <Route path="/Plantas_medicinales" component={Plantas_medicinales} />
            <Route path="/Geolocalizacion" component={Geolocalizacion} />
            <Route path="/Camara" component={Camara} />
            <Route path="/reconocerImagen" component={reconocerImagen} />
            <Route path="/Login" component={Login} />
            <Route path="/Principal" component={Principal} />
            {/* <Route path="/Pdf" component={Pdf} /> */}
          </div>
        </Switch>
      </Router>
    </BrowserRouter>
  
      {/* <Principal/> */}


          <br/>
          <br/>
            {/* <div className="container-fluid bg-black text-center p-3">
            <a href='/login' className="text-white">&copy; Administrador</a>
            </div> */}
      <Footer/>
      </div>
  );
}

export default App;


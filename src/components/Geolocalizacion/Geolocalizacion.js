import React, { useEffect, useState } from "react";

import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { IconLocation } from "./IconLocation";
import axios from "axios";
import logo from './logo/log.png'
import '../../styles/geolocalizacion.css'

const API = process.env.REACT_APP_API;

export const Geolocalizacion = () => {
  const [plantas, setPlantas] = useState([]);
  const position = [-17.8965, -65.04534];
  //const position1 = [-17.89667, -65.03217]\
  useEffect(() => {
    getPlantas();
  }, []);
  const getPlantas = async () => {
    const result = await axios.get(`${API}/Plantas_medicinales`);
    console.log(result.data);
    setPlantas(result.data);
  };
  return (
    <Map
      className="map"
      center={position}
      zoom={10}
      style={{ height: 500, width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {plantas.map((planta, index) => (
        <Marker
          position={[planta.latitud, planta.longitud]}
          icon={IconLocation}
        >
          <Popup>
            <img
              className="popup-img"
              src={API + "/file/" + planta.imagen}
              alt={planta.nombre_planta}
            />
            {planta.nombre_planta} <br /> {"Latitud: " + planta.latitud}, <br />{"Longitud: " + planta.longitud}{" "}
             
          </Popup>
        </Marker>
      ))}
    </Map>
  );
};

export default Geolocalizacion;

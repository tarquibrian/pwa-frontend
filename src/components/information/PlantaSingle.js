import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/about.css";
import jsPDF from "jspdf";
import img from "../img/agrecol.png";

const API = process.env.REACT_APP_API;

export const PlantaSingle = () => {
  const [planta, setPlanta] = useState({});
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    getPlanta();
  }, []);

  const getPlanta = async () => {
    const result = await axios.get(`${API}/Plantas_medicinale/` + path);
    setPlanta(result.data);
  };


  const Generar_pdf = async () =>{
    var doc = new jsPDF("p", "mm", "a4");
    // var width = doc.internal.pageSize.getWidth();
    // var height = doc.internal.pageSize.getHeight();
    // doc.addImage(img, 'PNG', 0,0,width,height)


    doc.addImage(img, 'PNG', 10,10,35,20)
    doc.setFont('Arial', 'bold', 12)
    // doc.cell(30,10,10,30,'title',30,0)


    doc.text(12, 60, "Nombre de la planta: " )
    doc.text(12, 70, "Nombre cientifico: " )
    doc.text(12, 80, "Propiedades:" )
    doc.text(12, 90, "Descripcion:" )
    doc.text(12, 100, "Conocimiento ancestral:" )
    doc.text(12, 110, "Latitud:" )
    doc.text(12, 120, "Longitud:" )

    doc.setFont('Helvertica', 'Normal')

    doc.text(80, 60, planta.nombre_planta)
    doc.text(80, 70, planta.nombre_cientifico)
    doc.text(80, 80, planta.propiedades, {align: 'justify',lineHeightFactor: 1.5,maxWidth:100})
    // doc.text(80, 90, planta.descripcion, {align: 'justify',lineHeightFactor: 1.5,maxWidth:20})
    // doc.text(80, 100, planta.conocimiento_ancestral, {align: 'justify',lineHeightFactor: 1.5,maxWidth:20} )
    doc.text(80, 110, planta.latitud)
    doc.text(80, 120, planta.longitud)

    doc.addPage()

    doc.save('DocumentPlanta.pdf')
}


  return (
    <>
      <div>
        <img
          className="planta-img"
          src={process.env.REACT_APP_API + "/file/" + planta.imagen}
          alt="img"
        />
      </div>
      <div className="container mt-4 mb-4">
        <h3 className="planta-title">
          nombre de la planta: <span>{planta.nombre_planta}</span>
        </h3>
        <h3>
          nombre cientifico: <span>{planta.nombre_cientifico}</span>
        </h3>
        <h3>
          propiedades: <span>{planta.propiedades}</span>
        </h3>
        <h3>
          descripcion: <span>{planta.descripcion}</span>
        </h3>
        <h3>
          conocimiento ancestral: <span>{planta.conocimiento_ancestral}</span>
        </h3>
        <h3>
          latitud: <span>{planta.latitud}</span>
        </h3>
        <h3>
          longitud: <span>{planta.longitud}</span>
        </h3>
      </div>
      <Link to={"/About"}>
        <button className="btn btn-info">ATRAS</button>
      </Link>
      <h1></h1>
      {/* <Link to={"/Pdf"}>
      <button className="btn btn-info">GENERAR PDF</button>
      </Link> */}

      <button className="btn btn-info" onClick = {Generar_pdf}> descargar PDF</button>
    </>
  );
};

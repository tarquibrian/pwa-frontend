import axios from "axios";
import React, { useState, useEffect } from "react";
import "../styles/about.css";
import { Link } from "react-router-dom";


const API = process.env.REACT_APP_API;

export const About = () => {
  const [plantas, setPlantas] = useState([]);

  useEffect(() => {
    getPlantas();
  }, []);

  const getPlantas = async () => {
    const result = await axios.get(`${API}/Plantas_medicinales`);
    setPlantas(result.data);
  };

  console.log(plantas)

  return (
    <div className="grid-container">
      {plantas.map((planta, index) => (
        <div className="grid-card" key={index}>
          <img
            className="card-img"
            src={API + '/file/' + planta.imagen}
            alt={planta.nombre_planta}
          />
          <div className="card-content">
            <h1 className="card-name">{planta.nombre_planta}</h1>
            <h3 className="card-name-scientific">{planta.nombre_cientifico}</h3>
            <Link to={`/planta_medicinal/${planta._id}`}>
              <button className="card-button">CONOCER</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};


// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import "../styles/about.css";

// import planta_img from "../assets/planta.jpg";
// import { Link } from "react-router-dom";
// import Viewer from 'react-viewer';
 



// //const API = process.env.REACT_APP_API;

// export const About = () => {
//   const [plantas, setPlantas] = useState([]);
//   const [ visible, setVisible ] = useState(false);

//   // useEffect(() => {
//   //   getPlantas();
//   // }, []);

//   // const getPlantas = async () => {
//   //   const result = await axios.get(`${API}/Plantas_medicinales`);
//   //   setPlantas(result.data);
//   // };

//   // console.log(plantas)

//   return (
//     <div>
//       <Viewer
//       visible={visible}
//       onClose={() => { setVisible(false); } }
//       images={[{src: '', alt: ''}]}
//       />
//     </div>
//   );
// };

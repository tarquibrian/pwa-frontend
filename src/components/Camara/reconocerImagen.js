import React, { useState, useEffect, useRef } from 'react';
// import './static/css/main.css';
import axios from "axios";

const API = process.env.REACT_APP_API;

export const reconocerImagen = ()=> {


//   const [image, setImage] = useState();

//   const onChangePicture = e => {
//     console.log('picture: ', image);
//     setImage(e.target.files[0]);
//     const formData = new FormData();
//     formData.append("file", e.target.files[0]);
//     formData.append("filename","test");
//     fetch('http://localhost:5000/predecir', {
//         method: 'POST', // or 'PUT'
//         mode: 'no-cors',
//         body:formData,
//         headers:{
//             'Content-Type': 'multipart/form-data',
//         }
//       }).then((response) => {
//         console.log(response);
//       });
// };
// const style = {display}
const recon_imag = async (e)  =>{
await axios.post(`${API}predict`);
}
    return (
      <div>
        <center><h2>Reconocimiento de imagen</h2></center>
        <form id="upload-file" method="post" enctype="multipart/form-data">
              <label for="imageUpload" className="upload-label">
                  Elegir Imagen
              </label>
              <input type="file" name="file" id="imageUpload" accept=".*" />
          </form>

          <div className="image-section" style={{display: "none"}}>
              <div className="img-preview">
                  <div id="imagePreview">
                  </div>
              </div>
              <div>
                  <button type="button" className="btn btn-dark" id="btn-predict" onClick={recon_imag}>Predicción</button>
              </div>
          </div>

          <div className="loader" style={{display: "none"}}></div>


          <footer>
              <script src="{{ url_for('static', filename='js/main.js') }}" type="text/javascript"></script>    
          </footer>

      </div>
    );
  }

export default reconocerImagen;


// import React, { Component, Fragment, useRef } from 'react';
// import PropTypes from 'prop-types';
// import './style.css';

// // function capture(imgSrc) {
// //     console.log(imgSrc);
// //   }

// // const cam = useRef(null);

// export class Camara extends Component {

//   constructor(props) {
//     super(props);

//     const { width, height, front } = this.props;
//     navigator.mediaDevices
//       .getUserMedia({
//         audio: false,
//         video: {
//           width: { ideal: width },
//           height: { ideal: height },
//           facingMode: front ? 'user' : 'environment',
//         },
//       })
//       .then(this.success)
//       .catch(this.error);

//     this.camRef = React.createRef();
//     this.canvasRef = React.createRef();
//   }

//   success = stream => {
//     const video = this.camRef.current;
//     video.srcObject = stream;
//     video.play();
//   };

//   error = err => {
//     const { onError } = this.props;

//     if (onError) {
//       onError(err);
//     } else {
//       console.log(err);
//     }
//   };

//   capture = () => {
//     const { capture } = this.props;
//     const canvas = this.canvasRef.current;
//     const video = this.camRef.current;
//     const context = canvas.getContext('2d');
//     context.drawImage(video, 0, 0);
//     capture(canvas.toDataURL('image/jpeg'));
//   };

//   render() {
//     const defaultColor = '#2acef5';
//     const {
//       showFocus,
//       btnColor,
//       width,
//       height,
//       focusWidth,
//       focusHeight,
//     } = this.props;

//     return (
//       <div className="camera-container">
//         <video
//           id="video"
//           width={width}
//           height={height}
//           autoPlay
//           playsInline
//           ref={this.camRef}
//         />
//         {showFocus ? (
//           <div
//             className="camera-focus"
//             style={{
//               borderColor: btnColor || defaultColor,
//               width: focusWidth || '80%',
//               height: focusHeight || '50%',
//             }}
//           />
//         ) : null}
//         <canvas
//           id="canvas"
//           width={width}
//           height={height}
//           ref={this.canvasRef}
//           style={{ display: 'none' }}
//         />

// {/*
//         <Fragment>
//             <Camara
//                 showFocus={false}
//                 front={false}
//                 capture={capture}
//                 ref={cam}
//                 width="80%"
//                 height="80%"
//                 focusWidth="30%"
//                 focusHeight="30%"
//                 btnColor="white"
//             />

//             <button onClick={img => cam.current.capture(img)}>CAPTURAR IMAGEN</button>

//             </Fragment> */}
// <br/>

// <br/>
//             {/* <div className='row' >
//                 <input type="file" accept="image/*" capture="camera" />
//             </div> */}
//       </div>
 
//     );
//   }
// }

// Camara.propTypes = {
//   front: PropTypes.bool,
//   width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
//   height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
//   capture: PropTypes.func.isRequired,
//   showFocus: PropTypes.bool,
//   btnColor: PropTypes.string,
//   focusWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//   focusHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//   onError: PropTypes.func,
// };
// export default Camara;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API;

export const Camara = () => {
  const [pred, setPred] = useState(false);
  const [llamar, setLlamar] = useState(false);
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  // const [image, setImage] = useState({'file':''});
  const [infoPredict, setInfoPredict] = useState({
    nombre: "",
    nombre_cientifico: "",
    propiedades: "",
  });

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 700, height: 400 },
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const takePhoto = async (e) => {
    const width = 414;
    const height = width / (16 / 9);
    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;
    let context = photo.getContext("2d");
    context.drawImage(video, 0, 0, width, height);
    setHasPhoto(true);
    // console.log(photo.toDataURL('image/jpg'));

    let pathfile = photo
      .toDataURL("image/jpg")
      .split(";base64,")
      .pop();
    //  setImage({"file": pathfile});
    console.log(JSON.parse(localStorage.getItem("login")).email + "" + Math.random());
    var nombre = JSON.parse(localStorage.getItem("login")).email + "" + Math.random() + ".png";
    localStorage.setItem("photo", nombre);

    axios.post(`${API}prediccion img save`, { json: pathfile, nombre: nombre }, {})
.then((response) => {
        console.log(response);

        setPred(true);
      })
      .catch((error) => {
        console.log('error en la camara', error);
      });

    //  await axios.post(`${API}prediccion`, pathfile);
    //  await axios.post(`${API}prediccion`, {'json':pathfile});
    // console.log(photo.URL.toDataURL(e.target.files[0]));
    // let image64 = URL.createObjectURL(e.target.files[0])
  };

  const onChangePicture = () => {
    // console.log(image.file)
    axios
      .post(`${API}predict`, { photo: localStorage.getItem("photo") }, {})
      .then((response) => {
        console.log(response.data);
        setInfoPredict({ nombre: response.data });
        setLlamar(true);
      });
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <div className="App">
      <div className="camera">
        <center>
          <video ref={videoRef}></video>
        </center>
      </div>

      <div>
        <center>
          <button onClick={takePhoto}>CAPTURAR IMAGEN</button>
          {/* <button onClick={onChangePicture} >PREDICCION</button> */}
          {/* <button onClick={onChangePicture} >guardar</button> */}
        </center>
      </div>

      <center>
        <h1></h1>
        <h1></h1>

        <div className={"result" + (hasPhoto ? "hasPhoto" : "")}>
          <canvas ref={photoRef}></canvas>

          {/* <button>guardar</button> */}
        </div>

        {pred && (
          <div>
            <button onClick={onChangePicture}>PREDECIR</button>
          </div>
        )}
        {llamar && (
          <>
            <h1></h1>
            <h1></h1>
            <h1></h1>
            <h1></h1>
            <h4>{infoPredict.nombre}</h4>
            <p></p>
          </>
        )}
      </center>
    </div>
  );
};

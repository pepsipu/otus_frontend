import React from 'react';
import ReactDOM from 'react-dom';
import ReCAPTCHA from "react-google-recaptcha";
import './index.css';
import Home from "./components/Home";
import Images from "./components/Images";
import APIStatus from "./components/APIStatus";
import Competitors from "./components/Competitors";
import Download from "./components/Download";
import Updates from "./components/Updates";

window.clientCaptcha = "6LeBMcIUAAAAAJ3dmdJUgO5J7Xg_2sZTYTibsUba";
window.captcha = React.createRef();
window.otus_host = "http://api.otus.pepsipu.com";
//window.otus_host = "http://localhost:8000";

let frame = document.getElementById("frame");
document.getElementById("home-tab").onclick = () => ReactDOM.render(<Home/>, frame);
document.getElementById("images-tab").onclick = () => ReactDOM.render(<Images/>, frame);
document.getElementById("download-tab").onclick = () => ReactDOM.render(<Download/>, frame);
document.getElementById("scoreboards-tab").onclick = () => ReactDOM.render(<Competitors/>, frame);
document.getElementById("updates-tab").onclick = () => ReactDOM.render(<Updates/>, frame);

ReactDOM.render(<APIStatus/>, document.getElementById("api-status"));
ReactDOM.render(<Home/>, frame);
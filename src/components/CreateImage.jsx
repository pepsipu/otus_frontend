import React, {Component} from "react";
import ReactDom from "react-dom";
import Images from "./Images";
import ReCAPTCHA from "react-google-recaptcha";
import {ToastsContainer, ToastsStore} from "react-toasts";
import axios from "axios";

export default class CreateImage extends Component {
    state = {
        vulnerability_count: 0,
    };
    serialize = () => {
        let image = {
            name: document.getElementById("image-name").value,
            description: document.getElementById("image-description").value,
            download: document.getElementById("image-download").value,
            vulnerabilities: []
        };
        Array.from(document.getElementById("vulnerabilities").children).forEach(child => {
            image.vulnerabilities.push({
                command: child.getElementsByClassName("command")[0].value,
                status_code: child.getElementsByClassName("status_code")[0].value,
                success_message: child.getElementsByClassName("success_message")[0].value,
                points: child.getElementsByClassName("points")[0].value
            });
        });
        return image;
    };
    get_vulnerabilities = () => {
        let vulns = [];
        for (let i = 0; i < this.state.vulnerability_count; i++) {
            let x = <div key={i} id={`${i}-vuln`}>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <input style={{borderRight: "none", textAlign: "center", width: "25%"}} className="command" placeholder="command"/>
                    <input style={{borderRight: "none", textAlign: "center", width: "25%"}} className="success_message" placeholder="success"/>
                    <input style={{borderRight: "none", textAlign: "center", width: "25%"}} placeholder="status code" className="status_code"/>
                    <input style={{textAlign: "center", width: "25%"}} placeholder="points" className="points"/>
                    <button className={"clicky"} onClick={() => {
                        let vulnerabilities = this.serialize().vulnerabilities;
                        vulnerabilities.splice(i, 1);
                        let vulnContainer = document.getElementById("vulnerabilities");
                        this.setState({vulnerability_count: this.state.vulnerability_count - 1});
                        this.forceUpdate(() => {
                            Array.from(document.getElementById("vulnerabilities").children).forEach((child, index) => {
                                child.getElementsByClassName("success_message")[0].value = vulnerabilities[index].success_message;
                                child.getElementsByClassName("status_code")[0].value = vulnerabilities[index].status_code;
                                child.getElementsByClassName("command")[0].value = vulnerabilities[index].command;
                                child.getElementsByClassName("points")[0].value = vulnerabilities[index].points;
                            });
                        });

                    }}>-</button>
                </div>
                <br/>
            </div>;
            vulns.push(x);
        }
        return vulns;
    };

    save = () => {
        let image = this.serialize();
        localStorage.setItem("image", JSON.stringify(image));
        ToastsStore.success("saved!");
    };

    load = () => {
        let image = localStorage.getItem("image");
        if (image === null) {
            ToastsStore.error("no saved image :(");
            return;
        }
        image = JSON.parse(image);
        this.setState({vulnerability_count: image.vulnerabilities.length});
        document.getElementById("image-name").value = image.name;
        document.getElementById("image-description").value = image.description;
        document.getElementById("image-download").value = image.download;
        this.forceUpdate(() => {
            console.log("force update called");
            image.vulnerabilities.forEach((vulnerability, index) => {
                let x = document.getElementById(`${index}-vuln`);
                x.getElementsByClassName("success_message")[0].value = image.vulnerabilities[index].success_message;
                x.getElementsByClassName("status_code")[0].value = image.vulnerabilities[index].status_code;
                x.getElementsByClassName("command")[0].value = image.vulnerabilities[index].command;
                x.getElementsByClassName("points")[0].value = image.vulnerabilities[index].points;
            });
            ToastsStore.success("loaded!");
        });
    };

    upload = () => {
        let captcha = window.captcha.current.getValue();
        if (captcha === "") {
            ToastsStore.error("captcha not filled out :(");
            return;
        }
        let image = this.serialize();
        image.vulnerabilities.forEach((vuln, index) => {
            image.vulnerabilities[index].status_code = parseInt(vuln.status_code);
            image.vulnerabilities[index].points = parseInt(vuln.points);
        });
        image.secret = document.getElementById("image-secret").value;
        console.log({
            image,
            captcha,
        });
        axios.post(`${window.otus_host}/create-image`, {
            image,
            captcha,
        }).then(res => {
            if (res.data.success) {
                ToastsStore.success("uploaded!");
            } else {
                ToastsStore.error("captcha failed or other error");
            }
        })
    };

    render() {
        return <React.Fragment>
            <p style={{textAlign: "left", position: "absolute", fontSize: "15pt"}} onClick={() => {
                ReactDom.render(<Images/>, document.getElementById("frame"));
            }}>    &#x3008;</p>
            <h3>create an image</h3>
            <small>keep it civil. don't include any inappropriate words.</small>
            <br/>
            <br/>
            <button className="clicky" style={{marginRight: "5px"}} onClick={this.save}>save for later</button>
            <button className="clicky" style={{marginLeft: "4px"}} onClick={this.load}>load from before</button>
            <br/>
            <br/>
            <hr/>
            <br/>
            <div style={{
                textAlign: "center"
            }}>
                <input id="image-name" placeholder="image name"/>
                <br/>
                <br/>
                <input id="image-download" style={{width: "30%", textAlign: "center"}} placeholder="download url"/>
                <br/>
                <br/>
                <textarea id="image-description" placeholder="image description"/>
                <br/>
                <br/>
                <div id="vulnerabilities">
                    {this.get_vulnerabilities()}
                </div>
            </div>
            <br/>
            <button className="clicky" onClick={() => {
                this.setState({vulnerability_count: this.state.vulnerability_count + 1})
            }}>add vulnerability +</button>
            <br/>
            <br/>
            <div style={{
                display: "inline-block"
            }}>
                <ReCAPTCHA
                    sitekey={window.clientCaptcha}
                    onChange={() => {}}
                    ref={window.captcha}
                    theme={"dark"}
                />
            </div>
            <br/>
            <br/>
            <input id="image-secret" style={{width: "30%", textAlign: "center"}} placeholder="secret key (to delete later)"/>
            <br/>
            <br/>
            <button className="clicky" onClick={this.upload}>upload</button>
            <ToastsContainer store={ToastsStore}/>
        </React.Fragment>
    }
}
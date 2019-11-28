import React, {Component} from "react";
import ReactDom from "react-dom";

export default class Download extends Component{
    render() {
        return <div>
            <p>So, you want to make an image using the Otus Engine? Well, you've come to the right place!</p>
            <p>You can download the engine client on the GitHub.</p>
            <button className={"clicky"} onClick={() => window.location.href = "https://github.com/pepsipu/otus_engine"}>Get the client >></button>
            <p>The engine will generate a scoring_report.json in the directory it is running. It is up to you to display that on your scoring report. This is in order to keep the theme of the image consistent. </p>
            <p>As for checking if vulnerabilities are patched, shell commands are run at an interval to verify a vulnerabilities status. These commands are created at the "images" page on this website. Once a shell command's status code matches the one you have provided, the vulnerability is marked as patched.</p>
        </div>
    }
}
import React, {Component} from "react";
import ReactDom from "react-dom";
import axios from "axios";

export default class APIStatus extends Component{
    state = {
        online: true
    };
    render() {
        return <React.Fragment>
            <span style={{fontSize: "10pt"}}>api </span>
            <span className={`api-${this.state.online ? "online" : "offline"}`}/>
        </React.Fragment>
    }
    constructor(props) {
        super(props);
        axios.get(window.otus_host, {timeout: 10000}).then(() => {
            this.setState({online: true});
        }).catch(() => {
            this.setState({online: false});
        });
    }
}
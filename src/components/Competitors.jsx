import React, {Component} from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Scoreboard from "./Scoreboard";

export default class Home extends Component {
    state = {
        competitors: []
    };

    getCompetitors = () => {
        axios.get(window.otus_host + "/get-competitors/" + document.getElementById("image-scoreboards").value).then(res => {
            this.setState({competitors: res.data.competitors});
        })
    };

    render() {
        return <React.Fragment>
            <div className="competitor-search">
                <button className="clicky" id="search" onClick={this.getCompetitors}>get competitors</button>
                <input id="image-scoreboards" placeholder=" image"/>
            </div>
            <br/>
            {}
            {this.state.competitors.map((competitor, index) => {
                return <div className="image competitor" key={index}>
                    <div style={{
                        borderRight: "double",
                        paddingRight: "50px",
                        paddingLeft: "50px"
                    }}>
                        <p>{competitor.name}</p>
                    </div>
                    <div style={{
                        borderRight: "double",
                        paddingRight: "50px",
                        paddingLeft: "50px"
                    }}>
                        <p>{competitor.score}</p>
                    </div>
                    <button className="clicky" id={"competitor-" + index} style={{margin: "auto", marginRight: "20px"}} onClick={() => {
                        ReactDOM.render(<Scoreboard image={document.getElementById("image-scoreboards").value} competitor={competitor}/>, document.getElementById("frame"))
                    }}>check scoreboard</button>
                </div>
            })}
        </React.Fragment>
    }
}
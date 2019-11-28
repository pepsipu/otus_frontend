import React, {Component} from "react";
import ReactDom from "react-dom";
import moment from 'moment';
import axios from "axios";
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';

export default class Home extends Component {
    highest = 0;
    state = {
        graph: []
    };
    getCompetitorInfo = (competitor) => {
        axios.get(window.otus_host + "/stats/" + competitor.id).then(res => {
            this.setState({
                graph: res.data.time_slices.map(time_slice => {
                    if (time_slice.current_points > this.highest) {
                        this.highest = time_slice.current_points;
                    }
                    return [moment(time_slice.timestamp), time_slice.current_points]
                }),
                max: res.data.max_score
            });
        });
    };
    getData = () => {
        let data = [];
        for (let i = 0; i < this.state.graph.length; ++i) {
            data.push({name: this.state.graph[i][0].format("h:mm:ss a"), score: this.state.graph[i][1]})
        }
        return data;
    };

    render() {
        console.log(document.getElementById("frame").offsetWidth)
        return <React.Fragment>
            <h2>{this.competitor.name}</h2>
            <small>{this.highest} out of {this.state.max} points</small>
            <br/>
            <div>
                <LineChart width={document.getElementById("frame").offsetWidth} height={300} data={this.getData()}
                           margin={{top: 5, right: 50, bottom: 5, left: 5}}>
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                    <XAxis dataKey="name"/>
                    <YAxis type="number" domain={[0, this.state.max]}/>
                    <Line type="monotone" dataKey="score" stroke="#8884d8"/>
                    <Tooltip/>
                </LineChart>
            </div>
        </React.Fragment>
    }

    constructor(props) {
        super(props);
        this.getCompetitorInfo(props.competitor);
        this.competitor = props.competitor;
        console.log("b" + props.competitor)
    }
}
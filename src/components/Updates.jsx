import React, {Component} from "react";
import axios from "axios";
import moment from "moment";

export default class Images extends Component {
    state = {
        updates: []
    };
    render() {
        return <div>
            <div id="updates">
                <br/>
                {this.state.updates.map((update, index) => {
                    return <div key={index} className="image">
                        <div>
                            <h2>{update.header}</h2>
                            <small>{moment(update.timestamp).fromNow()}</small>
                        </div>
                        <hr/>
                        <div>
                            <p>{update.content}</p>
                        </div>
                    </div>
                })}
            </div>
        </div>
    }

    constructor(props) {
        super(props);
        axios.get(`${window.otus_host}/updates`).then(res => {
            this.setState({updates: res.data.updates.reverse()});
        });
    }
}
import React, {Component} from "react";
import ReactDom from "react-dom";
import CreateImage from './CreateImage';
import axios from "axios";
import {ToastsContainer, ToastsStore} from "react-toasts";

export default class Images extends Component {
    state = {
        images: []
    };
    render() {
        return <div>
            <ToastsContainer store={ToastsStore}/>
            <div className="image-search">
                <button className="clicky" id="search">search</button>
                <input id="image-search-bar" placeholder=" image"/>
            </div>
            <hr/>
            <div id="images">
                <div id="make-image">
                    <button className="clicky" onClick={() => {
                       ReactDom.render(<CreateImage/>, document.getElementById("frame"))
                    }}>Make an image +</button>

                </div>
                <br/>
                {this.state.images.map((image, index) => {
                    return <div key={image.name} className="image">
                        <div style={{display: "flex"}}>
                            <h2>{image.name}</h2>
                            <button className="clicky" style={{margin: "auto", marginRight: "20px"}} onClick={() => {
                                let image_url = new URL(image.download);
                                if (image_url.protocol === "https:" || image_url.protocol === "http:") {
                                    window.open(image.download, "_blank");
                                }
                            }}>download &#x21E9;</button>
                        </div>
                        <hr/>
                        <div style={{display: "flex"}}>
                            <p>{image.description}</p>
                            <div className="image-delete" style={{margin: "auto", marginRight: "20px"}}>
                                <button className="clicky" onClick={() => {
                                    let secret = document.getElementById("image-secret-" + index).value;
                                    axios.get(window.otus_host + `/delete-image?secret=${secret}&image=${image.name}`).then(res => {
                                        if (res.data.success) {
                                            ToastsStore.success("image deleted!");
                                            return;
                                        }
                                        ToastsStore.error("incorrect secret :(");
                                    });
                                }}>delete</button>
                                <input id={"image-secret-" + index} placeholder=" image secret"/>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    }

    constructor(props) {
        super(props);
        axios.get(`${window.otus_host}/images`).then(res => {
            this.setState({images: res.data.images});
        });
    }
}
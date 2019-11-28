import React, {Component} from "react";
import ReactDom from "react-dom";

export default class Home extends Component{
    render() {
        return <div>
            <p>Otus Engine is a Linux scoring engine, emulating CyberPatriot's scoring engine. Using and making engines is very easy thanks to the web UI, which allows you to build custom images as well as download and run them with ease.</p>
            <br/>
            <p>Anyone can upload an image. Anyone can download an image.</p>
            <br/>
            <p>The Otus Engine is open sourced on github. Would you give it a star?</p>
            <button className={"clicky"} onClick={() => window.location.href = "https://github.com/pepsipu/otus_engine"}>Check it out >></button>
            <br/>
            <br/>
            <h3>How does it work?</h3>
            <p>The Otus Engine is comprised of 3 main components:</p>
            <ul>
                <li>The back-end: This interacts with the Postgres database (it's all custom SQL), interacts with the client, as well as serves the content to the front end. It is written in Rust in order to handle the load of validating and scoring many clients at once.</li>
                <br/>
                <li>The front-end: This is what you're seeing right now! The CSS is all homemade to reduce bloat on computer that don't have much power. It will allow you to view scores, download and make images, and more! It is written in Javascript with the React.JS graphics framework.</li>
                <br/>
                <li>The client: The client is what is running on the image you are playing. It interacts with the server and gives it an idea of the current state of the machine as well as collecting and scoring vulnerabilities. It is written in C++.</li>
            </ul>
            <p>These three components make up the engine.</p>
            <h3>Who made it?</h3>
            <p>That's me, Sammy Hajhamid! I'm a freshman at Troy High School and I made the engine because many people on the cyber patriot Subreddit and Discord did not have engines they could use (Troy has an engine, but it's in Python and is really limited).</p>
            <br/>
            <p>This is an open source project. The engine isn't secure, which needs some a bit of fixing from my crypto people! <b>There are bound to be bugs, so please submit a GitHub issue if you find one.</b> Forks of the project are encouraged and are appreciated!</p>
        </div>
    }
}
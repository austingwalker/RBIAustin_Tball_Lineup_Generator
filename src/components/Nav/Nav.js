import React from "react";
// import {Row, Col, Navbar } from 'reactstrap';
import { Link } from "react-router-dom";
import RBI_Header from "./images/RBI_Header.jpg"
import "./Nav.css"

const comingSoon = () => {
    alert("Share function coming soon!")
}

const Nav = (props) => (
    <div>
        <Link to={"/"}>
            <div className="navBox">
                <img id="rbiLogo" src={RBI_Header} alt="logo"/>
            </div>
        </Link>
        <div id="navBtns">
            <Link to={"/rules"}><button id="viewRulesBtn">View Rules</button></Link>
            <button id="sendBtn" onClick={comingSoon}>Share Lineup <i class="fas fa-share"></i></button>
        </div>
    </div>
);

export default Nav;

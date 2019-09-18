import React from "react";
// import {Row, Col, Navbar } from 'reactstrap';
import ContentEditable from 'react-contenteditable';
import "./Roster.css"

const Roster = (props) => (
    <div id="rosterBox">
        <h5 id="roster">Roster: </h5>
            {props.roster.map((p, i)=> (
                <ContentEditable
                key={i}
                className="playerRowBox"
                title={i}
                html={props.roster[i]}
                onChange={props.handlePlayerChange}
                />
                ))}
    
    </div>
);

export default Roster;

import React from "react";
// import {Row, Col, Navbar } from 'reactstrap';
import ContentEditable from 'react-contenteditable';
import "./Roster.css"


const Roster = (props) => (
    <div id="rosterBox">
        <h5 id="roster">Roster: </h5>
        <div>
            {props.roster.map((p, i)=> (
                <div className="playerRowBox">
                    <button id="rosterDelete" value={i} onClick={props.handleRosterDelete}>X</button>
                    <ContentEditable
                    key={i}
                    title={i}
                    html={props.roster[i]}
                    onChange={props.handlePlayerChange}
                    />
                </div>
            ))}
        </div>
    </div>
);

export default Roster;

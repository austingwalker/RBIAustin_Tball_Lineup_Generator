import React from "react";
import {Row, Col, Navbar } from 'reactstrap';
import ContentEditable from 'react-contenteditable';
import "./PitcherCatcher.css"

const PitcherCatcher = (props) => (
    <div id="pitcherCatcherDiv">
        <Row className="title pc">
            <h5>Pitcher / Catcher</h5>
        </Row>
        <Row className="positionRow">
            <Col>
              <h5 className="playerBox position pcPosition" >Pitcher</h5>
              {props.positions.pitcher.map((p, i) => (
                <ContentEditable
                    key={i}
                    id={i}
                    className="playerBox position pcPosition"
                    title="pitcher"
                    html={props.positions.pitcher[i]}
                    onChange={props.handlePositionChange}
                />
                ))}
            </Col>
            <Col>
              <h5 className="playerBox position" >Catcher</h5>
              {props.positions.catcher.map((p, i) => (
                <ContentEditable
                    key={i}
                    id={i}
                    className="playerBox position pcPosition"
                    title="catcher"
                    html={props.positions.catcher[i]}
                    onChange={props.handlePositionChange}
                />
                ))}
            </Col>
        </Row>
    </div>
);

export default PitcherCatcher;

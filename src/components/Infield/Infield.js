import React from "react";
import {Row, Col, Navbar } from 'reactstrap';
import ContentEditable from 'react-contenteditable';
import "./Infield.css"

const Infield = (props) => (
    <div id="infieldDiv">
           <Row className="title">
              <h5>Infield</h5>
            </Row>
            <Row className="positionRow">
            <div className="fieldingCol">
              <h5 className="playerBox position">Third</h5>
              {props.positions.third.map((p, i) => (
              <ContentEditable
                key={i}
                id={i}
                className="playerBox position"
                title="third"
                html={props.positions.third[i]}
                onChange={props.handlePositionChange}
              />
              ))}
              </div>
              <div className="fieldingCol">
              <h5 className="playerBox position">Short</h5>
              {props.positions.shortStop.map((p, i) => (
              <ContentEditable
                key={i}
                id={i}
                className="playerBox position"
                title="shortStop"
                html={props.positions.shortStop[i]}
                onChange={props.handlePositionChange}
              />
              ))}
              </div>
              <div className="fieldingCol">
              <h5 className="playerBox position">Second</h5>
              {props.positions.second.map((p, i) => (
              <ContentEditable
                key={i}
                id={i}
                className="playerBox position"
                title="second"
                html={props.positions.second[i]}
                onChange={props.handlePositionChange}
              />
              ))}
              </div>
              <div className="fieldingCol">
              <h5 className="playerBox position">First</h5>
              {props.positions.first.map((p, i) => (
              <ContentEditable
                key={i}
                id={i}
                className="playerBox position"
                title="first"
                html={props.positions.first[i]}
                onChange={props.handlePositionChange}
              />
              ))}
              </div>
            </Row>
    </div>
);

export default Infield;

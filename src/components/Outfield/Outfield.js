import React from "react";
import {Row, Col, Navbar } from 'reactstrap';
import ContentEditable from 'react-contenteditable';
import "./Outfield.css"

const Outfield = (props) => (
    <div id="outfieldDiv">
        <Row className="title">
              <h5>Outfield</h5>
        </Row>
        <Row className="positionRow">
            <div className="fieldingCol">
              <h5 className="playerBox position">Left</h5>
              {props.positions.left.map((p, i) => (
                <ContentEditable
                    key={i}
                    id={i}
                    className="playerBox position"
                    title="left"
                    html={props.positions.left[i]}
                    onChange={props.handlePositionChange}
                />
              ))}
            </div>
            <div className="fieldingCol">
              <h5 className="playerBox position">Left Center</h5>
              {props.positions.leftCenter.map((p, i) => (
                <ContentEditable
                    key={i}
                    id={i}
                    className="playerBox position"
                    title="leftCenter"
                    html={props.positions.leftCenter[i]}
                    onChange={props.handlePositionChange}
                />
              ))}
            </div>
            <div className="fieldingCol">
              <h5 className="playerBox position">Right Center</h5>
                {props.positions.rightCenter.map((p, i) => (
                <ContentEditable
                    key={i}
                    id={i}
                    className="playerBox position"
                    title="rightCenter"
                    html={props.positions.rightCenter[i]}
                    onChange={props.handlePositionChange}
                />
              ))}
            </div>
            <div className="fieldingCol">
              <h5 className="playerBox position">Right</h5>
              {props.positions.right.map((p, i) => (
                <ContentEditable
                    key={i}
                    id={i}
                    className="playerBox position"
                    title="right"
                    html={props.positions.right[i]}
                    onChange={props.handlePositionChange}
                />
              ))}
            </div>
        </Row>
    </div>
);

export default Outfield;

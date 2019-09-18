import React from "react";
import {Row, Col, Navbar } from 'reactstrap';
import ContentEditable from 'react-contenteditable';
import "./Batting.css"

const Batting = (props) => (
    <div id="battingBox">
        <Row id="battingOrderTitle">
            <h5 className="order">Batting Order</h5>
        </Row>
            <Row className="battingOrderRow">
              <Row className="battingOrderSubRow">
                  {props.offense.map((p, i)=> (
                  <div className="battingOrderBox" key={i}>
                  <div id="orderNum">{`${i+1}. )`}</div>
                   <ContentEditable
                   key={i}
                   title={i}
                   html={props.offense[i]}
                   onChange={props.handleBattingOrderChange}
                   />
                   </div>
                  ))}
              </Row>
            </Row>
    </div>
);

export default Batting;

import React from "react";
import {Row} from 'reactstrap';
import ContentEditable from 'react-contenteditable';
import "./Bench.css"

const Bench = (props) => (
    <div id="benchDiv">
        <Row className="title bench">
            <h5>Bench</h5>
        </Row>
        <Row className="benchOrderRow">
        <Row className="benchOrderSubRow">
            {props.positions.bench.one.map((p, i) => (
                <div className="benchBox" key={i}>
                    <ContentEditable
                    key={i}
                    id={i}
                    title="one"
                    html={props.positions.bench.one[i]}
                    onChange={props.handleBenchChange}
                    />
                </div>
            ))}
        </Row>
        <Row className="benchOrderSubRow">
            {props.positions.bench.two.map((p, i) => (
                <div className="benchBox" key={i}>
                    <ContentEditable
                    key={i}
                    id={i}
                    title="two"
                    html={props.positions.bench.two[i]}
                    onChange={props.handleBenchChange}
                    />
                </div>
            ))}
        </Row>
        <Row className="benchOrderSubRow">
            {props.positions.bench.three.map((p, i) => (
                <div className="benchBox" key={i}>
                    <ContentEditable
                    key={i}
                    id={i}
                    title="three"
                    html={props.positions.bench.three[i]}
                    onChange={props.handleBenchChange}
                    />
                </div>
            ))}
        </Row>
        <Row className="benchOrderSubRow">
            {props.positions.bench.four.map((p, i) => (
                <div className="benchBox" key={i}>
                    <ContentEditable
                    key={i}
                    id={i}
                    title="four"
                    html={props.positions.bench.four[i]}
                    onChange={props.handleBenchChange}
                    />
                </div>
            ))}
        </Row>
        </Row>
    </div>
);

export default Bench;

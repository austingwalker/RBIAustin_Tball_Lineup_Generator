import React from "react";
// import {Row, Col, Navbar } from 'reactstrap';
import "./Names.css"

const Names = (props) => (
 <div>
  <h5>Enter one players name at a time:</h5>
  <div className="wrapper wrapperBox">
    <form className="nameBox">
        <div className="form-group nameInput">
            <input type="text" className="form-control" placeholder="name" name="player" value={props.player} onChange={props.handleInputChange}/>
        </div>
        <button type="submit" className="btn btn-primary nameBtn" onClick={props.enterName}>Add Player</button>
    </form>
</div>
</div>
);

export default Names;

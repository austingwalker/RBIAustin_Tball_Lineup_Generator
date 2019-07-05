import React from "react";
// import {Row, Col, Navbar } from 'reactstrap';
import "./Names.css"

const Names = (props) => (
 
  <div className="wrapper wrapperBox">
    <form>
        <div className="form-group">
            <label>Enter 1 player name at a time:</label>
            <input type="text" className="form-control" placeholder="name" name="player" value={props.player} onChange={props.handleInputChange}/>
            <small className="form-text text-muted">Name</small>
        </div>
        <button type="submit" className="btn btn-primary" onClick={props.enterName}>Add Player</button>
    </form>

</div>
);

export default Names;

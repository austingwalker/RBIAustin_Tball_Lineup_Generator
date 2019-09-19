import React from "react";
import "./Names.css"

const Names = (props) => (
 <div id="namesDiv">
    <h5>Enter one players name at a time:</h5>
    <div className="wrapper wrapperBox">
        <form className="nameBox">
            <div className="form-group nameInput">
                <input type="text" className="form-control nameInput" placeholder="name" name="player" value={props.player} onChange={props.handleInputChange}/>
            </div>
            <button type="submit" className="btn btn-primary nameBtn" onClick={props.enterName}>Add Player</button>
            <button  className="btn btn-secondary generateBtn" onClick={props.generateLineup}>Generate Lineup</button>
        </form>
    </div>
 </div>
);

export default Names;

import React, { Component } from "react";
// import API from "../../utils/API";
import { Container, Row, Col } from 'reactstrap';
import ContentEditable from 'react-contenteditable'
import update from 'immutability-helper';
// import Names from "../../components/Names";
import Nav from "../../components/Nav";
import "./Home.css"


class Home extends Component {
  state = {
    player: "",
    roster: {
      team: []
    },
    offense: {
      order: ["","","","","","","","","","","","","","","","","","","",""]
    },
    defense: [],
    defense2: [],
    positions: { 
      pitcher: {
        inning: ["", "", ""]},
      catcher: {
        inning: ["", "", ""]},
      first: {
        inning: ["", "", ""]},
      second: {
        inning: ["", "", ""]},
      shortStop: {
        inning: ["", "", ""]},
      third: {
        inning: ["", "", ""]},
      right: {
        inning: ["", "", ""]},
      rightCenter: {
        inning: ["", "", ""]},
      leftCenter: {
        inning: ["", "", ""]},
      left: {
        inning: ["", "", ""]},
      bench: {
        inning: {
          one: ["", "", "", "", "", "", "", "", "", ""],
          two: ["", "", "", "", "", "", "", "", "", ""],
          three: ["", "", "", "", "", "", "", "", "", ""],
        },
      },
    },
  };

handleInputChange = event => {
  console.log(event)
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
};

handleBattingOrderChange = (e) => {
  const index = e.currentTarget.title
  const intIndex = parseInt(index, 10)
  const newArr = this.state.offense.order.map((p, i) => {
    if(i === intIndex){
      p = e.target.value
    }
   return p
  })
  const newObj = update(this.state.offense, {order: {$set: newArr}})
  this.setState({
    offense: newObj
  })
};

handlePositionChange = (e) => {
  // console.log(e)
  const title = e.currentTarget.title
  const index = e.currentTarget.id
  const intIndex = parseInt(index, 10)
  const newArr = this.state.positions[title].inning.map((p, i) => {
    if(i === intIndex){
      p = e.target.value
    }
   return p
  })

  console.log(newArr)
  const newObj = update(this.state.positions, {[title]: {inning: {$set: newArr}}})
  console.log(newObj)
  this.setState({
    positions: newObj
  })
};

handleChange = (e) => {
  console.log(e)
  const name = e.currentTarget.title
  const value = e.target.value
  const id = e.currentTarget.id

  
  const edit = update(this.state.positions, {[name]: {inning: {[id]: {$set: value}}}})
  this.setState({positions: edit})
};

handleBenchChange = (e) => {
  const title = e.currentTarget.title
  const index = e.currentTarget.id
  const intIndex = parseInt(index, 10)
  const newArr = this.state.positions.bench.inning[title].map((p, i) => {
    if(i === intIndex){
      p = e.target.value
    }
   return p
  })

  console.log(newArr)
  const newObj = update(this.state.positions, {bench: {inning: {[title]: {$set: newArr}}}})
  console.log(newObj)
  this.setState({
    positions: newObj
  })
};

  render() {
    return (
      <div>
      <Nav id="navComp"/>
      <Container className="homeContainer" fluid>
        {/* <Row>
          <Col>
            <Names 
            player={this.state.player}
            handleInputChange={this.handleInputChange} 
            enterName={this.enterName}
            />
            <button type="submit" className="btn btn-secondary generateBtn" onClick={this.generateLineup}>Generate Lineup</button>
            <button type="submit" className="btn btn-secondary generateBtn" onClick={this.logs}>Console Log</button>
            </Col>
            <Col className="rosterBox">
            <div >
              <h5 className="players">Players</h5>
              {this.state.roster.team.map((p, i)=> (
                   <ContentEditable
                   key={i}
                   className="playerRowBox"
                   title={i}
                   html={this.state.roster.team[i]}
                   onChange={this.handlePlayerChange}
                   />
                  ))}
            </div>
            </Col>
            </Row> */}
            <Row id="battingOrderTitle">
              <h5 className="order">Batting Order</h5>
            </Row>
            <Row className="battingOrderRow">
              <Row className="battingOrderSubRow">
                  {this.state.offense.order.map((p, i)=> (
                  <div className="battingOrderBox" key={i}>
                  <div id="orderNum">{`${i+1}. )`}</div>
                   <ContentEditable
                   key={i}
                   title={i}
                   html={this.state.offense.order[i]}
                   onChange={this.handleBattingOrderChange}
                   />
                   </div>
                  ))}
              </Row>
            </Row>
            <Row className="title">
              <h5>Outfield</h5>
            </Row>
            <Row className="positionRow">
            <div className="fieldingCol">
              <h5 className="playerBox position" >Left</h5>
              {this.state.positions.left.inning.map((p, i) => (
              <ContentEditable
                key={i}
                id={i}
                className="playerBox position"
                title="left"
                html={this.state.positions.left.inning[i]}
                onChange={this.handlePositionChange}
              />
              ))}
              </div>
              <div className="fieldingCol">
              <h5 className="playerBox position" >Left Center</h5>
              {this.state.positions.leftCenter.inning.map((p, i) => (
              <ContentEditable
                key={i}
                id={i}
                className="playerBox position"
                title="leftCenter"
                html={this.state.positions.leftCenter.inning[i]}
                onChange={this.handlePositionChange}
              />
              ))}
              </div>
              <div className="fieldingCol">
              <h5 className="playerBox position" >Right Center</h5>
              {this.state.positions.rightCenter.inning.map((p, i) => (
              <ContentEditable
                key={i}
                id={i}
                className="playerBox position"
                title="rightCenter"
                html={this.state.positions.rightCenter.inning[i]}
                onChange={this.handlePositionChange}
              />
              ))}
              </div>
              <div className="fieldingCol">
              <h5 className="playerBox position" >Right</h5>
              {this.state.positions.right.inning.map((p, i) => (
              <ContentEditable
                key={i}
                id={i}
                className="playerBox position"
                title="right"
                html={this.state.positions.right.inning[i]}
                onChange={this.handlePositionChange}
              />
              ))}
              </div>
            </Row>
            <Row className="title">
              <h5>Infield</h5>
            </Row>
            <Row className="positionRow">
            <div className="fieldingCol">
              <h5 className="playerBox position" >Third</h5>
              {this.state.positions.third.inning.map((p, i) => (
              <ContentEditable
                key={i}
                id={i}
                className="playerBox position"
                title="third"
                html={this.state.positions.third.inning[i]}
                onChange={this.handlePositionChange}
              />
              ))}
              </div>
              <div className="fieldingCol">
              <h5 className="playerBox position" >Short</h5>
              {this.state.positions.shortStop.inning.map((p, i) => (
              <ContentEditable
                key={i}
                id={i}
                className="playerBox position"
                title="shortStop"
                html={this.state.positions.shortStop.inning[i]}
                onChange={this.handlePositionChange}
              />
              ))}
              </div>
              <div className="fieldingCol">
              <h5 className="playerBox position" >Second</h5>
              {this.state.positions.second.inning.map((p, i) => (
              <ContentEditable
                key={i}
                id={i}
                className="playerBox position"
                title="second"
                html={this.state.positions.second.inning[i]}
                onChange={this.handlePositionChange}
              />
              ))}
              </div>
              <div className="fieldingCol">
              <h5 className="playerBox position" >First</h5>
              {this.state.positions.first.inning.map((p, i) => (
              <ContentEditable
                key={i}
                id={i}
                className="playerBox position"
                title="first"
                html={this.state.positions.first.inning[i]}
                onChange={this.handlePositionChange}
              />
              ))}
              </div>
            </Row>
            <Row className="title pc">
              <h5>Pitcher / Catcher</h5>
            </Row>
            <Row className="positionRow">
            <Col>
              <h5 className="playerBox position" >Pitcher</h5>
              {this.state.positions.pitcher.inning.map((p, i) => (
              <ContentEditable
                key={i}
                id={i}
                className="playerBox position"
                title="pitcher"
                html={this.state.positions.pitcher.inning[i]}
                onChange={this.handlePositionChange}
              />
              ))}
              </Col>
              <Col>
              <h5 className="playerBox position" >Catcher</h5>
              {this.state.positions.catcher.inning.map((p, i) => (
              <ContentEditable
                key={i}
                id={i}
                className="playerBox position"
                title="catcher"
                html={this.state.positions.catcher.inning[i]}
                onChange={this.handlePositionChange}
              />
              ))}
              </Col>
            </Row>
            <Row className="title bench">
              <h5>Bench</h5>
            </Row>
            <Row className="benchOrderRow">
            <Row className="benchOrderSubRow">
                  {this.state.positions.bench.inning.one.map((p, i) => (
                      <div className="benchBox" key={i}>
                       <ContentEditable
                       key={i}
                       id={i}
                       title="one"
                       html={this.state.positions.bench.inning.one[i]}
                       onChange={this.handleBenchChange}
                       />
                       </div>
                  ))}
              </Row>
              <Row className="benchOrderSubRow">
                  {this.state.positions.bench.inning.two.map((p, i) => (
                      <div className="benchBox" key={i}>
                       <ContentEditable
                       key={i}
                       id={i}
                       title="two"
                       html={this.state.positions.bench.inning.two[i]}
                       onChange={this.handleBenchChange}
                       />
                       </div>
                  ))}
              </Row>
              <Row className="benchOrderSubRow">
                  {this.state.positions.bench.inning.three.map((p, i) => (
                      <div className="benchBox" key={i}>
                       <ContentEditable
                       key={i}
                       id={i}
                       title="three"
                       html={this.state.positions.bench.inning.three[i]}
                       onChange={this.handleBenchChange}
                       />
                       </div>
                  ))}
              </Row>
            </Row>
      </Container>
      </div>
    );
  }
}

export default Home;

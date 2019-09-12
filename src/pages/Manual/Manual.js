import React, { Component } from "react";
// import API from "../../utils/API";
import { Container, Row, Col } from 'reactstrap';
import ContentEditable from 'react-contenteditable'
import update from 'immutability-helper';
// import Names from "../../components/Names";
import Nav from "../../components/Nav";
import "./Manual.css"


class Home extends Component {
  state = {
    player: "",
    roster: [],
    offense: ["","","","","","","","","","","","","","","","","","","",""],
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
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
};

enterName = e => {
  e.preventDefault();
    this.setState({ 
      roster: [...this.state.roster, this.state.player],
      player: ""
    });
};

// generateLineup = event => {
//   event.preventDefault();
//   const kids = this.state.roster.slice()
//   const battingOrder = this.shuffle(kids)
//   let reverseOrder = battingOrder.slice()
//   reverseOrder = reverseOrder.reverse()
//   this.setState({
//     offense: battingOrder,
//     defense: reverseOrder
//   })
//   this.setDefense()
// }

// shuffle = (array) => {
//   let currentIndex = array.length, temporaryValue, randomIndex;
//   while (0 !== currentIndex) {
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex -= 1;
//     temporaryValue = array[currentIndex];
//     array[currentIndex] = array[randomIndex];
//     array[randomIndex] = temporaryValue;
//   }
//   return array;
// }

// setDefense = () => {
//   const players = this.state.roster.slice()
//   const defense = this.shuffle(players)
//   this.setState({
//     defense: defense
//   }, this.assignFirstInning)
// }

// assignFirstInning = () => {
//   const size = this.state.defense.length
//   console.log(this.state.counter)
//   if(this.state.counter < size){
//     this.state.index++
//       switch(this.state.index) {
//         case 0:
//           const pitcher = update(this.state.positions, {pitcher: {inning: {$set: [this.state.defense[this.state.index], "", ""]}}})
//           this.setState({
//             positions: pitcher,
//             counter: this.state.counter + 1
//           }, this.assignFirstInning)
//           break;
//         case 1:
//           const shortStop = update(this.state.positions, {shortStop: {inning: {$set: [this.state.defense[this.state.index], "", ""]}}})
//           this.setState({
//             positions: shortStop,
//             counter: this.state.counter + 1
//           }, this.assignFirstInning)
//         break;
//         case 2:
//             const third = update(this.state.positions, {third: {inning: {$set: [this.state.defense[this.state.index], "", ""]}}})
//             this.setState({
//               positions: third,
//               counter: this.state.counter + 1
//             }, this.assignFirstInning)
//         break;
//         case 3:
//             const first = update(this.state.positions, {first: {inning: {$set: [this.state.defense[this.state.index], "", ""]}}})
//             this.setState({
//               positions: first,
//               counter: this.state.counter + 1
//             }, this.assignFirstInning)
//         break;
//         case 4:
//             const second = update(this.state.positions, {second: {inning: {$set: [this.state.defense[this.state.index], "", ""]}}})
//             this.setState({
//               positions: second,
//               counter: this.state.counter + 1
//             }, this.assignFirstInning)
//         break;
//         case 5:
//             const catcher = update(this.state.positions, {catcher: {inning: {$set: [this.state.defense[this.state.index], "", ""]}}})
//             this.setState({
//               positions: catcher,
//               counter: this.state.counter + 1
//             }, this.assignFirstInning)
//         break;
//         case 6:
//             const left = update(this.state.positions, {left: {inning: {$set: [this.state.defense[this.state.index], "", ""]}}})
//             this.setState({
//               positions: left,
//               counter: this.state.counter + 1
//             }, this.assignFirstInning)
//         break;
//         case 7:
//             const leftCenter = update(this.state.positions, {leftCenter: {inning: {$set: [this.state.defense[this.state.index], "", ""]}}})
//             this.setState({
//               positions: leftCenter,
//               counter: this.state.counter + 1
//             }, this.assignFirstInning)
//         break;
//         case 8:
//             const rightCenter = update(this.state.positions, {rightCenter: {inning: {$set: [this.state.defense[this.state.index], "", ""]}}})
//             this.setState({
//               positions: rightCenter,
//               counter: this.state.counter + 1
//             }, this.assignFirstInning)
//         break;
//         case 9:
//             const right = update(this.state.positions, {right: {inning: {$set: [this.state.defense[this.state.index], "", ""]}}})
//             this.setState({
//               positions: right,
//               counter: this.state.counter + 1
//             }, this.assignFirstInning)
//         break;
//         default:
//             const bench = update(this.state.positions, {bench: {inning: {one: {$push: [this.state.defense[this.state.index]]}}}})
//             this.setState({
//               positions: bench,
//               counter: this.state.counter + 1
//             }, this.assignFirstInning)
//           // this.state.bench.inning.one.push(this.state.defense[this.state.index])
//   }
//  }
// }

handleBattingOrderChange = (e) => {
  const index = e.currentTarget.title
  const intIndex = parseInt(index, 10)
  const newArr = this.state.offense.map((p, i) => {
    if(i === intIndex){
      p = e.target.value
    }
   return p
  })
  const newObj = update(this.state.offense, {$set: newArr})
  this.setState({
    offense: newObj
  })
};

handlePositionChange = (e) => {
  const title = e.currentTarget.title
  const index = e.currentTarget.id
  const intIndex = parseInt(index, 10)
  const newArr = this.state.positions[title].inning.map((p, i) => {
    if(i === intIndex){
      p = e.target.value
    }
   return p
  })
  const newObj = update(this.state.positions, {[title]: {inning: {$set: newArr}}})
  this.setState({
    positions: newObj
  })
};

// handleChange = (e) => {
//   console.log(e)
//   const name = e.currentTarget.title
//   const value = e.target.value
//   const id = e.currentTarget.id
//   const edit = update(this.state.positions, {[name]: {inning: {[id]: {$set: value}}}})
//   this.setState({positions: edit})
// };

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

logs = () => {
  console.log(this.state.positions)
}

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
              {this.state.roster.map((p, i)=> (
                   <ContentEditable
                   key={i}
                   className="playerRowBox"
                   title={i}
                   html={this.state.roster[i]}
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
                  {this.state.offense.map((p, i)=> (
                  <div className="battingOrderBox" key={i}>
                  <div id="orderNum">{`${i+1}. )`}</div>
                   <ContentEditable
                   key={i}
                   title={i}
                   html={this.state.offense[i]}
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

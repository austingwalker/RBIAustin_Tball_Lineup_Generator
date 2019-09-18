import React, { Component } from "react";
// import API from "../../utils/API";
import { Container, Row, Col } from 'reactstrap';
import ContentEditable from 'react-contenteditable'
import update from 'immutability-helper';
import Names from "../../components/Names";
import Nav from "../../components/Nav";
import "./Home.css"


class Home extends Component {
  state = {
    player: "",
    roster: [],
    offense: ["","","","","","","","","","","","","","","","","","","",""],
    defense: [],
    index: -1,
    counter: 0,
    inning: 0,
    positions: { 
      pitcher: ["", "", "", ""],
      catcher: ["", "", "", ""],
      first: ["", "", "", ""],
      second: ["", "", "", ""],
      shortStop: ["", "", "", ""],
      third: ["", "", "", ""],
      right: ["", "", "", ""],
      rightCenter: ["", "", "", ""],
      leftCenter: ["", "", "", ""],
      left: ["", "", "", ""],
      bench: {
          one: ["", "", "", "", "", "", "", "", "", ""],
          two: ["", "", "", "", "", "", "", "", "", ""],
          three: ["", "", "", "", "", "", "", "", "", ""],
          four: ["", "", "", "", "", "", "", "", "", ""]
      },
    },
  };

//Handles state change for new players being added
handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
};

//Adds player to the roster
enterName = e => {
  e.preventDefault();
    this.setState({ 
      roster: [...this.state.roster, this.state.player],
      player: ""
    });
};

//Handles state change for the roster
handlePlayerChange = (e) => {
  const index = e.currentTarget.title
  const intIndex = parseInt(index, 10)
  const newRoster = this.state.roster.map((p, i) => {
    if(i === intIndex){
      p = e.target.value
    }
   return p
  })
  this.setState({
    roster: newRoster
  })
}
//Takes in the roster and sets the batting order and defense
generateLineup = event => {
  event.preventDefault();
  const kids = this.state.roster.slice()
  const battingOrder = this.shuffle(kids)
  let reverseOrder = battingOrder.slice()
  reverseOrder = reverseOrder.reverse()
  this.setState({
    offense: battingOrder,
    defense: reverseOrder,
    inning: 0,
  }, this.setDefense)
  
}

//Randomly shuffles the roster to generate a batting order and defense
shuffle = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

//Sets the defense array order for the positions to be generated from
setDefense = () => {
  // Runs if there are 7 or less players
  if(this.state.roster.length <= 7 && this.state.inning < 4){
        if(this.state.inning === 0){
        const players = this.state.roster.slice()
        const defense = this.shuffle(players)
        this.setState({
          defense: defense
      }, this.assignDefenseSevenAndUnder)
    } else {
      let defense = this.state.defense
      const lastE = defense.pop()
      defense = [lastE, ...defense]
      this.setState({
        defense: defense
      }, this.assignDefenseSevenAndUnder)
    }
  }
  // Runs if there are 8 or 9 players
  else if((this.state.roster.length === 9 || this.state.roster.length === 8) && this.state.inning < 4){
      if(this.state.inning === 0){
      const players = this.state.roster.slice()
      const defense = this.shuffle(players)
      this.setState({
        defense: defense
    }, this.assignDefenseEightOrNine)
  } else {
    let defense = this.state.defense
    const lastE = defense.pop()
    defense = [lastE, ...defense]
    this.setState({
      defense: defense
    }, this.assignDefenseEightOrNine)
  }
  } 
  // Runs if there are 10-20 players
  else {
  if(this.state.inning === 0){
    const players = this.state.roster.slice()
    const defense = this.shuffle(players)
    this.setState({
      defense: defense
  }, this.assignDefense)
  } else if (this.state.inning > 0 && this.state.inning < 4){
    let defense = this.state.defense
    let newBench = []
    let counter = 0
    let counter2 = 1
    let counter3 = 9
    let dif2 = 1
    let dif3 = 2
    const dif = defense.length - 10
    let bench = defense.splice(10, dif)
    // Runs if there are 16-20 players
    if(dif >= 6){
      for (let i = 0; i < dif; i++){
        if(i >= 5){
          newBench.push(defense[counter2])
          defense.splice(counter2, 1, bench[i])
          counter2 = counter2 + 2
        } else {
        newBench.push(defense[i + counter])
        defense.splice(i + counter, 1, bench[i])
        counter = counter + 1
        }
      }
      const lastE = defense.pop()
      defense = [lastE, ...defense, ...newBench]
      this.setState({
        defense: defense
      }, this.assignDefense)
    } 
    // Runs if there are 12 or 13 players
    else if(dif === 2 || dif === 3){
      // Runs if there are 12 players
      if(this.state.inning === 3 && dif === 2){
        for (let i = 0; i < dif; i++){
          newBench.push(defense[counter3])
          defense.splice(counter3, 1, bench[dif2])
          counter3 = counter3 - 2
          dif2 = dif2 - 1
        }
        const lastE = defense.pop()
        defense = [lastE, ...defense, ...newBench]
        this.setState({
          defense: defense
        }, this.assignDefense)
      } 
      // Runs if there are 13 players
      else if(this.state.inning === 3 && dif === 3){
        for (let i = 0; i < dif; i++){
          newBench.push(defense[counter3])
          defense.splice(counter3, 1, bench[dif3])
          counter3 = counter3 - 1
          dif3 = dif3 - 1
        }
        const lastE = defense.pop()
        defense = [lastE, ...defense, ...newBench]
        this.setState({
          defense: defense
        }, this.assignDefense)
      }
      else {
      for (let i = 0; i < dif; i++){
        newBench.push(defense[i + counter])
        defense.splice(i + counter, 1, bench[i])
        counter = counter + 1
      }
      const lastE = defense.pop()
      defense = [lastE, ...defense, ...newBench]
      this.setState({
        defense: defense
      }, this.assignDefense)
     }
    } 
    // Runs if there are 10, 11, 14, or 15 players
    else {
    for (let i = 0; i < dif; i++){
      newBench.push(defense[i + counter])
      defense.splice(i + counter, 1, bench[i])
      counter = counter + 1
    }
    const lastE = defense.pop()
    defense = [lastE, ...defense, ...newBench]
    this.setState({
      defense: defense
    }, this.assignDefense)
    }
  } 
 }
}

//Sets the defense for 10-20 players
assignDefense = () => {
  let setOrPush;
      if(this.state.inning === 0){
        setOrPush = "$set"
      } else {
        setOrPush = "$push"
      }
  if(this.state.counter < 10){
    this.state.index++
    switch(this.state.index) {
      case 0:
        const catcher = update(this.state.positions, {catcher: {[setOrPush]: [this.state.defense[this.state.index]]}})
        this.setState({
          positions: catcher,
          counter: this.state.counter + 1
        }, this.assignDefense)
        break;
      case 1:
        const pitcher = update(this.state.positions, {pitcher: {[setOrPush]: [this.state.defense[this.state.index]]}})
        this.setState({
          positions: pitcher,
          counter: this.state.counter + 1
        }, this.assignDefense)
      break;
      case 2:
          const leftCenter = update(this.state.positions, {leftCenter: {[setOrPush]: [this.state.defense[this.state.index]]}})
          this.setState({
            positions: leftCenter,
            counter: this.state.counter + 1
          }, this.assignDefense)
      break;
      case 3:
          const third = update(this.state.positions, {third: {[setOrPush]: [this.state.defense[this.state.index]]}})
          this.setState({
            positions: third,
            counter: this.state.counter + 1
          }, this.assignDefense)
      break;
      case 4:
          const left = update(this.state.positions, {left: {[setOrPush]: [this.state.defense[this.state.index]]}})
          this.setState({
            positions: left,
            counter: this.state.counter + 1
          }, this.assignDefense)
      break;
      case 5:
          const shortStop = update(this.state.positions, {shortStop: {[setOrPush]: [this.state.defense[this.state.index]]}})
          this.setState({
            positions: shortStop,
            counter: this.state.counter + 1
          }, this.assignDefense)
      break;
      case 6:
          const rightCenter = update(this.state.positions, {rightCenter: {[setOrPush]: [this.state.defense[this.state.index]]}})
          this.setState({
            positions: rightCenter,
            counter: this.state.counter + 1
          }, this.assignDefense)
      break;
      case 7:
          const second = update(this.state.positions, {second: {[setOrPush]: [this.state.defense[this.state.index]]}})
          this.setState({
            positions: second,
            counter: this.state.counter + 1
          }, this.assignDefense)
      break;
      case 8:
          const right = update(this.state.positions, {right: {[setOrPush]: [this.state.defense[this.state.index]]}})
          this.setState({
            positions: right,
            counter: this.state.counter + 1
          }, this.assignDefense)
      break;
      case 9:
          const first = update(this.state.positions, {first: {[setOrPush]: [this.state.defense[this.state.index]]}})
          this.setState({
            positions: first,
            counter: this.state.counter + 1
          }, this.assignDefense)
      break;
      }
    } else {
        const updateBench = this.state.defense.filter((p,i) => {
          if(i > 9){
            return p
          } 
        })
        let newBench;
        if(this.state.inning === 0){
          newBench = update(this.state.positions, {bench: {one: {$set: updateBench}}})
        }
        if(this.state.inning === 1){
          newBench = update(this.state.positions, {bench: {two: {$set: updateBench}}})
        }
        if(this.state.inning === 2){
          newBench = update(this.state.positions, {bench: {three: {$set: updateBench}}})
        }
        if(this.state.inning === 3){
          newBench = update(this.state.positions, {bench: {four: {$set: updateBench}}})
        }

  this.setState({
    positions: newBench,
    index: -1,
    counter: 0,
    inning: this.state.inning + 1
  }, this.setDefense)
 }

}

//Sets the defense for 8 or 9 players
assignDefenseEightOrNine = () => {
  let setOrPush;
  if(this.state.inning === 0){
    setOrPush = "$set"
  } else {
    setOrPush = "$push"
  }
if (this.state.index < this.state.roster.length - 1){
this.state.index++
switch(this.state.index) {
  case 0:
      const pitcher = update(this.state.positions, {pitcher: {[setOrPush]: [this.state.defense[this.state.index]]}})
      this.setState({
        positions: pitcher,
        counter: this.state.counter + 1
      }, this.assignDefenseEightOrNine)
  break;
  case 1:
      const leftCenter = update(this.state.positions, {leftCenter: {[setOrPush]: [this.state.defense[this.state.index]]}})
      this.setState({
        positions: leftCenter,
        counter: this.state.counter + 1
      }, this.assignDefenseEightOrNine)
  break;
  case 2:
      const second = update(this.state.positions, {second: {[setOrPush]: [this.state.defense[this.state.index]]}})
      this.setState({
        positions: second,
        counter: this.state.counter + 1
      }, this.assignDefenseEightOrNine)
  break;
  case 3:
      const rightCenter = update(this.state.positions, {rightCenter: {[setOrPush]: [this.state.defense[this.state.index]]}})
      this.setState({
        positions: rightCenter,
        counter: this.state.counter + 1
      }, this.assignDefenseEightOrNine)
  break;
  case 4:
      const shortStop = update(this.state.positions, {shortStop: {[setOrPush]: [this.state.defense[this.state.index]]}})
      this.setState({
        positions: shortStop,
        counter: this.state.counter + 1
      }, this.assignDefenseEightOrNine)
  break;
  case 5:
      const catcher = update(this.state.positions, {catcher: {[setOrPush]: [this.state.defense[this.state.index]]}})
      this.setState({
        positions: catcher,
        counter: this.state.counter + 1
      }, this.assignDefenseEightOrNine)
  break;
  case 6:
      const first = update(this.state.positions, {first: {[setOrPush]: [this.state.defense[this.state.index]]}})
      this.setState({
        positions: first,
        counter: this.state.counter + 1
      }, this.assignDefenseEightOrNine)
  break;
  case 7:
      const third = update(this.state.positions, {third: {[setOrPush]: [this.state.defense[this.state.index]]}})
      this.setState({
        positions: third,
        counter: this.state.counter + 1
      }, this.assignDefenseEightOrNine)
  break;
  case 8:
      const left = update(this.state.positions, {left: {[setOrPush]: [this.state.defense[this.state.index]]}})
      this.setState({
        positions: left,
        counter: this.state.counter + 1
      }, this.assignDefenseEightOrNine)
  break;
  }
} else {
    this.setState({
      index: -1,
      counter: 0,
      inning: this.state.inning + 1
      }, this.setDefense)
    }
}

//Sets the defense for 7 or less players
assignDefenseSevenAndUnder = () => {
  let setOrPush;
  if(this.state.inning === 0){
    setOrPush = "$set"
  } else {
    setOrPush = "$push"
  }
if (this.state.index < this.state.roster.length - 1){
 
this.state.index++
switch(this.state.index) {
  case 0:
      const pitcher = update(this.state.positions, {pitcher: {[setOrPush]: [this.state.defense[this.state.index]]}})
      this.setState({
        positions: pitcher,
        counter: this.state.counter + 1
      }, this.assignDefenseSevenAndUnder)
  break;
  case 1:
      const first = update(this.state.positions, {first: {[setOrPush]: [this.state.defense[this.state.index]]}})
      this.setState({
        positions: first,
        counter: this.state.counter + 1
      }, this.assignDefenseSevenAndUnder)
  break;
  case 2:
      const shortStop = update(this.state.positions, {shortStop: {[setOrPush]: [this.state.defense[this.state.index]]}})
      this.setState({
        positions: shortStop,
        counter: this.state.counter + 1
      }, this.assignDefenseSevenAndUnder)
  break;
  case 3:
      const second = update(this.state.positions, {second: {[setOrPush]: [this.state.defense[this.state.index]]}})
      this.setState({
        positions: second,
        counter: this.state.counter + 1
      }, this.assignDefenseSevenAndUnder)
  break;
  case 4:
      const third = update(this.state.positions, {third: {[setOrPush]: [this.state.defense[this.state.index]]}})
      this.setState({
        positions: third,
        counter: this.state.counter + 1
      }, this.assignDefenseSevenAndUnder)
  break;
  case 5:
      const catcher = update(this.state.positions, {catcher: {[setOrPush]: [this.state.defense[this.state.index]]}})
      this.setState({
        positions: catcher,
        counter: this.state.counter + 1
      }, this.assignDefenseSevenAndUnder)
  break;
  case 6:
      const leftCenter = update(this.state.positions, {leftCenter: {[setOrPush]: [this.state.defense[this.state.index]]}})
      this.setState({
        positions: leftCenter,
        counter: this.state.counter + 1
      }, this.assignDefenseSevenAndUnder)
  break;
  }
} else {
    this.setState({
      index: -1,
      counter: 0,
      inning: this.state.inning + 1
      }, this.setDefense)
    }
}

//Handles state change for the batting order
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

//Handles state change for the positions
handlePositionChange = (e) => {
  const title = e.currentTarget.title
  const index = e.currentTarget.id
  const intIndex = parseInt(index, 10)
  const newArr = this.state.positions[title].map((p, i) => {
    if(i === intIndex){
      p = e.target.value
    }
   return p
  })
  const newObj = update(this.state.positions, {[title]: {$set: newArr}})
  this.setState({
    positions: newObj
  })
};

//Handles state change for the bench
handleBenchChange = (e) => {
  const title = e.currentTarget.title
  const index = e.currentTarget.id
  const intIndex = parseInt(index, 10)
  const newArr = this.state.positions.bench[title].map((p, i) => {
    if(i === intIndex){
      p = e.target.value
    }
   return p
  })
  const newObj = update(this.state.positions, {bench: {[title]: {$set: newArr}}})
  this.setState({
    positions: newObj
  })
};

  render() {
    return (
      <div>
      <Nav id="navComp"/>
      <Container className="homeContainer" fluid>
        <Row>
          <Col>
            <Names 
            player={this.state.player}
            handleInputChange={this.handleInputChange} 
            enterName={this.enterName}
            />
            <button type="submit" className="btn btn-secondary generateBtn" onClick={this.generateLineup}>Generate Lineup</button>
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
            </Row>
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
              {this.state.positions.left.map((p, i) => (
              <ContentEditable
                key={i}
                id={i}
                className="playerBox position"
                title="left"
                html={this.state.positions.left[i]}
                onChange={this.handlePositionChange}
              />
              ))}
              </div>
              <div className="fieldingCol">
              <h5 className="playerBox position" >Left Center</h5>
              {this.state.positions.leftCenter.map((p, i) => (
              <ContentEditable
                key={i}
                id={i}
                className="playerBox position"
                title="leftCenter"
                html={this.state.positions.leftCenter[i]}
                onChange={this.handlePositionChange}
              />
              ))}
              </div>
              <div className="fieldingCol">
              <h5 className="playerBox position" >Right Center</h5>
              {this.state.positions.rightCenter.map((p, i) => (
              <ContentEditable
                key={i}
                id={i}
                className="playerBox position"
                title="rightCenter"
                html={this.state.positions.rightCenter[i]}
                onChange={this.handlePositionChange}
              />
              ))}
              </div>
              <div className="fieldingCol">
              <h5 className="playerBox position" >Right</h5>
              {this.state.positions.right.map((p, i) => (
              <ContentEditable
                key={i}
                id={i}
                className="playerBox position"
                title="right"
                html={this.state.positions.right[i]}
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
              {this.state.positions.third.map((p, i) => (
              <ContentEditable
                key={i}
                id={i}
                className="playerBox position"
                title="third"
                html={this.state.positions.third[i]}
                onChange={this.handlePositionChange}
              />
              ))}
              </div>
              <div className="fieldingCol">
              <h5 className="playerBox position" >Short</h5>
              {this.state.positions.shortStop.map((p, i) => (
              <ContentEditable
                key={i}
                id={i}
                className="playerBox position"
                title="shortStop"
                html={this.state.positions.shortStop[i]}
                onChange={this.handlePositionChange}
              />
              ))}
              </div>
              <div className="fieldingCol">
              <h5 className="playerBox position" >Second</h5>
              {this.state.positions.second.map((p, i) => (
              <ContentEditable
                key={i}
                id={i}
                className="playerBox position"
                title="second"
                html={this.state.positions.second[i]}
                onChange={this.handlePositionChange}
              />
              ))}
              </div>
              <div className="fieldingCol">
              <h5 className="playerBox position" >First</h5>
              {this.state.positions.first.map((p, i) => (
              <ContentEditable
                key={i}
                id={i}
                className="playerBox position"
                title="first"
                html={this.state.positions.first[i]}
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
              {this.state.positions.pitcher.map((p, i) => (
              <ContentEditable
                key={i}
                id={i}
                className="playerBox position"
                title="pitcher"
                html={this.state.positions.pitcher[i]}
                onChange={this.handlePositionChange}
              />
              ))}
              </Col>
              <Col>
              <h5 className="playerBox position" >Catcher</h5>
              {this.state.positions.catcher.map((p, i) => (
              <ContentEditable
                key={i}
                id={i}
                className="playerBox position"
                title="catcher"
                html={this.state.positions.catcher[i]}
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
                  {this.state.positions.bench.one.map((p, i) => (
                      <div className="benchBox" key={i}>
                       <ContentEditable
                       key={i}
                       id={i}
                       title="one"
                       html={this.state.positions.bench.one[i]}
                       onChange={this.handleBenchChange}
                       />
                       </div>
                  ))}
              </Row>
              <Row className="benchOrderSubRow">
                  {this.state.positions.bench.two.map((p, i) => (
                      <div className="benchBox" key={i}>
                       <ContentEditable
                       key={i}
                       id={i}
                       title="two"
                       html={this.state.positions.bench.two[i]}
                       onChange={this.handleBenchChange}
                       />
                       </div>
                  ))}
              </Row>
              <Row className="benchOrderSubRow">
                  {this.state.positions.bench.three.map((p, i) => (
                      <div className="benchBox" key={i}>
                       <ContentEditable
                       key={i}
                       id={i}
                       title="three"
                       html={this.state.positions.bench.three[i]}
                       onChange={this.handleBenchChange}
                       />
                       </div>
                  ))}
              </Row>
              <Row className="benchOrderSubRow">
                  {this.state.positions.bench.four.map((p, i) => (
                      <div className="benchBox" key={i}>
                       <ContentEditable
                       key={i}
                       id={i}
                       title="three"
                       html={this.state.positions.bench.four[i]}
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

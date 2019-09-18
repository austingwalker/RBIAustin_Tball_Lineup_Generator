import React, { Component } from "react";
// import API from "../../utils/API";
import { Container, Row, Col } from 'reactstrap';
import update from 'immutability-helper';
import Names from "../../components/Names";
import Roster from "../../components/Roster";
import Batting from "../../components/Batting";
import Outfield from "../../components/Outfield";
import Infield from "../../components/Infield";
import PitcherCatcher from "../../components/PitcherCatcher";
import Bench from "../../components/Bench";
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
      <Container className="homeContainer" fluid>
        <Row>
          <Col id="namesCol">
            <Names 
            player={this.state.player}
            handleInputChange={this.handleInputChange} 
            enterName={this.enterName}
            generateLineup={this.generateLineup}
            />
          </Col>
          <Col md="1" id="nrCol"></Col>
          <Col id="rosterCol">
            <Roster
            roster={this.state.roster}
            handlePlayerChange={this.handlePlayerChange}
            />
          </Col>
        </Row>

        <Row>
          <Batting
          offense={this.state.offense}
          handleBattingOrderChange={this.handleBattingOrderChange}
          />
        </Row>

        <Row>
          <Outfield
          positions={this.state.positions}
          handlePositionChange={this.handlePositionChange}
          />
        </Row>

        <Row>
          <Infield
          positions={this.state.positions}
          handlePositionChange={this.handlePositionChange}
          />
        </Row>

        <Row>
          <PitcherCatcher
          positions={this.state.positions}
          handlePositionChange={this.handlePositionChange}
          />
        </Row>

        <Row>
          <Bench
          positions={this.state.positions}
          handleBenchChange={this.handleBenchChange}
          />
        </Row>
          
      </Container>
      </div>
    );
  }
}

export default Home;

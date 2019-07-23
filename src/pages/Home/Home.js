import React, { Component } from "react";
// import API from "../../utils/API";
import { Container, Row, Col } from 'reactstrap';
import ContentEditable from 'react-contenteditable'
import update from 'immutability-helper';
import Names from "../../components/Names";
import "./Home.css"


class Home extends Component {
  state = {
    player: "",
    roster: {
      team: []
    },
    offense: {
      order: []
    },
    defense: [],
    defense2: [],
    positions: { 
    pitcher: {inning: [{one: ""}, {two: ""}, {three: ""}]},
    catcher: {inning: [{one: ""}, {two: ""}, {three: ""}]},
    first: {inning: [{one: ""}, {two: ""}, {three: ""}]},
    second: {inning: [{one: ""}, {two: ""}, {three: ""}]},
    shortStop: {inning: [{one: ""}, {two: ""}, {three: ""}]},
    third: {inning: [{one: ""}, {two: ""}, {three: ""}]},
    rightRight: {inning: [{one: ""}, {two: ""}, {three: ""}]},
    rightCenter: {inning: [{one: ""}, {two: ""}, {three: ""}]},
    leftCenter: {inning: [{one: ""}, {two: ""}, {three: ""}]},
    leftLeft: {inning: [{one: ""}, {two: ""}, {three: ""}]},
    bench: {
      inning:[{one: []}, {two: []}, {three: []}]
    } 
    },
    inning: 1,
    html: "",
    index: -1,
    counter: 0,
    holder: [],
    holder2: [],
    benchCount: 0,
    fieldCount: 0,
  };

handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
};

handleChange = (e) => {
  const name = e.currentTarget.title
  const edit = update(this.state.positions, {[name]: {inning: {[0]: {one: {$set: e.target.value}}}}})
  this.setState({positions: edit})
};

handlePlayerChange = (e) => {
    const index = e.currentTarget.title
    const intIndex = parseInt(index, 10)
    const newArr = this.state.roster.team.map((p, i) => {
      if(i === intIndex){
        p = e.target.value
      }
     return p
    })
    const newObj = update(this.state.roster, {team: {$set: newArr}})
    this.setState({
      roster: newObj
    })
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

handleBenchChange = (e) => {
  const index = e.currentTarget.title
  const intIndex = parseInt(index, 10)
  const newArr = this.state.positions.bench.inning[0].one.map((p, i) => {
    if(i === intIndex){
      p = e.target.value
    }
   return p
  })
  const edit = update(this.state.positions, {bench: {inning: {[0]: {one: {$set: newArr}}}}})
  console.log(edit)
   this.setState({
     positions: edit
   }
 )
};

enterName = event => {
    event.preventDefault();
      this.setState({ 
       roster: {...this.state.roster, team: [...this.state.roster.team, this.state.player]},
        player: "",
      });
};

generateLineup = event => {
    event.preventDefault();
    const kids = this.state.roster.team.slice()
    const battingOrder = this.shuffle(kids)
    let reverseOrder = battingOrder.slice()
    reverseOrder = reverseOrder.reverse()
    const defense = reverseOrder.map(p => {
      return {player: {name: p, first: false, second: false, short: false, pitcher: false, bench: false}}
    })
    // const defense = [Object.assign(...reverseOrder.map(([key]) => ({[key]: {first: false, second: false, short: false, pitcher: false}})))]
    this.setState({
      offense: {order: battingOrder},
      defense: defense
    },
    this.assignPosition
  )
}

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

assignPosition = () => {
    const size = this.state.defense.length
    
    if(this.state.counter < size){
      this.state.counter++
      this.state.index++
      switch(this.state.index) {
        case 0:
        const addPitcher = update(this.state.positions, {pitcher: {inning: {[0]: {one: {$set: this.state.defense[this.state.index].player.name}}}}})
        const trackPitcher = update(this.state.defense, {[this.state.index]: {player: {pitcher: {$set: true}}}})
        
          this.setState(
            {
            positions: addPitcher,
            defense: trackPitcher
            },
            this.assignPosition
          )
          
          break;
        case 1:
        const addShort = update(this.state.positions, {shortStop: {inning: {[0]: {one: {$set: this.state.defense[this.state.index].player.name}}}}})
        const trackShort = update(this.state.defense, {[this.state.index]: {player: {short: {$set: true}}}})
          this.setState({
            positions: addShort,
            defense: trackShort
          }, 
          this.assignPosition
        )
        break;
        case 2:
        const addThird = update(this.state.positions, {third: {inning: {[0]: {one: {$set: this.state.defense[this.state.index].player.name}}}}})
          this.setState({
            positions: addThird
          }, 
          this.assignPosition
        )
        break;
        case 3:
        const addFirst = update(this.state.positions, {first: {inning: {[0]: {one: {$set: this.state.defense[this.state.index].player.name}}}}})
        const trackFirst = update(this.state.defense, {[this.state.index]: {player: {first: {$set: true}}}})
          this.setState({
            positions: addFirst,
            defense: trackFirst
          }, 
          this.assignPosition
        )
        break;
        case 4:
        const addSecond = update(this.state.positions, {second: {inning: {[0]: {one: {$set: this.state.defense[this.state.index].player.name}}}}})
        const trackSecond = update(this.state.defense, {[this.state.index]: {player: {second: {$set: true}}}})
          this.setState({
            positions: addSecond,
            defense: trackSecond
          }, 
          this.assignPosition
        )
        break;
        case 5:
        const addCatcher = update(this.state.positions, {catcher: {inning: {[0]: {one: {$set: this.state.defense[this.state.index].player.name}}}}})
          this.setState({
            positions: addCatcher
          }, 
          this.assignPosition
        )
        break;
        case 6:
        const addLL = update(this.state.positions, {leftLeft: {inning: {[0]: {one: {$set: this.state.defense[this.state.index].player.name}}}}})
          this.setState({
            positions: addLL
          }, 
          this.assignPosition
        )
        break;
        case 7:
        const addLC = update(this.state.positions, {leftCenter: {inning: {[0]: {one: {$set: this.state.defense[this.state.index].player.name}}}}})
          this.setState({
            positions: addLC
          }, 
          this.assignPosition
        )
        break;
        case 8:
        const addRC = update(this.state.positions, {rightCenter: {inning: {[0]: {one: {$set: this.state.defense[this.state.index].player.name}}}}})
          this.setState({
            positions: addRC
          }, 
          this.assignPosition
        )
        break;
        case 9:
        const addRR = update(this.state.positions, {rightRight: {inning: {[0]: {one: {$set: this.state.defense[this.state.index].player.name}}}}})
          this.setState({
            positions: addRR
          }, 
          this.assignPosition
        )
        break;
       default:
        this.state.holder.push(this.state.defense[this.state.index].player.name)
        const addBench = update(this.state.positions, {bench: {inning: {[0]: {one: {$set: this.state.holder}}}}})
        const trackBench = update(this.state.defense, {[this.state.index]: {player: {bench: {$set: true}}}})
         this.setState({
           positions: addBench,
           defense: trackBench
         }, 
         this.assignPosition
       )
       break;
      }
    } 
    else {
      this.secondInningD();
    }
  };

secondInningD = () => {
  const sI = this.state.defense.slice()
  const secondInning = this.shuffle(sI)
  this.setState({
    defense2: secondInning
  }, 
  this.generateSecondInning
)
}

generateSecondInning = () => {
  // const top4 = secondInning.filter(p => {
  //     return p.player.pitcher === true || p.player.short === true || p.player.first === true || p.player.second === true;
  // })
  const bench = this.state.defense2.filter(p => {
    return p.player.bench === true;
  })
  // const reg = secondInning.filter(p => {
  //   if(!p.player.pitcher === true && !p.player.short === true && !p.player.first === true && !p.player.second === true && !p.player.bench === true){
  //     return p
  //   }
  // })
  const fielders = this.state.defense2.filter(p => {
    if(!p.player.bench === true){
      return p
    }
  })
  const benchLength = bench.length
  // const fieldersLength = fielders.length

  //IF bench players exist run this
  if(benchLength){

  if(benchLength > this.state.benchCount){
    if(this.state.positions.pitcher.inning[1].two === ""){
      const addPitcher2 = update(this.state.positions, {pitcher: {inning: {[1]: {two: {$set: bench[this.state.benchCount].player.name}}}}})
        const trackPitcher2 = update(this.state.defense, {[this.state.index]: {player: {pitcher: {$set: true}}}})
          this.setState(
            {
            positions: addPitcher2,
            defense: trackPitcher2
          },
          this.generateSecondInning
        )
          this.state.benchCount++
    } else if (this.state.positions.shortStop.inning[1].two === ""){
        const addShort2 = update(this.state.positions, {shortStop: {inning: {[1]: {two: {$set: bench[this.state.benchCount].player.name}}}}})
          const trackShort2 = update(this.state.defense, {[this.state.index]: {player: {short: {$set: true}}}})
          
            this.setState(
              {
              positions: addShort2,
              defense: trackShort2
            },
            this.generateSecondInning
          )
            this.state.benchCount++
    }
    else if (this.state.positions.second.inning[1].two === ""){
        const addSecond2 = update(this.state.positions, {second: {inning: {[1]: {two: {$set: bench[this.state.benchCount].player.name}}}}})
          const trackSecond2 = update(this.state.defense, {[this.state.index]: {player: {second: {$set: true}}}})
          
            this.setState(
              {
              positions: addSecond2,
              defense: trackSecond2
            },
            this.generateSecondInning
          )
            this.state.benchCount++
    }
    else if (this.state.positions.first.inning[1].two === ""){
      const addFirst2 = update(this.state.positions, {first: {inning: {[1]: {two: {$set: bench[this.state.benchCount].player.name}}}}})
      console.log(addFirst2)
        const trackFirst2 = update(this.state.defense, {[this.state.index]: {player: {first: {$set: true}}}})
          this.setState(
            {
            positions: addFirst2,
            defense: trackFirst2
          },
          this.generateSecondInning
        )
          this.state.benchCount++
  }
  } else {
    // Pitcher
    if((this.state.positions.pitcher.inning[1].two === "") && (!fielders[this.state.fieldCount].player.pitcher) && (!fielders[this.state.fieldCount].player.short) && (!fielders[this.state.fieldCount].player.first) && (!fielders[this.state.fieldCount].player.second)){
      const addPitcherF2 = update(this.state.positions, {pitcher: {inning: {[1]: {two: {$set: fielders[this.state.fieldCount].player.name}}}}})
        const trackPitcherF2 = update(this.state.defense, {[this.state.index]: {player: {pitcher: {$set: true}}}})
          this.setState(
            {
            positions: addPitcherF2,
            defense: trackPitcherF2
          },
          this.generateSecondInning
        )
          this.state.fieldCount++
    } 
    // Short
    else if ((this.state.positions.shortStop.inning[1].two === "") && (!fielders[this.state.fieldCount].player.pitcher) && (!fielders[this.state.fieldCount].player.short) && (!fielders[this.state.fieldCount].player.first) && (!fielders[this.state.fieldCount].player.second)){
      const addShortF2 = update(this.state.positions, {shortStop: {inning: {[1]: {two: {$set: fielders[this.state.fieldCount].player.name}}}}})
        const trackShortF2 = update(this.state.defense, {[this.state.index]: {player: {short: {$set: true}}}})
          this.setState(
            {
            positions: addShortF2,
            defense: trackShortF2
          },
          this.generateSecondInning
        )
          this.state.fieldCount++

    } 
    // First
    else if ((this.state.positions.first.inning[1].two === "") && (!fielders[this.state.fieldCount].player.pitcher) && (!fielders[this.state.fieldCount].player.short) && (!fielders[this.state.fieldCount].player.first) && (!fielders[this.state.fieldCount].player.second)){
      const addFirstF2 = update(this.state.positions, {first: {inning: {[1]: {two: {$set: fielders[this.state.fieldCount].player.name}}}}})
        const trackFirstF2 = update(this.state.defense, {[this.state.index]: {player: {first: {$set: true}}}})
          this.setState(
            {
            positions: addFirstF2,
            defense: trackFirstF2
          },
          this.generateSecondInning
        )
          this.state.fieldCount++
    } 
       // Second
       else if ((this.state.positions.second.inning[1].two === "") && (!fielders[this.state.fieldCount].player.pitcher) && (!fielders[this.state.fieldCount].player.short) && (!fielders[this.state.fieldCount].player.first) && (!fielders[this.state.fieldCount].player.second)){
        const addSecondF2 = update(this.state.positions, {second: {inning: {[1]: {two: {$set: fielders[this.state.fieldCount].player.name}}}}})
          const trackSecondF2 = update(this.state.defense, {[this.state.index]: {player: {second: {$set: true}}}})
            this.setState(
              {
              positions: addSecondF2,
              defense: trackSecondF2
            },
            this.generateSecondInning
          )
            this.state.fieldCount++
      } 
      // Third
      else if (this.state.positions.third.inning[1].two === ""){
        const addThirdF2 = update(this.state.positions, {third: {inning: {[1]: {two: {$set: fielders[this.state.fieldCount].player.name}}}}})
            this.setState(
              {
              positions: addThirdF2
            },
            this.generateSecondInning
          )
            this.state.fieldCount++
      } 
      // Catcher
      else if (this.state.positions.catcher.inning[1].two === ""){
        const addCatcherF2 = update(this.state.positions, {catcher: {inning: {[1]: {two: {$set: fielders[this.state.fieldCount].player.name}}}}})
            this.setState(
              {
              positions: addCatcherF2
            },
            this.generateSecondInning
          )
            this.state.fieldCount++
      } 
      // LeftLeft
      else if (this.state.positions.leftLeft.inning[1].two === ""){
        const addleftLeftF2 = update(this.state.positions, {leftLeft: {inning: {[1]: {two: {$set: fielders[this.state.fieldCount].player.name}}}}})
            this.setState(
              {
              positions: addleftLeftF2
            },
            this.generateSecondInning
          )
            this.state.fieldCount++
      } 
      // LeftCenter
      else if (this.state.positions.leftCenter.inning[1].two === ""){
        const addleftCenterF2 = update(this.state.positions, {leftCenter: {inning: {[1]: {two: {$set: fielders[this.state.fieldCount].player.name}}}}})
            this.setState(
              {
              positions: addleftCenterF2
            },
            this.generateSecondInning
          )
            this.state.fieldCount++
      } 
      // rightCenter
      else if (this.state.positions.rightCenter.inning[1].two === ""){
        const addrightCenterF2 = update(this.state.positions, {rightCenter: {inning: {[1]: {two: {$set: fielders[this.state.fieldCount].player.name}}}}})
            this.setState(
              {
              positions: addrightCenterF2
            },
            this.generateSecondInning
          )
            this.state.fieldCount++
      } 
      // rightRight
      else if (this.state.positions.rightRight.inning[1].two === ""){
        const addrightRightF2 = update(this.state.positions, {rightRight: {inning: {[1]: {two: {$set: fielders[this.state.fieldCount].player.name}}}}})
            this.setState(
              {
              positions: addrightRightF2
            },
            this.generateSecondInning
          )
            this.state.fieldCount++
      } 
      else {
        console.log("bench -----------------")
        console.log(fielders[this.state.fieldCount])
        if(!fielders[this.state.fieldCount]){
          return
        } else {
        this.state.holder2.push(fielders[this.state.fieldCount].player.name)
        const addBench2 = update(this.state.positions, {bench: {inning: {[1]: {two: {$set: this.state.holder2}}}}})
        const trackBench2 = update(this.state.defense, {[this.state.index]: {player: {bench: {$set: true}}}})
         this.setState({
           positions: addBench2,
           defense: trackBench2
         }, 
         this.generateSecondInning
       )
       this.state.fieldCount++
      }
    }




  }
} else {

  // Pitcher
  if((this.state.positions.pitcher.inning[1].two === "") && (!fielders[this.state.fieldCount].player.pitcher) && (!fielders[this.state.fieldCount].player.short) && (!fielders[this.state.fieldCount].player.first) && (!fielders[this.state.fieldCount].player.second)){
    const addPitcherNB2 = update(this.state.positions, {pitcher: {inning: {[1]: {two: {$set: fielders[this.state.fieldCount].player.name}}}}})
      const trackPitcherNB2 = update(this.state.defense, {[this.state.index]: {player: {pitcher: {$set: true}}}})
        this.setState(
          {
          positions: addPitcherNB2,
          defense: trackPitcherNB2
        },
        this.generateSecondInning
      )
        this.state.fieldCount++
  } 
  // Short
  else if ((this.state.positions.shortStop.inning[1].two === "") && (!fielders[this.state.fieldCount].player.pitcher) && (!fielders[this.state.fieldCount].player.short) && (!fielders[this.state.fieldCount].player.first) && (!fielders[this.state.fieldCount].player.second)){
    const addShortNB2 = update(this.state.positions, {shortStop: {inning: {[1]: {two: {$set: fielders[this.state.fieldCount].player.name}}}}})
      const trackShortNB2 = update(this.state.defense, {[this.state.index]: {player: {short: {$set: true}}}})
        this.setState(
          {
          positions: addShortNB2,
          defense: trackShortNB2
        },
        this.generateSecondInning
      )
        this.state.fieldCount++

  } 
  // First
  else if ((this.state.positions.first.inning[1].two === "") && (!fielders[this.state.fieldCount].player.pitcher) && (!fielders[this.state.fieldCount].player.short) && (!fielders[this.state.fieldCount].player.first) && (!fielders[this.state.fieldCount].player.second)){
    const addFirstNB2 = update(this.state.positions, {first: {inning: {[1]: {two: {$set: fielders[this.state.fieldCount].player.name}}}}})
      const trackFirstNB2 = update(this.state.defense, {[this.state.index]: {player: {first: {$set: true}}}})
        this.setState(
          {
          positions: addFirstNB2,
          defense: trackFirstNB2
        },
        this.generateSecondInning
      )
        this.state.fieldCount++
  } 
     // Second
     else if ((this.state.positions.second.inning[1].two === "") && (!fielders[this.state.fieldCount].player.pitcher) && (!fielders[this.state.fieldCount].player.short) && (!fielders[this.state.fieldCount].player.first) && (!fielders[this.state.fieldCount].player.second)){
      const addSecondNB2 = update(this.state.positions, {second: {inning: {[1]: {two: {$set: fielders[this.state.fieldCount].player.name}}}}})
        const trackSecondNB2 = update(this.state.defense, {[this.state.index]: {player: {second: {$set: true}}}})
          this.setState(
            {
            positions: addSecondNB2,
            defense: trackSecondNB2
          },
          this.generateSecondInning
        )
          this.state.fieldCount++
    } 
    // Third
    else if (this.state.positions.third.inning[1].two === ""){
      const addThirdNB2 = update(this.state.positions, {third: {inning: {[1]: {two: {$set: fielders[this.state.fieldCount].player.name}}}}})
          this.setState(
            {
            positions: addThirdNB2
          },
          this.generateSecondInning
        )
          this.state.fieldCount++
    } 
    // Catcher
    else if (this.state.positions.catcher.inning[1].two === ""){
      const addCatcherNB2 = update(this.state.positions, {catcher: {inning: {[1]: {two: {$set: fielders[this.state.fieldCount].player.name}}}}})
          this.setState(
            {
            positions: addCatcherNB2
          },
          this.generateSecondInning
        )
          this.state.fieldCount++
    } 
    // LeftLeft
    else if (this.state.positions.leftLeft.inning[1].two === ""){
      const addleftLeftNB2 = update(this.state.positions, {leftLeft: {inning: {[1]: {two: {$set: fielders[this.state.fieldCount].player.name}}}}})
          this.setState(
            {
            positions: addleftLeftNB2
          },
          this.generateSecondInning
        )
          this.state.fieldCount++
    } 
    // LeftCenter
    else if (this.state.positions.leftCenter.inning[1].two === ""){
      const addleftCenterNB2 = update(this.state.positions, {leftCenter: {inning: {[1]: {two: {$set: fielders[this.state.fieldCount].player.name}}}}})
          this.setState(
            {
            positions: addleftCenterNB2
          },
          this.generateSecondInning
        )
          this.state.fieldCount++
    } 
    // rightCenter
    else if (this.state.positions.rightCenter.inning[1].two === ""){
      const addrightCenterNB2 = update(this.state.positions, {rightCenter: {inning: {[1]: {two: {$set: fielders[this.state.fieldCount].player.name}}}}})
          this.setState(
            {
            positions: addrightCenterNB2
          },
          this.generateSecondInning
        )
          this.state.fieldCount++
    } 
    // rightRight
    else if (this.state.positions.rightRight.inning[1].two === ""){
      const addrightRightNB2 = update(this.state.positions, {rightRight: {inning: {[1]: {two: {$set: fielders[this.state.fieldCount].player.name}}}}})
          this.setState(
            {
            positions: addrightRightNB2
          },
          this.generateSecondInning
        )
          this.state.fieldCount++
    } 
  
  
}
  
}

logs = () => {
   console.log("Positions: ")
   console.log(this.state.positions)
   console.log("Defense: ")
   console.log(this.state.defense)
}


  render() {
    return (
      <Container className="homeContainer" fluid>
        <Row>
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
            </Row>
            <Row className="battingOrderRow">
              <Col className="battingOrderCol">
                  <h5 className="order">Batting Order</h5>
                  {this.state.offense.order.map((p, i)=> (
                  <div className="playerRowBox" key={i}>
                  <div>{`${i+1}. )`}</div>
                   <ContentEditable
                   key={i}
                   title={i}
                   html={this.state.offense.order[i]}
                   onChange={this.handleBattingOrderChange}
                   />
                   </div>
                  ))}
              </Col>
            </Row>
            <Row className="title">
              <h5>Outfield</h5>
            </Row>
            <Row className="positionRow">
              <Col>
              <h5 className="playerBox position" >LL</h5>
                <ContentEditable
                className="playerBox position"
                title="leftLeft"
                html={this.state.positions.leftLeft.inning[0].one}
                onChange={this.handleChange}
                />
              </Col>
              <Col>
                <h5 className="playerBox position">LC</h5>
                <ContentEditable
                className="playerBox position"
                title="leftCenter"
                html={this.state.positions.leftCenter.inning[0].one}
                onChange={this.handleChange}
                />
              </Col>
              <Col>
                <h5 className="playerBox position">RC</h5>
                <ContentEditable
                className="playerBox position"
                title="rightCenter"
                html={this.state.positions.rightCenter.inning[0].one}
                onChange={this.handleChange}
                />
              </Col>
              <Col>
                <h5 className="playerBox position">RR</h5>
                <ContentEditable
                className="playerBox position"
                title="rightRight"
                html={this.state.positions.rightRight.inning[0].one}
                onChange={this.handleChange}
                />
              </Col>
              
            </Row>
            <Row className="title">
              <h5>Infield</h5>
            </Row>
            <Row className="positionRow">
              <Col>
                <h5 className="playerBox position">Third</h5>
                <ContentEditable
                className="playerBox position"
                title="third"
                html={this.state.positions.third.inning[0].one}
                onChange={this.handleChange}
                />
              </Col>
              <Col>
                <h5 className="playerBox position">Short Stop</h5>
                <ContentEditable
                className="playerBox position"
                title="shortStop"
                html={this.state.positions.shortStop.inning[0].one}
                onChange={this.handleChange}
                />
              </Col>
              <Col>
                <h5 className="playerBox position">Second</h5>
                <ContentEditable
                className="playerBox position"
                title="second"
                html={this.state.positions.second.inning[0].one}
                onChange={this.handleChange}
                />
              </Col>
              <Col>
                <h5 className="playerBox position">First</h5>
                <ContentEditable
                className="playerBox position"
                title="first"
                html={this.state.positions.first.inning[0].one}
                onChange={this.handleChange}
                />
              </Col>
            </Row>
            <Row className="title">
              <h5>Pitcher / Catcher</h5>
            </Row>
            <Row className="positionRow">
              <Col>
                <h5 className="playerBox position">Pitcher</h5>
                <ContentEditable
                className="playerBox position"
                title="pitcher"
                html={this.state.positions.pitcher.inning[0].one}
                onChange={this.handleChange}
                />
              </Col>
              <Col>
                <h5 className="playerBox position">Catcher</h5>
                <ContentEditable
                className="playerBox position"
                title="catcher"
                html={this.state.positions.catcher.inning[0].one}
                onChange={this.handleChange}
                />
              </Col>
            </Row>
            <Row className="title">
              <h5>Bench</h5>
            </Row>
            <Row className="positionRow">
              <Col className="battingOrderCol">
               {/* bench: {
                inning:[{one: []}, {two: []}, {three: []}]
              } } */}
                {this.state.positions.bench.inning[0].one.map((p, i)=> (
                  <div key={i} className="benchBox">
                   <ContentEditable
                   key={i}
                   title={i}
                   html={this.state.positions.bench.inning[0].one[i]}
                   onChange={this.handleBenchChange}
                   />
                   </div>
                  ))}
              </Col>
            </Row>
      </Container>
    );
  }
}

export default Home;

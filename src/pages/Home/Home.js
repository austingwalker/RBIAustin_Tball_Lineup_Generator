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
    counter: 0
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleChange = (e) => {
    console.log(e)
    const name = e.currentTarget.title
    this.setState({[name]: e.target.value})
  }

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
}

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
}

handleBenchChange = (e) => {
  const index = e.currentTarget.title
  const intIndex = parseInt(index, 10)
  const newArr = this.state.bench.kids.map((p, i) => {
    if(i === intIndex){
      p = e.target.value
    }
   return p
  })
  const newObj = update(this.state.bench, {kids: {$set: newArr}})
  this.setState({
    bench: newObj
  })
}

  enterName = event => {
    event.preventDefault();
      this.setState({ 
       roster: {...this.state.roster, team: [...this.state.roster.team, this.state.player]},
        player: "",
      });
      
  };

  // generateLineup = event => {
  //   event.preventDefault();
  //   const kids = this.state.roster.team.slice()
  //   const battingOrder = this.shuffle(kids)
  //   let reverseOrder = battingOrder.slice()
  //   reverseOrder = reverseOrder.reverse()
  //   this.setState({
  //     offense: {order: battingOrder},
  //     defense: reverseOrder
  //   })
  //   this.assignPosition(reverseOrder)
  // }

  generateLineup = event => {
    event.preventDefault();
    const kids = this.state.roster.team.slice()
    const battingOrder = this.shuffle(kids)
    let reverseOrder = battingOrder.slice()
    reverseOrder = reverseOrder.reverse()
    // const defense = [Object.assign(...reverseOrder.map(([key]) => ({[key]: {first: false, second: false, short: false, pitcher: false}})))]
    this.setState({
      offense: {order: battingOrder},
      defense: reverseOrder
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
    // const size = Object.keys(obj).length;
   
    const size = this.state.defense.length
    
    let holder = []

    if(this.state.counter < size){
      this.state.index++
      switch(this.state.index) {
        case 0:
        console.log("pitcher")
        const addPitcher = update(this.state.positions, {pitcher: {inning: {[0]: {one: {$set: this.state.defense[this.state.index]}}}}})
        
          this.setState(
            {
            positions: addPitcher,
            counter: this.state.counter++
            },
            this.assignPosition
          )
          
          break;
        case 1:
        console.log("short")
        const addShort = update(this.state.positions, {shortStop: {inning: {[0]: {one: {$set: this.state.defense[this.state.index]}}}}})
        console.log(addShort)
          this.setState({
            positions: addShort,
            counter: this.state.counter++
          }, 
          this.assignPosition
        )
        break;
        case 2:
        console.log("third")
        const addThird = update(this.state.positions, {third: {inning: {[0]: {one: {$set: this.state.defense[this.state.index]}}}}})
          this.setState({
            positions: addThird,
            counter: this.state.counter++
          }, 
          this.assignPosition
        )
        break;
        case 3:
        console.log("first")
        const addFirst = update(this.state.positions, {first: {inning: {[0]: {one: {$set: this.state.defense[this.state.index]}}}}})
          this.setState({
            positions: addFirst,
            counter: this.state.counter++
          }, 
          this.assignPosition
        )
        break;
        case 4:
        console.log("second")
        const addSecond = update(this.state.positions, {second: {inning: {[0]: {one: {$set: this.state.defense[this.state.index]}}}}})
          this.setState({
            positions: addSecond,
            counter: this.state.counter++
          }, 
          this.assignPosition
        )
        break;
        case 5:
        console.log("catcher")
        const addCatcher = update(this.state.positions, {catcher: {inning: {[0]: {one: {$set: this.state.defense[this.state.index]}}}}})
          this.setState({
            positions: addCatcher,
            counter: this.state.counter++
          }, 
          this.assignPosition
        )
        break;
        case 6:
        console.log("LL")
        const addLL = update(this.state.positions, {leftLeft: {inning: {[0]: {one: {$set: this.state.defense[this.state.index]}}}}})
          this.setState({
            positions: addLL,
            counter: this.state.counter++
          }, 
          this.assignPosition
        )
        break;
        case 7:
        console.log("LC")
        const addLC = update(this.state.positions, {leftCenter: {inning: {[0]: {one: {$set: this.state.defense[this.state.index]}}}}})
          this.setState({
            positions: addLC,
            counter: this.state.counter++
          }, 
          this.assignPosition
        )
        break;
        case 8:
        console.log("RC")
        const addRC = update(this.state.positions, {rightCenter: {inning: {[0]: {one: {$set: this.state.defense[this.state.index]}}}}})
          this.setState({
            positions: addRC,
            counter: this.state.counter++
          }, 
          this.assignPosition
        )
        break;
        case 9:
        console.log("RR")
        const addRR = update(this.state.positions, {rightRight: {inning: {[0]: {one: {$set: this.state.defense[this.state.index]}}}}})
          this.setState({
            positions: addRR,
            counter: this.state.counter++
          }, 
          this.assignPosition
        )
        break;
        case 10:
        console.log("bench")
         holder.push(this.state.defense[this.state.index])
         let addBench = update(this.state.positions, {bench: {inning: {[0]: {one: {$set: holder}}}}})
         this.setState({
           positions: addBench,
           counter: this.state.counter++
         }, 
         this.assignPosition
       )
       break;
       case 11:
        console.log("bench")
         holder.push(this.state.defense[this.state.index])
         addBench = update(this.state.positions, {bench: {inning: {[0]: {one: {$set: holder}}}}})
         this.setState({
           positions: addBench,
           counter: this.state.counter++
         }, 
         this.assignPosition
       )
       break;
       case 12:
        console.log("bench")
         holder.push(this.state.defense[this.state.index])
         addBench = update(this.state.positions, {bench: {inning: {[0]: {one: {$set: holder}}}}})
         this.setState({
           positions: addBench,
           counter: this.state.counter++
         }, 
         this.assignPosition
       )
       break;
      }
      
    } 

    
    // let index = 0
    
    //   let holder = []
    //   for (let key in obj) {
      // switch(index) {
      //   case 0:
      //   console.log("pitcher")
      //   const addPitcher = update(this.state.positions, {pitcher: {inning: {[0]: {one: {$set: key}}}}})
        
      //     this.setState({
      //       positions: addPitcher
        
      //     })
      //     index++
      //     break;
      //   case 1:
      //   console.log("short")
      //   const addShort = update(this.state.positions, {shortStop: {inning: {[0]: {one: {$set: key}}}}})
      //     this.setState({
      //       positions: addShort
      //     })
      //     index++
      //   break;
      //   case 2:
      //   console.log("third")
      //   const addThird = update(this.state.positions, {third: {inning: {[0]: {one: {$set: key}}}}})
      //     this.setState({
      //       positions: addThird
      //     })
      //     index++
      //   break;
      //   case 3:
      //   console.log("first")
      //   const addFirst = update(this.state.positions, {first: {inning: {[0]: {one: {$set: key}}}}})
      //     this.setState({
      //       positions: addFirst
      //     })
      //     index++
      //   break;
      //   case 4:
      //   console.log("second")
      //   const addSecond = update(this.state.positions, {second: {inning: {[0]: {one: {$set: key}}}}})
      //     this.setState({
      //       positions: addSecond
      //     })
      //     index++
      //   break;
      //   case 5:
      //   console.log("catcher")
      //   const addCatcher = update(this.state.positions, {catcher: {inning: {[0]: {one: {$set: key}}}}})
      //     this.setState({
      //       positions: addCatcher
      //     })
      //     index++
      //   break;
      //   case 6:
      //   console.log("LL")
      //   const addLL = update(this.state.positions, {leftLeft: {inning: {[0]: {one: {$set: key}}}}})
      //     this.setState({
      //       positions: addLL
      //     })
      //     index++
      //   break;
      //   case 7:
      //   console.log("LC")
      //   const addLC = update(this.state.positions, {leftCenter: {inning: {[0]: {one: {$set: key}}}}})
      //     this.setState({
      //       positions: addLC
      //     })
      //     index++
      //   break;
      //   case 8:
      //   console.log("RC")
      //   const addRC = update(this.state.positions, {rightCenter: {inning: {[0]: {one: {$set: key}}}}})
      //     this.setState({
      //       positions: addRC
      //     })
      //     index++
      //   break;
      //   case 9:
      //   console.log("RR")
      //   const addRR = update(this.state.positions, {rightRight: {inning: {[0]: {one: {$set: key}}}}})
      //     this.setState({
      //       positions: addRR
      //     })
      //     index++
      //   break;
      //   default:
      //   console.log("bench")
      //    holder.push(key)
      //    index++
      // }
    
    // const newObj = update(this.state.positions.bench, {inning: {one: {$set: holder}}})
    //   this.setState({
    //     bench: newObj
    //   })
  // }

  // positions: {...this.state.positions, pitcher: {...this.state.positions.pitcher, inning: {...this.state.positions.pitcher.inning, [0]: {...this.state.positions.pitcher.inning[0], one:key}}}}
      
    // let counter = 0
    // let holder = []
  
    // arr.forEach((p, i, arr) => {
    //   counter++
    //   switch(counter) {
    //     case 1:
    //       this.setState({
    //         pitcher: p
    //       })
    //       break;
    //     case 2:
    //       this.setState({
    //         shortStop: p
    //       })
    //     break;
    //     case 3:
    //       this.setState({
    //         third: p
    //       })
    //     break;
    //     case 4:
    //       this.setState({
    //         first: p
    //       })
    //     break;
    //     case 5:
    //       this.setState({
    //         second: p
    //       })
    //     break;
    //     case 6:
    //       this.setState({
    //         catcher: p
    //       })
    //     break;
    //     case 7:
    //       this.setState({
    //         leftLeft: p
    //       })
    //     break;
    //     case 8:
    //       this.setState({
    //         leftCenter: p
    //       })
    //     break;
    //     case 9:
    //       this.setState({
    //         rightCenter: p
    //       })
    //     break;
    //     case 10:
    //       this.setState({
    //         rightRight: p
    //       })
    //     break;
    //     default:
    //      holder.push(p)
    //   }
    
    // });
    
    
  }

  // updatePitcher = (key) => {
  //   const addPitcher = update(this.state.positions, {pitcher: {inning: {[0]: {one: {$set: key}}}}})
  //         this.setState({
  //           positions: addPitcher
  //         })
  // }

  // updateShort = (defense) => {
  //   const addShort = update(this.state.positions, {shortStop: {inning: {[0]: {one: {$set: defense[this.state.index]}}}}})
  //     this.setState({
  //       positions: addShort,
  //       counter: this.state.counter++,
  //       index: this.state.index++
  //     }, this.updateThird(defense))
  // }

  // updateThird = (defense) => {
  //   const addThird = update(this.state.positions, {third: {inning: {[0]: {one: {$set: defense[this.state.index]}}}}})
  //         this.setState({
  //           positions: addThird,
  //           counter: this.state.counter++,
  //           index: this.state.index++
  //         })
  // }


  logs = () => {

    console.log(this.state.positions)
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
                  <div className="benchBox">
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

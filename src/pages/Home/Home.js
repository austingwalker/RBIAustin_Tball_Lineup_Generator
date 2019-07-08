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
    defense: {},
    pitcher: "",
    catcher: "",
    first: "",
    second: "",
    shortStop: "",
    third: "",
    rightRight: "",
    rightCenter: "",
    leftCenter: "",
    leftLeft: "",
    bench: {
      kids:[]
    },
    inning: 1,
    html: "",
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
    const obj = Object.assign(...reverseOrder.map(([key]) => ({[key]: {first: false, second: false, short: false, pitcher: false}})))
    this.setState({
      offense: {order: battingOrder},
      defense: obj
    })
    this.assignPosition(obj)
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

  assignPosition = (obj) => {
    console.log(obj)
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
          console.log(key + " -> " + obj[key].first);
      }
    }
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
    // const newObj = update(this.state.bench, {kids: {$set: holder}})
    // this.setState({
    //   bench: newObj
    // })

  }

  renderPlayers = () => {
    if(this.state.addPlayer){

      return 
    }
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
                  <div className="playerRowBox">
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
                html={this.state.leftLeft}
                onChange={this.handleChange}
                />
              </Col>
              <Col>
                <h5 className="playerBox position">LC</h5>
                <ContentEditable
                className="playerBox position"
                title="leftCenter"
                html={this.state.leftCenter}
                onChange={this.handleChange}
                />
              </Col>
              <Col>
                <h5 className="playerBox position">RC</h5>
                <ContentEditable
                className="playerBox position"
                title="rightCenter"
                html={this.state.rightCenter}
                onChange={this.handleChange}
                />
              </Col>
              <Col>
                <h5 className="playerBox position">RR</h5>
                <ContentEditable
                className="playerBox position"
                title="rightRight"
                html={this.state.rightRight}
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
                html={this.state.third}
                onChange={this.handleChange}
                />
              </Col>
              <Col>
                <h5 className="playerBox position">Short Stop</h5>
                <ContentEditable
                className="playerBox position"
                title="shortStop"
                html={this.state.shortStop}
                onChange={this.handleChange}
                />
              </Col>
              <Col>
                <h5 className="playerBox position">Second</h5>
                <ContentEditable
                className="playerBox position"
                title="second"
                html={this.state.second}
                onChange={this.handleChange}
                />
              </Col>
              <Col>
                <h5 className="playerBox position">First</h5>
                <ContentEditable
                className="playerBox position"
                title="first"
                html={this.state.first}
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
                html={this.state.pitcher}
                onChange={this.handleChange}
                />
              </Col>
              <Col>
                <h5 className="playerBox position">Catcher</h5>
                <ContentEditable
                className="playerBox position"
                title="catcher"
                html={this.state.catcher}
                onChange={this.handleChange}
                />
              </Col>
            </Row>
            <Row className="title">
              <h5>Bench</h5>
            </Row>
            <Row className="positionRow">
              <Col className="battingOrderCol">
                {this.state.bench.kids.map((p, i)=> (
                  <div className="benchBox">
                   <ContentEditable
                   key={i}
                   title={i}
                   html={this.state.bench.kids[i]}
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

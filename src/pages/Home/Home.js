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
    roster: [],
    offense: [],
    defense: [],
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
    bench: [],
    inning: 1,
    html: "",
    addPlayer: false
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
    console.log(e)
    const index = e.currentTarget.title
    const i = parseInt(index, 10)
    const element = this.state.roster[index]
    console.log(i)
    console.log(e.target.value)
    const newArr = update(this.state.roster, {i: {$set: e.target.value}})
    console.log(newArr)
    console.log(this.state.roster)
    // if(e.target.value === "undefined"){
    //   this.setState({roster: update(this.state.roster, {i: {name: {$set: ""}}})
    // })
    // } else {
    //   this.setState({roster: update(this.state.roster, {i: {name: {$set: e.target.value}}})
    // })
    // }
   
}

  enterName = event => {
    event.preventDefault();
      this.setState({ 
        roster: [...this.state.roster, this.state.player],
        player: "",
        addPlayer: true
      });
  };

  generateLineup = event => {
    event.preventDefault();
    const kids = this.state.roster.slice()
    const battingOrder = this.shuffle(kids)
    let reverseOrder = battingOrder.slice()
    reverseOrder = reverseOrder.reverse()
    this.setState({
      offense: battingOrder,
      defense: reverseOrder
    })
    this.assignPosition(reverseOrder)
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

  assignPosition = (arr) => {
    let counter = 0
    let holder = []
  
    arr.forEach((p, i, arr) => {
      counter++
      switch(counter) {
        case 1:
          this.setState({
            pitcher: p
          })
          break;
        case 2:
          this.setState({
            shortStop: p
          })
        break;
        case 3:
          this.setState({
            third: p
          })
        break;
        case 4:
          this.setState({
            first: p
          })
        break;
        case 5:
          this.setState({
            second: p
          })
        break;
        case 6:
          this.setState({
            catcher: p
          })
        break;
        case 7:
          this.setState({
            leftLeft: p
          })
        break;
        case 8:
          this.setState({
            leftCenter: p
          })
        break;
        case 9:
          this.setState({
            rightCenter: p
          })
        break;
        case 10:
          this.setState({
            rightRight: p
          })
        break;
        default:
         holder.push(p)
      }
    
    });
    this.setState({
      bench: holder
    })

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
            <Col>
            <div>
              <h5>Players</h5>
              {this.state.roster.map((p, i)=> (
                   <ContentEditable
                   key={i}
                   className="playerBox position"
                   title={i}
                   html={this.state.roster[i]}
                   onChange={this.handlePlayerChange}
                   />
                  ))}
             
            </div>
            </Col>
            </Row>
            <Row className="positionRow">
              <Col>
                  <h5>Batting Order</h5>
                  {this.state.offense.map((p, i)=> (
                  <div className="playerRowBox">{`${i+1}.) ${p}`}</div>
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
            <Row className="positionRow">
              <Col>
              <div>
                <h5>Bench</h5>
                <div className="playerBox">
                  {this.state.bench.join(", ")}
                  <button type="submit" className="btn editBtn" >Edit</button>
                </div>
              </div>
              </Col>
            </Row>
      </Container>
    );
  }
}

export default Home;

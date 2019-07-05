import React, { Component } from "react";
// import API from "../../utils/API";
import { Container, Row, Col } from 'reactstrap';
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
    inning: 1
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  enterName = event => {
    event.preventDefault();
      this.setState({ 
        roster: [...this.state.roster, this.state.player],
        player: ""
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
              <div className="playerBox">{this.state.roster.join(", ")}</div>
            </div>
            </Col>
            </Row>
            <Row className="positionRow">
              <Col>
                <div>
                  <h5>Batting Order</h5>
                  <div className="playerBox">{this.state.offense.join(", ")}</div>
                </div>
              </Col>
            </Row>
            <Row className="title">
              <h5>Outfield</h5>
            </Row>
            <Row className="positionRow">
              <Col>
                <h5 className="playerBox position" >LL</h5>
                <div className="playerBox" >{this.state.leftLeft}</div>
              </Col>
              <Col>
                <h5 className="playerBox position">LC</h5>
                <div className="playerBox">{this.state.leftCenter}</div>
              </Col>
              <Col>
                <h5 className="playerBox position">RC</h5>
                <div className="playerBox">{this.state.rightCenter}</div>
              </Col>
              <Col>
                <h5 className="playerBox position">RR</h5>
                <div className="playerBox">{this.state.rightRight}</div>
              </Col>
              
            </Row>
            <Row className="title">
              <h5>Infield</h5>
            </Row>
            <Row className="positionRow">
              <Col>
                <h5 className="playerBox position">Third</h5>
                <div className="playerBox">{this.state.third}</div>
              </Col>
              <Col>
                <h5 className="playerBox position">Short Stop</h5>
                <div className="playerBox">{this.state.shortStop}</div>
              </Col>
              <Col>
                <h5 className="playerBox position">Second</h5>
                <div className="playerBox">{this.state.second}</div>
              </Col>
              <Col>
                <h5 className="playerBox position">First</h5>
                <div className="playerBox">{this.state.first}</div>
              </Col>
            </Row>
            <Row className="title">
              <h5>Pitcher / Catcher</h5>
            </Row>
            <Row className="positionRow">
              <Col>
                <h5 className="playerBox position">Pitcher</h5>
                <div className="playerBox">{this.state.pitcher}</div>
              </Col>
              <Col>
                <h5 className="playerBox position">Catcher</h5>
                <div className="playerBox">{this.state.catcher}</div>
              </Col>
            </Row>
            <Row className="positionRow">
              <Col>
              <div>
                <h5>Bench</h5>
                <div className="playerBox">{this.state.bench.join(", ")}</div>
              </div>
              </Col>
            </Row>
      </Container>
    );
  }
}

export default Home;

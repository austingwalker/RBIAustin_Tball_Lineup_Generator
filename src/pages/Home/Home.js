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
    // for(let i = 0; i < arr.length; i++){
    //   counter++
    //   if(counter > 1){
    //     holder.push(arr[i])
    //   } 
    // }
    // console.log(holder)

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
      <div className="fieldContainer">
        <Row>
          <Col>
            <Names 
            player={this.state.player}
            handleInputChange={this.handleInputChange} 
            enterName={this.enterName}
            />
            <button type="submit" className="btn btn-secondary" onClick={this.generateLineup}>Generate Lineup</button>
            <div>
              <h1>Players</h1>
              <div className="playerBox">{this.state.roster.join(", ")}</div>
            </div>
            <div>
              <h1>Batting Order</h1>
              <div className="playerBox">{this.state.offense.join(", ")}</div>
            </div>
            <div>
              <h1>Fielding Order</h1>
              <div className="playerBox">{this.state.defense.join(", ")}</div>
            </div>
            <div>
              <h1>Positions</h1>
              <div className="playerBox">
              <div>Pitcher: {this.state.pitcher}</div>
              <div>shortStop: {this.state.shortStop}</div>
              <div>Third: {this.state.third}</div>
              <div>first: {this.state.first}</div>
              <div>Second: {this.state.second}</div>
              <div>Catcher: {this.state.catcher}</div>
              <div>Left Left: {this.state.leftLeft}</div>
              <div>Left Center: {this.state.leftCenter}</div>
              <div>Right Center: {this.state.rightCenter}</div>
              <div>Right Right: {this.state.rightRight}</div>
              <div>Bench: {this.state.bench.join(", ")}</div>
              </div>
            </div>
          </Col>
        </Row>
        </div>
      </Container>
    );
  }
}

export default Home;

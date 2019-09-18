import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';
import "./Rules.css"


class Rules extends Component {
  render() {
    return (
        <div id="rulesBox">
          <h1>RBI Austin Tee Ball Defensive Rules</h1>
          <ol id="rulesList">
            <li>
              <p>
                Two (2) inning play rule: Each player must play two defensive innings, including an infield position.
              </p>
            </li>
            <li>
              <p>
                Special Fielding Rule: Pitcher, First Base, Short Stop, Second Base, cannot play one of these positions in consecutive innings. They must play the outfield, Catcher, Third Base, or be on the bench during the next inning. *Once a player has played one of these 4 positions they cannot return to that same position for the remainder of the game. They may however in an alternate inning play a different one of the 4 preferred positions. 
              </p>
            </li>
            <li>
              <p>
                Bench Rule: With a lineup of thirteen (13) or less players a player must not sit the bench more than one (1) inning.
              </p>
            </li>
          </ol>
        </div>
    )
  }
}

export default Rules;

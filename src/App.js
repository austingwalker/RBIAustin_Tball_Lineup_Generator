import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Manual from "./pages/Manual";
// import NoMatch from "./pages/NoMatch";
import "./App.css";

const App = () => 
(
  <Router>
    <div className="routerDiv">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/manual" component={Manual} />
        {/* <Route component={NoMatch} /> */}
      </Switch>
    </div>
  </Router>
);

export default App;

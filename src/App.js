import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Rules from "./pages/Rules";
import Nav from "./components/Nav";
import NoMatch from "./pages/NoMatch";
import "./App.css";

const App = () => 
(
  <Router basename={process.env.PUBLIC_URL}>
    <div className="routerDiv">
      <Nav id="navComp"/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/rules" component={Rules} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;

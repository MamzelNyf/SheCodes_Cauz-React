import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./components/Nav/Nav";
import HomePage from "./pages/HomePage";
import Eventpage from "./pages/EventPage";

import "./App.css";

function App() {
  return (
    <Router>
      <div className={"App"}>
        <Nav />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/event/:slug">
            <Eventpage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

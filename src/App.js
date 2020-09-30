import React, { useState } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Nav from "./components/Nav/Nav"
import HomePage from "./pages/HomePage"
import EventPage from "./pages/EventPage"

import "./App.css"

const savedUsername = window.localStorage.getItem("username")

function App() {
  const [username, setUsername] = useState(savedUsername)
  //check with !== null whether username is strictly not null, 
  //so if username is undefined or an empty string then it’ll be true
  const loggedIn = username !== null

  console.log({ loggedIn })

  return (
    <Router>
      <div className={"App"}>
        {/* pass the loggedIn as a const and setUserName as a function usable in Nav */}
        <Nav loggedIn={loggedIn} setUsername={setUsername} />
        <h3>{loggedIn ? `Hello, ${username}` : "Please Log In"}</h3>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/event/:slug">
            <EventPage />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App

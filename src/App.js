import React, { useState } from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"

import Nav from "./components/Nav/Nav"
import HomePage from "./pages/HomePage"
import PostEventPage from "./pages/PostEventPage"
import EditEventPage from "./pages/EditEventPage"
import EventPage from "./pages/EventPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"


import "./App.css"

const savedUsername = window.localStorage.getItem("username")

function App() {
  const [username, setUsername] = useState(savedUsername)
  //check with !== null whether username is strictly not null, 
  //so if username is undefined or an empty string then it’ll be true
  const loggedIn = username !== null
  //console.log({ loggedIn })

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
          <Route path="/events/:slug" exact>
            <EventPage />
          </Route>
          <Route path="/events" exact>
            <PostEventPage />
          </Route>
          <Route path="/events/:slug/edit" >
            <EditEventPage />
          </Route>
          <Route path="/signup">
          {loggedIn ? <Redirect to="/" /> :
            <SignupPage  setUsername={setUsername} />
          }
          </Route>
          <Route path="/login">
          {loggedIn ? <Redirect to="/" /> :
            <LoginPage setUsername={setUsername}/>
          }
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App

import React, { useState } from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import LoginForm from "../LoginForm/LoginForm"

import "./Nav.css"

//internal components used in the main component Nav= cleaner  
//Uses the props setUsername passed in Nav by App
const LogoutButton = ({ setUsername }) => (
  <button
    onClick={() => {
      localStorage.removeItem("token")
      localStorage.removeItem("username")
      setUsername(null)
    }}
  >
    Logout
  </button>
)

const LoggedOutNav = ({ setUsername }) => {
  const [state, setState] = useState(null)

  return (
    <div>
      <div>
        {/* if the state store already login or signup, set it to null to create a toogle button */}
        <button onClick={() => setState(state ? null : "login")}>Login</button>
        <button onClick={() => setState(state ? null : "signup")}>Signup</button>
      </div>
      {state === "login" ? <LoginForm setUsername={setUsername} /> : null}
      {state === "signup" ? "Signup!" : null}
    </div>
  )
}

function Nav({ loggedIn, setUsername }) {
  return (
    <div>
      <Link to="/" className="button">
        Home
      </Link>
      {/* if loggedIn is true, pass the prop setUsername from App.js to the internal component*/}
      {loggedIn ? (
        <LogoutButton setUsername={setUsername} />
      ) : (
        <LoggedOutNav setUsername={setUsername} />
      )}
    </div>
  )
}

export default Nav

Nav.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
}

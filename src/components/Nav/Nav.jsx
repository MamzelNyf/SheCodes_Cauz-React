import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
// import LoginForm from "../LoginForm/LoginForm"
// import SignupForm from "../SignupForm/SignupForm"

import "./Nav.css"

//internal components used in the main component Nav= cleaner  
//Uses the props setUsername passed in Nav by App
const LogoutButton = ({ setUsername }) => (
  <Link className={"button"} to="/"
    onClick={() => {
      localStorage.removeItem("token")
      localStorage.removeItem("username")
      setUsername(null)
    }}
  >
    Logout
  </Link>
)

const LoggedOutNav = () => {

  return (
    <div>
      <Link to="/login" className={"button"}>
        Login
      </Link>
      <Link to="/signup" className={"button"}>
        Signup
      </Link>
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
        <>
          <LogoutButton setUsername={setUsername} />
          <Link to="/events/" className="button">
            Create a new Event
          </Link>
        </>
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

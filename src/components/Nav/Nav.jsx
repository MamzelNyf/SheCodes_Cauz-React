import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import "./Nav.css";

function Nav(props) {
  const logged_out_nav =(
    <>
      <button onClick = {() => props.displayForm('login')}>Login</button>
      <button onClick = {() => props.displayForm('signup')}>Signup</button>
    </>
  )
  const logged_in_nav = (
      <button onClick = {props.handleLogout}>Logout</button>
  );
  return (
      <div>
          <Link to="/" className={"button"}>
            Home
          </Link>
          {/* {isAuthenticated
          ? <Link onClick={handleLogout} className={"button"}>Logout</Link>
          :<>
            <Link to="/login" className={"button"}>
              Login
            </Link>
            <Link to="/signup" className={"button"}>
              Signup
            </Link>
          </>
          } */}
          {props.loggedIn ? logged_in_nav : logged_out_nav}
      </div>

  );
}

export default Nav;

Nav.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  displayForm: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired
}
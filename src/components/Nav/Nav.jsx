import React,{useState} from "react";
import { Link } from "react-router-dom";
import {AppContext} from '../../libs/contextLib';

import "./Nav.css";

function Nav() {
  const [isAuthenticated, userHasAuthenticated] = useState(false)
  function handleLogout() {
    userHasAuthenticated(false)
  }
  return (
    //React Context’s : two parts: first is Provider. second in Login 
    //all the child components inside the Context Provider should be able to access what we put in it
    <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated}}>
      <div>
          <Link to="/" className={"button"}>
            Home
          </Link>
          {isAuthenticated
          ? <Link onClick={handleLogout} className={"button"}>Logout</Link>
          :<>
            <Link to="/login" className={"button"}>
              Login
            </Link>
            <Link to="/signup" className={"button"}>
              Signup
            </Link>
          </>
          }
      </div>
     </AppContext.Provider>

  );
}

export default Nav;

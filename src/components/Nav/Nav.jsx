import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
  return (
    <nav>
      <Link to="/" className={"button"}>
        Home
      </Link>
      {/* <Link to="/event" className={"button"}>
        Event
      </Link> */}
    </nav>
  );
}

export default Nav;

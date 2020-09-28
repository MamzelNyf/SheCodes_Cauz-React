import React,{useState, useEffect} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./components/Nav/Nav";
import HomePage from "./pages/HomePage";
import EventPage from "./pages/EventPage";
import LoginPage from "./pages/LoginPage";
import LoginForm from "./components/LoginForm/LoginForm"



import "./App.css";

function App() {

const[username, setUsername] = useState('');
const[displayedForm,setDisplayedForm] = useState('');
const[loggedIn,setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false);

useEffect(() => {
  let token = window.localStorage.getItem('token');
  if (loggedIn) {
    fetch(`${process.env.REACT_APP_API_URL}events/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(res => res.json())
      .then(json => {
        setUsername({ username: json.username });
      });
  }
})

  const postData = async() => {
    let token = window.localStorage.getItem("token");
    const response = await fetch(
        `${process.env.REACT_APP_API_URL}api-token-auth/`, 
        {
            method: "post",
            headers: {
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(username),
    });
    return response.json()
};

const handleLogin = (e) => {
    //prevent the default behavior of the button
    // e.preventDefault();
    // if(credentials.username && credentials.password) {
        postData().then((response) => {
            //console.log("response", response)
            window.localStorage.setItem("token", response.token);
            window.localStorage.setItem("username", username);
            setIsLoggedIn(true);
            setDisplayedForm('');
            setUsername(username);
        });    
    // }
}

const displayForm = form => {setDisplayedForm(form)};

const handleLogout = () => {
  localStorage.removeItem('token');
  setIsLoggedIn(false); 
  setUsername('')
};

let form;
    switch (displayedForm) {
      case 'login':
        form = <LoginForm handleLogin={handleLogin} />;
        break;
      // case 'signup':
      //   form = <SignupForm handleSignup={handleSignup} />;
      //   break;
      default:
        form = null;
    }
  return (
    
    <Router>
      <div className={"App"}>
        <Nav 
        loggedIn={loggedIn}
        displayForm={displayForm}
        handleLogout={handleLogout}
        />
        
        <h3>
          {loggedIn
            ? `Hello, ${username}`
            : 'Please Log In'}
        </h3>
        {form}
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/event/:slug">
            <EventPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

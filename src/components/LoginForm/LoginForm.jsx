import React, { useState } from "react"
import {useHistory} from "react-router-dom"


function LoginForm({ setUsername }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })
  const history = useHistory();


  //update the variable credentials when entering data in the input
  const handleChange = (e) => {
    const { id, value } = e.target
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }))
  }
  //function saveusername uses the token returned from handleLogin
  //we created a users/me to get the info from the current user logged in like username
  const saveUsername = async (token) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}users/me`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    const data = await res.json()
    window.localStorage.setItem("username", data.username)
    setUsername(data.username)
  }
// getting the token is related to login so good practice to associate it to the login component
// send the credentials to the api-token-auth to get a token back
// save token in localstorage and return the token
  const fetchToken = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}api-token-auth/`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    )
    const data = await response.json()
    window.localStorage.setItem("token", data.token)
    return data.token
  }
//when form subimtted, save credentials and create a const token with return of fetchToken function
// pass token to saveUsername function
  const handleLogin = async (e) => {
    //prevent the default behavior of the button
    e.preventDefault()
    if (credentials.username && credentials.password) {
      const token = await fetchToken()
      await saveUsername(token)
      history.push("/");
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        {/* htmlFor is the React notation for used for accessibility */}
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Enter username"
          onChange={handleChange}
          value={credentials.username}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          onChange={handleChange}
          value={credentials.password}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm

import React, { useState } from "react"
import {useHistory} from "react-router-dom"


function SignupForm() {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  })

  const history = useHistory();

// update the variable credentials when entering data in the input
  const handleChange = (e) => {
    const { id, value } = e.target
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }))
  }
  const signup = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}users/`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    )
    const data = await response.json()
    return data
  }

  const handleSignup = async (e) => {
    //prevent the default behavior of the button
    e.preventDefault()
    if (credentials.username && credentials.email && credentials.password) {
      const token = await signup()
      history.push("/");
    }
  }

  return (
    <form onSubmit={handleSignup}>
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
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter email"
          onChange={handleChange}
          value={credentials.email}
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
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password2"
          placeholder="Enter password"
          onChange={handleChange}
          value={credentials.password}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default SignupForm

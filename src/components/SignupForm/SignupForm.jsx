import React, { useState } from "react"
import { useHistory } from "react-router-dom"

function SignupForm() {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    checkPassword: "",
  })

  const history = useHistory()

  // update the variable credentials when entering data in the input
  const handleChange = (e) => {
    const { id, value } = e.target
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }))
  }
  const handleSignup = async (event) => {
    event.preventDefault()
    if (credentials.password !== credentials.checkPassword) {
      alert("Passwords don't match")
    } else {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}users/`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        })
  
        const data = await response.json()
        history.push("/login")
        return data
      } catch (error) {
        alert("Network error", error.message)
      }
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
          placeholder="Enter a username"
          onChange={handleChange}
          value={credentials.username}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          onChange={handleChange}
          value={credentials.email}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter a password"
          onChange={handleChange}
          value={credentials.password}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="checkPassword"
          placeholder="Please enter your password again"
          onChange={handleChange}
          value={credentials.checkPassword}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default SignupForm

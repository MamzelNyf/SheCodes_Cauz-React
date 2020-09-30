import React, { useState } from "react"
import {useHistory} from "react-router-dom"


function PostEventForm() {
  const [credentials, setCredentials] = useState({
    title: "",
    description: "Super NFP Event",
    goal: 5000,
    image: "http://lorempixel.com/400/400/nightlife/",
    is_open: true,
    date_created: "2020-09-09T20:31:00Z",
    category: "Charity",
    region: "World",
  })

  const history = useHistory();
  const token = window.localStorage.getItem("token")

// update the variable credentials when entering data in the input
  const handleChange = (e) => {
    const { id, value } = e.target
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }))
  }
  const postData = async () => {
    console.log(credentials)
    console.log(token)

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}events/`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `token ${token}`
        },
        body: JSON.stringify(credentials),
      }
    )
    const data = await response.json()
    history.push(`/events/:${data.slug}`)
    return data
  }

  const handlePostEvent = async (e) => {
    //prevent the default behavior of the button
    e.preventDefault()
      await postData(token)
  }
  

  return (
    <form onSubmit={handlePostEvent}>
      <div>
        {/* htmlFor is the React notation for used for accessibility */}
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          placeholder="Enter title"
          onChange={handleChange}
          value={credentials.title}
        />
      </div>

      <div>
        <label htmlFor="description">description:</label>
        <input
          type="description"
          id="description"
          placeholder="Enter description"
          onChange={handleChange}
          value={credentials.description}
        />
      </div>
      <div>
        <label htmlFor="goal">goal:</label>
        <input
          type="goal"
          id="goal"
          placeholder="Enter goal"
          onChange={handleChange}
          value={credentials.goal}
        />
      </div>
      <div>
        <label htmlFor="image">image:</label>
        <input
          type="image"
          id="goal"
          placeholder="Enter image"
          onChange={handleChange}
          value={credentials.image}
          alt="Eventpicture"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default PostEventForm

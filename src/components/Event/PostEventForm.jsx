import React, { useState, useEffect} from "react"
import {useHistory} from "react-router-dom"
import DatePicker from 'react-date-picker'
import {string_to_slug} from '../../helpers'
import Dropdown from "../Dropdown/Dropdown"


function PostEventForm() {
  const [credentials, setCredentials] = useState({
    title:"",
    description: "Super NFP Event",
    goal: 5000,
    image: "http://lorempixel.com/400/400/nightlife/",
    date_created:(new Date()),
    is_open: true,
    region: "World",
    categories:"",
    regions: ""})
  const [hasError, setErrors] = useState(false)
  const [categories, setCategories] = useState([])
  const [regions, setRegions] = useState([])

  const history = useHistory();
  const token = window.localStorage.getItem("token")
  const titleToSlug = string_to_slug(credentials.title)

  // useEffect function to get the DATA from 2 different endpiints
  // because use async await no need to use promise .then .catch
  // adding [] at the end of the useEffect avoid looping
  useEffect(() => {
    async function fetchCategories() {
      try {
        const r = await fetch(`${process.env.REACT_APP_API_URL}categories/`);
        const categories = await r.json()
        setCategories(categories)
      } catch (error) {
        setErrors(error)
      }
    }
    async function fetchRegions() {
      try {
        const r = await fetch(`${process.env.REACT_APP_API_URL}regions/`);
        const regions = await r.json()
        setRegions(regions)
      } catch (error) {
        setErrors(error)
      }
      
    }
    // Promise allows to run 2 functions in parallel
    Promise.all([
      fetchCategories(),
      fetchRegions()
    ])
  },[]);
  
  // console.log({categories})
  // console.log({regions})


  // update the variable credentials when entering data in the input
  const handleChange = (e) => {
    const { id, value } = e.target
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }))
  }
  const handleDate = (date) => {
    setCredentials({...credentials, 
      date_created: date})
  }

  const handleDropDown = (dataValue) => {
    setCredentials({...credentials,
      categories: dataValue})
      console.log(dataValue)
  }
  // when form submitted postdata 
  const postData = async () => {
    console.log(credentials)
    try{
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
    history.replace(`/events/${titleToSlug}`)
    return data

    }catch (error) {
          alert("Network error", error.message)
    }
  }

  const handlePostEvent = async (event) => {
    //prevent the default behavior of the form which is rerendering
    event.preventDefault()
      await postData(token)
  }
  


  return (
    <form onSubmit={handlePostEvent}>
    {hasError? <span>Has error: {JSON.stringify(hasError)}</span> : null }
      <div>
        {/* htmlFor is the React notation for used for accessibility */}
        <label htmlFor="title">Title of your event: </label>
        <input
          type="text"
          id="title"
          placeholder="Enter title"
          onChange={handleChange}
          value={credentials.title}
        />
      </div>
      <DatePicker
        onChange={handleDate}
        value={credentials.date_created}
      />
      <div>
        <label htmlFor="description">Description of your event: </label>
        <input
          type="description"
          id="description"
          placeholder="Enter description"
          onChange={handleChange}
          value={credentials.description}
        />
      </div>
      <div>
        <label htmlFor="goal">Goal you want to reach: </label>
        <input
          type="goal"
          id="goal"
          placeholder="Enter goal"
          onChange={handleChange}
          value={credentials.goal}
        />
      </div>
      <div>
        <label htmlFor="image">Picture for your event: </label>
        <input
          type="image"
          id="goal"
          placeholder="Enter image"
          onChange={handleChange}
          value={credentials.image}
          alt="Eventpicture"
        />
      </div>
      <div>
        <Dropdown
          title="Select a category"
          data={categories}
          handleDropDown={handleDropDown}
          value={credentials.category} 
          //list={credentials.category}
          //onChange={handleChange}
        />

      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default PostEventForm

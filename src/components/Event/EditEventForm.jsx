import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
import DatePicker from "react-date-picker"
import ReactLoading from 'react-loading';

import Dropdown from "../Dropdown/Dropdown"


function EditEventForm() {
  
  const [eventData, setEventData] = useState({loading: true})
  const [hasError, setErrors] = useState(false)
  const [categories, setCategories] = useState([])
  const [regions, setRegions] = useState([])

  const history = useHistory()
  const token = window.localStorage.getItem("token")
  const slug = window.localStorage.getItem("slug")
  const username = window.localStorage.getItem("username")

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}events/${slug}`)
    .then((results) => {
      return results.json();
    })
    .then((data) => {
      setEventData(data);
      console.log(slug)
    });
  }, [slug]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const r = await fetch(`${process.env.REACT_APP_API_URL}categories/`)
        const categories = await r.json()
        setCategories(categories)
      } catch (error) {
        setErrors(error)
      }
    }
    async function fetchRegions() {
      try {
        const r = await fetch(`${process.env.REACT_APP_API_URL}regions/`)
        const regions = await r.json()
        setRegions(regions)
      } catch (error) {
        setErrors(error)
      }
    }
    Promise.all([fetchCategories(), fetchRegions()])
  }, [])

  

  const handleChange = (event) => {
    event.preventDefault()
    const { id, value } = event.target
    setEventData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }
  const handleDate = (date) => {
    setEventData({ ...eventData, date_created: date })
  }

  const handleDropDownCategory = (dataValue) => {
    setEventData({ ...eventData, category: dataValue })
  }
  const handleDropDownRegion = (dataValue) => {
    setEventData({ ...eventData, region: dataValue })
  }
  const putData = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}events/${slug}`, {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: `token ${token}`,
            },
            body: JSON.stringify(eventData),
          })
          const data = await response.json()
          history.push(`/events/${data.slug}`)
          return data
        }
     catch (error) {
      alert("Network error", error.message)
    }
  }

  const handlePutEvent = async (event) => {
    event.preventDefault()
    await putData(token)
  }
  if (eventData.loading) {
    return 'Loading!'
  }

   // Delete the event onClick
   const deleteEvent = async () => {
    try {
      await fetch(
        `${process.env.REACT_APP_API_URL}events/${slug}`,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          }
        });       
    } catch (error) {
      alert("Network error", error.message)
    }
  }
  if (eventData.loading) {
    return <ReactLoading type={"spinningBubbles"} color={"#CBCF06"} height={'20%'} width={'20%'} />
  }
  return (
    <div>
    {username === eventData.owner ?
    <>
    <form onSubmit={handlePutEvent}>
        {hasError ? <span>Has error: {JSON.stringify(hasError)}</span> : null}
        <div>
          <label htmlFor="title">Title of your event: </label>
          <input
            type="text"
            id="title"
            onChange={handleChange}
            value={eventData.title}
          />
        </div>
        <DatePicker onChange={handleDate} value={eventData.date_created} />
        <div>
          <label htmlFor="description">Description of your event: </label>
          <textarea
            id="description"
            onChange={handleChange}
            value={eventData.description}
          />
        </div>
        <div>
          <label htmlFor="goal">Goal you want to reach: </label>
          <input
            type="number"
            id="goal"
            onChange={handleChange}
            value={eventData.goal}
          />
        </div>
        <div>
          <label htmlFor="image">Picture for your event: </label>
          <input
            type="image"
            id="goal"
            onChange={handleChange}
            value={eventData.image}
            alt="Eventpicture"
          />
        </div>
        <Dropdown
          title="Select a category"
          data={categories}
          handleDropDown={handleDropDownCategory}
          value={eventData.category}
        />
        <Dropdown
          title="Select a region"
          data={regions}
          handleDropDown={handleDropDownRegion}
          value={eventData.region}
        />
        <button type="submit">Update</button>
      </form>
      <Link className={"button"} to="/" onClick={deleteEvent} >Delete Event</Link>
    </>
    : <h2>You are not allowed to edit this event</h2>
    }
    </div>
  )
}

export default EditEventForm

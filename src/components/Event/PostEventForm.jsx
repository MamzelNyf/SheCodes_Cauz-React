import React, { useState, useEffect} from "react"
import {useHistory} from "react-router-dom"
import DatePicker from 'react-date-picker'
import {string_to_slug} from '../../helpers'
import Dropdown from "../Dropdown/Dropdown"
// import FileUploader from "../FileUploader/FileUploader"


function PostEventForm() {
  const [credentials, setCredentials] = useState({
    title:"",
    date_created:(new Date()),
    is_open: true})
  const [hasError, setErrors] = useState(false)
  const [categories, setCategories] = useState([])
  const [regions, setRegions] = useState([])
  // const [selectedFile, setSelectedFile] = useState(null);


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
  const handleChange = (event) => {
    const { id, value } = event.target
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }))
  }
  const handleDate = (date) => {
    setCredentials({...credentials, 
      date_created: date})
  }

  const handleDropDownCategory = (dataValue) => {
    setCredentials({...credentials,
      category: dataValue})
      //console.log(dataValue)
  }
  const handleDropDownRegion = (dataValue) => {
    setCredentials({...credentials,
      region: dataValue})
  }
  // when form submitted postdata 
  const postData = async () => {
    // console.log(credentials)
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
    if ( credentials.title !== "" && credentials.description !== "" && credentials.goal !== "" && credentials.category !== "" && credentials.region) {
      history.replace(`/events/${titleToSlug}`)
      return data
    } else {
      alert("Give us more details, all fields are required :)")
    }


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
    <form onSubmit={handlePostEvent} className="form">
    <h2>Post your event</h2>

    {hasError? <span>Has error: {JSON.stringify(hasError)}</span> : null }
      <div>
        {/* htmlFor is the React notation for used for accessibility */}
        <label htmlFor="title" className="label">Title of your event: </label>
        <input
          type="text"
          id="title"
          placeholder="Enter title"
          onChange={handleChange}
          value={credentials.value}
          onFocus = {(event) => event.target.value = ""} 
          className="input"
        />
      </div>
      <label htmlFor="date" className="label">Date of your event: </label>
      <DatePicker
        onChange={handleDate}
        value={credentials.date_created}
      />
      <div>
        <label htmlFor="description" className="label">Description of your event: </label>
        <textarea
          id="description"
          placeholder="Enter description"
          onChange={handleChange}
          value={credentials.description}
          onFocus = {(event) => event.target.value = ""} 
          className="input"
          rows="10"
        />
      </div>
      <div>
        <label htmlFor="goal" className="label">Goal you want to reach: </label>
        <input
          type="number"
          id="goal"
          placeholder="Enter goal"
          onChange={handleChange}
          value={credentials.goal}
          onFocus = {(event) => event.target.value = ""} 
          className="input"
        />
      </div>
      <div>
        <label htmlFor="image" className="label">Choose a picture online for your event: </label>
        <input
          type="text"
          id="image"
          placeholder="Enter the url of your image"
          onChange={handleChange}
          value={credentials.image}
          className="input"
        />
        {/* <FileUploader 
          onFileSelectSuccess={(file) => setSelectedFile(file)}
          onFileSelectError={({ error}) => alert(error)}
          selectedFile={credentials.image}
        /> */}
      </div>
      <label htmlFor="image" className="label">Choose a category: </label>
      <Dropdown
        title="Select a category"
        data={categories}
        handleDropDown={handleDropDownCategory}
        value={credentials.category} 
      />
      <label htmlFor="image" className="label">Select your region: </label>
      <Dropdown
        title="Select a region"
        data={regions}
        handleDropDown={handleDropDownRegion}
        value={credentials.region} 
      />

      <button className="button" type="submit">Submit</button>
    </form>
  )
}

export default PostEventForm

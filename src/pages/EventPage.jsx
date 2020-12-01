import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

import ReactLoading from 'react-loading';
import AddPledgeForm from '../components/PledgeForm/AddPledgeForm'
import { formatDate } from '../helpers'

function EventPage() {
  // with { pledges []} load data from the related field
  // add loading: true to create a tempory state which will be erase 
  // when the data is loaded because ther is no loading field
  const [eventData, setEventData] = useState({ pledges: [], loading: true})
  const { slug } = useParams()
  const owner = window.localStorage.getItem("username")
  const totalAmount = eventData.pledges.reduce((total, pledge) => total + pledge.amount, 0 )
  const token = window.localStorage.getItem("token")

  //Fetch data to display the event
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_API_URL}events/${slug}`
      )
      const data = await result.json()
      setEventData(data)
      window.localStorage.setItem("slug",data.slug)
    }
    fetchData()
  }, [slug])
  
  // Delete the pledge onClick
  const deletePledge = async (pledge) => {
    console.log(pledge, {pledge})
    try {
      await fetch(
        `${process.env.REACT_APP_API_URL}pledges/${pledge}`,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          }, 
        },console.log('pledge deleted')        
      )
    } catch (error) {
      alert("Network error", error.message)
    }
    window.location.reload();
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
// while the data is loading, return  Loading instead of the eventData
  if (eventData.loading) {
    return <ReactLoading type={"spinningBubbles"} color={"#CBCF06"} className="spinner" />
  }
  const EditOptions = () => {
    return (
      <div>
        <Link to={`/events/${slug}/edit`} className={"button"}>
          Edit your event
        </Link>
        <Link className={"button"} to="/"
          onClick={deleteEvent}
          >Delete it
          </Link>
      </div>
    )
  }
  return (
    <div>
      <h1>{eventData.title}</h1>
      
      <div className="content">
        <div className="content__img">
          <img src={eventData.image} alt="event" />
          <p className="content__category">Category {eventData.category}</p>
        </div>
        <div className="content__text">
          <p><strong>Goal:</strong> ${eventData.goal}</p>
          <p>Organised by {eventData.owner}</p>
          <p><strong>Event Date:</strong> {formatDate(eventData.date_created)}</p>
          <p><strong>Location:</strong> {eventData.region}</p>
          <p><strong>Description: </strong>{eventData.description}</p>
        </div>
    </div>
    <div className="form">
    {eventData.pledges.length !== 0 ? <h2>Pledges:</h2> : "" }
    
    <ul>
      {eventData.pledges.map((pledgeData) => {
        return (
          <div key={pledgeData.id}>
            ${pledgeData.amount} from {pledgeData.supporter} {pledgeData.comment? `who said "${pledgeData.comment}"` : null}
            {pledgeData.supporter === owner ? <button onClick={() => { deletePledge(pledgeData.id) }}>Delete your Pledge</button> : null}
          </div>
        )
      })}
    </ul>
    <p> <strong>Total pledges:</strong> ${totalAmount}</p>
    {!token ? <p><Link to="/login" className="button">Login</Link> <br/>to be able to pledge to this Event</p> : (eventData.owner !== owner ? <AddPledgeForm eventId={eventData.id}/> : null)}
          {eventData.owner === owner ? <EditOptions/>: null}</div>
      </div>
  )
}

export default EventPage

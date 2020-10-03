import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

function EventPage() {
  // with { pledges []} load data from the related field
  // add loading: true to create a tempory state which will be erase 
  // when the data is loaded because ther is no loading field
  const [eventData, setEventData] = useState({ pledges: [], loading: true })
  const { slug } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_API_URL}events/${slug}`
      )
      const data = await result.json()
      setEventData(data)
    }
    fetchData()
  }, [slug])

  const formatDate = (date) => {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }
      return new Date(date).toLocaleDateString([], options)
  }
// while the data is loading, return  Loading instead of the eventData
// make it pretty!
  if (eventData.loading) {
    return 'Loading!'
  }

  return (
    <div>
      <h1>{eventData.title}</h1>
      <p>Category {eventData.category}</p>
      <img src={eventData.image} alt="event" />
      <h3>Created on {formatDate(eventData.date_created)}</h3>
      <h3>{`Active:  ${eventData.is_open}`}</h3>
      <h3>Take place in {eventData.region}</h3>
      <h3>Pledges:</h3>
      <ul>
        {eventData.pledges.map((pledgeData, key) => {
          return (
            <li>
              ${pledgeData.amount} from {pledgeData.supporter}
            </li>
          )
        })}
      </ul>
      <p> Total of :</p>
    </div>
  )
}

export default EventPage

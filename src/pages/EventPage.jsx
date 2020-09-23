import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
// import { oneEvent } from "../data";

function EventPage() {
  const[eventData, setEventData] = useState({ pledges: []})
  const {slug} = useParams();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}events/${slug}`)
    .then((results) => {
      return results.json();
    })
    .then((data) => {
      setEventData(data);
    });
  }, []);
  return (
    <div>
      <h1>{eventData.title}</h1>
      <img src={eventData.image} alt="event" />
      <h3>Created at: {eventData.date_created}</h3>
      <h3>{`Status: ${eventData.is_open}`}</h3>
      <h3>Pledges:</h3>
      <ul>
        {eventData.pledges.map((pledgeData, key) => {
          return (
            <li>
              ${pledgeData.amount} from {pledgeData.supporter}
            </li>
          );
        })}
      </ul>
      <p> Total of :</p>
    </div>
  );
}

export default EventPage;

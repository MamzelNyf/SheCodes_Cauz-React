import React from "react";
import { Link } from "react-router-dom";
import "./EventCard.css";

function EventCard({eventData, ...props}) {

  return (
    <div className="event-card">
      <Link to={`/events/${eventData.slug}`}>
      <img src={eventData.image} alt="event"/>
      <h3>{eventData.title}</h3>
      <p>Created by {eventData.owner}</p>
      </Link>
    </div>
  );
}

export default EventCard
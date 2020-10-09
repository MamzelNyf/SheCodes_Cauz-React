import React from "react";
import { Link } from "react-router-dom";
import "./EventCard.css";

function EventCard({eventData, ...props}) {

  return (
    <div className="event-card">
      <Link to={`/events/${eventData.slug}`}>
      <img src={eventData.image} alt="event"/>
      <h2>{eventData.title}</h2>
      <p>Created by{eventData.owner}</p>
      </Link>
    </div>
  );
}

export default EventCard
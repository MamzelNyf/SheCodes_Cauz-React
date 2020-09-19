import React from "react";
import { Link } from "react-router-dom";
import "./EventCard.css";

function EventCard(props) {
  const { eventData } = props;
  return (
    <div className="event-card">
      <Link to="/event">
        <img src={eventData.image} alt="event" />
        <h3>{eventData.title}</h3>
      </Link>
    </div>
  );
}

export default EventCard;

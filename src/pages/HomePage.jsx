import React from "react";
import { allEvents } from "../data";

import EventCard from "../components/EventCard/EventCard";

function HomePage() {
  return (
    <div>
      <h1>This is the HomePage</h1>
      <div id="project-list">
        {allEvents.map((eventData, key) => {
          return (
            <EventCard key={key} eventData={eventData}>
              {eventData.title}
            </EventCard>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;

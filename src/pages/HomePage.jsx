import React, { useState, useEffect } from "react";
import ReactLoading from 'react-loading';
// import { allEvents } from "../data";

import EventCard from "../components/EventCard/EventCard";

function HomePage() {
  // variables
  const [eventList, setEventList] = useState ({loading: true})

  // methods: useEffect render when the app render, the bracket while have the condition for the useEffect to rerender when app change
  useEffect(() => {
    // setEventList(allEvents) use the local data
    fetch(`${process.env.REACT_APP_API_URL}events/`)
    .then((results) => {
      return results.json();
    })
    .then((data) => {
      setEventList(data);
    });
  }, [eventList]);

  if (eventList.loading) {
    return <ReactLoading className="spinner" type={"spinningBubbles"} color={"#CBCF06"}  />
  }

  return (
    <div>
      <h1>Welcome to Cauz</h1>
      <p className="intro__text">Cauz is a nonprofit website with a mission to organise financial access in order to help funding NFP events through the direct support of others</p>
      <h2>Find here the latest events available and pledge to your favorite:</h2>
      <div id="project-list">
        {eventList.map((eventData, key) => {
          return (
            <EventCard key={key} eventData={eventData}/>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;

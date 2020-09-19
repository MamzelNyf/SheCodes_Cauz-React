import React from "react";
import { oneEvent } from "../data";

function EventPage() {
  return (
    <div>
      <h1>{oneEvent.title}</h1>
      <h3>Created at: {oneEvent.date_created}</h3>
      <h3>{`Status: ${oneEvent.is_open}`}</h3>
      <h3>Pledges:</h3>
      <ul>
        {oneEvent.pledges.map((pledgeData, key) => {
          return (
            <li>
              {pledgeData.amount} from {pledgeData.supporter}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default EventPage;

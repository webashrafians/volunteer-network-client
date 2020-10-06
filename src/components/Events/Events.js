import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import Event from "../Event/Event";
import Header from "../Header/Header";

const Events = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [eventFields, setEventFields] = useState([]);
  useEffect(() => {
    fetch(
      `https://frozen-escarpment-01034.herokuapp.com/getEvents?email=${loggedInUser.email}`
    )
      .then(res => res.json())
      .then(events => setEventFields(events));
  }, []);

  // cancel event from the database and ui ..........

  const cancelHandler = id => {
    const remainingEvents = eventFields.filter(items => items._id !== id);
    fetch(`https://frozen-escarpment-01034.herokuapp.com/delete/${id}`, {
      method: "DELETE",
    })
      .then(res => {
        res.json();
      })
      .then(data => {
        console.log("Event Delete Successfully");
        setEventFields(remainingEvents);
      });
  };
  return (
    <div
      className=''
      style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <Header />
      <div className='row' style={{ padding: "4rem" }}>
        {eventFields.map(event => (
          <Event key={event._id} event={event} cancelHandler={cancelHandler} />
        ))}
      </div>
    </div>
  );
};

export default Events;
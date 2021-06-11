import React from "react";
import "./style.scss";

const EventLink = ({ title, style = {}, onClick }) => {
  return (
    <div className="event-link" style={{ ...style }} onClick={onClick}>
      <p className="event-link-title">{title}</p>
    </div>
  );
};

export default EventLink;

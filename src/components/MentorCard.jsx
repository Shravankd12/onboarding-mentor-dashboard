import React from "react";
import "./MentorCard.css";

const MentorCard = ({ name, role, image }) => {
  return (
    <div className="mentor-card">
      <div className="mentor-image-wrapper">
        <img src={image} alt={name} className="mentor-image" />
      </div>
      <h3 className="mentor-name">{name}</h3>
      <p className="mentor-role">{role}</p>
      <button className="mentor-button">Connect</button>
    </div>
  );
};

export default MentorCard;

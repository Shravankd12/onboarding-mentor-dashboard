import React from "react";
import "./InfoPage.css";

const InfoPage = () => {
  return (
    <div className="info-page">
      <h1>My Info</h1>
      <p className="info-subtitle">View your profile details.</p>

      {/* Info Section */}
      <div className="info-section">
        <div className="info-card">
          <div className="profile-pic">
          <img
  src="https://static.thenounproject.com/png/user-avatar-icon-590434-512.png"
  alt="User Avatar"
/>
          </div>
          <div className="profile-info">
            <p><strong>Full Name:</strong> Shravan Rajpurohit</p>
            <p><strong>Email:</strong> Shravankd12@email.com</p>
            <p><strong>Role:</strong> Software Engineer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;

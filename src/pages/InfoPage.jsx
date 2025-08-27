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
            <img src="/assets/user-avatar.png" alt="User Avatar" />
          </div>
          <div className="profile-info">
            <p><strong>Full Name:</strong> John Doe</p>
            <p><strong>Email:</strong> johndoe@email.com</p>
            <p><strong>Role:</strong> Sales Intern</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;

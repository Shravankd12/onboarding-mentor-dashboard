import React from "react";
import { FiArrowRight } from "react-icons/fi";
import "./WelcomeBanner.css";

const WelcomeBanner = ({ overallProgress }) => {
  return (
    <div className="welcome-banner">
      <div className="welcome-left">
        <h1>Welcome back, Shravan Rajpurohit!</h1>
        <p>
          You&apos;ve completed <span>{overallProgress}%</span> of your onboarding journey.
          Keep up the good work!
        </p>
        <button className="continue-btn">
          Continue Learning <FiArrowRight className="arrow-icon" />
        </button>
      </div>

      <img
        src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        alt="Onboarding illustration"
        className="welcome-img"
      />
    </div>
  );
};

export default WelcomeBanner;

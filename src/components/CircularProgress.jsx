import React from "react";
import "./CircularProgress.css";

const CircularProgress = ({ percentage }) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="progress-container">
      <svg className="progress-ring" viewBox="0 0 150 150">
        <circle
          className="progress-ring-bg"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="75"
          cy="75"
        />
        <circle
          className="progress-ring-bar"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="75"
          cy="75"
          style={{
            transition: "stroke-dashoffset 0.5s ease",
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />
      </svg>
      <div className="progress-labels">
        <span className="progress-value">{percentage}%</span>
        <span className="progress-subtext">Complete</span>
      </div>
    </div>
  );
};

export default CircularProgress;


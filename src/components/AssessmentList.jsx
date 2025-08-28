import React, { useState, useEffect } from "react";
import { CalendarIcon, Clock3Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./AssessmentList.css";

export const AssessmentList = () => {
  const [assessments, setAssessments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("assessments");
    if (saved) {
      setAssessments(JSON.parse(saved));
    }
  }, []);

  const handleContinue = (id) => {
    // Save selected assessment id so Assessments page knows which one to open
    localStorage.setItem("activeAssessmentId", id);
    navigate("/assessments");
  };

  return (
    <div className="assessment-container">
      <div className="assessment-list">
        {assessments.map((a) => (
          <div key={a.id} className="assessment-card">
            <div className="assessment-header">
              <h4 className="assessment-title">{a.title}</h4>
              <span className="assessment-type">{a.type || "quiz"}</span>
            </div>

            <div className="assessment-meta">
              <CalendarIcon size={14} className="meta-icon" />
              <span>Due: {a.due}</span>
              <div className="meta-divider"></div>
              <Clock3Icon size={14} className="meta-icon" />
              <span>{a.timeEstimate || "15 min"}</span>
            </div>

            {/* ✅ Always show Continue, never disable here */}
            <button
              className="assessment-btn"
              onClick={() => handleContinue(a.id)}
            >
              Continue
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

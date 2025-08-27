import React from "react";
import { CalendarIcon, Clock3Icon } from "lucide-react";
import "./AssessmentList.css";

export const AssessmentList = () => {
  const assessments = [
    {
      id: 1,
      title: "Product Knowledge Quiz",
      dueDate: "Jun 12, 2023",
      timeEstimate: "15 min",
      type: "quiz",
    },
    {
      id: 2,
      title: "Communication Skills Assessment",
      dueDate: "Jun 15, 2023",
      timeEstimate: "30 min",
      type: "assessment",
    },
    {
      id: 3,
      title: "Technical Foundations Evaluation",
      dueDate: "Jun 20, 2023",
      timeEstimate: "45 min",
      type: "evaluation",
    },
  ];

  return (
    <div className="assessment-container">
      <div className="assessment-list">
        {assessments.map((assessment) => (
          <div key={assessment.id} className="assessment-card">
            <div className="assessment-header">
              <h4 className="assessment-title">{assessment.title}</h4>
              <span className="assessment-type">{assessment.type}</span>
            </div>
            <div className="assessment-meta">
              <CalendarIcon size={14} className="meta-icon" />
              <span>Due: {assessment.dueDate}</span>
              <div className="meta-divider"></div>
              <Clock3Icon size={14} className="meta-icon" />
              <span>{assessment.timeEstimate}</span>
            </div>
            <button className="assessment-btn">Start Assessment</button>
          </div>
        ))}
      </div>
    </div>
  );
};

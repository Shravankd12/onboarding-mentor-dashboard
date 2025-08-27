import React, { useEffect, useState } from "react";
import "./ProgressAnalytics.css";

const ProgressAnalytics = () => {
  const [learningProgress, setLearningProgress] = useState(0);
  const [assessProgress, setAssessProgress] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [completedTests, setCompletedTests] = useState(0);

  useEffect(() => {
    // 🔹 Load Learning Modules
    const storedModules = JSON.parse(localStorage.getItem("learningModules"));
    if (storedModules) {
      const total = [
        ...storedModules.assigned,
        ...storedModules.inProgress,
        ...storedModules.completed,
      ].length;
      const completed = storedModules.completed.length;
      const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
      setLearningProgress(percent);
    }

    // 🔹 Load Assessments
    const storedAssess = JSON.parse(localStorage.getItem("assessments"));
    if (storedAssess) {
      const total = storedAssess.length;
      const completed = storedAssess.filter((a) => a.status === "completed");
      const percent = total > 0 ? Math.round((completed.length / total) * 100) : 0;
      setAssessProgress(percent);

      if (completed.length > 0) {
        const scores = completed.map((c) => c.score || 0);
        const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
        const best = Math.max(...scores);

        setAverageScore(avg);
        setBestScore(best);
        setCompletedTests(completed.length);
      }
    }
  }, []);

  const overall = Math.round((learningProgress + assessProgress) / 2);

  return (
    <div className="progress-analytics">
      {/* Header */}
      <div className="analytics-banner">
        <div>
          <h1>Your Progress & Analytics</h1>
          <p>Track your learning journey and performance growth over time.</p>
        </div>
        <img
          src="/assets/analytics-illustration.png"
          alt="Analytics Illustration"
          className="analytics-banner-img"
        />
      </div>

      {/* Overall Progress */}
      <div className="analytics-section">
        <h2>Overall Progress</h2>
        <div className="progress-summary">
          <div className="progress-bar">
            <label>Learning Modules</label>
            <div className="bar">
              <div className="fill" style={{ width: `${learningProgress}%` }}></div>
            </div>
            <span>{learningProgress}% Completed</span>
          </div>
          <div className="progress-bar">
            <label>Assessments</label>
            <div className="bar">
              <div className="fill green" style={{ width: `${assessProgress}%` }}></div>
            </div>
            <span>{assessProgress}% Completed</span>
          </div>
          <div className="progress-bar">
            <label>Overall Journey</label>
            <div className="bar">
              <div className="fill purple" style={{ width: `${overall}%` }}></div>
            </div>
            <span>{overall}% Completed</span>
          </div>
        </div>
      </div>

      {/* Assessment Performance */}
      <div className="analytics-section">
        <h2>Assessment Performance</h2>
        <div className="assessment-cards">
          <div className="assessment-card">
            <h3>Average Score</h3>
            <p className="score">{averageScore}%</p>
          </div>
          <div className="assessment-card">
            <h3>Best Score</h3>
            <p className="score green">{bestScore}%</p>
          </div>
          <div className="assessment-card">
            <h3>Completed Tests</h3>
            <p className="score purple">{completedTests}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressAnalytics;

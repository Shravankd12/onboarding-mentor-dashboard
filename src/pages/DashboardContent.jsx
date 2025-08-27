import React, { useState } from "react";
import WelcomeBanner from "../components/WelcomeBanner.jsx";
import CircularProgress from "../components/CircularProgress.jsx";
import { AchievementBadges } from "../components/AchievementBadges.jsx";
import { ModuleList } from "../components/ModuleList.jsx";
import { AssessmentList } from "../components/AssessmentList.jsx";
import FeedbackCard from "../components/FeedbackCard.jsx";
import ProgressAnalytics from "../pages/ProgressAnalytics.jsx"; // ✅ import added
import "./DashboardContent.css";

export const DashboardContent = () => {
  const [overallProgress, setOverallProgress] = useState(0);

  return (
    <div className="dashboard-content">
      {/* ✅ Banner now gets live overall progress */}
      <WelcomeBanner overallProgress={overallProgress} />

      <div className="dashboard-grid">
        {/* Left column */}
        <div className="left-column">
          <div className="two-cards">
            <div className="card">
              <h3 className="card-title">Onboarding Progress</h3>
              <div className="progress-wrapper">
                <CircularProgress percentage={overallProgress} />
              </div>
            </div>

            <div className="card">
              <h3 className="card-title">Achievements</h3>
              <div className="mt-4">
                <AchievementBadges />
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="card-title mb-4">Assigned Modules</h3>
            <ModuleList />
          </div>
        </div>

        {/* Right column */}
        <div className="right-column">
          <div className="card">
            <h3 className="card-title mb-4">Upcoming Assessments</h3>
            <AssessmentList />
          </div>
          <FeedbackCard />
        </div>
      </div>

      {/* ✅ Mount ProgressAnalytics but hidden or placed in a section */}
      <div style={{ display: "none" }}>
        <ProgressAnalytics onOverallChange={setOverallProgress} />
      </div>
    </div>
  );
};

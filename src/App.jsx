import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar.jsx";
import Topbar from "./components/Topbar.jsx";
import { DashboardContent } from "./pages/DashboardContent.jsx";
import LearningModules from "./pages/LearningModules.jsx"; // ✅ new page
import FloatingChatbot from "./components/FloatingChatbot.jsx";
import Assessments from "./pages/Assessments.jsx";
import ProgressAnalytics from "./pages/ProgressAnalytics.jsx";
import InfoPage from "./pages/InfoPage.jsx";
import "./App.css";

export function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-container">
          <Topbar />
          <Routes>
            <Route path="/" element={<DashboardContent />} />
            <Route path="/learning-modules" element={<LearningModules />} />
            <Route path="/assessments" element={<Assessments />} />
            <Route path="/progress" element={<ProgressAnalytics />} />
            <Route path="/info-page" element={<InfoPage />} />

          </Routes>
        </div>
        <FloatingChatbot />
      </div>
    </Router>
  );
}

export default App;

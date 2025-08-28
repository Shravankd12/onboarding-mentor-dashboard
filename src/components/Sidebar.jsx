import React from "react";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardCheck,
  BarChart2,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom"; // ✅ use NavLink
import "./Sidebar.css";

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-header">
        <div className="logo-icon">M</div>
        <span className="logo-text">MentorMatch</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <ul>
          <NavItem to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <NavItem to="/learning-modules" icon={<BookOpen size={20} />} label="Learning Modules" />
          <NavItem to="/assessments" icon={<ClipboardCheck size={20} />} label="Assessments" />
          <NavItem to="/progress" icon={<BarChart2 size={20} />} label="Progress & Analytics" />
          <NavItem to="/info-page" icon={<Settings size={20} />} label="Info Page" />
        </ul>
      </nav>

      {/* Profile */}
      <div className="sidebar-profile">
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=80&h=80&q=80"
          alt="Profile"
          className="profile-img"
        />
        <div className="profile-info">
          <p className="profile-name">Shravan Rajpurohit</p>
          <p className="profile-role">New Mentee</p>
        </div>
        <button className="logout-btn">
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
};

const NavItem = ({ to, icon, label }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
    >
      <span className="nav-icon">{icon}</span>
      <span>{label}</span>
    </NavLink>
  </li>
);

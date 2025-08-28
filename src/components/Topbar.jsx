import React from "react";
import "./TopBar.css";
import { FiSearch, FiBell, FiHelpCircle } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

const TopBar = () => {
  return (
    <div className="topbar">
      {/* Search Box */}
      <div className="search-container">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search for modules, resources..."
          className="search-input"
        />
      </div>

      {/* Right Side Icons */}
      <div className="topbar-right">
        <div className="icon-container">
          <FiBell />
          <span className="notification-dot"></span>
        </div>
        <FiHelpCircle className="icon" />
        <FaUserCircle className="icon profile-icon" />
        <span className="username">Shravan Rajpurohit</span>
      </div>
    </div>
  );
};

export default TopBar;

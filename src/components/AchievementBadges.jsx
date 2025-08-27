import React from "react";
import { AwardIcon, BookIcon, ZapIcon } from "lucide-react";
import "./AchievementBadges.css";

export const AchievementBadges = () => {
  return (
    <div className="achievement-badges">
      <Badge
        icon={<BookIcon size={24} />}
        label="First Module"
        color="badge-blue"
        earned={true}
      />
      <Badge
        icon={<ZapIcon size={24} />}
        label="Quick Learner"
        color="badge-amber"
        earned={true}
      />
      <Badge
        icon={<AwardIcon size={24} />}
        label="Assessment Ace"
        color="badge-gray"
        earned={false}
      />
    </div>
  );
};

const Badge = ({ icon, label, color, earned }) => {
  return (
    <div className="badge-container">
      <div className={`badge-circle ${earned ? color : "badge-disabled"}`}>
        <div className={earned ? "" : "badge-icon-disabled"}>{icon}</div>
      </div>
      <span className={`badge-label ${earned ? "" : "badge-label-disabled"}`}>
        {label}
      </span>
    </div>
  );
};

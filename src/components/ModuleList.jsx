import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  CheckCircleIcon,
  Clock3Icon
} from "lucide-react"
import styles from "./ModuleList.module.css"

export const ModuleList = () => {
  const [modules, setModules] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const stored = localStorage.getItem("learningModules")
    if (stored) {
      const parsed = JSON.parse(stored)
      // Flatten all sections into one list
      const merged = [
        ...parsed.assigned.map((m) => ({ ...m, status: "not-started" })),
        ...parsed.inProgress.map((m) => ({ ...m, status: "in-progress" })),
        ...parsed.completed.map((m) => ({ ...m, status: "completed" })),
      ]
      setModules(merged)
    }
  }, [])

  const handleModuleAction = (module) => {
    // Navigate to LearningModules and pass selected module id
    navigate("/learning-modules", { state: { moduleId: module.id } })
  }

  return (
    <div className={styles.modulesGrid}>
      {modules.map((module) => (
        <ModuleCard
          key={module.id}
          module={module}
          onAction={() => handleModuleAction(module)}
        />
      ))}
    </div>
  )
}

const ModuleCard = ({ module, onAction }) => {
  const [isHovered, setIsHovered] = useState(false)

  const statusInfo = {
    completed: {
      icon: <CheckCircleIcon size={16} className="text-green-500" />,
      text: "Completed",
      textColorClass: styles.statusCompleted,
      actionLabel: "Review",
    },
    "in-progress": {
      icon: <Clock3Icon size={16} className="text-blue-500" />,
      text: "In Progress",
      textColorClass: styles.statusInProgress,
      actionLabel: "Continue",
    },
    "not-started": {
      icon: <Clock3Icon size={16} className="text-gray-400" />,
      text: "Not Started",
      textColorClass: styles.statusNotStarted,
      actionLabel: "Start",
    },
  }

  const info = statusInfo[module.status]
const randomImage = `https://picsum.photos/seed/${module.id}/400/250`;

return (
  <div
    className={styles.moduleCard}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    <img
      src={module.image || randomImage}
      alt={module.title}
      className={styles.moduleImage}
    />
    <div className={styles.moduleContent}>
      <div className={styles.moduleHeader}>
        <h4 className={styles.moduleTitle}>{module.title}</h4>
        <div className={styles.moduleStatus}>
          {info.icon}
          <span className={`${styles.statusText} ${info.textColorClass}`}>
            {info.text}
          </span>
        </div>
      </div>
      <p className={styles.moduleDescription}>
        {module.desc || module.description}
      </p>
      <div className={styles.moduleFooter}>
        {module.status !== "completed" && (
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${module.progress || 0}%` }}
            ></div>
          </div>
        )}
        <button onClick={onAction} className={styles.actionButton}>
          <span>{info.actionLabel}</span>
        </button>
      </div>
    </div>
  </div>
)
}
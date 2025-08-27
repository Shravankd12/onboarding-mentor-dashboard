// ModuleList.jsx
import React, { useState } from "react"
import {
  CheckCircleIcon,
  Clock3Icon,
  PlayCircleIcon,
  PauseCircleIcon,
} from "lucide-react"
import styles from "./ModuleList.module.css"
export const ModuleList = () => {
  const [modules, setModules] = useState([
    {
      id: 1,
      title: 'Company Culture & Values',
      description:
        "Learn about our organization's core principles and work environment.",
      progress: 100,
      status: 'completed',
      image:
        'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 2,
      title: 'Product Knowledge Basics',
      description: 'Understand the key features and benefits of our products.',
      progress: 65,
      status: 'in-progress',
      image:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 3,
      title: 'Communication Skills',
      description:
        'Develop effective communication techniques for client interactions.',
      progress: 0,
      status: 'not-started',
      image:
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 4,
      title: 'Technical Foundations',
      description: 'Master the technical aspects required for your role.',
      progress: 0,
      status: 'not-started',
      image:
        'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    },
  ])

  const handleModuleAction = (id, action) => {
    setModules((prevModules) =>
      prevModules.map((module) => {
        if (module.id !== id) return module
        switch (action) {
          case 'start':
            return { ...module, status: 'in-progress', progress: 5 }
          case 'continue':
            const newProgress = Math.min(module.progress + 15, 100)
            return {
              ...module,
              progress: newProgress,
              status: newProgress === 100 ? 'completed' : 'in-progress',
            }
          default:
            return module
        }
      }),
    )
  }

  return (
    <div className={styles.modulesGrid}>
      {modules.map((module) => (
        <ModuleCard
          key={module.id}
          module={module}
          onAction={(action) => handleModuleAction(module.id, action)}
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
      text: 'Completed',
      textColorClass: styles.statusCompleted,
      actionLabel: 'Review',
      actionIcon: <PlayCircleIcon size={16} />,
      action: 'review',
    },
    'in-progress': {
      icon: <Clock3Icon size={16} className="text-blue-500" />,
      text: 'In Progress',
      textColorClass: styles.statusInProgress,
      actionLabel: 'Continue',
      actionIcon: <PlayCircleIcon size={16} />,
      action: 'continue',
    },
    'not-started': {
      icon: <Clock3Icon size={16} className="text-gray-400" />,
      text: 'Not Started',
      textColorClass: styles.statusNotStarted,
      actionLabel: 'Start',
      actionIcon: <PlayCircleIcon size={16} />,
      action: 'start',
    },
  }

  const info = statusInfo[module.status]

  return (
    <div
      className={styles.moduleCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={module.image} alt={module.title} className={styles.moduleImage} />
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
        <p className={styles.moduleDescription}>{module.description}</p>
        <div className={styles.moduleFooter}>
          {module.status !== 'completed' && (
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${module.progress}%` }}
              ></div>
            </div>
          )}
          <button onClick={() => onAction(info.action)} className={styles.actionButton}>
            {isHovered && module.status === 'in-progress' ? (
              <PauseCircleIcon size={16} className={styles.actionIcon} />
            ) : (
              <span className={styles.actionIcon}>{info.actionIcon}</span>
            )}
            <span>{info.actionLabel}</span>
          </button>
        </div>
      </div>
    </div>
  )
}



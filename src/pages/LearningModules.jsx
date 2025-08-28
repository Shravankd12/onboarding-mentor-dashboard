import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "./LearningModules.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const initialModules = {
  assigned: [
    {
      id: 1,
      title: "Product Knowledge Basics",
      desc: "Learn about core product knowledge essentials.",
      duration: "45 min",
      pdf: "/pdfs/product-basics.pdf",
    },
    {
      id: 2,
      title: "Customer Handling",
      desc: "Develop strategies to handle customer queries effectively.",
      duration: "40 min",
      pdf: "/pdfs/product-basics.pdf",
    },
    {
      id: 3,
      title: "Team Collaboration",
      desc: "Enhance your ability to work in collaborative environments.",
      duration: "50 min",
      pdf: "/pdfs/product-basics.pdf",
    },
  ],
  inProgress: [],
  completed: [
    {
      id: 7,
      title: "Company Culture & Values",
      desc: "Understand our mission, vision, and values.",
      duration: "25 min",
      progress: 100,
      pdf: "/pdfs/product-basics.pdf",
    },
  ],
};

const LearningModules = () => {
  // ✅ Load from localStorage or fallback to initial data
  const [modules, setModules] = useState(() => {
    const stored = localStorage.getItem("learningModules");
    return stored ? JSON.parse(stored) : initialModules;
  });

  const [moduleProgress, setModuleProgress] = useState(() => {
    const stored = localStorage.getItem("moduleProgress");
    return stored ? JSON.parse(stored) : {};
  });

  const [selectedModule, setSelectedModule] = useState(null);
  const [numPages, setNumPages] = useState(null);

  // ✅ Persist changes to localStorage
  useEffect(() => {
    localStorage.setItem("learningModules", JSON.stringify(modules));
  }, [modules]);

  useEffect(() => {
    localStorage.setItem("moduleProgress", JSON.stringify(moduleProgress));
  }, [moduleProgress]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // ✅ Handle progress update when page changes
  const handlePageChange = (module, newPage) => {
    setModuleProgress((prev) => {
      const updated = { ...prev, [module.id]: newPage };

      // Calculate percentage progress
      const progress = Math.round((newPage / numPages) * 100);

      setModules((prevModules) => {
        let updatedAssigned = prevModules.assigned;
        let updatedInProgress = prevModules.inProgress;

        if (progress > 0) {
          if (updatedAssigned.find((m) => m.id === module.id)) {
            updatedAssigned = updatedAssigned.filter((m) => m.id !== module.id);
            updatedInProgress = [...updatedInProgress, { ...module, progress }];
          } else {
            updatedInProgress = updatedInProgress.map((m) =>
              m.id === module.id ? { ...m, progress } : m
            );
          }
        }

        return {
          assigned: updatedAssigned,
          inProgress: updatedInProgress,
          completed: prevModules.completed,
        };
      });

      return updated;
    });
  };

  // ✅ Mark as completed only on button click
  const handleComplete = (module) => {
    setModules((prev) => {
      const updatedInProgress = prev.inProgress.filter((m) => m.id !== module.id);

      return {
        assigned: prev.assigned,
        inProgress: updatedInProgress,
        completed: [...prev.completed, { ...module, progress: 100 }],
      };
    });
    setSelectedModule(null);
  };

  return (
    <div className="learning-modules">
      <div className="lm-banner">
        <div>
          <h1>Your Learning Modules</h1>
          <p>Track your progress and continue your journey!</p>
        </div>
        <img
          src="/assets/online-certification-illustration.avif"
          alt="Learning Illustration"
          className="lm-banner-img"
        />
      </div>

      {["assigned", "inProgress", "completed"].map((section) => (
        <div className="lm-section" key={section}>
          <h2>
            {section === "inProgress"
              ? "In Progress Modules"
              : section === "assigned"
              ? "Assigned Modules"
              : "Completed Modules"}
          </h2>
          <div className="lm-cards">
            {modules[section].map((mod) => (
              <div className="lm-card" key={mod.id}>
                <h3>{mod.title}</h3>
                <p>{mod.desc}</p>
                <div className="lm-progress">
                  <div
                    className="lm-progress-fill"
                    style={{ width: `${mod.progress || 0}%` }}
                  ></div>
                </div>
                <span
                  className={`lm-status ${
                    mod.progress === 100
                      ? "green"
                      : mod.progress > 0
                      ? "yellow"
                      : "gray"
                  }`}
                >
                  {mod.progress === 100
                    ? "Completed"
                    : mod.progress > 0
                    ? "In Progress"
                    : "Not Started"}
                </span>
                <p className="lm-duration">{mod.duration}</p>
                <button
                  className="lm-btn"
                  disabled={mod.progress === 100}
                  onClick={() => setSelectedModule(mod)}
                >
                  {mod.progress === 100
                    ? "Completed"
                    : mod.progress > 0
                    ? "Continue Module"
                    : "Start Module"}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {selectedModule && (
        <div className="pdf-modal">
          <div className="pdf-content">
            <h2>{selectedModule.title}</h2>
            <button
              className="close-btn"
              onClick={() => setSelectedModule(null)}
            >
              X
            </button>

            <div className="pdf-viewer">
              <Document
                file={selectedModule.pdf}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page
                  pageNumber={moduleProgress[selectedModule.id] || 1}
                  width={500}
                />
              </Document>
            </div>

            <div className="pdf-controls">
              <button
                disabled={(moduleProgress[selectedModule.id] || 1) <= 1}
                onClick={() =>
                  handlePageChange(
                    selectedModule,
                    (moduleProgress[selectedModule.id] || 1) - 1
                  )
                }
              >
                Prev
              </button>

              <span>
                Page {moduleProgress[selectedModule.id] || 1} of {numPages}
              </span>

              {moduleProgress[selectedModule.id] === numPages ? (
                <button onClick={() => handleComplete(selectedModule)}>
                  Mark as Complete
                </button>
              ) : (
                <button
                  onClick={() => {
                    const nextPage =
                      (moduleProgress[selectedModule.id] || 1) + 1;
                    handlePageChange(selectedModule, nextPage);
                  }}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningModules;

import React, { useState, useEffect } from "react";
import "./Assessments.css";

const initialAssessments = [
  {
    id: 1,
    title: "Customer Interaction Test",
    desc: "Case-based assessment on handling customer queries.",
    due: "25 Aug 2025",
    status: "ongoing",
    score: null,
  },
  {
    id: 2,
    title: "Communication Skills Quiz",
    desc: "MCQ-based quiz to evaluate your communication skills.",
    due: "27 Aug 2025",
    status: "ongoing",
    score: null,
  },
  {
    id: 3,
    title: "Sales Knowledge Test",
    desc: "Evaluate your product and sales process knowledge.",
    due: "28 Aug 2025",
    status: "ongoing",
    score: null,
  },
  {
    id: 4,
    title: "Leadership Quiz",
    desc: "Quick quiz on leadership styles and practices.",
    due: "02 Sep 2025",
    status: "ongoing",
    score: null,
  },
];

// 🔹 Question Bank
const questionBank = {
  1: [
    { q: "Best way to handle angry customer?", options: ["Ignore", "Listen calmly", "Shout back", "Transfer immediately"], answer: "Listen calmly" },
    { q: "First step in handling queries?", options: ["Empathy", "Data entry", "Close ticket", "Escalate"], answer: "Empathy" },
    { q: "What should you NOT do?", options: ["Interrupt", "Listen", "Acknowledge", "Clarify"], answer: "Interrupt" },
    { q: "Tone of voice matters?", options: ["Yes", "No"], answer: "Yes" },
    { q: "Customer feedback is useful for?", options: ["Improvement", "Ignore", "Waste", "None"], answer: "Improvement" },
    { q: "Follow-up should be?", options: ["Immediate", "Delayed", "Never", "Only if asked"], answer: "Immediate" },
    { q: "Best conflict resolution?", options: ["Argue", "Negotiate", "Avoid", "Blame"], answer: "Negotiate" },
    { q: "Body language matters?", options: ["Yes", "No"], answer: "Yes" },
    { q: "Key skill for support?", options: ["Empathy", "Rudeness", "Silence", "Avoidance"], answer: "Empathy" },
    { q: "Resolution time should be?", options: ["Fast", "Slow", "Irrelevant", "Customer decides"], answer: "Fast" },
  ],
  2: [
    { q: "Which is active listening?", options: ["Interrupting", "Nodding", "Talking over", "Ignoring"], answer: "Nodding" },
    { q: "Best way to improve vocabulary?", options: ["Reading", "Sleeping", "Shouting", "Guessing"], answer: "Reading" },
    { q: "Eye contact shows?", options: ["Confidence", "Fear", "Disinterest", "Anger"], answer: "Confidence" },
    { q: "Email should be?", options: ["Clear", "Confusing", "Aggressive", "Unstructured"], answer: "Clear" },
    { q: "Tone in professional talk?", options: ["Respectful", "Casual slang", "Shouting", "Mumbling"], answer: "Respectful" },
    { q: "Best way to give feedback?", options: ["Constructive", "Rude", "Silent", "Avoid"], answer: "Constructive" },
    { q: "Listening skill includes?", options: ["Attention", "Daydreaming", "Interrupting", "Ignoring"], answer: "Attention" },
    { q: "Public speaking improves by?", options: ["Practice", "Avoiding", "Hiding", "Whispering"], answer: "Practice" },
    { q: "Which is barrier to communication?", options: ["Noise", "Focus", "Clarity", "Listening"], answer: "Noise" },
    { q: "Best medium for urgent info?", options: ["Email", "Call", "Letter", "Report"], answer: "Call" },
  ],
  3: [
    { q: "First step in sales?", options: ["Prospecting", "Closing", "Discounts", "Ignore"], answer: "Prospecting" },
    { q: "Customer objection means?", options: ["Interest", "No chance", "Ignore", "Anger"], answer: "Interest" },
    { q: "Best pitch includes?", options: ["Benefits", "Features only", "Jargon", "None"], answer: "Benefits" },
    { q: "CRM helps in?", options: ["Managing leads", "Cooking", "Travel", "None"], answer: "Managing leads" },
    { q: "Follow-up importance?", options: ["Critical", "Not needed", "Annoying", "Ignore"], answer: "Critical" },
    { q: "Upselling means?", options: ["Higher product", "Discounts", "Ignore customer", "Cheap option"], answer: "Higher product" },
    { q: "Closing technique?", options: ["Ask for sale", "Avoid", "Run away", "Confuse"], answer: "Ask for sale" },
    { q: "Best listening skill?", options: ["Active", "Passive", "Rude", "None"], answer: "Active" },
    { q: "Key metric in sales?", options: ["Conversion rate", "Cooking", "Speed", "Random"], answer: "Conversion rate" },
    { q: "Trust builds by?", options: ["Honesty", "Lies", "Ignore", "Delay"], answer: "Honesty" },
  ],
  4: [
    { q: "Leadership style democratic means?", options: ["Team input", "Solo", "Autocratic", "Ignore"], answer: "Team input" },
    { q: "Good leader shows?", options: ["Vision", "Laziness", "Fear", "Anger"], answer: "Vision" },
    { q: "Delegation means?", options: ["Assign tasks", "Do all", "Ignore", "Micromanage"], answer: "Assign tasks" },
    { q: "Motivation builds?", options: ["Productivity", "Fear", "Chaos", "Laziness"], answer: "Productivity" },
    { q: "Conflict resolution is?", options: ["Mediation", "Fighting", "Ignoring", "Blaming"], answer: "Mediation" },
    { q: "Empathy in leader?", options: ["Yes", "No"], answer: "Yes" },
    { q: "Communication must be?", options: ["Clear", "Confusing", "Hidden", "Shouting"], answer: "Clear" },
    { q: "Inspiring team means?", options: ["Motivate", "Scare", "Ignore", "Mock"], answer: "Motivate" },
    { q: "Ethical leader shows?", options: ["Integrity", "Corruption", "Greed", "Fear"], answer: "Integrity" },
    { q: "Feedback from team?", options: ["Valuable", "Ignore", "Waste", "Harmful"], answer: "Valuable" },
  ],
};

const Assessments = () => {
  const [assessments, setAssessments] = useState(() => {
    const saved = localStorage.getItem("assessments");
    return saved ? JSON.parse(saved) : initialAssessments;
  });

  const [activeQuiz, setActiveQuiz] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);

  // 🔹 Save to localStorage whenever assessments update
  useEffect(() => {
    localStorage.setItem("assessments", JSON.stringify(assessments));
  }, [assessments]);

  // 🔹 Auto mark failed if past due
  useEffect(() => {
    const today = new Date();
    setAssessments((prev) =>
      prev.map((a) => {
        const dueDate = new Date(a.due);
        if (today > dueDate && a.status !== "completed") {
          return { ...a, status: "failed", score: 0 };
        }
        return a;
      })
    );
  }, []);

  const startQuiz = (assessment) => {
    setActiveQuiz(assessment);
    setShowQuiz(true);
  };

  const closeQuiz = () => {
    setActiveQuiz(null);
    setShowQuiz(false);
  };

  const completeQuiz = (id, score) => {
    setAssessments((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: score >= 70 ? "completed" : "ongoing", score }
          : a
      )
    );
  };

  return (
    <div className="assessments">
      <div className="assess-banner">
        <div>
          <h1>Your Assessments</h1>
          <p>Track your tests, quizzes, and evaluation scores.</p>
        </div>
<img
  src="/assets/book-line-art.jpg"
  alt="Learning Illustration"
  className="lm-banner-img"
/>

      </div>

      <Section
        title="Ongoing Assessments"
        items={assessments.filter((a) => a.status === "ongoing")}
        startQuiz={startQuiz}
      />

      <Section
        title="Completed Assessments"
        items={assessments.filter((a) => a.status === "completed")}
        completed
      />

      <Section
        title="Failed Assessments"
        items={assessments.filter((a) => a.status === "failed")}
        failed
      />

      {showQuiz && activeQuiz && (
        <QuizPopup
          assessment={activeQuiz}
          onClose={closeQuiz}
          onComplete={completeQuiz}
        />
      )}
    </div>
  );
};

const Section = ({ title, items, startQuiz, completed, failed }) => {
  if (items.length === 0) return null;
  const today = new Date();

  return (
    <div className="assess-section">
      <h2>{title}</h2>
      <div className="assess-cards">
        {items.map((a) => {
          const isLocked = today > new Date(a.due); // ✅ Lock only AFTER due date
          return (
            <div key={a.id} className="assess-card">
              <h3>{a.title}</h3>
              <p>{a.desc}</p>
              <p className="assess-due">Due: {a.due}</p>

              {failed ? (
                <span className="assess-status red">Failed</span>
              ) : completed ? (
                <span className="assess-status green">Score: {a.score}%</span>
              ) : (
                <span className="assess-status blue">Ongoing</span>
              )}

              {!completed && !failed && (
                <button
                  className="assess-btn"
                  onClick={() => startQuiz(a)}
                  disabled={isLocked}
                >
                  {isLocked ? "Locked" : "Start Now"}
                </button>
              )}

              {completed && (
                <button className="assess-btn" disabled>
                  Completed
                </button>
              )}

              {failed && (
                <button className="assess-btn" disabled>
                  Locked
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const QuizPopup = ({ assessment, onClose, onComplete }) => {
  const questions = questionBank[assessment.id];
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(null);

  const current = questions[index];

  const handleAnswer = (opt) => {
    if (opt === current.answer) setScore((s) => s + 1);
    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      const percent = Math.round(
        ((score + (opt === current.answer ? 1 : 0)) / questions.length) * 100
      );
      setFinalScore(percent);
      setFinished(true);
      onComplete(assessment.id, percent);
    }
  };

  const retryQuiz = () => {
    setIndex(0);
    setScore(0);
    setFinished(false);
    setFinalScore(null);
  };

  return (
    <div className="quiz-overlay">
      <div className="quiz-popup">
        <button className="quiz-close" onClick={onClose}>
          ✖
        </button>
        <h2>{assessment.title}</h2>

        {!finished ? (
          <>
            <p>
              Question {index + 1} of {questions.length}
            </p>
            <p>{current.q}</p>
            <div className="quiz-options">
              {current.options.map((opt, i) => (
                <button
                  key={i}
                  className="assess-btn"
                  onClick={() => handleAnswer(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="quiz-result">
            <h3>Your Score: {finalScore}%</h3>
            {finalScore >= 70 ? (
              <p className="pass">✅ Congratulations! You passed.</p>
            ) : (
              <>
                <p className="fail">❌ Score below 70%. Please retry.</p>
                <button className="assess-btn" onClick={retryQuiz}>
                  Retry Quiz
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Assessments;

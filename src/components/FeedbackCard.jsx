import React, { useState } from "react";
import { MessageSquareIcon } from "lucide-react";
import "./FeedbackCard.css";

const FeedbackCard = () => {
  const [showInput, setShowInput] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (feedback.trim() !== "") {
      setSubmitted(true);
    }
  };

  return (
    <div className="feedback-card">
      {submitted ? (
        <p className="thank-you">✅ Thank you for your valuable feedback!</p>
      ) : (
        <>
          <div className="feedback-header">
            <MessageSquareIcon size={20} className="feedback-icon" />
            <div>
              <h3 className="feedback-title">We Value Your Input</h3>
              <p className="feedback-text">
                How is your onboarding experience going? <br />
                Share your thoughts to help us improve.
              </p>
            </div>
          </div>

          {!showInput ? (
            <button
              className="feedback-btn"
              onClick={() => setShowInput(true)}
            >
              Provide Feedback
            </button>
          ) : (
            <div className="feedback-input-box">
              <textarea
                className="feedback-input"
                placeholder="Type your feedback here..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
              <button className="feedback-btn" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FeedbackCard;

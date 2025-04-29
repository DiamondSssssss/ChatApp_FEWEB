import React from "react";
import { useNavigate } from "react-router-dom"; // STEP 1
import "./GetStarted.scss";

const GetStarted = () => {
  const navigate = useNavigate(); // STEP 2

  const handleJoinNow = () => {
    navigate("/login"); // STEP 3
  };

  return (
    <div className="join-now-container">
      <div className="left-section">
        <h1>Join Now</h1>
        <span className="emoji">👇</span>
        <button className="get-started" onClick={handleJoinNow}>
          Get Started
        </button>
      </div>
      <div className="right-section">
        <img src="/join.png" alt="Illustration" />
      </div>
    </div>
  );
};

export default GetStarted;

import React from "react";
import "./GetStarted.scss";
const GetStarted = () => {
  return(
  <div className="join-now-container">
      <div className="left-section">
        <h1>Join Now</h1>
        <span className="emoji">👇</span>
        <button className="get-started">Get Started</button>
      </div>
      <div className="right-section">
        <img src="/join.png" alt="Illustration" />
      </div>
    </div>
  )
};

export default GetStarted;

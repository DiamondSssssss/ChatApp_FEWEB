import React from "react";
import "./Verification.scss";
const Verification = () => {
  return (
    <div className="verification-container">
      <div className="left-section">
        <button className="back-button">←</button>
        <h2>Enter your verification code</h2>
        <p>We have sent a verification code to</p>
        <p className="phone-number">+ 84 985 825 804</p>
        <div className="code-inputs">
          <div className="code-box"></div>
          <div className="code-box"></div>
          <div className="code-box"></div>
          <div className="code-box"></div>
        </div>
        <button className="continue-button">Continue</button>
        <p className="resend-text">
          Haven’t received the code? <span className="resend-code">Resend code</span>
        </p>
      </div>
      <div className="right-section">
        <img src="/join.png" alt="Illustration" />
      </div>
    </div>
  );
};

export default Verification;

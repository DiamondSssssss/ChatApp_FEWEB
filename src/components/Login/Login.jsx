import React, { useState } from "react";
import "./Login.scss";

const Login = () => {
  const [phone, setPhone] = useState("");

  return (
    <div className="phone-entry-container">
      {/* Left Section */}
      <div className="left-section">
        {/* Back Button */}
        <button className="back-button">⬅</button>

        {/* Title */}
        <h1>Enter your phone number</h1>

        {/* Phone Input */}
        <div className="input-container">
          <div className="country-code">
            <img src="/flag.png" alt="Vietnam Flag" />
            <span>+84</span>
          </div>
          <input
            type="text"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Continue Button */}
        <button className="continue-button">Continue</button>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <img src="/login.png" alt="Illustration" />
      </div>
    </div>
  );
};

export default Login;

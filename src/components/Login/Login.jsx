import React, { useState } from "react";
import "./Login.scss";
import { login } from "./../../services/auth.js";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await login(phone);
      console.log("Login response:", response);

      const { accessToken, refreshToken, message } = response || {};

      if (accessToken && refreshToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      }
      if (message) {
        setMessage(message);
        setIsError(false);
      } else {
        setMessage("Login failed: No message from server");
        setIsError(true);
      }

      if (message === "New user, please register username") {
        console.log("Redirect to username registration");
      }
    } catch (error) {
      console.error("Login failed", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Unknown error occurred";
      setMessage(errorMessage);
      setIsError(true);
    }
  };

  return (
    <div className="phone-entry-container">
      <div className="left-section">
        <button className="back-button">⬅</button>
        <h1>Enter your phone number</h1>
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
        {message && (
          <p className={isError ? "error-message" : "success-message"}>
            {message}
          </p>
        )}
        <button className="continue-button" onClick={handleLogin}>
          Continue
        </button>
      </div>
      <div className="right-section">
        <img src="/login.png" alt="Illustration" />
      </div>
    </div>
  );
};

export default Login;

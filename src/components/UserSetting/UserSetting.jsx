import React from "react";
import { useState } from "react";
import "./UserSetting.scss";
const UserSetting = () => {
  const [username, setUsername] = useState("");

  return (
    <div className="profile-setup-container">
      {/* Back Button */}
      <button className="back-button">&#8592;</button>

      {/* Profile Image Upload */}
      <div className="profile-image">
        <img src="profile.png" alt="Profile" />
        <label className="upload-icon">
          <input type="file" accept="image/*" />
          <span>&#128247;</span>
        </label>
      </div>

      {/* Username Input */}
      <h2>What should people call you?</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {/* Continue Button */}
      <button className="continue-button">Continue</button>
    </div>
  );
};

export default UserSetting;

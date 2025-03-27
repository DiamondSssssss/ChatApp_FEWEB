import React, { useState } from "react";
import "./Appearance.scss";

const Appearance = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [font, setFont] = useState("Times New Roman");

  return (
    <div className="appearance-container">
      {/* Header Section */}
      <div className="header">
        <span className="back-icon">←</span>
        <h2>Appearance</h2>
      </div>

      <hr className="divider" />

      {/* Settings Section */}
      <div className="settings">
        <div className="setting-item">
          <span>Dark mode</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <span>Font</span>
          <button className="font-btn">{font}</button>
        </div>
      </div>

      {/* Cancel Button */}
      <button className="cancel-btn">Cancel</button>
    </div>
  );
};

export default Appearance;

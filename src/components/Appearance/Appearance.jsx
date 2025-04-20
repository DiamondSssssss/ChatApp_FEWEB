import React, { useState, useEffect } from "react";
import "./Appearance.scss";

const Appearance = () => {
  // Load preferences from localStorage or set default values
  const [darkMode, setDarkMode] = useState(
    () => JSON.parse(localStorage.getItem("darkMode")) ?? false
  );
  const [font, setFont] = useState(
    localStorage.getItem("font") || "Times New Roman"
  );
  const [showFontOptions, setShowFontOptions] = useState(false);

  // Available font options
  const fonts = [
    "Arial",
    "Times New Roman",
    "Courier New",
    "Verdana",
    "Georgia",
  ];

  // Apply theme settings when darkMode or font changes
  useEffect(() => {
    document.body.style.fontFamily = font;
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode, font]);

  // Save preferences when they change
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    localStorage.setItem("font", font);
  }, [darkMode, font]);

  return (
    <div className={`appearance-container ${darkMode ? "dark" : ""}`}>
      {/* Header Section */}
      <div className="header">
        <span className="back-icon" onClick={() => window.history.back()}>
          ←
        </span>
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
              onChange={() => setDarkMode((prev) => !prev)}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="setting-item">
          <span>Font</span>
          <button
            className="font-btn"
            onClick={() => setShowFontOptions(!showFontOptions)}
          >
            {font}
          </button>
          {showFontOptions && (
            <div className="font-dropdown">
              {fonts.map((f) => (
                <div
                  key={f}
                  className="font-option"
                  onClick={() => {
                    setFont(f);
                    setShowFontOptions(false);
                  }}
                >
                  {f}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cancel Button */}
      <button className="cancel-btn" onClick={() => window.history.back()}>
        Cancel
      </button>
    </div>
  );
};

export default Appearance;

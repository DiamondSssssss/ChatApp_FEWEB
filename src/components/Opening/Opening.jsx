import React, { useState } from "react";
import "./Opening.scss";
import { FiRefreshCcw } from "react-icons/fi"; // Install react-icons if not installed

const Opening = () => {
  const [showText, setShowText] = useState(false);

  const handleReloadClick = () => {
    setShowText(true);
  };

  return (
    <div className="opening-container">
      <h1 className="welcome-text">Welcome</h1>
      <div className="reload-icon" onClick={handleReloadClick}>
        <FiRefreshCcw />
      </div>
      {showText && <p className="error-text">Try again</p>}
    </div>
  );
};

export default Opening;

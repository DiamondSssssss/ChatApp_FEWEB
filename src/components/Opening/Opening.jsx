import React from "react";
import "./Opening.scss";
import { RotateCcw } from "lucide-react";
const Opening = () => {
  return (
    <div className="welcome-container">
      <h1 className="welcome-text">Welcome</h1>
      <div className="reload-icon">
        <RotateCcw size={50} color="yellow" />
      </div>
    </div>
  );
};

export default Opening;

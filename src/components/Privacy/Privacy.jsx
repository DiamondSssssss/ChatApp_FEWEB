import React, { useState } from "react";
import "./Privacy.scss";
import { useNavigate } from "react-router-dom";

const Privacy = () => {
  const [allowFriendlist, setAllowFriendlist] = useState(false);
  const [setPinCode, setSetPinCode] = useState(false);
  const navigate = useNavigate();

  const handleApply = () => {
    alert(
      `Settings applied: \nAllow friendlist: ${allowFriendlist}\nSet PIN code: ${setPinCode}`
    );
  };

  const handleCancel = () => {
    alert("Settings cancelled");
  };

  return (
    <div className="privacy-wrapper">
      <div className="privacy-container">
        <div className="header">
          <button className="back-button" onClick={() => navigate("/")}>
            ←
          </button>
          <div className="title-container">
            <h1>Privacy</h1>
          </div>
        </div>
        <div className="settings">
          <div className="setting-item">
            <span>Allow others to see your friendlist</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={allowFriendlist}
                onChange={() => setAllowFriendlist(!allowFriendlist)}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="setting-item">
            <span>Set PIN code</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={setPinCode}
                onChange={() => setSetPinCode(!setPinCode)}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
        <div className="buttons">
          <button className="apply-button" onClick={handleApply}>
            Apply
          </button>
          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Privacy;

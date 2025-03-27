import React, { useState } from "react";
import "./ConfirmPinCode.scss";
import { useNavigate } from "react-router-dom";

const ConfirmPinCode = () => {
  const [pin, setPin] = useState(["", "", "", ""]);
  const navigate = useNavigate();

  const handlePinChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      if (value && index < 3) {
        document.getElementById(`pin-input-${index + 1}`).focus();
      }
    }
  };

  const handleContinue = () => {
    const pinCode = pin.join("");
    if (pinCode.length === 4) {
      alert(`PIN Code: ${pinCode}`);
    } else {
      alert("Please enter a 4-digit PIN.");
    }
  };

  return (
    <div className="confirm-pin-wrapper">
      <div className="confirm-pin-container">
        <div className="header">
          <button
            className="back-button"
            onClick={() => navigate("/pincode-set")}
          >
            ←
          </button>
          <div className="title-container">
            <h1>Confirm PIN Code</h1>
          </div>
        </div>
        <div className="pin-inputs">
          {pin.map((digit, index) => (
            <input
              key={index}
              id={`pin-input-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handlePinChange(index, e.target.value)}
              maxLength="1"
              className="pin-box"
            />
          ))}
        </div>
        <button className="continue-button" onClick={handleContinue}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ConfirmPinCode;

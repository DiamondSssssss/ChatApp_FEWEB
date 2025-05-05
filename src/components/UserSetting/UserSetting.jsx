import React from "react";
import { useState } from "react";
import "./UserSetting.scss";
import { getCurrentUser, register } from "../../services/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserSetting = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const phoneNumber = localStorage.getItem("phoneNumber");

  const handleSubmit = async () => {
    const user = { phoneNumber, username };
    let response = await register(user);
    const { message: serverMsg, accessToken, refreshToken } = response;
    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    }
    const userInfoResponse = await getCurrentUser();
    if (userInfoResponse.message) {
      const username = userInfoResponse.message.split("User found: ")[1];
      toast.success("Đăng ký thành công");
      localStorage.setItem("userName", username);
      navigate("/login");
    } else {
      toast.error("Đăng ký thất bại");
    }
  };
  return (
    <div className="profile-setup-container">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate("/verification")}>
        &#8592;
      </button>

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
      <button className="continue-button" onClick={handleSubmit}>
        Continue
      </button>
    </div>
  );
};

export default UserSetting;

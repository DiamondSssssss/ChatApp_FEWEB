import React from "react";
import "./Setting.scss";
import {logout} from "../../services/auth"
import {
  FaShieldAlt,
  FaBell,
  FaSun,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Setting = () => {
  const navigate = useNavigate();
  const handleLogout =async () => {
    
    var msg=await logout();
    if(msg.status==200)
    {
        localStorage.clear();
        navigate("/login");
        toast.success("Logout success");

    }
    else{
        toast.error("Logout fail");
    }
  };
  return (
    <div className="settings-container">
      <header className="settings-header">
        <span className="back-arrow" onClick={() => navigate("/chat")}>
          ←
        </span>
        <h1>Settings</h1>
      </header>

      <hr className="divider" />

      <section className="account-section">
        <h2>Account</h2>
        <div className="account-info">
          <img src="/avatar.png" alt="User Avatar" className="avatar" />
          <div className="user-details">
            <h3>{localStorage.getItem("userName")}</h3>
            <p className="username">@Present111</p>
            <a
              href="https://instagram.com/present111"
              className="instagram-link"
            >
              instagram.com/present111
            </a>
          </div>
        </div>
      </section>

      <hr className="divider" />

      <section className="others-section">
        <h2>Others</h2>
        <ul className="settings-options">
          <li onClick={() => navigate("/privacy")}>
            <FaShieldAlt className="icon" />
            Privacy
          </li>
          <li onClick={() => navigate("/notification")}>
            <FaBell className="icon" />
            Notifications
          </li>
          <li onClick={() => navigate("/appearance")}>
            <FaSun className="icon" />
            Appearance
          </li>
          <li onClick={() => navigate("/invite-friend")}>
            <FaUserPlus className="icon" />
            Invite a Friend
          </li>
          <li onClick={handleLogout} className="logout-option">
            <FaSignOutAlt className="icon" />
            Logout
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Setting;

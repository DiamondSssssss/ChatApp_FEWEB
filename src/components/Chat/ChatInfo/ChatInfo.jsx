import React from "react";
import "./ChatInfo.scss";
import { FaPhone, FaVideo } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { BsCamera } from "react-icons/bs";
import { LuInfo } from "react-icons/lu";

const ChatInfo = ({ avatar, selectedUser }) => {
  return (
    <div className="chat-page">
      <div className="chat-header">
        <div className="profile-info">
          <div className="header-avatar">
            <img src={avatar} alt="Avatar" />
          </div>
          <div className="header-text">
            <h3>{selectedUser}</h3>
            <p className="active-status">
              <span className="online-dot"></span> Active now
            </p>
          </div>
        </div>
        <div className="header-icons">
          <FaPhone className="icon" />
          <FaVideo className="icon" />
          <LuInfo className="icon" />
        </div>
      </div>

      <div className="chat-content">
        <div className="message received">
          <div className="message-content">
            <p>123</p>
            <span className="time">16:46</span>
          </div>
        </div>

        <div className="message sent">
          <div className="message-content">
            <p>123o</p>
            <span className="time">16:46 • Read</span>
          </div>
        </div>

        <div className="date-divider">
          <span>17/03/2025</span>
        </div>

        <div className="message received">
          <div className="message-content">
            <p>Vịt bay</p>
            <span className="time">16:46</span>
          </div>
        </div>
        <div className="message sent">
          <div className="message-content">
            <p>123o</p>
            <span className="time">16:46 • Read</span>
          </div>
        </div>
      </div>

      <div className="chat-input">
        <BsCamera className="input-icon" />
        <input type="text" placeholder="aaa shiba" />
        <IoSend className="send-icon" />
      </div>
    </div>
  );
};

export default ChatInfo;

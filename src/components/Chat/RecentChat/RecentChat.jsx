import React, { useState } from "react";
import "./RecentChat.scss";
import defaultAvatar from "../../../assets/images/default-avatar.png";
import ava from "../../../assets/images/avatar.png";
import { FaCircle } from "react-icons/fa";
import { MdPushPin } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const RecentChat = ({ onSelectChat, selectedUser, chats }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const truncateUserName = (userName, maxLength = 10) => {
    if (userName.length > maxLength) {
      return userName.substring(0, maxLength - 3) + "...";
    }
    return userName;
  };

  const truncateMessage = (message, maxLength = 20) => {
    if (message.length > maxLength) {
      return "Đã gửi tin nhắn";
    }
    return message;
  };

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="profile-info">
          <div className="header-avatar">
            <img onClick={()=>navigate("/profile")} src={defaultAvatar} alt="Profile" />
          </div>
          <div className="header-text">
            <div className="header-name-with-icon">
              <FiSettings
                style={{ color: "white", fontSize: "20px", cursor: "pointer" }}
                onClick={() => navigate("/setting")}
              />
              <h1 >{localStorage.getItem("userName")}</h1>
            </div>
            <p>@Present!!!</p>
            <a
              href="https://instagram.com/present!!!"
              className="instagram-link"
            >
              instagram.com/present!!!
            </a>
          </div>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for a chat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="chat-list">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat, index) => (
              <div
                className={`chat-item ${
                  selectedUser === chat.name ? "selected" : ""
                }`}
                key={index}
                onClick={() => onSelectChat(chat.name)}
              >
                <div className="chat-avatar">
                  <img src={ava} alt={chat.name} />
                  <div className="pin-icon">
                    <MdPushPin />
                  </div>
                </div>
                <div className="chat-content">
                  <div className="chat-info">
                    <h4>{chat.name}</h4>
                    <div className="last-message-row">
                      <p>
                        <span className="username">
                          {truncateUserName(chat.userName)}:
                        </span>{" "}
                        {chat.isSticker ? (
                          <span className="sticker-label">sticker</span>
                        ) : (
                          <span className="message-content">
                            {truncateMessage(chat.lastMessage)}
                          </span>
                        )}
                      </p>
                      <span className="time">{chat.time}</span>
                    </div>
                  </div>
                  <div className="chat-meta">
                    <FaCircle className="online-icon" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No chats found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentChat;

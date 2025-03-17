import React from "react";
import "./RecentChat.scss";
import defaultAvatar from "../../../assets/images/default-avatar.png";
import ava from "../../../assets/images/avatar.png";
import { FaCircle } from "react-icons/fa";
import { MdPushPin } from "react-icons/md";

const RecentChat = ({ onSelectChat, selectedUser }) => {
  const chats = [
    { name: "Triết", lastMessage: "Hello", time: "5 mins", unread: 0 },
    {
      name: "Family Group(5)",
      lastMessage: "Mom sent a sticker",
      time: "1 h",
      unread: 0,
      isSticker: true,
    },
    { name: "ABC", lastMessage: "Hello", time: "5 h", unread: 0 },
    {
      name: "ACd",
      lastMessage: "ACd sent a sticker",
      time: "1 h",
      unread: 0,
      isSticker: true,
    },
    { name: "Tài", lastMessage: "Cho vay 5 cú với", time: "5 h", unread: 0 },
  ];

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="profile-info">
          <div className="header-avatar">
            <img src={defaultAvatar} alt="Profile" />
          </div>
          <div className="header-text">
            <h1>Phuc Le Quang</h1>
            <p>@Present!!!</p>
            <a href="instagram.com/present!!!" className="instagram-link">
              instagram.com/present!!!
            </a>
          </div>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="search-bar">
          <input type="text" placeholder="Search for a chat..." />
        </div>

        <div className="chat-list">
          {chats.map((chat, index) => (
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
                  <h3>{chat.name}</h3>
                  <div className="last-message-row">
                    <p>
                      {chat.isSticker ? (
                        <span className="sticker-label">sticker</span>
                      ) : (
                        chat.lastMessage
                      )}
                    </p>
                    <span className="time">{chat.time}</span>
                  </div>
                </div>
                <div className="chat-meta">
                  <FaCircle className="online-icon" />{" "}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentChat;

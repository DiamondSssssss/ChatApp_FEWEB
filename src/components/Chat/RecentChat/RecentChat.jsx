import React, { useState } from "react";
import "./RecentChat.scss";
import defaultAvatar from "../../../assets/images/default-avatar.png";
import ava from "../../../assets/images/avatar.png";
import { FaCircle } from "react-icons/fa";
import { MdPushPin } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const RecentChat = ({ onSelectChat, selectedUser }) => {
  const [searchQuery, setSearchQuery] = useState(""); // Thêm trạng thái tìm kiếm
  const navigate = useNavigate();

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

  // Lọc danh sách chats dựa trên searchQuery
  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="profile-info">
          <div className="header-avatar">
            <img src={defaultAvatar} alt="Profile" />
          </div>
          <div className="header-text">
            <div className="header-name-with-icon">
              <FiSettings
                style={{ color: "white", fontSize: "20px", cursor: "pointer" }}
                onClick={() => navigate("/setting")}
              />
              <h1>Phuc Le Quang</h1>
            </div>
            <p>@Present!!!</p>
            <a href="instagram.com/present!!!" className="instagram-link">
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
            onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật giá trị tìm kiếm
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

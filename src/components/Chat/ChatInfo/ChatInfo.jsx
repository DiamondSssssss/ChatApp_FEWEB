import React, { useState, useRef, useEffect } from "react";
import "./ChatInfo.scss";
import { FaPhone, FaVideo } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { BsCamera } from "react-icons/bs";
import { LuInfo } from "react-icons/lu";
import { AiOutlinePicture } from "react-icons/ai";
import { FaPencilAlt, FaEllipsisH } from "react-icons/fa";

const ChatInfo = ({ avatar, selectedUser }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "received",
      text: "Xem cái này hay nè! 😍",
      avatar: avatar,
      timestamp: "16:46",
    },
    {
      id: 2,
      type: "sent",
      text: "123o",
      timestamp: "16:46 • Read",
    },
    {
      id: 3,
      type: "divider",
      date: "17/03/2025",
    },
    {
      id: 4,
      type: "received",
      text: "Vịt bay",
      timestamp: "16:46",
    },
    {
      id: 5,
      type: "sent",
      text: "123o",
      timestamp: "16:46 • Read",
    },
  ]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showDropdown, setShowDropdown] = useState(null);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const toggleDropdown = (messageId) => {
    setShowDropdown(messageId === showDropdown ? null : messageId);
  };

  const handleDeleteMessage = (messageId) => {
    setMessages(messages.filter((msg) => msg.id !== messageId));
    setShowDropdown(null);
  };

  const handleReplyMessage = (messageId) => {
    alert(`Trả lời tin nhắn ID: ${messageId}`);
    setShowDropdown(null);
  };

  const handleEditMessage = (messageId) => {
    const newText = prompt(
      "Chỉnh sửa tin nhắn:",
      messages.find((msg) => msg.id === messageId).text
    );
    if (newText) {
      setMessages(
        messages.map((msg) =>
          msg.id === messageId ? { ...msg, text: newText } : msg
        )
      );
    }
    setShowDropdown(null);
  };

  return (
    <>
      <div className="chat-info">
        <div className={`chat-page ${showDetails ? "shrinked" : ""}`}>
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
                <LuInfo className="icon" onClick={toggleDetails} />
              </div>
            </div>
            <div className="chat-content">
              {messages.map((msg) =>
                msg.type === "divider" ? (
                  <div key={msg.id} className="date-divider">
                    <span>{msg.date}</span>
                  </div>
                ) : (
                  <div key={msg.id} className={`message-wrapper ${msg.type}`}>
                    <div className={`message ${msg.type}`}>
                      <div className="message-content">
                        {msg.type === "received" && msg.avatar && (
                          <div className="message-image-wrapper">
                            <img
                              src={msg.avatar}
                              alt="Avatar"
                              className="message-image"
                            />
                          </div>
                        )}
                        <div className="message-text">
                          <p>{msg.text}</p>
                          <span className="time">{msg.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    {/* <div className="message-actions">
                      <FaEllipsisH
                        className="action-icon"
                        onClick={() => toggleDropdown(msg.id)}
                      />
                      {showDropdown === msg.id && (
                        <div className="dropdown" ref={dropdownRef}>
                          {msg.type === "received" ? (
                            <>
                              <button
                                onClick={() => handleDeleteMessage(msg.id)}
                              >
                                Xóa
                              </button>
                              <button
                                onClick={() => handleReplyMessage(msg.id)}
                              >
                                Trả lời
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleDeleteMessage(msg.id)}
                              >
                                Xóa
                              </button>
                              <button onClick={() => handleEditMessage(msg.id)}>
                                Chỉnh sửa
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div> */}
                  </div>
                )
              )}
            </div>

            <div className="chat-input">
              <label htmlFor="cameraUpload" className="upload-icon">
                <BsCamera className="input-icon" />
              </label>
              <input
                type="file"
                id="cameraUpload"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <label htmlFor="imageUpload" className="upload-icon">
                <AiOutlinePicture className="input-icon" />
              </label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <input type="text" placeholder="aaa shiba" />
              <IoSend className="send-icon" />
            </div>
          </div>
          {showDetails && (
            <div className="info-panel">
              <div className="panel-header">
                <h3>Thông tin hội thoại</h3>
                <button className="close-btn" onClick={toggleDetails}>
                  ×
                </button>
              </div>
              <div className="header-avatar">
                <img src={avatar} alt="Avatar" />
                <div className="name-edit">
                  <span className="user-name">{selectedUser}</span>
                  <FaPencilAlt className="edit-icon" />
                </div>
              </div>

              <div className="panel-content">
                <div className="section">
                  <h4>Ảnh/Video</h4>
                  <div className="media-grid">
                    <img src={avatar} alt="Avatar" className="media-image" />
                    <img src={avatar} alt="Avatar" className="media-image" />
                    <img src={avatar} alt="Avatar" className="media-image" />
                    <img src={avatar} alt="Avatar" className="media-image" />
                  </div>
                </div>

                <div className="section">
                  <h4>File</h4>
                  <div className="file-list">{/* Thêm danh sách file */}</div>
                </div>

                <div className="section">
                  <h4>Link</h4>
                  <div className="link-list">
                    <a href="facebook.com/126372947847847284">Facebook</a>
                    <a href="geeglo.com">Geeglo</a>
                    <a href="yuotube.com">YouTube</a>
                  </div>
                </div>

                <button className="delete-btn">Xóa lịch sử trò chuyện</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatInfo;

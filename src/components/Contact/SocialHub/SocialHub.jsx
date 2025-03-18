import React from "react";
import "./SocialHub.scss";
import defaultAvatar from "../../../assets/images/avatar.png";

const SocialHub = () => {
  const options = [
    "Danh sách bạn bè",
    "Danh sách nhóm",
    "Lời mời kết bạn",
    "Lời mời vào nhóm",
  ];
  return (
    <div className="social-container">
      <div className="social-header">
        <div className="profile-info">
          <div className="header-avatar">
            <img src={defaultAvatar} alt="Profile" />
          </div>
          <div className="header-text">
            <h1>Phuc Le Quang</h1>
            <p>@Present111</p>
            <a
              href="https://instagram.com/present111"
              className="instagram-link"
            >
              instagram.com/present111
            </a>
          </div>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="search-bar">
          <input type="text" placeholder="Tìm kiếm" />
        </div>

        <div className="option-list">
          {options.map((option, index) => (
            <button key={index} className="option-item">
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialHub;

import React, { useState } from "react";
import "./SocialHub.scss";
import defaultAvatar from "../../../assets/images/avatar.png";

const SocialHub = ({ selectedGroup, setSelectedGroup }) => {
  const [searchQuery, setSearchQuery] = useState(""); // Thêm trạng thái tìm kiếm

  const options = [
    "Danh sách bạn bè",
    "Danh sách nhóm",
    "Lời mời kết bạn",
    "Lời mời vào nhóm",
  ];

  // Lọc danh sách options dựa trên searchQuery
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <input
            type="text"
            placeholder="Tìm kiếm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật giá trị tìm kiếm
          />
        </div>

        <div className="option-list">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <button
                key={index}
                className={`option-item ${
                  selectedGroup === option ? "selected" : ""
                }`}
                onClick={() => setSelectedGroup(option)}
              >
                {option}
              </button>
            ))
          ) : (
            <div className="no-results">
              <p>Không tìm thấy kết quả.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialHub;

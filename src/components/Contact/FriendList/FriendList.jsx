import React from "react";
import "./FriendList.scss";

const FriendList = () => {
  // Dữ liệu mẫu với avatar
  const friendGroups = [
    {
      letter: "A",
      items: [
        { name: "ABC", avatar: "https://via.placeholder.com/40" },
        { name: "ABCD", avatar: "https://via.placeholder.com/40" },
        { name: "ABCE", avatar: "https://via.placeholder.com/40" },
      ],
    },
    {
      letter: "B",
      items: [
        { name: "B", avatar: "https://via.placeholder.com/40" },
        { name: "BC", avatar: "https://via.placeholder.com/40" },
        { name: "BCD", avatar: "https://via.placeholder.com/40" },
      ],
    },
    {
      letter: "C",
      items: [{ name: "BCDE", avatar: "https://via.placeholder.com/40" }],
    },
  ];

  return (
    <div className="friend-list">
      {/* Header */}
      <div className="friend-list__header">
        <h4 className="friend-list__title">Danh sách bạn bè</h4>
        <span className="friend-list__total">Bạn bè (10)</span>
      </div>

      <div className="friend-controls">
        <div className="search-box">
          <input type="text" placeholder="Tìm kiếm" className="search-input" />
          <i className="fas fa-search search-icon"></i>
        </div>
        <button className="sort-button">
          Tên (A–Z) <i className="fas fa-sort-alpha-down"></i>
        </button>
      </div>

      <div className="friend-list__content">
        {friendGroups.map((group, index) => (
          <div key={index} className="friend-group">
            <h5 className="friend-group__letter">{group.letter}</h5>
            <div className="friend-group__items">
              {group.items.map((friend, itemIndex) => (
                <div key={itemIndex} className="friend-item">
                  <div className="friend-info">
                    <img
                      src={friend.avatar}
                      alt="avatar"
                      className="friend-avatar"
                    />
                    <span className="friend-name">{friend.name}</span>
                  </div>
                  <button className="friend-action">
                    <i className="fas fa-ellipsis-h"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
    </div>
  );
};

export default FriendList;

import React, { useState } from "react";
import "./FriendList.scss";
import ava from "../../../assets/images/avatar.png";
import { FaPencilAlt } from "react-icons/fa";
const FriendList = ({ selectedGroup }) => {
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const friendGroups = [
    {
      letter: "A",
      items: [
        {
          type: "friend",
          name: "ABC",
          avatar: ava,
          gender: "Nam",
          birthday: "01/01/2000",
        },
      ],
    },
    {
      letter: "B",
      items: [
        { type: "friend", name: "B", avatar: ava },
        { type: "friend", name: "BC", avatar: ava },
        { type: "friend", name: "BCD", avatar: ava },
      ],
    },
    {
      letter: "C",
      items: [{ type: "friend", name: "BCDE", avatar: ava }],
    },
    {
      letter: "Nhóm",
      items: [
        {
          type: "group",
          name: "Nhóm Học Tập",
          creator: "Nguyễn Văn A",
          createdDate: "15/03/2023",
          membersCount: 12,
          avatar: ava,
        },
        {
          type: "group",
          name: "Nhóm Lập Trình",
          creator: "Trần Thị B",
          createdDate: "20/04/2023",
          membersCount: 8,
          avatar: ava,
        },
      ],
    },
  ];

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowInfoPanel(true);
  };

  const closePanel = () => {
    setShowInfoPanel(false);
    setSelectedItem(null);
  };
  return (
    <div className={`friend-list ${showInfoPanel ? "shrinked" : ""}`}>
      <div className="friend-list__header">
        <h4 className="friend-list__title">{selectedGroup}</h4>
        {selectedGroup === "Danh sách bạn bè" ? (
          <span className="friend-list__total">Bạn bè {10}</span>
        ) : selectedGroup === "Danh sách nhóm" ? (
          <span className="friend-list__total">Nhóm {5}</span>
        ) : (
          <span className="friend-list__total">Lời mời kết bạn {3}</span>
        )}
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
              {group.items.map((item, itemIndex) => (
                <div key={itemIndex} className="friend-item">
                  <div className="friend-info">
                    <img
                      src={item.avatar}
                      alt="avatar"
                      className="friend-avatar"
                    />
                    <span className="friend-name">{item.name}</span>
                  </div>
                  <button
                    className="friend-action"
                    onClick={() => handleItemClick(item)}
                  >
                    <i className="fas fa-ellipsis-h"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showInfoPanel && (
        <div className={`info-panel ${showInfoPanel ? "open" : ""}`}>
          <div className="panel-header">
            {selectedGroup === "Danh sách bạn bè" ? (
              <h3>Thông tin bạn bè</h3>
            ) : selectedGroup === "Danh sách nhóm" ? (
              <h3>Thông tin nhóm</h3>
            ) : selectedGroup === "Lời mời kết bạn" ? (
              <h3>Thông tin lời mời kết bạn</h3>
            ) : selectedGroup === "Lời mời vào nhóm" ? (
              <h3>Thông tin lời mời vào nhóm</h3>
            ) : null}
            <button className="close-btn" onClick={closePanel}>
              &times;
            </button>
          </div>

          {selectedItem && (
            <>
              <div className="profile-avatar">
                <img src={selectedItem.avatar} alt="avatar" />
              </div>

              <div className="action-buttons">
                <button className="action-btn message-btn">
                  <i className="fas fa-comment-dots"></i> Nhắn tin
                </button>
                <button className="action-btn call-btn">
                  <i className="fas fa-phone-alt"></i> Gọi điện
                </button>
              </div>

              {selectedGroup === "Danh sách nhóm" ? (
                <div className="panel-content">
                  <div className="info-item">
                    <span className="label">Tên:</span>
                    <span className="value">{selectedItem.name}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Người tạo:</span>
                    <span className="value">{selectedItem.creator}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Ngày tạo:</span>
                    <span className="value">{selectedItem.createdDate}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Thành viên:</span>
                    <span className="value">{selectedItem.membersCount}</span>
                  </div>
                </div>
              ) : (
                <div className="panel-content">
                  <div className="info-item">
                    <span className="label">Tên:</span>
                    <span className="value">{selectedItem.name}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Giới tính:</span>
                    <span className="value">
                      {selectedItem.gender || "Không rõ"}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="label">Ngày sinh:</span>
                    <span className="value">
                      {selectedItem.birthday || "Không rõ"}
                    </span>
                  </div>
                </div>
              )}

              <div className="delete-buttons">
                {selectedGroup === "Danh sách nhóm" ? (
                  <button className="action-btn leave-btn">
                    <i className="fas fa-sign-out-alt"></i> Rời nhóm
                  </button>
                ) : (
                  // Nút dành cho bạn bè
                  <>
                    <button className="action-btn message-btn">
                      Chặn người này
                    </button>
                    <button className="action-btn delete-btn">
                      <i className="fas fa-user-minus"></i> Xóa bạn bè
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* Controls */}
    </div>
  );
};

export default FriendList;

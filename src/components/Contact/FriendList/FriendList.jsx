import React, { useState } from "react";
import "./FriendList.scss";
import ava from "../../../assets/images/avatar.png";
import { FaPencilAlt } from "react-icons/fa";

const FriendList = ({ selectedGroup }) => {
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State cho tìm kiếm
  const [sortOrder, setSortOrder] = useState("A-Z"); // State cho sắp xếp (A-Z hoặc Z-A)

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

  // Hàm xử lý tìm kiếm và sắp xếp
  const filterAndSortGroups = () => {
    let filteredGroups = [...friendGroups];

    // Lọc theo selectedGroup
    if (selectedGroup === "Danh sách bạn bè") {
      filteredGroups = filteredGroups.filter(
        (group) => group.letter !== "Nhóm"
      );
    } else if (selectedGroup === "Danh sách nhóm") {
      filteredGroups = filteredGroups.filter(
        (group) => group.letter === "Nhóm"
      );
    }
    // Các trường hợp "Lời mời kết bạn" và "Lời mời vào nhóm" sẽ được xử lý sau nếu có dữ liệu

    // Lọc theo searchQuery
    filteredGroups = filteredGroups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }))
      .filter((group) => group.items.length > 0);

    // Sắp xếp theo sortOrder
    filteredGroups = filteredGroups.map((group) => ({
      ...group,
      items: [...group.items].sort((a, b) => {
        if (sortOrder === "A-Z") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      }),
    }));

    // Sắp xếp các nhóm theo letter (A-Z hoặc Z-A)
    return filteredGroups.sort((a, b) => {
      if (sortOrder === "A-Z") {
        return a.letter.localeCompare(b.letter);
      } else {
        return b.letter.localeCompare(a.letter);
      }
    });
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowInfoPanel(true);
  };

  const closePanel = () => {
    setShowInfoPanel(false);
    setSelectedItem(null);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "A-Z" ? "Z-A" : "A-Z");
  };

  const filteredAndSortedGroups = filterAndSortGroups();

  return (
    <div className={`friend-list ${showInfoPanel ? "shrinked" : ""}`}>
      <div className="friend-list__header">
        <h4 className="friend-list__title">{selectedGroup}</h4>
        {selectedGroup === "Danh sách bạn bè" ? (
          <span className="friend-list__total">Bạn bè {10}</span>
        ) : selectedGroup === "Danh sách nhóm" ? (
          <span className="friend-list__total">Nhóm {5}</span>
        ) : selectedGroup === "Lời mời kết bạn" ? (
          <span className="friend-list__total">Lời mời kết bạn {3}</span>
        ) : (
          <span className="friend-list__total">Lời mời vào nhóm {3}</span>
        )}
      </div>

      <div className="friend-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className="fas fa-search search-icon"></i>
        </div>
        <button className="sort-button" onClick={toggleSortOrder}>
          Tên ({sortOrder}){" "}
          <i
            className={
              sortOrder === "A-Z"
                ? "fas fa-sort-alpha-down"
                : "fas fa-sort-alpha-up"
            }
          ></i>
        </button>
      </div>

      <div className="friend-list__content">
        {filteredAndSortedGroups.length > 0 ? (
          filteredAndSortedGroups.map((group, index) => (
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
          ))
        ) : (
          <p className="no-results">Không tìm thấy kết quả</p>
        )}
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
              ×
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
                    <div className="value-container">
                      <span className="value">{selectedItem.name}</span>
                      <FaPencilAlt className="edit-icon" />
                    </div>
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
                    <div className="value-container">
                      <span className="value">{selectedItem.name}</span>
                      <FaPencilAlt className="edit-icon" />
                    </div>
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
    </div>
  );
};

export default FriendList;

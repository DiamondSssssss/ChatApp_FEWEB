import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ava from "../../assets/images/avatar.png";
import "./InviteFriend.scss";

const InviteFriend = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(""); // State để lưu giá trị tìm kiếm

  // Dữ liệu giả cho danh sách bạn bè và yêu cầu kết bạn
  const friends = [
    { id: 1, name: "ABC" },
    { id: 2, name: "DEF" },
    { id: 3, name: "GHI" },
  ];

  const friendRequests = [
    { id: 4, name: "JKL" },
    { id: 5, name: "MNO" },
    { id: 6, name: "PQR" },
  ];

  // Lọc danh sách bạn bè dựa trên searchQuery
  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Lọc danh sách yêu cầu kết bạn dựa trên searchQuery
  const filteredFriendRequests = friendRequests.filter((request) =>
    request.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInvite = (name) => {
    alert(`Invited ${name}`);
    // Thay bằng logic gửi lời mời
  };

  const handleAccept = (name) => {
    alert(`Accepted friend request from ${name}`);
    // Thay bằng logic chấp nhận yêu cầu kết bạn
  };

  return (
    <div className="invite-friends-wrapper">
      <div className="invite-friends-container">
        <div className="header">
          <button className="back-button" onClick={() => navigate("/setting")}>
            ←
          </button>
          <div className="title-container">
            <h1>Invite Friends</h1>
          </div>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật giá trị tìm kiếm
          />
        </div>

        <div className="section">
          <h2>Friends</h2>
          {filteredFriends.length > 0 ? (
            filteredFriends.map((friend) => (
              <div key={friend.id} className="friend-item">
                <div className="friend-info">
                  <img src={ava} alt="Avatar" className="avatar" />
                  <span>{friend.name}</span>
                </div>
                <button
                  className="invite-button"
                  onClick={() => handleInvite(friend.name)}
                >
                  Invite
                </button>
              </div>
            ))
          ) : (
            <p>No friends found</p>
          )}
        </div>

        <div className="section">
          <h2>Friend Requests</h2>
          {filteredFriendRequests.length > 0 ? (
            filteredFriendRequests.map((request) => (
              <div key={request.id} className="friend-item">
                <div className="friend-info">
                  <img src={ava} alt="Avatar" className="avatar" />
                  <span>{request.name}</span>
                </div>
                <button
                  className="accept-button"
                  onClick={() => handleAccept(request.name)}
                >
                  Accept
                </button>
              </div>
            ))
          ) : (
            <p>No friend requests found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InviteFriend;

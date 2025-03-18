import React, { useState } from "react";
import "./Chat.scss";
import RecentChat from "./RecentChat/RecentChat";
import ChatInfo from "./ChatInfo/ChatInfo";
import ava from "../../assets/images/avatar.png";

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState("Triết");

  return (
    <div className="chat">
      <div className="recent-chat">
        <RecentChat
          selectedUser={selectedUser}
          onSelectChat={setSelectedUser}
        />
      </div>
      <div className="chat-info">
        <ChatInfo selectedUser={selectedUser} avatar={ava} />
      </div>
    </div>
  );
};

export default Chat;

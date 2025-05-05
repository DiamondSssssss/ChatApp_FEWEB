import React, { useState } from "react";
import "./Chat.scss";
import RecentChat from "./RecentChat/RecentChat";
import ChatInfo from "./ChatInfo/ChatInfo";
import ava from "../../assets/images/avatar.png";

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState("Phòng 1");
  const [chats, setChats] = useState([
    {
      name: "Phòng 1",
      lastMessage: "Hello",
      userName: "Bạn",
      time: "5 mins",
      unread: 0,
    },
  ]);

  // Hàm cập nhật danh sách chats
  const updateChat = (updatedChat) => {
    setChats((prevChats) => {
      const existingChatIndex = prevChats.findIndex(
        (chat) => chat.name === updatedChat.name
      );
      if (existingChatIndex !== -1) {
        // Cập nhật chat hiện có
        const updatedChats = [...prevChats];
        updatedChats[existingChatIndex] = {
          ...updatedChats[existingChatIndex],
          lastMessage: updatedChat.lastMessage,
          userName: updatedChat.userName,
          time: updatedChat.time,
        };
        return updatedChats;
      } else {
        // Thêm chat mới
        return [
          ...prevChats,
          {
            name: updatedChat.name,
            lastMessage: updatedChat.lastMessage,
            userName: updatedChat.userName,
            time: updatedChat.time,
            unread: 0,
          },
        ];
      }
    });
  };

  return (
    <div className="chat">
      <div className="recent-chat">
        <RecentChat
          selectedUser={selectedUser}
          onSelectChat={setSelectedUser}
          chats={chats}
        />
      </div>
      <div className="chat-info">
        <ChatInfo
          selectedUser={selectedUser}
          avatar={ava}
          onUpdateChat={updateChat}
        />
      </div>
    </div>
  );
};

export default Chat;

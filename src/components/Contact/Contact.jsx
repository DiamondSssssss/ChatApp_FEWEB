import React, { useState } from "react";
import "./Contact.scss";
import SocialHub from "./SocialHub/SocialHub";
import FriendList from "./FriendList/FriendList";
const Contact = () => {
  const [selectedGroup, setSelectedGroup] = useState("Danh sách bạn bè");
  return (
    <div className="contact-page">
      <div className="social-hub-container">
        <SocialHub
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
        />
      </div>
      <div className="friend-list-container">
        <FriendList selectedGroup={selectedGroup} />
      </div>
    </div>
  );
};

export default Contact;

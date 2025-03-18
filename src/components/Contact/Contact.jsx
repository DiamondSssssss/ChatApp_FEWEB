import React from "react";
import "./Contact.scss";
import SocialHub from "./SocialHub/SocialHub";
import FriendList from "./FriendList/FriendList";
const Contact = () => {
  return (
    <div className="contact-page">
      <div className="social-hub-container">
        <SocialHub />
      </div>
      <div className="friend-list-container">
        <FriendList />
      </div>
    </div>
  );
};

export default Contact;

import React from "react";
import "./Profile.scss";
import { FaCamera } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";

const Profile = () => {
    return (
        <div className="profile-container">
            {/* Header */}
            <div className="profile-header">
                <IoArrowBack className="back-arrow" />
                <h1>Account</h1>
                <FiSettings className="settings-icon" />
            </div>

            <hr className="divider" />

            {/* Profile Info */}
            <div className="profile-info">
                <div className="avatar-wrapper">
                    <img
                        src="/avatar.png"
                        alt="Profile"
                        className="avatar"
                    />
                    <div className="camera-icon">
                        <FaCamera />
                    </div>
                </div>
                <div className="user-details">
                    <h2>Phuc Le Quang</h2>
                    <p className="username">@Present111</p>
                    <a
                        href="https://instagram.com/present111"
                        className="instagram-link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        instagram.com/present111
                    </a>
                </div>
            </div>

            {/* Options */}
            <div className="profile-options">
                <button className="option-btn">Take a photo</button>
                <button className="option-btn">Select from library</button>
                <button className="option-btn cancel">Cancel</button>
            </div>
        </div>
    );
};

export default Profile;

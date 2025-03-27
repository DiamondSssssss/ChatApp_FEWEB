import React from "react";
import "./Setting.scss";
import { FaShieldAlt, FaBell, FaSun, FaUserPlus } from "react-icons/fa";

const Setting = () => {
    return (
        <div className="settings-container">
            <header className="settings-header">
                <span className="back-arrow">←</span>
                <h1>Settings</h1>
            </header>

            <hr className="divider" />

            <section className="account-section">
                <h2>Account</h2>
                <div className="account-info">
                    <img
                        src="/avatar.png"
                        alt="User Avatar"
                        className="avatar"
                    />
                    <div className="user-details">
                        <h3>Phuc Le Quang</h3>
                        <p className="username">@Present111</p>
                        <a href="https://instagram.com/present111" className="instagram-link">
                            instagram.com/present111
                        </a>
                    </div>
                </div>
            </section>

            <hr className="divider" />

            <section className="others-section">
                <h2>Others</h2>
                <ul className="settings-options">
                    <li>
                        <FaShieldAlt className="icon" />
                        Privacy
                    </li>
                    <li>
                        <FaBell className="icon" />
                        Notifications
                    </li>
                    <li>
                        <FaSun className="icon" />
                        Appearance
                    </li>
                    <li>
                        <FaUserPlus className="icon" />
                        Invite a Friend
                    </li>
                </ul>
            </section>
        </div>
    );
};

export default Setting;

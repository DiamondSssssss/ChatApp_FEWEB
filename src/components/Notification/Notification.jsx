import React, { useState } from "react";
import "./Notification.scss";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Notification = ({ onBack }) => {
    const [messageNotification, setMessageNotification] = useState(true);
    const [notificationSounds, setNotificationSounds] = useState(true);
    const navigate = useNavigate();
    return (
        <div className="notification-container">
            <div className="header">
                <FaArrowLeft className="back-icon" onClick={() => navigate("/setting")} />
                <h2>Notification</h2>
            </div>
            <hr className="divider" />

            <div className="settings">
                <div className="setting-item">
                    <span>Turn message notification</span>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={messageNotification}
                            onChange={() => setMessageNotification(!messageNotification)}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>

                <div className="setting-item">
                    <span>Turn notification sounds</span>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={notificationSounds}
                            onChange={() => setNotificationSounds(!notificationSounds)}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>

            <button className="cancel-btn" onClick={onBack}>Cancel</button>
        </div>
    );
};

export default Notification;

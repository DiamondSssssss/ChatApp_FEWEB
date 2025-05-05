import React, { useState, useEffect } from "react";
 import "./ChatInfo.scss";
 import { FaPhone, FaVideo } from "react-icons/fa";
 import { IoSend } from "react-icons/io5";
 import { BsCamera } from "react-icons/bs";
 import { LuInfo } from "react-icons/lu";
 import { AiOutlinePicture } from "react-icons/ai";
 import { FaPencilAlt } from "react-icons/fa";
 import { TbMessageReply } from "react-icons/tb";
 import { RiDeleteBin6Line } from "react-icons/ri";
 import { connectWebSocket, sendMessage } from "../../../services/webSocket";
 import {fetchMessages} from "../../../services/chatService"
 
 const ChatInfo = ({ avatar, selectedUser }) => {
   const [messages, setMessages] = useState([]);
 
 
 
   const getDayAbbreviation = (isoString) => {
     if (!isoString) return "";
     const date = new Date(isoString);
     const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
     return days[date.getDay()];
   };
 
 
 
 
 
   useEffect(() => {
 
 
     const loadOldMessages = async () => {
       const oldMessages = await fetchMessages("1"); 
       const mappedMessages = oldMessages.map(msg => {
         const dateObj = new Date(msg.timeStamp);
         return {
           id: Date.now() + Math.random(), 
           text: msg.content,
           sender: msg.sender,
           type: msg.sender === localStorage.getItem("userName") ? "sent" : "received",
           timeStamp: msg.timeStamp,
           day: getDayAbbreviation(msg.timeStamp),
           timestamp: dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
         };
       });
       setMessages(mappedMessages);
     };
   
     loadOldMessages();
 
 
     connectWebSocket("1", (msg) => {
       console.log(msg);
       const dateObj = new Date(msg.timeStamp);
       const newMsg = {
         id: Date.now(), 
         id: Date.now() + Math.random(), 
         text: msg.content,
         sender: msg.sender,
         type: msg.sender === "You" ? "sent" : "received",
         type: msg.sender === localStorage.getItem("userName") ? "sent" : "received",
         timeStamp: msg.timeStamp,
         day: getDayAbbreviation(msg.timeStamp),
         timestamp: dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
       };
 
       setMessages((prev) => [...prev, newMsg]);
     });
   }, []);
 
 
 
 
   const handleSendMessage = () => {
     sendMessage("1", inputText, localStorage.getItem("userName"));
     setInputText("");
 };
 
 
   const [inputText, setInputText] = useState("");
   const [selectedImage, setSelectedImage] = useState(null);
   const [showDetails, setShowDetails] = useState(false);
   const [previewImage, setPreviewImage] = useState(null);
   const [replyingTo, setReplyingTo] = useState(null);
 
   // Extract unique images from messages, including avatar
   const getChatImages = () => {
     const images = new Set();
     messages.forEach((msg) => {
       if (msg.image) {
         images.add(msg.image);
       }
       if (msg.avatar) {
         images.add(msg.avatar);
       }
       if (msg.replyTo && msg.replyTo.image) {
         images.add(msg.replyTo.image);
       }
       if (msg.replyTo && msg.replyTo.avatar) {
         images.add(msg.replyTo.avatar);
       }
     });
     return Array.from(images);
   };
 
   const handleImageChange = (event) => {
     const file = event.target.files[0];
     if (file) {
       const imageUrl = URL.createObjectURL(file);
       setSelectedImage(imageUrl);
     }
   };
 
   const toggleDetails = () => {
     setShowDetails(!showDetails);
   };
 
   const handleDeleteMessage = (messageId) => {
     setMessages(messages.filter((msg) => msg.id !== messageId));
   };
 
   const handleReplyMessage = (messageId) => {
     const message = messages.find((msg) => msg.id === messageId);
     if (message) {
       setReplyingTo({
         id: message.id,
         sender: message.type === "sent" ? "You" : selectedUser,
         text: message.text,
         image: message.image || null,
         avatar: message.avatar || null,
       });
     }
   };
 
   const cancelReply = () => {
     setReplyingTo(null);
   };
 
   const handleKeyPress = (event) => {
     if (event.key === "Enter" && !event.shiftKey) {
       event.preventDefault();
       handleSendMessage();
     }
   };
 
   const openImagePreview = (imageUrl) => {
     setPreviewImage(imageUrl);
   };
 
   const closeImagePreview = () => {
     setPreviewImage(null);
   };
 
 
   return (
     <>
       <div className="chat-info">
         <div className={`chat-page ${showDetails ? "shrinked" : ""}`}>
           <div className="chat-page">
             <div className="chat-header">
               <div className="profile-info">
                 <div className="header-avatar">
                   <img src={avatar} alt="Avatar" />
                 </div>
                 <div className="header-text">
                   <h3>{selectedUser}</h3>
                   <p className="active-status">
                     <span className="online-dot"></span> Active now
                   </p>
                 </div>
               </div>
               <div className="header-icons">
                 <FaPhone className="icon" />
                 <FaVideo className="icon" />
                 <LuInfo className="icon" onClick={toggleDetails} />
               </div>
             </div>
             <div className="chat-content">
               {messages.reduce((acc, msg, index) => {
                 if (index === 0 || messages[index - 1].date !== msg.date) {
                   const dayAbbrev = getDayAbbreviation(msg.date);
                   acc.push(
                     <div key={`divider-${msg.date}`} className="date-divider">
                       <span>{`${dayAbbrev}, ${msg.date}`}</span>
                     </div>
                   );
                 }
                 if (msg.type === "divider") return acc;
                 acc.push(
                   <div key={msg.id} className={`message-wrapper ${msg.type}`}>
                     <div className={`message ${msg.type}`}>
                       <div className="message-content">
                         {msg.type === "received" && msg.avatar && (
                           <div className="message-image-wrapper">
                             <img
                               src={msg.avatar}
                               alt="Avatar"
                               className="message-image"
                             />
                           </div>
                         )}
                         {msg.replyTo && (
                           <div className="reply-preview">
                             <div className="reply-sender">
                               {msg.replyTo.sender}
                             </div>
                             {(msg.replyTo.image || msg.replyTo.avatar) && (
                               <div className="reply-image-wrapper">
                                 <img
                                   src={msg.replyTo.image || msg.replyTo.avatar}
                                   alt="Reply image"
                                   className="reply-image"
                                   onClick={() =>
                                     openImagePreview(
                                       msg.replyTo.image || msg.replyTo.avatar
                                     )
                                   }
                                 />
                               </div>
                             )}
                             {msg.replyTo.text && (
                               <div className="reply-text">
                                 {msg.replyTo.text}
                               </div>
                             )}
                           </div>
                         )}
                         {msg.image && (
                           <div className="message-image-wrapper">
                             <img
                               src={msg.image}
                               alt="Sent image"
                               className="message-image"
                               onClick={() => openImagePreview(msg.image)}
                             />
                           </div>
                         )}
                         {msg.type === "received" && (
  <div className="message-sender">{msg.sender}</div>
)}
                         {msg.text && (
                           <div className="message-text">
                             <p>{msg.text}</p>
                           </div>
                         )}
                         <span className="time">{msg.timestamp}</span>
                       </div>
                       <div className="message-actions">
                         <TbMessageReply
                           className="action-icon"
                           onClick={() => handleReplyMessage(msg.id)}
                           title="Trả lời"
                         />
                         <RiDeleteBin6Line
                           className="action-icon"
                           onClick={() => handleDeleteMessage(msg.id)}
                           title="Xóa"
                         />
                       </div>
                     </div>
                   </div>
                 );
                 return acc;
               }, [])}
             </div>
 
             <div className="chat-input">
               {replyingTo && (
                 <div className="reply-input-preview">
                   <div className="reply-input-content">
                     <div className="reply-sender">{replyingTo.sender}</div>
                     {(replyingTo.image || replyingTo.avatar) && (
                       <div className="reply-image-wrapper">
                         <img
                           src={replyingTo.image || replyingTo.avatar}
                           alt="Reply image"
                           className="reply-image"
                           onClick={() =>
                             openImagePreview(
                               replyingTo.image || replyingTo.avatar
                             )
                           }
                         />
                       </div>
                     )}
                     {replyingTo.text && (
                       <div className="reply-text">{replyingTo.text}</div>
                     )}
                   </div>
                   <button className="cancel-reply" onClick={cancelReply}>
                     ×
                   </button>
                 </div>
               )}
               <div className="input-row">
                 {selectedImage && (
                   <div className="image-preview">
                     <img
                       src={selectedImage}
                       alt="Preview"
                       className="preview-image"
                       onClick={() => openImagePreview(selectedImage)}
                     />
                     <button
                       className="remove-image"
                       onClick={() => setSelectedImage(null)}
                     >
                       ×
                     </button>
                   </div>
                 )}
                 <label htmlFor="cameraUpload" className="upload-icon">
                   <BsCamera className="input-icon" />
                 </label>
                 <input
                   type="file"
                   id="cameraUpload"
                   accept="image/*"
                   style={{ display: "none" }}
                   onChange={handleImageChange}
                 />
                 <label htmlFor="imageUpload" className="upload-icon">
                   <AiOutlinePicture className="input-icon" />
                 </label>
                 <input
                   type="file"
                   id="imageUpload"
                   accept="image/*"
                   style={{ display: "none" }}
                   onChange={handleImageChange}
                 />
                 <input
                   type="text"
                   placeholder="aaa shiba"
                   value={inputText}
                   onChange={(e) => setInputText(e.target.value)}
                   onKeyPress={handleKeyPress}
                 />
                 <IoSend className="send-icon" onClick={handleSendMessage} />
               </div>
             </div>
           </div>
           {showDetails && (
             <div className="info-panel">
               <div className="panel-header">
                 <h3>Thông tin hội thoại</h3>
                 <button className="close-btn" onClick={toggleDetails}>
                   ×
                 </button>
               </div>
               <div className="header-avatar">
                 <img src={avatar} alt="Avatar" />
                 <div className="name-edit">
                   <span className="user-name">{selectedUser}</span>
                   <FaPencilAlt className="edit-icon" />
                 </div>
               </div>
 
               <div className="panel-content">
                 <div className="section">
                   <h4>Ảnh/Video</h4>
                   <div className="media-grid">
                     {getChatImages().length > 0 ? (
                       getChatImages().map((image, index) => (
                         <img
                           key={`media-${index}`}
                           src={image}
                           alt={`Chat media ${index + 1}`}
                           className="media-image"
                           onClick={() => openImagePreview(image)}
                           onError={(e) => {
                             e.target.style.display = "none"; // Hide broken images
                           }}
                         />
                       ))
                     ) : (
                       <p>Không có ảnh/video</p>
                     )}
                   </div>
                 </div>
 
                 <div className="section">
                   <h4>File</h4>
                   <div className="file-list">{/* Thêm danh sách file */}</div>
                 </div>
 
                 <div className="section">
                   <h4>Link</h4>
                   <div className="link-list">
                     <a href="https://facebook.com">Facebook</a>
                     <a href="https://geeglo.com">Geeglo</a>
                     <a href="https://youtube.com">YouTube</a>
                   </div>
                 </div>
 
                 <button className="delete-btn">Xóa lịch sử trò chuyện</button>
               </div>
             </div>
           )}
         </div>
       </div>
       {previewImage && (
         <div className="image-modal" onClick={closeImagePreview}>
           <img src={previewImage} alt="Full size" className="modal-image" />
         </div>
       )}
     </>
   );
 };
 
 export default ChatInfo;
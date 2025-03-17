import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Opening from './components/Opening/Opening';
import GetStarted from './components/GetStarted/GetStarted';
import Verification from './components/Verification/Verification';
import UserSetting from './components/UserSetting/UserSetting';
import Login from "./components/Login/Login";
import FriendInfo from "./components/FriendInfo/FriendInfo";
import FriendList from "./components/FriendList/FriendList";
import SocialHub from "./components/SocialHub/SocialHub";
import ChatBox from "./components/Chat/ChatBox/ChatBox";
import ChatInfo from "./components/Chat/ChatInfo/ChatInfo";
import Chat from "./components/Chat/Chat";
import RecentChat from "./components/Chat/RecentChat/RecentChat";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Opening />}/>
          <Route path="/chat" element={<Chat />}/>
          <Route path="/chat-box" element={<ChatBox />}/>
          <Route path="/get-started" element={<GetStarted />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/verification" element={<Verification />}/>
          <Route path="/user-setting" element={<UserSetting />}/>
          <Route path="/chat-info" element={<ChatInfo />}/>
          <Route path="/friend-info" element={<FriendInfo />}/>
          <Route path="/friend-list" element={<FriendList />}/>
          <Route path="/recent-chat" element={<RecentChat />}/>
          <Route path="/social-hub" element={<SocialHub />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

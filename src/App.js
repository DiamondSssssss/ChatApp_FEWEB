import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Opening from './components/Opening/Opening';
import ChatBox from './components/ChatBox/ChatBox';
import GetStarted from './components/GetStarted/GetStarted';
import Verification from './components/Verification/Verification';
import UserSetting from './components/UserSetting/UserSetting';
import Login from "./components/Login/Login";
import ChatInfo from "./components/ChatInfo/ChatInfo";
import FriendInfo from "./components/FriendInfo/FriendInfo";
import FriendList from "./components/FriendList/FriendList";
import RecentChat from "./components/RecentChat/RecentChat";
import SocialHub from "./components/SocialHub/SocialHub";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GetStarted />}/>
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

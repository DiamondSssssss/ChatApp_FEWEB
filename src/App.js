import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import "./App.css";
import GetStarted from "./components/GetStarted/GetStarted";
import Login from "./components/Login/Login";
import Verification from "./components/Verification/Verification";
import UserSetting from "./components/UserSetting/UserSetting";
import Chat from "./components/Chat/Chat";
import ChatInfo from "./components/Chat/ChatInfo/ChatInfo";
import RecentChat from "./components/Chat/RecentChat/RecentChat";
import FriendList from "./components/Contact/FriendList/FriendList";
import SocialHub from "./components/Contact/SocialHub/SocialHub";
import Contact from "./components/Contact/Contact";
import Setting from "./components/Setting/Setting";
import Profile from "./components/Profile/Profile";
import Notification from "./components/Notification/Notification";
import Appearance from "./components/Appearance/Appearance";
import Privacy from "./components/Privacy/Privacy";
import SetPinCode from "./components/PinCode/SetPinCode/SetPinCode";
import ConfirmPinCode from "./components/PinCode/ConfirmPinCode/ConfirmPinCode";
import InviteFriend from "./components/InviteFriend/InviteFriend";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProtectedRoute = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken ? <Outlet /> : <Navigate to="/" replace />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/verification" element={<Verification />} />
          <Route path="/user-setting" element={<UserSetting />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat-info" element={<ChatInfo />} />
          <Route path="/friend-list" element={<FriendList />} />
          <Route path="/recent-chat" element={<RecentChat />} />
          <Route path="/social-hub" element={<SocialHub />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/appearance" element={<Appearance />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/pincode-set" element={<SetPinCode />} />
          <Route path="/pincode-confirm" element={<ConfirmPinCode />} />
          <Route path="/invite-friend" element={<InviteFriend />} />
        </Route>

        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;

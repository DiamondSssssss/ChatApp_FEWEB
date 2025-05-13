// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Cấu hình Firebase của bạn
const firebaseConfig = {
  apiKey: "AIzaSyCakQeCClgMq3p-mGBz2Nj99JP1kgwzoqU",
  authDomain: "chatsms-47244.firebaseapp.com",
  projectId: "chatsms-47244",
  storageBucket: "chatsms-47244.firebasestorage.app",
  messagingSenderId: "591439239659",
  appId: "1:591439239659:web:3b59b330121ac69831e1ae",
  measurementId: "G-M6L0YHMXYD",
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Xuất đối tượng `auth` để dùng xác thực OTP
export const auth = getAuth(app);

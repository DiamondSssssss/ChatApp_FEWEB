import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAR1giNBMUOYuY_Q-QrQRuvCFc-d3xZPFA",
  appId: "1:1029627845589:web:33388027982070db183b5c",
  messagingSenderId: "1029627845589",
  projectId: "chatappnew2025",
  authDomain: "chatappnew2025.firebaseapp.com",
  storageBucket: "chatappnew2025.firebasestorage.app",
  measurementId: "G-3BPXR4ZND7",
  sitekey: "6LdhXB0rAAAAAHIAq_xaBzqH-gyiTflZu8ZY-RWP",
};

// Khởi tạo Firebase
export const app = initializeApp(firebaseConfig);

// Khởi tạo Firebase Authentication và export
export const auth = getAuth(app);
console.log("Firebase app initialized:", app.name); // Should log "[DEFAULT]"
console.log("Auth instance:", auth);

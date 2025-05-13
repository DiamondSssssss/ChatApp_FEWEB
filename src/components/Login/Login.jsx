import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { toast } from "react-toastify";

import { auth } from "../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    setMessage("");
    setIsError(false);

    const formattedPhone = `+84${phone.replace(/\s/g, "").replace(/^0/, "")}`;

    if (!formattedPhone.match(/^\+84\d{9}$/)) {
      setMessage("Vui lòng nhập số điện thoại hợp lệ (ví dụ: 0123456789).");
      setIsError(true);
      setIsLoading(false);
      return;
    }

    try {
      // Chỉ tạo reCAPTCHA một lần
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
          size: "invisible",
          callback: () => {},
        });
      }

      const appVerifier = window.recaptchaVerifier;

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        appVerifier
      );

      window.confirmationResult = confirmationResult;
      localStorage.setItem("phoneNumber", formattedPhone);

      toast.success("Đã gửi mã xác thực tới điện thoại.");
      navigate("/verification");
    } catch (error) {
      console.error("Gửi OTP thất bại:", error);
      setMessage("Không gửi được mã OTP. Vui lòng thử lại.");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="phone-entry-container">
      <div className="left-section">
        <button
          className="back-button"
          onClick={handleBack}
          disabled={isLoading}
          aria-label="Quay lại"
        >
          ⬅
        </button>
        <h1>Nhập số điện thoại của bạn</h1>
        <div className="input-container">
          <div className="country-code">
            <img src="/flag.png" alt="Cờ Việt Nam" />
            <span>+84</span>
          </div>
          <input
            type="tel"
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
            disabled={isLoading}
            maxLength="10"
            aria-label="Số điện thoại"
          />
        </div>
        {message && (
          <p
            role="alert"
            className={isError ? "error-message" : "success-message"}
          >
            {message}
          </p>
        )}
        <button
          className="continue-button"
          onClick={handleLogin}
          disabled={isLoading}
          aria-label="Tiếp tục"
        >
          {isLoading ? "Đang xử lý..." : "Tiếp tục"}
        </button>
        <div id="recaptcha"></div>
      </div>
      <div className="right-section">
        <img src="/login.png" alt="Hình minh họa" />
      </div>
    </div>
  );
};

export default Login;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import "./Verification.scss";
import { login, getCurrentUser } from "../../services/auth";
import { toast } from "react-toastify";

const Verification = () => {
  const [code, setCode] = useState(new Array(6).fill(""));
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  // Retrieve phone number stored in Login
  const phoneNumber = localStorage.getItem("phoneNumber");

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && inputRefs.current[index - 1]) {
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const otp = code.join("");
    if (otp.length < 6) {
      setMessage("Vui lòng nhập đầy đủ 6 chữ số OTP.");
      setIsError(true);
      return;
    }
    setIsLoading(true);
    setMessage("");
    setIsError(false);

    try {
      // Confirm OTP with Firebase
      const confirmationResult = window.tempConfirmationResult;
      if (!confirmationResult) {
        throw new Error("Không tìm thấy session xác thực. Vui lòng thử lại.");
      }
      await confirmationResult.confirm(otp);
      // Call your login API
      const response = await login(phoneNumber);
      // const data = await response.json();

      // Assuming API returns { message, accessToken, refreshToken }
      const { message: serverMsg, accessToken, refreshToken } = response;
      if (accessToken && refreshToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      }

      if (serverMsg === "New user, please register username") {
        navigate("/user-setting");
      } else {
        const userInfoResponse = await getCurrentUser();
        if (userInfoResponse.message) {
          const username = userInfoResponse.message.split("User found: ")[1];
          toast.success("Đăng nhập thành công");
          localStorage.setItem("userName", username);
          navigate("/profile");
        } else {
          throw new Error("Something went wroong");
        }
      }
    } catch (error) {
      console.error("Xác thực OTP thất bại:", error);
      setMessage(error.message || "Xác thực thất bại. Vui lòng thử lại.");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="verification-container">
      <div className="left-section">
        <button
          className="back-button"
          onClick={handleBack}
          disabled={isLoading}
          aria-label="Quay lại"
        >
          ←
        </button>
        <h2>Nhập mã xác thực</h2>
        <p>Chúng tôi đã gửi mã xác thực đến</p>
        <p className="phone-number">{phoneNumber}</p>
        <div className="code-inputs">
          {code.map((digit, idx) => (
            <input
              key={idx}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              ref={(el) => (inputRefs.current[idx] = el)}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              disabled={isLoading}
              className="code-box"
              aria-label={`Mã OTP chữ số ${idx + 1}`}
            />
          ))}
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
          onClick={handleVerify}
          disabled={isLoading}
          aria-label="Xác thực OTP"
        >
          {isLoading ? "Đang xác thực..." : "Xác thực"}
        </button>
        <p className="resend-text">
          Chưa nhận được mã?{" "}
          <span
            className="resend-code"
            onClick={handleVerify}
            style={{ cursor: "pointer" }}
          >
            Gửi lại mã
          </span>
        </p>
      </div>
      <div className="right-section">
        <img src="/join.png" alt="Illustration" />
      </div>
    </div>
  );
};

export default Verification;

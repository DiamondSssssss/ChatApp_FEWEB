import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { auth } from "../../firebase";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

// const RECAPTCHA_SITE_KEY = "6Lfevh0rAAAAAGS0DEhGB6a5E4s6ckwkDZdDZCy_";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const setUpRecaptcha = async () => {
    try {
      console.log("Đang khởi tạo reCAPTCHA...");
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "normal",
          callback: (response) => {
            console.log("reCAPTCHA xác minh thành công, response:", response);
            setMessage("reCAPTCHA đã được xác minh.");
            setIsError(false);
          },
          "expired-callback": () => {
            console.log("reCAPTCHA hết hạn.");
            setMessage("reCAPTCHA hết hạn, vui lòng thử lại.");
            setIsError(true);
          },
        }
      );
      console.log("Đang render reCAPTCHA...");
      await window.recaptchaVerifier.render();
      console.log("reCAPTCHA render thành công.");
    } catch (error) {
      console.error("Lỗi khi khởi tạo reCAPTCHA:", error);
      setMessage(
        "Không thể khởi tạo reCAPTCHA. Vui lòng thử lại hoặc dùng trình duyệt khác."
      );
      setIsError(true);
    }
  };

  useEffect(() => {
    setUpRecaptcha();
    return () => {
      if (window.recaptchaVerifier) {
        try {
          console.log("Đang dọn dẹp reCAPTCHA...");
          window.recaptchaVerifier.clear();
          console.log("reCAPTCHA đã được dọn dẹp.");
        } catch (error) {
          console.error("Lỗi khi dọn dẹp reCAPTCHA:", error);
        }
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  const handleSendOtp = async () => {
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
      if (!window.recaptchaVerifier) {
        console.error("reCAPTCHA chưa được khởi tạo.");
        throw new Error("reCAPTCHA chưa được khởi tạo.");
      }

      console.log("Đang gửi OTP tới:", formattedPhone);
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        window.recaptchaVerifier
      );

      localStorage.setItem("phoneNumber", formattedPhone);
      window.tempConfirmationResult = confirmationResult;

      setMessage("OTP đã được gửi thành công!");
      setIsError(false);
      navigate("/verification");
    } catch (error) {
      console.error("Lỗi khi gửi OTP:", error);
      const errorMessage =
        {
          "auth/too-many-requests": "Quá nhiều lần thử, vui lòng thử lại sau.",
          "auth/invalid-phone-number": "Số điện thoại không hợp lệ.",
          "auth/captcha-check-failed":
            "Xác minh reCAPTCHA thất bại. Vui lòng thử lại hoặc dùng trình duyệt khác.",
          default:
            "Không thể gửi OTP: " +
            (error.message || "Lỗi không xác định. Vui lòng thử lại."),
        }[error.code] || error.message;
      setMessage(errorMessage);
      setIsError(true);

      if (window.recaptchaVerifier) {
        try {
          console.log("Đang reset reCAPTCHA...");
          const widgetId = await window.recaptchaVerifier.render();
          window.grecaptcha?.reset(widgetId);
          console.log("reCAPTCHA đã được reset.");
        } catch (resetError) {
          console.error("Lỗi khi reset reCAPTCHA:", resetError);
        }
      }
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
        <div id="recaptcha-container"></div>
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
          onClick={handleSendOtp}
          disabled={isLoading}
          aria-label="Gửi OTP"
        >
          {isLoading ? "Đang gửi..." : "Tiếp tục"}
        </button>
      </div>
      <div className="right-section">
        <img src="/login.png" alt="Hình minh họa" />
      </div>
    </div>
  );
};

export default Login;

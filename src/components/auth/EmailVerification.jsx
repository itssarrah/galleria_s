import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import "../../css/verification.css"; // Add any custom CSS you might have
import logo from "../../assets/images/logo.png";

function EmailVerification() {
  const { token } = useParams(); // Capture the token from the URL
  const [message, setMessage] = useState("Verifying your email...");
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}api/verify-email/${token}`
        );
        if (response.data.message === "Email verified successfully") {
          setMessage(
            "Welcome to Galleria! Your email has been verified successfully."
          );
        } else {
          setMessage("Invalid verification token.");
        }
      } catch (error) {
        setMessage("Error verifying email. Please try again.");
      }
    };

    verifyEmail();
  }, [token]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      navigate("/login");
    }
  }, [countdown, navigate]);

  return (
    <div className="verification-container">
      <img src={logo} alt="logo" />
      <h1>{message}</h1>
      {message ===
        "Welcome to Galleria! Your email has been verified successfully." && (
        <>
          <p>Redirecting to the login page in {countdown} seconds...</p>
          <button onClick={() => navigate("/login")}>Proceed to Login</button>
        </>
      )}
    </div>
  );
}

export default EmailVerification;

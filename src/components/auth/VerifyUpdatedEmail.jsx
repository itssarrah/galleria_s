import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import "../../css/verification.css"; // Add any custom CSS you might have
import logo from "../../assets/images/logo.png";

function VerifyUpdatedEmail() {
  const { token } = useParams(); // Capture the token from the URL
  const [message, setMessage] = useState("Verifying your email...");
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUpdatedEmail = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}api/verify-updated-email/${token}`
        );
        if (response.data.status === 200) {
          setMessage("Your email has been successfully updated and verified.");
        } else {
          setMessage("Invalid or expired verification token.");
        }
      } catch (error) {
        setMessage("Error verifying email. Please try again.");
      }
    };

    verifyUpdatedEmail();
  }, [token]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      navigate("/businessprofile");
    }
  }, [countdown, navigate]);

  return (
    <div className="verification-container">
      <img src={logo} alt="logo" />
      <h1>{message}</h1>
      {message === "Your email has been successfully updated and verified." && (
        <>
          <p>Redirecting to the profile page in {countdown} seconds...</p>
          <button onClick={() => navigate("/businessprofile")}>
            Proceed to profile
          </button>
        </>
      )}
    </div>
  );
}

export default VerifyUpdatedEmail;

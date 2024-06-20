import React, { useState } from "react";
import "../../css/auth.css";
import InputField from "../InputField";
import { useTranslation } from "react-i18next";
import { ContributeBtn } from "../../components/navbar";
import axios from "axios";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
// import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../config";

function ForgotPassword() {
  const { t } = useTranslation("auth");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const bgClass = "white";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // Check if the email is valid
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email address.");
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URL}api/forgot-password`, {
        email: email,
      });

      if (response.data.message === "Reset instructions sent successfully") {
        setSuccessMessage(
          "Reset instructions sent successfully. Please check your inbox."
        );
        setErrorMessage("");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage("Email not found.");
      } else {
        // Handle other errors
        setErrorMessage("Failed to send reset instructions. Please try again.");
        console.error(error);
      }
      setSuccessMessage("");
    }
  };

  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col h-screen justify-center"
        >
          <h1 className="text-center pb-2 md:pb-10 lg:pb-28 font-sofia text-2xl xl:text-6xl">
            {/* {t("forgot_pass_title")} */}
            Did You Forget Your Password ?
          </h1>
          <h6 className="text-center pb-2 font-jost text-lg xl:text-2xl text-gray-400">
            {/* {t("forgot_pass_title")} */}
            Please Enter Your Account's Email :
          </h6>

          <div className="w-full flex flex-col items-center justify-center gap-8 px-4 mt-4 md:mt-0">
            <InputField
              type="email"
              id="email"
              placeholder="abcdef@example.com"
              IconComponent={EnvelopeIcon}
              label={t("email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              errorMessage={errorMessage}
              background={bgClass}
            />

            <div className="flex flex-col w-6/12 items-center justify-around gap-1 mx-auto py-8">
              {successMessage && (
                <div className="text-green-500 text-lg">{successMessage}</div>
              )}
              <ContributeBtn
                importance="primary"
                text="Submit"
                // text={t("send_reset_instructions")}
                type="submit"
                onClick={handleSubmit}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit(e);
                  }
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ForgotPassword;

import React, { useState, useEffect } from "react";
import { AccountInformation } from "./AccountInfo";
import { PersonalInfo } from "./PersonalInfo";
import { useTranslation, Trans } from "react-i18next";
import { ContributeBtn } from "../../components/navbar";
import "../../css/auth.css";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { ImageInputOutput } from "./businessauth";
import back from "../../assets/backgrounds/Asset 1.png";
import back2 from "../../assets/backgrounds/Asset 2.png";

const UserAuth = () => {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation("auth");
  const [isNextDisabled, setIsNextDisabled] = useState(true);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullname: "",
    wilaya: "",
    birthdate: null,
  });

  function containsOnlyLettersAndSpaces(str) {
    const pattern = /^[a-zA-Z\s]+$/;
    return pattern.test(str);
  }

  const validateForm = async () => {
    let errorList = {};

    // Email Format Verification
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(formData.email)) {
      errorList.email = t("mail_error");
    }

    try {
      const response = await axios.get(
        `${BACKEND_URL}api/check-email?email=${formData.email}`
      );

      if (response.data.exists) {
        errorList.email = t("email_already_exists_error");
      }
    } catch (error) {
      console.error("Error checking email:", error);
      errorList.email = t("error_checking_email");
    }

    // Password Verification
    if (formData.password !== formData.confirmPassword) {
      errorList.passwordmatch = t("pass_match_error");
    }
    // Check for at least one lowercase character
    if (!/[a-z]/.test(formData.password)) {
      errorList.password = t("pass_lower_error");
    }

    // Password Length Verification
    if (formData.password.length < 8) {
      errorList.password = t("pass_length_error");
    }

    // Password Uppercase Letter Verification
    if (!/[A-Z]/.test(formData.password)) {
      errorList.password = t("pass_upper_error");
    }

    // Password Number Verification
    if (!/[0-9]/.test(formData.password)) {
      errorList.password = t("pass_num_error");
    }

    if (formData.email === "") {
      errorList.email = t("empty_error");
    }
    if (formData.password === "") {
      errorList.password = t("empty_error");
    }
    if (formData.confirmPassword === "") {
      errorList.confirmPassword = t("empty_error");
    }

    if (formData.birthdate) {
      const selectedYear = formData.birthdate.getFullYear();
      const currentYear = new Date().getFullYear();
      if (currentYear - selectedYear < 13) {
        errorList.birthdate = t("birth_error");
      }
    }

    if (formData.fullname.length < 3) {
      errorList.fullname = t("name_length_error");
    }

    if (!containsOnlyLettersAndSpaces(formData.fullname)) {
      errorList.fullname = t("name_error");
    }

    if (formData.fullname === "") {
      errorList.fullname = t("empty_error");
    }

    if (formData.wilaya === "") {
      errorList.wilaya = t("empty_error");
    }

    if (!formData.birthdate) {
      errorList.birthdate = t("empty_error");
    }

    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    if (file) {
      const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (!acceptedImageTypes.includes(file.type)) {
        errorList.file = t("upload_type_error");
      }

      if (file.size > 5 * 1024 * 1024) {
        errorList.file = t("upload_size_error");
      }
    }

    setErrors(errorList);
    return errorList;
  };

  useEffect(() => {
    async function runValidations() {
      const errors = await validateForm();
      setIsNextDisabled(Object.keys(errors).length !== 0);
    }

    runValidations();
  }, [formData]);
  const [isRegistered, setIsRegistered] = useState(false);

  const submitFormData = async () => {
    const actualFormData = new FormData();

    for (let key in formData) {
      actualFormData.append(key, formData[key]);
    }

    const formattedDate = formData.birthdate.toISOString().split("T")[0];
    actualFormData.set("birthdate", formattedDate);

    actualFormData.set("password_confirmation", formData.confirmPassword);

    const fileInput = document.getElementById("fileInput");
    if (fileInput && fileInput.files[0]) {
      actualFormData.append("image", fileInput.files[0]);
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}api/store-user`,
        actualFormData, // Sending the FormData object
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.message === "Registration successful") {
        setIsRegistered(true);
      }
    } catch (error) {
      console.error("There was an error sending the data", error);
      if (error.response) {
        console.error("Data:", error.response.data);
        console.error("Status:", error.response.status);
        console.error("Headers:", error.response.headers);
      } else {
        console.error("Error Message:", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="auth_header mt-2 mx-auto pb-4 text-base md:text-2xl lg:text-4xl">
        {t("normalauth_title")}
      </h1>
      <form className="w-full flex flex-col md:flex-row justify-center md:gap-[10rem] gap-0 mt-6">
        <div className="image_input scale-1 md:scale-[1.5] md:mt-[15rem] mt-0">
          <ImageInputOutput
            formData={formData}
            setFormData={setFormData}
            setErrors={setErrors}
            errors={errors}
          />
        </div>
        <div>
          <AccountInformation
            errors={errors}
            formData={formData}
            setFormData={setFormData}
            setErrors={setErrors}
            accountType="user"
          />
          <div className="py-4">
            <PersonalInfo
              errors={errors}
              formData={formData}
              setFormData={setFormData}
              setErrors={setErrors}
              bgtype="white"
            />
          </div>
          {isLoading && <div>Loading...</div>}
          {isRegistered && <div>Registration successful!</div>}
          <div className="flex w-3/12 items-center justify-around gap-1 mx-auto py-8">
            <ContributeBtn
              importance="primary"
              text={t("finish_btn")}
              onClick={submitFormData}
              disabled={isNextDisabled}
            />
          </div>
        </div>
      </form>
      <img
        src={back}
        className="absolute rotate-[270deg] left-[-8rem] top-[50%] w-6/12 blur-sm lg:left-[-20rem] lg:scale-[0.75]"
      />
      <img src={back2} className="absolute bottom-0 right-0 z-[-1] blur-sm" />
    </>
  );
};

export default UserAuth;

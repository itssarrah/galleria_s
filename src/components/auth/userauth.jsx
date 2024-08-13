import React, { useState, useEffect } from "react";
import { AccountInformation } from "./AccountInfo";
import { PersonalInfo } from "./PersonalInfo";
import { useTranslation, Trans } from "react-i18next";
import { ContributeBtn } from "../../components/navbar";
import "../../css/auth.css";
import { BACKEND_URL } from "../../config";
import axios from "axios";

import back from "../../assets/backgrounds/Asset 1.png";
import back2 from "../../assets/backgrounds/Asset 2.png";
import InterestSelection from "./interestSelection";

import defaultImage from "../../assets/images/authbiz.png";
import { PlusIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";

function ImageInputOutput({ formData, setFormData, setErrors, errors }) {
  const [imageSrc, setImageSrc] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, image: file }));
      setErrors((prev) => ({ ...prev, image: undefined }));
    }
  };

  return (
    <div className="flex flex-col items-center ">
      <img
        className="w-56 rounded-full pb-2 object-cover h-56"
        src={imageSrc ? `${imageSrc}` : defaultImage}
        alt="User input"
      />

      <input
        name="image"
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <label
        htmlFor="fileInput"
        className="label-button w-14 cursor-pointer px-4 py-2 "
      >
        <PlusIcon className="w-7 h-7" />
      </label>
      {errors.file && (
        <div className="flex items-center text-red-500 text-xs mt-1">
          <ExclamationCircleIcon className="h-4 w-4 mr-1" />
          {errors.file}
        </div>
      )}
    </div>
  );
}

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
    phone: "",
  });
  const [selectedIds, setSelectedIds] = useState([]);
  const [isFinishDisabled, setIsFinishDisabled] = useState(true);
  const handleSelectedIdsChange = (newSelectedIds) => {
    setSelectedIds(newSelectedIds);
    setIsFinishDisabled(newSelectedIds.length === 0);
  };

  function containsOnlyLettersAndSpaces(str) {
    const pattern = /^[a-zA-Z\s]+$/;
    return pattern.test(str);
  }

  const validateForm = () => {
    let errorList = {};

    // Email Format Verification
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(formData.email)) {
      errorList.email = t("mail_error");
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

    if (!formData.phone) {
      errorList.phone = t("empty_error");
    }

    setErrors(errorList);
    return errorList;
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}api/check-email?email=${email}`
      );
      return response.data.exists;
    } catch (error) {
      console.error("Error checking email:", error);
      throw new Error("Error checking email");
    }
  };

  const checkPhoneExists = async (phone) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}api/check-phone?phone=${phone}`
      );
      return response.data.exists;
    } catch (error) {
      console.error("Error checking phone:", error);
      throw new Error("Error checking phone");
    }
  };

  useEffect(() => {
    async function runValidations() {
      const errors = validateForm();
      setIsNextDisabled(Object.keys(errors).length !== 0);
    }

    runValidations();
  }, [formData]);
  const [isRegistered, setIsRegistered] = useState(false);

  const submitFormData = async () => {
    const actualFormData = new FormData();

    actualFormData.set("password_confirmation", formData.confirmPassword);

    // Append interests as an array
    selectedIds.forEach((interestId) => {
      actualFormData.append("interests[]", interestId);
    });

    const fileInput = document.getElementById("fileInput");
    if (fileInput && fileInput.files[0]) {
      actualFormData.append("image", fileInput.files[0]);
    }
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}api/store-user`,
        actualFormData
      );

      // console.log(response);

      if (response.status === 200) {
        setIsRegistered(true);
      }
    } catch (error) {
      // Error handling
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

  const [currentStep, setCurrentStep] = useState(1);
  // const handleNext = () => {
  //   setCurrentStep(currentStep + 1);
  // };

  const handleNext = async () => {
    if (currentStep === 1) {
      // Validate form data first
      const errors = validateForm();
      setErrors(errors);

      // If there are validation errors, prevent moving to the next step
      if (Object.keys(errors).length > 0) {
        setIsNextDisabled(true);
        return;
      }

      // Perform email and phone checks
      try {
        const emailExists = await checkEmailExists(formData.email);
        const phoneExists = await checkPhoneExists(formData.phone);

        if (emailExists) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: t("email_already_exists_error"),
          }));
          setIsNextDisabled(true);
          return;
        }

        if (phoneExists) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            phone: t("phone_already_exists_error"),
          }));
          setIsNextDisabled(true);
          return;
        }

        // If no errors, proceed to next step
        setCurrentStep(currentStep + 1);
        setIsNextDisabled(false);
      } catch (error) {
        console.error("Error checking email or phone:", error);
        setIsNextDisabled(true);
      }
    } else {
      // For other steps, just move to the next step
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <>
      <h1 className="auth_header mt-2 mx-auto pb-4 text-base md:text-2xl lg:text-4xl">
        {t("normalauth_title")}
      </h1>
      {currentStep === 2 && !isRegistered && (
        <h1 className="subheader mt-2 mx-auto pb-4 text-base md:text-xl lg:text-2xl">
          {t("normalauth_subtitle")}
        </h1>
      )}
      <form>
        {currentStep === 1 && !isRegistered && (
          <div className="flex w-full flex-col md:flex-row justify-center md:gap-[10rem] gap-0 mt-6">
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
                  accountType="user"
                />
              </div>
            </div>
          </div>
        )}
        {currentStep === 2 && !isRegistered && (
          <InterestSelection onSelectedIdsChange={handleSelectedIdsChange} />
        )}
        {isLoading && <div>Loading...</div>}
        {isRegistered && (
          <div className="flex flex-col items-center congrats pt-28">
            <h1 className="auth_header text-lg md:text-4xl text-center">
              Registration successful!
            </h1>
            <h1 className="input_label w-11/12 text-center text-xl md:text-5xl xl:text-6xl  pt-8">
              An email has been sent to verify your account. Please check your
              inbox.
            </h1>
            <p className="text-base font-[400] lg:text-xl w-11/12 pt-6 md:pt-12 text-center">
              Please check the <strong>SPAM</strong> in your mail you will find
              us there !
            </p>
          </div>
        )}
        {currentStep === 1 && !isRegistered && (
          <div className="flex w-3/12 items-center justify-around gap-1 mx-auto py-8">
            <ContributeBtn
              importance="primary"
              text={t("next_btn")}
              onClick={handleNext}
              disabled={isNextDisabled}
            />
          </div>
        )}
        {currentStep === 2 && !isRegistered && (
          <div className="flex w-3/12 items-center justify-around gap-1 mx-auto py-8">
            <ContributeBtn
              importance="primary"
              text={t("finish_btn")}
              onClick={() => submitFormData(selectedIds)}
              // disabled={isNextDisabled}
              disabled={isFinishDisabled}
            />
          </div>
        )}
      </form>

      <img
        src={back}
        className="absolute rotate-[270deg] left-[-8rem] top-[50%] w-6/12 blur-sm lg:left-[-20rem] lg:scale-[0.75] z-[-1]"
      />
      <img src={back2} className="absolute bottom-0 right-0 z-[-1] blur-sm" />
    </>
  );
};

export default UserAuth;

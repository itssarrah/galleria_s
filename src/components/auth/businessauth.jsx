import React, { useState, useEffect } from "react";
import "../../css/auth.css";
import defaultImage from "../../assets/images/authbiz.png";
import { ContributeBtn } from "../navbar";
import InputField from "../InputField";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import axios from "axios";
import { useTranslation, Trans } from "react-i18next";
import { BACKEND_URL } from "../../config";
import { AccountInformation } from "./AccountInfo";
import { PersonalInfo } from "./PersonalInfo";
import { Businessinfo } from "./BusinessInfo";

import {
  PlusIcon,
  CheckIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";

const Businessauth = () => {
  const [errors, setErrors] = useState({});

  const { t } = useTranslation("auth");
  const [formStep, setFormStep] = React.useState(0);
  const [order, setOrder] = useState(null);
  const [isNextDisabled, setIsNextDisabled] = useState(true);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    fullname: "",
    wilaya: "",
    birthdate: null,
    businessname: "",
    businessdesc: "",
    businessType: "",
    minPrice: "",
    maxPrice: "",
  });

  function containsOnlyLettersAndSpaces(str) {
    const pattern = /^[a-zA-Z\s]+$/;
    return pattern.test(str);
  }
  const [isLoading, setIsLoading] = useState(false);
  const submitFormData = async () => {
    const actualFormData = new FormData();
    console.log(formData);
    // Append each form field to the FormData object
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

    for (let [key, value] of actualFormData.entries()) {
      console.log(key, value);
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}api/store-business`,
        actualFormData, // Sending the FormData object
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.message === "Registration successful") {
        setOrder(response.data.order);
      } else {
        console.log(response.data.message);
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

  const validateFormStepOne = async () => {
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

    // Check for at least one special character
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(formData.password)) {
      errorList.password = t("pass_special_error");
    }
    // Phone Number Verification
    if (!/^[\d]{9}$/.test(formData.phone)) {
      errorList.phone = t("phone_error");
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
    if (formData.phone === "") {
      errorList.phone = t("empty_error");
    }

    setErrors(errorList);
    return errorList;
  };

  const validateFormStepTwo = () => {
    let errors = {}; // Initialize an empty errors object

    if (formData.birthdate) {
      const selectedYear = formData.birthdate.getFullYear();
      const currentYear = new Date().getFullYear();
      if (currentYear - selectedYear < 13) {
        errors.birthdate = t("birth_error");
      }
    }

    if (formData.fullname.length < 3) {
      errors.fullname = t("name_length_error");
    }

    if (!containsOnlyLettersAndSpaces(formData.fullname)) {
      errors.fullname = t("name_error");
    }

    if (formData.fullname === "") {
      errors.fullname = t("empty_error");
    }

    if (formData.wilaya === "") {
      errors.wilaya = t("empty_error");
    }

    if (!formData.birthdate) {
      errors.birthdate = t("empty_error");
    }
    setErrors(errors);
    return errors; // Return the errors object
  };

  const validateFormStepThree = () => {
    let errors = {}; // Initialize an empty errors object

    const minPrice = parseFloat(formData.minPrice);
    const maxPrice = parseFloat(formData.maxPrice);

    if (minPrice <= 0 || maxPrice <= 0) {
      errors.price = t("price_pos_error");
    }

    if (parseInt(formData.minPrice) >= parseInt(formData.maxPrice)) {
      errors.price = t("price_error");
    }

    if (formData.businessname.length < 3) {
      errors.businessname = t("bizname_length_error");
    }

    if (!containsOnlyLettersAndSpaces(formData.businessname)) {
      errors.businessname = t("bizname_error");
    }

    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (!file) {
      errors.file = t("upload_error");
    } else {
      const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (!acceptedImageTypes.includes(file.type)) {
        errors.file = t("upload_type_error");
      }

      if (file.size > 5 * 1024 * 1024) {
        errors.file = t("upload_size_error");
      }
    }

    if (formData.businessname === "") {
      errors.businessname = t("empty_error");
    }

    if (formData.businessdesc === "") {
      errors.businessdesc = t("empty_error");
    }

    if (formData.businessType === "") {
      errors.businessType = t("empty_error");
    }

    if (formData.minPrice === "") {
      errors.minPriceEmpty = t("empty_error");
    }

    if (formData.maxPrice === "") {
      errors.maxPriceEmpty = t("empty_error");
    }
    setErrors(errors);
    return errors; // Return the errors object
  };
  useEffect(() => {
    async function runValidations() {
      if (formStep === 0) {
        const errorsStepOne = await validateFormStepOne();
        setIsNextDisabled(Object.keys(errorsStepOne).length !== 0);
      } else if (formStep === 1) {
        const errorsStepTwo = validateFormStepTwo();
        setIsNextDisabled(Object.keys(errorsStepTwo).length !== 0);
      } else if (formStep === 2) {
        const errorsStepThree = validateFormStepThree();
        setIsNextDisabled(Object.keys(errorsStepThree).length !== 0);
      }
    }

    runValidations();
  }, [formData, formStep]); // Rerun whenever formData or formStep changes

  const completeFormStep = () => {
    if (isLoading || isNextDisabled) return;

    // If no errors, move to the next step or handle submission
    if (formStep === 0) {
      setFormStep((cur) => cur + 1);
    } else if (formStep === 1) {
      setFormStep((cur) => cur + 1);
    } else if (formStep === 2) {
      submitFormData();
      setFormStep((cur) => cur + 1);
    }
  };

  const backFormStep = () => {
    setFormStep((cur) => cur - 1);
  };
  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, [formStep]);

  const renderButton = () => {
    if (formStep > 2) {
      return undefined;
    } else if (formStep === 1) {
      return (
        <>
          <ContributeBtn
            importance="secondary"
            text="<<"
            onClick={backFormStep}
          />
          <ContributeBtn
            importance="primary"
            text=">>"
            onClick={completeFormStep}
            disabled={isNextDisabled}
          />
        </>
      );
    } else if (formStep === 2) {
      return (
        <>
          <ContributeBtn
            importance="secondary"
            text="<<"
            onClick={backFormStep}
          />
          <ContributeBtn
            importance="primary"
            text={t("finish_btn")}
            onClick={completeFormStep}
            disabled={isNextDisabled}
          />
        </>
      );
    } else if (formStep === 0) {
      return (
        <ContributeBtn
          importance="primary"
          text=">>"
          onClick={completeFormStep}
          disabled={isNextDisabled}
        />
      );
    }
  };
  return (
    <>
      <h1 className="auth_header mx-auto pb-4 text-base md:text-2xl lg:text-4xl">
        {t("auth_title")}
      </h1>
      <form>
        <div className="image_input">
          <ImageInputOutput
            formData={formData}
            setFormData={setFormData}
            setErrors={setErrors}
            errors={errors}
          />
        </div>
        <div className="bg-white rounded-lg w-10/12 mx-auto ">
          <ProgressBar step={formStep} />
          {formStep == 0 && (
            <section className="accinfo pt-24">
              <AccountInformation
                errors={errors}
                formData={formData}
                setFormData={setFormData}
                setErrors={setErrors}
              />
            </section>
          )}
          {formStep == 1 && (
            <section className="persoinfo pt-24">
              <PersonalInfo
                errors={errors}
                formData={formData}
                setFormData={setFormData}
                setErrors={setErrors}
              />
            </section>
          )}
          {formStep == 2 && (
            <section className="bizinfo pt-24">
              <Businessinfo
                errors={errors}
                formData={formData}
                setFormData={setFormData}
                setErrors={setErrors}
              />
            </section>
          )}
          {formStep == 3 && (
            <section className="flex flex-col items-center congrats pt-28">
              <h1 className="auth_header text-lg md:text-4xl ">
                <Trans
                  i18nKey="auth:success_title"
                  components={{
                    pink: <span className="subtxt p-2 rounded-3xl" />,
                  }}
                />
              </h1>
              <h1 className="input_label w-11/12 text-center text-xl md:text-5xl xl:text-6xl  pt-8">
                <Trans
                  i18nKey="auth:sucess_header"
                  components={{
                    pinktxt: <span className="heart" />,
                  }}
                  values={{ order: order }}
                />
              </h1>
              <p className="text-base lg:text-xl font-[400] w-11/12 pt-6 md:pt-12 text-center">
                <span className="heart font-bold">
                  <Trans
                    i18nKey="auth:success_marketing"
                    components={{
                      newline: <br />,
                    }}
                  />
                </span>
              </p>
              <p className="text-base lg:text-xl font-[400] w-11/12 pt-6  text-center">
                <Trans
                  i18nKey="auth:success_desc"
                  components={{
                    pinkbold: <span className="heart font-bold" />,
                  }}
                />
              </p>

              <div className=" pt-6 md:pt-12">
                <h1 className="flex auth_header text-base md:text-3xl">
                  {t("success_follow")}
                </h1>
                <div className="flex gap-2 md:gap-8">
                  <a
                    href="https://www.instagram.com/ma3ridy.dz/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="heart md:w-12 md:h-12 w-7 h-7" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@galleria_ma3ridy?_t=8fcmZiJ7W9V&_r=1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTiktok className="heart md:w-12 md:h-12 w-7 h-7" />
                  </a>
                </div>
              </div>
            </section>
          )}
          <div className="flex w-3/12 items-center justify-around gap-1 mx-auto py-8 ">
            {renderButton()}
          </div>
        </div>
      </form>
    </>
  );
};

function ImageInputOutput({ formData, setFormData, setErrors, errors }) {
  const [imageSrc, setImageSrc] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
        // Also update the formData to include the base64 representation of the image.
        setFormData((prev) => ({ ...prev, image: reader.result }));
        setErrors((prev) => ({ ...prev, image: undefined }));
      };
      reader.readAsDataURL(file);
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

function ProgressBar({ step }) {
  const { t } = useTranslation("auth");
  let widthClass;
  switch (step) {
    case 0:
      widthClass = "";
      break;
    case 1:
      widthClass = "w-6/12";
      break;
    case 2:
      widthClass = "w-full";
      break;
    default:
      widthClass = "w-full";
  }
  return (
    <>
      <div className="mt-16 w-10/12 h-1 bgline mx-auto relative rounded-full">
        {" "}
        <div className={`overlay absolute h-1 ${widthClass}`}></div>
        <div>
          <div
            className={`w-12 h-12 absolute rounded-full bgprogress top-[-20px] flex items-center justify-center text-white text-lg font-bold`}
          >
            {step > 0 ? <CheckIcon className="w-7 h-7" /> : "1"}
          </div>

          <h1 className="pt-7 w-7 h-7 text-center text-sm md:text-lg lg:text-xl">
            {t("phase_one")}
          </h1>
        </div>
        <div>
          <div
            className={`w-12 h-12  absolute rounded-full  top-[-20px] left-0 right-0 m-auto flex items-center justify-center }text-white text-lg font-bold text-white ${
              step > 0 ? "bgprogress" : "bgdefault"
            }`}
          >
            {step > 1 ? <CheckIcon className="w-7 h-7" /> : "2"}
          </div>
          <h1 className="absolute top-7 left-0 right-0 mx-auto w-11 h-7 text-center text-sm md:text-lg lg:text-xl">
            {t("phase_two")}
          </h1>
        </div>
        <div>
          <div
            className={`w-12 h-12  absolute rounded-full top-[-20px]  right-0 flex items-center justify-center text-white text-lg font-bold ${
              step > 1 ? "bgprogress" : "bgdefault"
            } `}
          >
            {step > 2 ? <CheckIcon className="w-7 h-7" /> : "3"}
          </div>
          <h1 className="w-7 h-7 top-7  text-center absolute right-6 text-sm md:text-lg lg:text-xl">
            {t("phase_three")}
          </h1>
        </div>
      </div>
    </>
  );
}

export { Businessauth };

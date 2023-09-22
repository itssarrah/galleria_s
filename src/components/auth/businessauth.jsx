import React, { useState, useEffect } from "react";
import "../../css/auth.css";
import defaultImage from "../../assets/images/authbiz.png";
import { ContributeBtn } from "../navbar";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import axios from "axios";
import { useTranslation, Trans } from "react-i18next";

import {
  PlusIcon,
  EnvelopeIcon,
  UserIcon,
  EyeIcon,
  EyeSlashIcon,
  PhoneIcon,
  BuildingStorefrontIcon,
  UserPlusIcon,
  ChevronDownIcon,
  CalendarDaysIcon,
  ArrowRightIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";

const Businessauth = () => {
  const { t } = useTranslation("auth");
  const [formStep, setFormStep] = React.useState(0);

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

  //validations
  function containsNumbers(str) {
    return /\d/.test(str);
  }
  const pattern = /^[a-zA-Z\s]+$/;
  function containsOnlyLettersAndSpaces(str) {
    const pattern = /^[a-zA-Z\s]+$/;
    return pattern.test(str);
  }

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
      const response = await axios.post(
        "http://127.0.0.1:8000/api/store-business",
        actualFormData, // Sending the FormData object
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Data submitted successfully", response.data);
    } catch (error) {
      console.error("There was an error sending the data", error);
      if (error.response) {
        console.error("Data:", error.response.data);
        console.error("Status:", error.response.status);
        console.error("Headers:", error.response.headers);
      } else {
        console.error("Error Message:", error.message);
      }
    }
  };

  const validateFormStepOne = async () => {
    // Email Format Verification
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(formData.email)) {
      alert(t("mail_error"));
      return false;
    }

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/check-email?email=${formData.email}`
      );

      if (response.data.exists) {
        alert(t("email_already_exists_error"));
        return false;
      }
    } catch (error) {
      console.error("Error checking email:", error);
      alert(t("error_checking_email"));
      return false;
    }

    // Password Verification
    if (formData.password !== formData.confirmPassword) {
      alert(t("pass_match_error"));
      return false;
    }
    // Check for at least one lowercase character
    if (!/[a-z]/.test(formData.password)) {
      alert(t("pass_lower_error"));
      return false;
    }

    // Check for at least one special character (e.g., @, #, $, etc.)
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(formData.password)) {
      alert(t("pass_special_error"));
      return false;
    }
    // Phone Number Verification
    if (!/^[\d]{9}$/.test(formData.phone)) {
      alert(t("phone_error"));
      return false;
    }
    // Password Length Verification
    if (formData.password.length < 8) {
      alert(t("pass_length_error"));
      return false;
    }

    // Password Uppercase Letter Verification
    if (!/[A-Z]/.test(formData.password)) {
      alert(t("pass_upper_error"));
      return false;
    }

    // Password Number Verification
    if (!/[0-9]/.test(formData.password)) {
      alert(t("pass_num_error"));
      return false;
    }

    if (
      formData.email === "" ||
      formData.password === "" ||
      formData.confirmPassword === "" ||
      formData.phone === ""
    ) {
      alert(t("empty_error"));
      return false;
    }
    return true;
  };

  const validateFormStepTwo = () => {
    if (formData.birthdate) {
      const selectedYear = formData.birthdate.getFullYear();
      const currentYear = new Date().getFullYear();
      if (currentYear - selectedYear < 13) {
        alert(t("birth_error"));
        return false;
      }
    }

    if (formData.fullname.length < 3) {
      alert(t("name_length_error"));
      return false;
    }
    if (!containsOnlyLettersAndSpaces(formData.fullname)) {
      alert(t("name_error"));
      return false;
    }

    if (
      formData.fullname === "" ||
      formData.wilaya === "" ||
      !formData.birthdate
    ) {
      alert(t("empty_error"));
      return false;
    }
    return true;
  };

  const validateFormStepThree = () => {
    const minPrice = parseFloat(formData.minPrice);
    const maxPrice = parseFloat(formData.maxPrice);

    if (minPrice <= 0 || maxPrice <= 0) {
      alert(t("price_pos_error"));
      return false;
    }

    // Price Verification
    if (parseInt(formData.minPrice) >= parseInt(formData.maxPrice)) {
      alert(t("price_error"));
      return false;
    }
    // Business Name Verification
    if (formData.businessname.length < 3) {
      alert(t("bizname_length_error"));
      return false;
    }

    if (!containsOnlyLettersAndSpaces(formData.businessname)) {
      alert(t("bizname_error"));
      // Handle the error
    }
    //file upload
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (!file) {
      alert(t("upload_error"));
      return false;
    }

    // Check file type
    const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];
    if (!acceptedImageTypes.includes(file.type)) {
      alert(t("upload_type_error"));
      return false;
    }

    // Check file size (Let's say we're allowing up to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert(t("upload_size_error"));
      return false;
    }

    if (
      formData.businessname === "" ||
      formData.businessdesc === "" ||
      formData.businessType === "" ||
      formData.minPrice === "" ||
      formData.maxPrice === ""
    ) {
      alert(t("empty_error"));
      return false;
    }

    return true;
  };

  const completeFormStep = async () => {
    if (formStep === 0) {
      const isValidStepOne = await validateFormStepOne();
      if (isValidStepOne) {
        setFormStep((cur) => cur + 1);
      }
    } else if (formStep === 1) {
      // If validateFormStepTwo becomes async in the future, handle it similarly.
      if (validateFormStepTwo()) {
        setFormStep((cur) => cur + 1);
      }
    } else if (formStep === 2) {
      // If validateFormStepThree becomes async in the future, handle it similarly.
      if (validateFormStepThree()) {
        submitFormData();
        setFormStep((cur) => cur + 1);
      }
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
          />
        </>
      );
    } else if (formStep === 0) {
      return (
        <ContributeBtn
          importance="primary"
          text=">>"
          onClick={completeFormStep}
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
          <ImageInputOutput formData={formData} setFormData={setFormData} />
        </div>
        <div className="bg-white rounded-lg w-10/12 mx-auto ">
          <ProgressBar step={formStep} />
          {formStep == 0 && (
            <section className="accinfo pt-24">
              <AccountInformation
                formData={formData}
                setFormData={setFormData}
              />
            </section>
          )}
          {formStep == 1 && (
            <section className="persoinfo pt-24">
              <PersonalInfo formData={formData} setFormData={setFormData} />
            </section>
          )}
          {formStep == 2 && (
            <section className="bizinfo pt-24">
              <Businessinfo formData={formData} setFormData={setFormData} />
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

const InputField = ({
  type = "text",
  id,
  placeholder,
  IconComponent,
  maxl,
  label,
  prefix,
  customh,
  value, // New prop
  onChange, // New prop
  name,
}) => {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [CurrentIcon, setCurrentIcon] = useState(IconComponent);

  const handleIconClick = () => {
    if (type === "password") {
      setPasswordVisibility(!isPasswordVisible);
      setCurrentIcon(isPasswordVisible ? EyeIcon : EyeSlashIcon);
    }
  };

  return (
    <div className="md:w-120 w-64">
      <label htmlFor={id} className={`input_label text-sm md:text-lg `}>
        {label}
      </label>
      <div className="flex relative items-center">
        {prefix && (
          <span className="absolute opacity-90 left-[-5px] md:top-[9px] top-[14px] z-[10] text-sm md:text-lg pl-4">
            {prefix}
          </span>
        )}
        <input
          name={name}
          className={`bginput text-sm md:text-lg rounded-xl px-4 py-2 w-full ${
            customh ? customh : "h-12"
          } outline-none ${prefix ? "pl-14" : "pl-4"}`}
          type={isPasswordVisible ? "text" : type}
          id={id}
          placeholder={placeholder}
          maxLength={maxl}
          value={value} // Controlled input value
          onChange={onChange} // Controlled input handler
        />
        <div
          className={`bg-white absolute right-2 top-3 md:top-1 rounded-full w-6 h-6 md:w-10 md:h-10 flex items-center justify-center ${
            type === "password" ? "cursor-pointer" : ""
          }`}
          onClick={handleIconClick}
        >
          <CurrentIcon className="md:w-7 md:h-7 w-4 h-4 heart" />
        </div>
      </div>
    </div>
  );
};

const DateInput = ({ id, label, selectedDate, setFormData }) => {
  const { t } = useTranslation("auth");
  const [startDate, setStartDate] = useState(selectedDate);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, birthdate: startDate }));
  }, [startDate, setFormData]);

  return (
    <div className="md:w-120 w-64">
      <label htmlFor={id} className="input_label text-sm md:text-lg">
        {label}
      </label>
      <div className="flex z-[99999] cursor-pointer relative ">
        <DatePicker
          name="birthdate"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="MM/dd/yyyy"
          className="bginput  text-sm md:text-lg rounded-xl px-4 py-2 md:w-120 w-64 h-12 outline-none"
          id={id}
          placeholderText="MM/dd/yyyy"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
        <div className="bg-white absolute right-2 top-3 md:top-1 rounded-full w-6 h-6 md:w-10 md:h-10 flex items-center justify-center">
          <CalendarDaysIcon className="md:w-7 md:h-7 w-4 h-4 heart" />
        </div>
      </div>
    </div>
  );
};

function AccountInformation({ formData, setFormData }) {
  const { t } = useTranslation("auth");
  return (
    <>
      <div className=" flex flex-col items-center gap-3">
        <InputField
          type="email"
          id="email"
          placeholder="abcdef@example.com"
          IconComponent={EnvelopeIcon}
          label={t("email")}
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          name="email"
        />
        <InputField
          type="password"
          id="password"
          placeholder="************"
          IconComponent={EyeIcon}
          maxl={20}
          label={t("pass")}
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
          name="password"
        />
        <InputField
          type="password"
          id="password_confirmation"
          name="password_confirmation "
          placeholder="************"
          IconComponent={EyeIcon}
          maxl={20}
          label={t("pass_conf")}
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              confirmPassword: e.target.value,
            }))
          }
        />
        <InputField
          type="tel"
          id="phone"
          name="phone"
          placeholder="00 00 00 00"
          IconComponent={PhoneIcon}
          maxl={9}
          label={t("phone")}
          prefix="+213"
          value={formData.phone}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              phone: e.target.value,
            }))
          }
        />
      </div>
    </>
  );
}

function PersonalInfo({ formData, setFormData }) {
  const { t } = useTranslation("auth");
  const [wilayas, setWilayas] = useState([]);
  const { i18n } = useTranslation();
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/wilayas")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setWilayas(data))
      .catch((error) =>
        console.error(
          "There was a problem with the fetch operation:",
          error.message
        )
      );
  }, []);
  return (
    <>
      <div className=" flex flex-col items-center gap-3">
        <InputField
          type="text"
          id="fullname"
          name="fullname"
          placeholder={t("fullname_ph")}
          IconComponent={UserPlusIcon}
          maxl={20}
          label={t("fullname")}
          value={formData.fullname}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              fullname: e.target.value,
            }))
          }
        />
        <div>
          <label htmlFor="select" className="input_label text-sm md:text-lg">
            {t("wilaya")}
          </label>
          <div className="relative md:w-120 w-64">
            <select
              name="wilaya"
              className="block cursor-pointer appearance-none w-full bginput text-sm md:text-lg rounded-xl px-4 py-2 pr-8 outline-none"
              value={formData.wilaya}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, wilaya: e.target.value }))
              }
            >
              <option disabled value="">
                {t("wilaya_ph")}
              </option>
              {wilayas.map((wilaya) => (
                <option key={wilaya.id} value={wilaya.id}>
                  {i18n.language == "ar" ? wilaya.ar_name : wilaya.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-2 top-[5px] md:top-[1.5px] flex items-center justify-center px-2 rounded-full bg-white w-6 h-6 md:w-10 md:h-10">
              <ChevronDownIcon className="w-4 h-4 md:w-7 md:h-7 heart" />
            </div>
          </div>
        </div>
        <DateInput
          id="birthdate"
          label={t("birthdate")}
          selectedDate={FormData.birthdate}
          setFormData={setFormData}
        />
      </div>
    </>
  );
}

function Businessinfo({ formData, setFormData }) {
  const { t } = useTranslation("auth");
  const [categories, setCategories] = useState([]);
  const { i18n } = useTranslation();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/categories"
        ); // adjust the endpoint if needed
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  return (
    <>
      <div className=" flex flex-col items-center gap-3">
        <InputField
          type="text"
          id="businessname"
          name="businessname"
          placeholder={t("biz_name_ph")}
          IconComponent={UserIcon}
          maxl={20}
          label={t("biz_name")}
          value={formData.businessname}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              businessname: e.target.value,
            }))
          }
        />
        <InputField
          type="text"
          id="businessdesc"
          name="businessdesc"
          placeholder={t("biz_desc_ph")}
          IconComponent={BuildingStorefrontIcon}
          maxl={80}
          label={t("biz_desc")}
          customh="h-20"
          value={formData.businessdesc}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              businessdesc: e.target.value,
            }))
          }
        />

        <div>
          <label htmlFor="select" className="input_label text-sm md:text-lg">
            {t("biz_cat")}
          </label>
          <div className="relative md:w-120 w-64">
            <select
              name="businessType"
              className="block cursor-pointer appearance-none w-full bginput text-sm md:text-lg rounded-xl px-4 py-2 pr-8 outline-none"
              value={formData.businessType}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  businessType: e.target.value,
                }))
              }
            >
              <option disabled value="">
                {t("biz_cat_ph")}
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.en_name}>
                  {i18n.language === "en"
                    ? category.en_name
                    : i18n.language === "fr"
                    ? category.fr_name
                    : category.ar_name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-2 top-[5px] md:top-[1.5px] flex items-center justify-center px-2 rounded-full bg-white w-6 h-6 md:w-10 md:h-10">
              <ChevronDownIcon className="w-4 h-4 md:w-7 md:h-7 heart" />
            </div>
          </div>
        </div>
        <label
          htmlFor="price"
          className="pt-8 text-center input_label text-sm md:text-lg"
        >
          {t("price_title")}
        </label>
        <div>
          <PriceRangeInput formData={formData} setFormData={setFormData} />
        </div>
      </div>
    </>
  );
}

const PriceRangeInput = ({ formData, setFormData }) => {
  const { t } = useTranslation("auth");
  return (
    <div className="md:w-120 w-64 flex flex-col justify-around md:flex-row  items-center  pt-2">
      <div className="flex flex-col mb-4">
        <label htmlFor="minPrice" className="input_label text-sm md:text-lg">
          {t("min_price_title")}
        </label>
        <input
          name="minPrice"
          type="number"
          id="minPrice"
          value={formData.minPrice}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, minPrice: e.target.value }))
          }
          placeholder={t("min_price_ph")}
          className="bginput text-sm md:text-lg rounded-xl px-4 py-2 w-full h-12 outline-none"
        />
      </div>
      <ArrowRightIcon className="w-10 h-10 heart hidden md:block" />
      <div className="flex flex-col">
        <label htmlFor="maxPrice" className="input_label text-sm md:text-lg">
          {t("max_price_title")}
        </label>
        <input
          name="maxPrice"
          type="number"
          id="maxPrice"
          value={formData.maxPrice}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, maxPrice: e.target.value }))
          }
          placeholder={t("max_price_ph")}
          className="bginput text-sm md:text-lg rounded-xl px-4 py-2 w-full h-12 outline-none"
        />
      </div>
    </div>
  );
};

function ImageInputOutput({ formData, setFormData }) {
  const [imageSrc, setImageSrc] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
        // Also update the formData to include the base64 representation of the image.
        setFormData((prev) => ({ ...prev, image: reader.result }));
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

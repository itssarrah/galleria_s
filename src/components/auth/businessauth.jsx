import React, { useState, useEffect } from "react";
import "../../css/auth.css";
import defaultImage from "../../assets/images/authbiz.png";
import { ContributeBtn } from "../navbar";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import axios from "axios";
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

  const validateFormStepOne = () => {
    // Email Format Verification
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(formData.email)) {
      alert("Enter a valid email format.");
      return false;
    }

    // Password Verification
    if (formData.password !== formData.confirmPassword) {
      alert("Password and confirm password should match.");
      return false;
    }
    // Check for at least one lowercase character
    if (!/[a-z]/.test(formData.password)) {
      alert("Password should contain at least one lowercase letter.");
      return false;
    }

    // Check for at least one special character (e.g., @, #, $, etc.)
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(formData.password)) {
      alert(
        "Password should contain at least one special character (@, #, $, etc.)."
      );
      return false;
    }
    // Phone Number Verification
    if (!/^[\d]{9}$/.test(formData.phone)) {
      alert("Phone number should have exactly 9 digits.");
      return false;
    }
    // Password Length Verification
    if (formData.password.length < 8) {
      alert("Password should be at least 8 characters long.");
      return false;
    }

    // Password Uppercase Letter Verification
    if (!/[A-Z]/.test(formData.password)) {
      alert("Password should contain at least one uppercase letter.");
      return false;
    }

    // Password Number Verification
    if (!/[0-9]/.test(formData.password)) {
      alert("Password should contain at least one number.");
      return false;
    }

    if (
      formData.email === "" ||
      formData.password === "" ||
      formData.confirmPassword === "" ||
      formData.phone === ""
    ) {
      alert("Please fill all fields.");
      return false;
    }
    return true;
  };

  const validateFormStepTwo = () => {
    if (formData.birthdate) {
      const selectedYear = formData.birthdate.getFullYear();
      const currentYear = new Date().getFullYear();
      if (currentYear - selectedYear < 13) {
        alert("You must be 13 years or older to register.");
        return false;
      }
    }

    if (formData.fullname.length < 3) {
      alert("Full name should be at least 3 characters long.");
      return false;
    }
    if (!containsOnlyLettersAndSpaces(formData.fullname)) {
      alert("Fullname is invalid.");
    }

    if (
      formData.fullname === "" ||
      formData.wilaya === "" ||
      !formData.birthdate
    ) {
      alert("Please fill all fields.");
      return false;
    }
    return true;
  };

  const validateFormStepThree = () => {
    const minPrice = parseFloat(formData.minPrice);
    const maxPrice = parseFloat(formData.maxPrice);

    if (minPrice <= 0 || maxPrice <= 0) {
      alert("Prices should be positive values.");
      return false;
    }

    // Price Verification
    if (parseInt(formData.minPrice) >= parseInt(formData.maxPrice)) {
      alert("Min price should be less than max price.");
      return false;
    }
    // Business Name Verification
    if (formData.businessname.length < 3) {
      alert("Business name should be at least 3 characters long.");
      return false;
    }

    // Business Description Verification
    if (formData.businessdesc.length < 3) {
      alert("Business description should be at least 3 characters long.");
      return false;
    }
    if (
      formData.businessname === "" ||
      formData.businessdesc === "" ||
      formData.businessType === "" ||
      formData.minPrice === "" ||
      formData.maxPrice === ""
    ) {
      alert("Please fill all fields.");
      return false;
    }
    if (!containsOnlyLettersAndSpaces(formData.businessname)) {
      alert("Business name is invalid.");
      // Handle the error
    }
    //file upload
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (!file) {
      alert("Please upload an image.");
      return false;
    }

    // Check file type
    const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];
    if (!acceptedImageTypes.includes(file.type)) {
      alert("Only images (jpg, jpeg, png, gif) are allowed.");
      return false;
    }

    // Check file size (Let's say we're allowing up to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Uploaded image should not exceed 5MB.");
      return false;
    }

    return true;
  };

  const completeFormStep = () => {
    if (formStep === 0) {
      if (validateFormStepOne()) {
        setFormStep((cur) => cur + 1);
      }
    } else if (formStep === 1) {
      if (validateFormStepTwo()) {
        setFormStep((cur) => cur + 1);
      }
    } else if (formStep === 2) {
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
            text="Finish"
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
        Small Business Registration :
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
                Account Created{" "}
                <span className="subtxt p-2 rounded-3xl">Successfuly</span>
              </h1>
              <h1 className="input_label w-11/12 text-center text-xl md:text-5xl xl:text-6xl  pt-8">
                You are the <span className="heart">TOP #6 </span>Small business
                to register !{" "}
              </h1>
              <p className="text-base lg:text-xl font-[400] w-11/12 pt-6 md:pt-12 text-center">
                you are on the waiting list, We will notify you once the
                platform is ready ! keep in touch and
                <span className="heart font-bold"> Stay Tuned</span>.
              </p>
              <div className=" pt-6 md:pt-12">
                <h1 className="flex auth_header text-base md:text-3xl">
                  Follow us :{" "}
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
        {label}:
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

const DateInputNew = ({ id, label, selectedDate, setFormData }) => {
  const [startDate, setStartDate] = useState(selectedDate);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, birthdate: startDate }));
  }, [startDate, setFormData]);

  const renderCustomHeader = ({ date, decreaseMonth, increaseMonth }) => (
    <div style={{ margin: 10, display: "flex", justifyContent: "center" }}>
      <button onClick={decreaseMonth}>{"<-"}</button>
      <span>{date.getFullYear()}</span>
      <button onClick={increaseMonth}>{"->"}</button>
    </div>
  );

  return (
    <div>
      <label htmlFor={id}>{label}:</label>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        renderCustomHeader={renderCustomHeader}
        showMonthDropdown={false}
        showYearDropdown={true}
        dropdownMode="select"
      />
    </div>
  );
};

const DateInput = ({ id, label, selectedDate, setFormData }) => {
  const [startDate, setStartDate] = useState(selectedDate);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, birthdate: startDate }));
  }, [startDate, setFormData]);

  return (
    <div className="md:w-120 w-64">
      <label htmlFor={id} className="input_label text-sm md:text-lg">
        {label}:
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
  return (
    <>
      <div className=" flex flex-col items-center gap-3">
        <InputField
          type="email"
          id="email"
          placeholder="abcdef@example.com"
          IconComponent={EnvelopeIcon}
          label="Email"
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
          label="Password"
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
          label="Confirm Password"
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
          label="Phone Number"
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
  return (
    <>
      <div className=" flex flex-col items-center gap-3">
        <InputField
          type="text"
          id="fullname"
          name="fullname"
          placeholder="My name"
          IconComponent={UserPlusIcon}
          maxl={20}
          label="Your Full Name"
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
            Wilaya :
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
                Choose Your Wilaya
              </option>
              <option>Bejaia</option>
              <option>Tizi Ouzou</option>
              <option>Batna</option>
            </select>
            <div className="pointer-events-none absolute right-2 top-[5px] md:top-[1.5px] flex items-center justify-center px-2 rounded-full bg-white w-6 h-6 md:w-10 md:h-10">
              <ChevronDownIcon className="w-4 h-4 md:w-7 md:h-7 heart" />
            </div>
          </div>
        </div>
        <DateInput
          id="birthdate"
          label="Your Birthday"
          selectedDate={FormData.birthdate}
          setFormData={setFormData}
        />
      </div>
    </>
  );
}

function Businessinfo({ formData, setFormData }) {
  return (
    <>
      <div className=" flex flex-col items-center gap-3">
        <InputField
          type="text"
          id="businessname"
          name="businessname"
          placeholder="Yourname.co"
          IconComponent={UserIcon}
          maxl={20}
          label="Business Name"
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
          placeholder="I make some hand made jewerly.."
          IconComponent={BuildingStorefrontIcon}
          maxl={80}
          label="Decribe Your Business"
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
            Select what type of business you hold :
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
                Choose Your Category
              </option>
              <option>Mini Cakes</option>
              <option>Accessories</option>
              <option>Crochet</option>
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
          Specify your price range :
        </label>
        <div>
          <PriceRangeInput formData={formData} setFormData={setFormData} />
        </div>
      </div>
    </>
  );
}

const PriceRangeInput = ({ formData, setFormData }) => {
  return (
    <div className="md:w-120 w-64 flex flex-col justify-around md:flex-row  items-center  pt-2">
      <div className="flex flex-col mb-4">
        <label htmlFor="minPrice" className="input_label text-sm md:text-lg">
          Min Price:
        </label>
        <input
          name="minPrice"
          type="number"
          id="minPrice"
          value={formData.minPrice}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, minPrice: e.target.value }))
          }
          placeholder="Enter min price"
          className="bginput text-sm md:text-lg rounded-xl px-4 py-2 w-full h-12 outline-none"
        />
      </div>
      <ArrowRightIcon className="w-10 h-10 heart hidden md:block" />
      <div className="flex flex-col">
        <label htmlFor="maxPrice" className="input_label text-sm md:text-lg">
          Max Price:
        </label>
        <input
          name="maxPrice"
          type="number"
          id="maxPrice"
          value={formData.maxPrice}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, maxPrice: e.target.value }))
          }
          placeholder="Enter max price"
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
            Account Information
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
            Personal Information
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
            Business Information
          </h1>
        </div>
      </div>
    </>
  );
}

export { Businessauth };

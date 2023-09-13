import React, { useState } from "react";
import "../../css/auth.css";
import defaultImage from "../../assets/images/authbiz.png";
import { ContributeBtn } from "../navbar";
import DatePicker from "react-datepicker";
import { FaInstagram, FaTiktok } from "react-icons/fa";

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
  const completeFormStep = () => {
    setFormStep((cur) => cur + 1);
  };
  const backFormStep = () => {
    setFormStep((cur) => cur - 1);
  };
  return (
    <>
      <h1 className="auth_header mx-auto pb-4 text-base md:text-2xl lg:text-4xl">
        Small Business Registration :
      </h1>
      <form>
        <div className="image_input">
          <ImageInputOutput />
        </div>
        <div className="bg-white rounded-lg w-10/12 mx-auto h-screen">
          <ProgressBar step={formStep} />
          {formStep == 0 && (
            <section className="accinfo pt-24">
              <AccountInformation />
            </section>
          )}
          {formStep == 1 && (
            <section className="persoinfo pt-24">
              <PersonalInfo />
            </section>
          )}
          {formStep == 2 && (
            <section className="bizinfo pt-24">
              <Businessinfo />
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
            <ContributeBtn
              importance="secondary"
              text="Previous"
              onClick={backFormStep}
            />
            <ContributeBtn
              importance="primary"
              text="Next"
              onClick={completeFormStep}
            />
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
          className={`bginput text-sm md:text-lg rounded-xl px-4 py-2 w-full ${
            customh ? customh : "h-12"
          } outline-none ${prefix ? "pl-14" : "pl-4"}`}
          type={isPasswordVisible ? "text" : type}
          id={id}
          placeholder={placeholder}
          maxLength={maxl}
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

const DateInput = ({ id, label }) => {
  const [startDate, setStartDate] = useState(null);

  return (
    <div className="md:w-120 w-64">
      <label htmlFor={id} className="input_label text-sm md:text-lg">
        {label}:
      </label>
      <div className="flex z-[99999] cursor-pointer relative ">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="MM/dd/yyyy"
          className="bginput  text-sm md:text-lg rounded-xl px-4 py-2 w-120 h-12 outline-none"
          id={id}
          placeholderText="MM/dd/yyyy"
        />
        <div className="bg-white absolute right-2 top-3 md:top-1 rounded-full w-6 h-6 md:w-10 md:h-10 flex items-center justify-center">
          <CalendarDaysIcon className="md:w-7 md:h-7 w-4 h-4 heart" />
        </div>
      </div>
    </div>
  );
};

function AccountInformation() {
  return (
    <>
      <div className=" flex flex-col items-center gap-3">
        <InputField
          type="email"
          id="email"
          placeholder="abcdef@example.com"
          IconComponent={EnvelopeIcon}
          label="Email"
        />
        <InputField
          type="password"
          id="password"
          placeholder="************"
          IconComponent={EyeIcon}
          maxl={20}
          label="Password"
        />
        <InputField
          type="password"
          id="password"
          placeholder="************"
          IconComponent={EyeIcon}
          maxl={20}
          label="Confirm Password"
        />
        <InputField
          type="tel"
          id="phone"
          placeholder="00 00 00 00"
          IconComponent={PhoneIcon}
          maxl={9}
          label="Phone Number"
          prefix="+213"
        />
      </div>
    </>
  );
}

function PersonalInfo() {
  return (
    <>
      <div className=" flex flex-col items-center gap-3">
        <InputField
          type="text"
          id="fullname"
          placeholder="My name"
          IconComponent={UserPlusIcon}
          maxl={20}
          label="Your Full Name"
        />
        <div>
          <label htmlFor="select" className="input_label text-sm md:text-lg">
            Wilaya :
          </label>
          <div className="relative md:w-120 w-64">
            <select className="block cursor-pointer appearance-none w-full bginput text-sm md:text-lg rounded-xl px-4 py-2 pr-8 outline-none">
              <option disabled>Choose Your Wilaya</option>
              <option>Bejaia</option>
              <option>Tizi Ouzou</option>
              <option>Batna</option>
            </select>
            <div className="pointer-events-none absolute right-2 top-[5px] md:top-[1.5px] flex items-center justify-center px-2 rounded-full bg-white w-6 h-6 md:w-10 md:h-10">
              <ChevronDownIcon className="w-4 h-4 md:w-7 md:h-7 heart" />
            </div>
          </div>
        </div>
        <DateInput id="birthdate" label="Your Birthday" />
      </div>
    </>
  );
}

function Businessinfo() {
  return (
    <>
      <div className=" flex flex-col items-center gap-3">
        <InputField
          type="text"
          id="businessname"
          placeholder="Yourname.co"
          IconComponent={UserIcon}
          maxl={20}
          label="Business Name"
        />
        <InputField
          type="text"
          id="businessdesc"
          placeholder="I make some hand made jewerly.."
          IconComponent={BuildingStorefrontIcon}
          maxl={80}
          label="Decribe Your Business"
          customh="h-20"
        />

        <div>
          <label htmlFor="select" className="input_label text-sm md:text-lg">
            Select what type of business you hold :
          </label>
          <div className="relative md:w-120 w-64">
            <select className="block cursor-pointer appearance-none w-full bginput text-sm md:text-lg rounded-xl px-4 py-2 pr-8 outline-none">
              <option selected disabled>
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
          <PriceRangeInput />
        </div>
      </div>
    </>
  );
}

const PriceRangeInput = () => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  return (
    <div className="md:w-120 w-64 flex flex-col justify-around md:flex-row  items-center  pt-2">
      <div className="flex flex-col mb-4">
        <label htmlFor="minPrice" className="input_label text-sm md:text-lg">
          Min Price:
        </label>
        <input
          type="number"
          id="minPrice"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
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
          type="number"
          id="maxPrice"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Enter max price"
          className="bginput text-sm md:text-lg rounded-xl px-4 py-2 w-full h-12 outline-none"
        />
      </div>
    </div>
  );
};

function ImageInputOutput() {
  const [imageSrc, setImageSrc] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
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

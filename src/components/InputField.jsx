import React, { useState } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import "../css/auth.css";
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
  errorMessage,
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
      {errorMessage && (
        <div className="flex items-center text-red-500 text-xs mt-1">
          <ExclamationCircleIcon className="h-4 w-4 mr-1" />
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default InputField;

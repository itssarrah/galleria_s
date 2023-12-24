import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import "../css/auth.css";

const TextArea = ({
  id,
  placeholder,
  label,
  value,
  onChange,
  name,
  errorMessage,
  background,
  rows,
  IconComponent,
}) => {
  const bgClass = background === "white" ? "bgwhite" : "bginput";

  return (
    <div className="md:w-120 w-64">
      <label htmlFor={id} className={`input_label text-sm md:text-lg `}>
        {label}
      </label>
      <div className="flex relative items-center">
        <textarea
          name={name}
          className={`${bgClass} text-sm md:text-lg rounded-xl pl-4 pr-12 py-2 w-full h-[10vh] md:h-auto outline-none`}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows || 4}
          style={{ resize: "none" }}
        />
        <div
          className={`bg-white absolute right-2 top-3 md:top-1 rounded-full w-6 h-6 md:w-10 md:h-10 flex items-center justify-center`}
        >
          <IconComponent className="md:w-7 md:h-7 w-4 h-4 heart" />
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

export default TextArea;

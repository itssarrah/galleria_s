import React, { useState, useEffect } from "react";
import "../../css/auth.css";
import InputField from "../InputField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import { BACKEND_URL } from "../../config";

import {
  UserPlusIcon,
  ChevronDownIcon,
  CalendarDaysIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";

const DateInput = ({ id, label, selectedDate, setFormData, errorMessage }) => {
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
      {errorMessage && (
        <div className="flex items-center text-red-500 text-xs mt-1">
          <ExclamationCircleIcon className="h-4 w-4 mr-1" />
          {errorMessage}
        </div>
      )}
    </div>
  );
};

function PersonalInfo({ formData, setFormData, errors, setErrors }) {
  const handleInputChange = (e, name) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };
  const { t } = useTranslation("auth");
  const [wilayas, setWilayas] = useState([]);
  const { i18n } = useTranslation();
  useEffect(() => {
    fetch(`${BACKEND_URL}api/wilayas`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setWilayas(data))
      .catch((error) =>
        console.error("There was a problem with the fetch operation:", error)
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
          onChange={(e) => handleInputChange(e, "fullname")}
          errorMessage={errors.fullname}
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
              onChange={(e) => handleInputChange(e, "wilaya")}
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
            {errors.wilaya && (
              <div className="flex items-center text-red-500 text-xs mt-1">
                <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                {errors.wilaya}
              </div>
            )}
          </div>
        </div>
        <DateInput
          id="birthdate"
          label={t("birthdate")}
          selectedDate={FormData.birthdate}
          setFormData={setFormData}
          errorMessage={errors.birthdate}
        />
      </div>
    </>
  );
}

export { PersonalInfo };

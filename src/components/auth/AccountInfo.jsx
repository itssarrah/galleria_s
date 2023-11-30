import React, { useState, useEffect } from "react";
import "../../css/auth.css";
import InputField from "../InputField";
import { useTranslation } from "react-i18next";
import {
  EnvelopeIcon,
  EyeIcon,
  PhoneIcon,
  ChevronDownIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";

function AccountInformation({
  formData,
  setFormData,
  errors,
  setErrors,
  accountType,
}) {
  const { t } = useTranslation("auth");
  const handleInputChange = (e, name) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };
  const bgClass = accountType === "user" ? "white" : "";
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
          onChange={(e) => handleInputChange(e, "email")}
          name="email"
          errorMessage={errors.email}
          background={bgClass}
        />
        <InputField
          type="password"
          id="password"
          placeholder="************"
          IconComponent={EyeIcon}
          maxl={20}
          label={t("pass")}
          value={formData.password}
          onChange={(e) => handleInputChange(e, "password")}
          name="password"
          errorMessage={errors.password}
          background={bgClass}
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
          onChange={(e) => handleInputChange(e, "confirmPassword")}
          errorMessage={errors.passwordmatch}
          background={bgClass}
        />
        {accountType === "business" && (
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
            onChange={(e) => handleInputChange(e, "phone")}
            errorMessage={errors.phone}
          />
        )}
        {/* {accountType === "user" && (
          <div>
            <label htmlFor="select" className="input_label text-sm md:text-lg">
              {t("gender")}
            </label>
            <div className="relative md:w-120 w-64">
              <select
                name="gender"
                className="block cursor-pointer appearance-none w-full bginput text-sm md:text-lg rounded-xl px-4 py-2 pr-8 outline-none"
                value={formData.gender}
                onChange={(e) => handleInputChange(e, "gender")}
              >
                <option disabled value="">
                  {t("gender_ph")}
                </option>
                <option value="male">{t("gender_male")}</option>
                <option value="female">{t("gender_female")}</option>
              </select>
              <div className="pointer-events-none absolute right-2 top-[5px] md:top-[1.5px] flex items-center justify-center px-2 rounded-full bg-white w-6 h-6 md:w-10 md:h-10">
                <ChevronDownIcon className="w-4 h-4 md:w-7 md:h-7 heart" />
              </div>
              {errors.gender && (
                <div className="flex items-center text-red-500 text-xs mt-1">
                  <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                  {errors.gender}
                </div>
              )}
            </div>
          </div>
        )} */}
      </div>
    </>
  );
}

AccountInformation.defaultProps = {
  accountType: "business",
};

export { AccountInformation };

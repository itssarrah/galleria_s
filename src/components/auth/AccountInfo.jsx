import React, { useState, useEffect } from "react";
import "../../css/auth.css";
import InputField from "../InputField";
import { useTranslation } from "react-i18next";
import { EnvelopeIcon, EyeIcon, PhoneIcon } from "@heroicons/react/24/solid";

function AccountInformation({ formData, setFormData, errors, setErrors }) {
  const { t } = useTranslation("auth");
  const handleInputChange = (e, name) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

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
          onChange={(e) => handleInputChange(e, "phone")}
          errorMessage={errors.phone}
        />
      </div>
    </>
  );
}

export { AccountInformation };

import React from "react";
import "../../css/auth.css";
import InputField from "../InputField";
import { useTranslation } from "react-i18next";
import { EnvelopeIcon, EyeIcon, PhoneIcon } from "@heroicons/react/24/solid";

function AccountInformation({
  formData,
  setFormData,
  errors,
  setErrors,
  accountType,
  update,
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
      <div className="flex flex-col items-center gap-3">
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

        {update ? (
          <>
            <InputField
              type="password"
              id="old_password"
              placeholder="************"
              IconComponent={EyeIcon}
              maxl={20}
              label="Old Password"
              value={formData.oldPassword}
              onChange={(e) => handleInputChange(e, "oldPassword")}
              name="oldPassword"
              errorMessage={errors.oldPassword}
              background={bgClass}
            />
            <InputField
              type="password"
              id="new_password"
              placeholder="************"
              IconComponent={EyeIcon}
              maxl={20}
              label="New Password"
              value={formData.newPassword}
              onChange={(e) => handleInputChange(e, "newPassword")}
              name="newPassword"
              errorMessage={errors.newPassword}
              background={bgClass}
            />
            <InputField
              type="password"
              id="confirm_new_password"
              placeholder="************"
              IconComponent={EyeIcon}
              maxl={20}
              label="Confirm New Password"
              value={formData.confirmNewPassword}
              onChange={(e) => handleInputChange(e, "confirmNewPassword")}
              name="confirmNewPassword"
              errorMessage={errors.confirmNewPassword}
              background={bgClass}
            />
          </>
        ) : (
          <>
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
              placeholder="************"
              IconComponent={EyeIcon}
              maxl={20}
              label={t("pass_conf")}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange(e, "confirmPassword")}
              name="confirmPassword"
              errorMessage={errors.passwordmatch}
              background={bgClass}
            />
          </>
        )}

        <InputField
          type="tel"
          id="phone"
          placeholder="00 00 00 00"
          IconComponent={PhoneIcon}
          maxl={10}
          label={t("phone")}
          prefix="+213"
          value={formData.phone}
          onChange={(e) => handleInputChange(e, "phone")}
          name="phone"
          errorMessage={errors.phone}
          background={bgClass}
        />
      </div>
    </>
  );
}

AccountInformation.defaultProps = {
  accountType: "business",
  update: false,
};

export { AccountInformation };

import React from "react";
import { useTranslation } from "react-i18next";
import { FaInstagram } from "react-icons/fa"; // Assuming you have an InstagramIcon available
import "../../css/auth.css"; // Make sure the CSS file is included if needed
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
function ExternalLinks({ formData, setFormData, errors, setErrors }) {
  const { t } = useTranslation("auth");

  const handleInputChange = (e, name) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  return (
    <div className="flex flex-col items-center gap-3 pt-6">
      <label htmlFor="instagramLink" className="input_label text-sm md:text-lg">
        {t("instagram_link")}
      </label>
      <div className="flex relative items-center">
        <input
          type="url"
          id="instagramLink"
          name="instagramLink"
          placeholder={t("instagram_link_ph")}
          value={formData.instagramLink}
          onChange={(e) => handleInputChange(e, "instagramLink")}
          className="bginput text-sm md:text-lg rounded-xl px-4 py-2 w-full h-12 outline-none pl-4"
        />
        <div className="bg-white absolute right-2 top-3 md:top-1 rounded-full w-6 h-6 md:w-10 md:h-10 flex items-center justify-center cursor-pointer">
          <FaInstagram className="md:w-7 md:h-7 w-4 h-4" />
        </div>
      </div>
      {errors.instagramLink && (
        <div className="flex items-center text-red-500 text-xs mt-1">
          <ExclamationCircleIcon className="h-4 w-4 mr-1" />
          {errors.instagramLink}
        </div>
      )}
    </div>
  );
}

export default ExternalLinks;

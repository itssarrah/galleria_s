import React, { useState, useEffect } from "react";
import "../../css/auth.css";
import InputField from "../InputField";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { BACKEND_URL } from "../../config";

import {
  UserIcon,
  BuildingStorefrontIcon,
  ChevronDownIcon,
  ArrowRightIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";

const PriceRangeInput = ({ formData, setFormData, errors, setErrors }) => {
  const handleInputChange = (e, name) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };
  const { t } = useTranslation("auth");
  return (
    <>
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
            onChange={(e) => handleInputChange(e, "minPrice")}
            placeholder={t("min_price_ph")}
            className="bginput text-sm md:text-lg rounded-xl px-4 py-2 w-full h-12 outline-none"
          />
          {errors.minPriceEmpty && (
            <div className="flex items-center text-red-500 text-xs mt-1">
              <ExclamationCircleIcon className="h-4 w-4 mr-1" />
              {errors.minPriceEmpty}
            </div>
          )}
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
            onChange={(e) => handleInputChange(e, "maxPrice")}
            placeholder={t("max_price_ph")}
            className="bginput text-sm md:text-lg rounded-xl px-4 py-2 w-full h-12 outline-none"
          />
          {errors.maxPriceEmpty && (
            <div className="flex items-center text-red-500 text-xs mt-1">
              <ExclamationCircleIcon className="h-4 w-4 mr-1" />
              {errors.maxPriceEmpty}
            </div>
          )}
        </div>
      </div>
      {errors.price && (
        <div className="flex items-center text-red-500 text-xs mt-1">
          <ExclamationCircleIcon className="h-4 w-4 mr-1" />
          {errors.price}
        </div>
      )}
    </>
  );
};

function Businessinfo({ formData, setFormData, errors, setErrors }) {
  const handleInputChange = (e, name) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };
  const { t } = useTranslation("auth");
  const [categories, setCategories] = useState([]);
  const { i18n } = useTranslation();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}api/categories`);
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
          onChange={(e) => handleInputChange(e, "businessname")}
          errorMessage={errors.businessname}
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
          onChange={(e) => handleInputChange(e, "businessdesc")}
          errorMessage={errors.businessdesc}
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
              onChange={(e) => handleInputChange(e, "businessType")}
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
          {errors.businessType && (
            <div className="flex items-center text-red-500 text-xs mt-1">
              <ExclamationCircleIcon className="h-4 w-4 mr-1" />
              {errors.businessType}
            </div>
          )}
        </div>
        <label
          htmlFor="price"
          className="pt-8 text-center input_label text-sm md:text-lg"
        >
          {t("price_title")}
        </label>
        <div>
          <PriceRangeInput
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        </div>
      </div>
    </>
  );
}

export { Businessinfo };

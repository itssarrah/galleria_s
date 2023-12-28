import React, { useState } from "react";
import "../../css/product.css";
import InputField from "../InputField";
import { useTranslation } from "react-i18next";
import TextArea from "../TextArea";
import {
  TagIcon,
  BuildingStorefrontIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";

function ProductDetails({ formData, setFormData, errors, setErrors }) {
  const [isExpanded, setExpanded] = useState(true);

  const toggleExpansion = () => {
    setExpanded(!isExpanded);
  };

  const handleInputChange = (e, name) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  return (
    <div
      className={`expansion-panel mx-auto md:mx-0  ${
        isExpanded ? "expanded" : ""
      }`}
    >
      <div
        className="expansion-panel-header  p-4 text-xl md:text-2xl xl:text-3xl "
        onClick={toggleExpansion}
      >
        <h2 className="expan_title">Product Information</h2>
        <span className={`arrow mr-2 ${isExpanded ? "up" : "down"}`}></span>
      </div>
      <div className="expansion-panel-content flex flex-col items-center pb-10">
        <InputField
          type="text"
          id="product_name"
          placeholder="Mini Cake.."
          IconComponent={TagIcon}
          label="Product Name"
          value={formData.product_name}
          onChange={(e) => handleInputChange(e, "product_name")}
          name="product_name"
          errorMessage={errors.product_name}
        />
        <TextArea
          id="product_description"
          label="Product Description"
          placeholder="Phasellus bibendum turpis ut ipsum egestas, sed sollicitudin elit convallis."
          value={formData.product_description}
          IconComponent={BuildingStorefrontIcon}
          onChange={(e) => handleInputChange(e, "product_description")}
          name="product_description"
          errorMessage={errors.product_description}
          rows={2}
        />
        <InputField
          type="number"
          id="product_price"
          placeholder="1000.00 DZD"
          IconComponent={CurrencyDollarIcon}
          label="Product Price"
          value={formData.product_price}
          onChange={(e) => handleInputChange(e, "product_price")}
          name="product_price"
          errorMessage={errors.product_price}
        />
      </div>
    </div>
  );
}

export default ProductDetails;

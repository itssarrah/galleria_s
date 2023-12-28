import React, { useState } from "react";
import { ReceiptPercentIcon } from "@heroicons/react/24/solid";

import InputField from "../InputField";

function ProductDiscount({ formData, setFormData, errors, setErrors }) {
  const [isExpanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!isExpanded);
  };

  return (
    <div
      className={`expansion-panel  mx-auto md:mx-0  ${
        isExpanded ? "expanded" : ""
      }`}
    >
      <div
        className="expansion-panel-header  p-4 text-xl md:text-2xl xl:text-3xl "
        onClick={toggleExpansion}
      >
        <h2 className="expan_title">Sale / Discount</h2>
        <span className={`arrow mr-2 ${isExpanded ? "up" : "down"}`}></span>
      </div>
      <div className="expansion-panel-content flex flex-col items-center pb-4">
        <InputField
          type="number"
          id="sale_price"
          placeholder="1000.00 DZD"
          IconComponent={ReceiptPercentIcon}
          label="Sale Price"
          value={formData.sale_price}
          onChange={(e) => {
            setFormData((prev) => ({
              ...prev,
              sale_price: e.target.value,
            }));
            setErrors((prev) => ({ ...prev, sale_price: undefined }));
          }}
          name="sale_price"
          errorMessage={errors.sale_price}
        />
      </div>
    </div>
  );
}

export default ProductDiscount;

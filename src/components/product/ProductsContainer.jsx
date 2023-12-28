import React from "react";
import { useState } from "react";

import { Link } from "react-router-dom";

import ItemCard from "../cards/ItemCard";

import "../../css/product.css";
import { useTranslation } from "react-i18next";

const ProductsContainer = ({ products = [], browseMore = true, editable=false }) => {
  const { t } = useTranslation("product");
  const initialMaxProductDisplay = 8;
  const productsCount = products.length;
  const [maxProductDisplay, setMaxProductDisplay] = useState(
    initialMaxProductDisplay
  );

  const direction = t("direction");

  return (
    <div className="flex flex-col justify-center align-center">
      <div>
        {browseMore && (
          <h2
            className="product-title pb-5 mb-1 md:mb-5 text-2xl lg:text-3xl xl:text-4xl"
            dir={direction}
          >
            {`${t("browse_more")}: `}
          </h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-y-[2rem] gap-x-10">
          {products.slice(0, maxProductDisplay).map((product, index) => (
            <div className="w-5rem">
              <ItemCard key={index} {...product} editable={editable} />
            </div>
          ))}
        </div>
      </div>

      {productsCount > maxProductDisplay && (
        <Link
          className="block w-full text-center p-3 link"
          onClick={() =>
            setMaxProductDisplay((prevMax) =>
              Math.min(productsCount, prevMax * 2)
            )
          }
        >
          {t("show_more")}
        </Link>
      )}
      {maxProductDisplay > initialMaxProductDisplay && (
        <Link
          className="block w-full text-center p-3 link"
          onClick={() => setMaxProductDisplay(initialMaxProductDisplay)}
        >
          {t("show_less")}
        </Link>
      )}
    </div>
  );
};

export default ProductsContainer;

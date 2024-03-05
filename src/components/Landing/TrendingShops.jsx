import React from "react";
import { useTranslation } from "react-i18next";
import ShopCardSlider from "./ShopCardSlider";
import { useQuery } from "react-query";
import { BACKEND_URL } from "../../config";
import { ClipLoader } from "react-spinners";
import useTrendingShops from "../../api/fetchTrendingShops";

function TrendingShops(props) {
  const { t } = useTranslation("homepage");

  const {
    data: topCategoriesAndBusinesses = [],
    isLoading,
    isError,
  } = useTrendingShops();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <ClipLoader color="#DD6969" size={50} />
      </div>
    );
  }

  if (isError) {
    return <p>Error fetching products</p>;
  }

  return (
    <div {...props}>
      {topCategoriesAndBusinesses &&
        !isLoading &&
        !isError &&
        topCategoriesAndBusinesses.map((result, i) => (
          <div key={i}>
            <h1 className="category_name relative text-base sm:text-lg md:text-xl lg:text-2xl pb-4">
              {t("category_production")} {result.en_name}
            </h1>
            <ShopCardSlider businesses={result.businesses} />
          </div>
        ))}
    </div>
  );
}

export default TrendingShops;

import React from "react";
import { useTranslation } from "react-i18next";
import ShopCardSlider from "./ShopCardSlider";
import { useQuery } from "react-query";
import { BACKEND_URL } from "../../config";
import { ClipLoader } from "react-spinners";

function TrendingShops(props) {
  const { t } = useTranslation("homepage");

  const {
    data: topCategoriesAndBusinesses,
    isLoading,
    isError,
  } = useQuery("topCategoriesAndBusinesses", async () => {
    const response = await fetch(
      `${BACKEND_URL}api/top-businesses-by-category`
    );
    const data = await response.json();
    return data;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <ClipLoader color="#DD6969" size={50} />
      </div>
    );
  }

  if (isError || !topCategoriesAndBusinesses) {
    return <div>Error loading data</div>;
  }

  return (
    <div {...props}>
      {topCategoriesAndBusinesses.data.map((result) => (
        <div>
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

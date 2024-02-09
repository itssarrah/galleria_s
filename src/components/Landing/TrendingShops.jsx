import React from "react";
import { useTranslation } from "react-i18next";
import ShopCardSlider from "./ShopCardSlider";
import { useQuery } from "react-query";
import { BACKEND_URL } from "../../config";

function TrendingShops(props) {
  const { t } = useTranslation("homepage");

  const {
    data: topCategoriesAndBusinesses,
    isLoading,
    isError,
  } = useQuery("topCategoriesAndBusinesses", async () => {
    // const response = await fetch(
    //   `${BACKEND_URL}api/top-businesses-by-category`
    // );
    // const data = await response.json();
    // console.log(data);
    // return data;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !topCategoriesAndBusinesses) {
    return <div>Error loading data</div>;
  }

  return (
    <div {...props}>
      <div className="pb-12">
        <h1 className="primary_txt">{t("shop_header")}</h1>
        <h2 className="secondary_txt">{t("shop_subheader")}</h2>
      </div>
      {topCategoriesAndBusinesses.data.map((result) => (
        <div>
          <h1 className="category_name relative text-base sm:text-lg md:text-xl lg:text-2xl pb-4">
            {t("category_production")} {result.category.en_name}
          </h1>
          <ShopCardSlider businesses={result.businesses} />
        </div>
      ))}
    </div>
  );
}

export default TrendingShops;

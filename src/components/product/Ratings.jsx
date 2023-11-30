import React from "react";
import Stars from "../Stars";
import { AiFillStar } from "react-icons/ai";

// css
import "../../css/product.css";
import { useTranslation } from "react-i18next";

const calculateAverage = (ratings, totalRatings) => {
  let weightedSum = 0;

  Object.entries(ratings).forEach(([rating, count]) => {
    weightedSum += rating * count;
  });

  return weightedSum / totalRatings;
};

const RatingBar = ({ percentage = 50 }) => {
  const style = {
    width: `${percentage}%`,
  };
  return (
    <div className="bar w-full h-7 md:h-8 lg:h-9 xl:h-10">
      <div style={style}></div>
    </div>
  );
};

const RatingsChart = ({ ratings, totalRatings }) =>
  [5, 4, 3, 2, 1].map((k) => (
    <div className="w-full">
      <div key={`rc-${k}`} className="rating-container">
        <span className="text-xl lg:text-2xl font-bold flex mr-5">
          {k}
          <AiFillStar className="text-[2rem] text-[#dd6969] inline" />
        </span>
        <RatingBar
          percentage={(100 * (ratings[k] ? ratings[k] : 0)) / totalRatings}
        />
      </div>
    </div>
  ));

const Ratings = ({ ratings = {} }) => {
  const { t } = useTranslation("product");
  const totalRatings = Object.values(ratings).reduce((a, b) => a + b);
  if (totalRatings === 0) return "No ratings yet";

  const average = calculateAverage(ratings, totalRatings);
  const direction = t("direction");

  return (
    <div >
      <h2 className="product-title mb-1 md:mb-5 text-2xl lg:text-3xl xl:text-4xl" dir={direction}>
        {t("reviews")}
      </h2>
      <Stars average={average} showText={true} dir={direction}/>
      <p className="font-bold mt-2" dir={direction}>
        {totalRatings} {t("total_ratings")}
      </p>
      <RatingsChart ratings={ratings} totalRatings={totalRatings} />
    </div>
  );
};

export default Ratings;

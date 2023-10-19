import React from "react";
import Stars from "./Stars";
import { AiFillStar } from "react-icons/ai";

// css
import "./product.css";

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
    <div className="bar w-full">
      <div style={style}></div>
    </div>
  );
};

const RatingsChart = ({ ratings, totalRatings }) =>
  [5, 4, 3, 2, 1].map((k) => (
    <div key={`rc-${k}`} className="rating-container">
      <span className="text-2xl font-bold flex mr-5">
        {k}
        <AiFillStar className="star-icon filled inline" />
      </span>
      <RatingBar
        percentage={(100 * (ratings[k] ? ratings[k] : 0)) / totalRatings}
      />
    </div>
  ));

const Ratings = ({ ratings = {} }) => {
  const totalRatings = Object.values(ratings).reduce((a, b) => a + b);
  if (totalRatings === 0) return "No ratings yet";

  const average = calculateAverage(ratings, totalRatings);

  return (
    <div>
      <h2 className="product-title">Reviews</h2>
      <Stars average={average} showText={true} />
      <p className="font-bold mt-2">{totalRatings} Total Ratings</p>
      <RatingsChart ratings={ratings} totalRatings={totalRatings} />
    </div>
  );
};

export default Ratings;

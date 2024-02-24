import React from "react";
import StarRatings from "react-star-ratings";

function InteractableStartsInput({ average, onChange, totalNumberOfStars }) {
  return (
    <StarRatings
      rating={average}
      starRatedColor="#dd6969"
      starHoverColor="#dd6969"
      changeRating={onChange}
      numberOfStars={totalNumberOfStars}
      starDimension="4rem"
      starSpacing="2px"
      svgIconViewBox="0 0 60 60" // Optional, based on your preference
    />
  );
}

export default InteractableStartsInput;

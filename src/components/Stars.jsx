import React from "react";
import { AiFillStar } from "react-icons/ai";

const Stars = ({ average = 0, totalNumberOfStars = 5, showText = false }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(Math.floor(totalNumberOfStars))].map((_, index) => (
        <AiFillStar
          key={`s-${index}`}
          className={`text-[2rem] ${
            index + 1 <= average ? "text-[#dd6969]" : "text-[#959595]"
          }`}
        />
      ))}{" "}
      {showText && (
        <span className="font-bold ml-3">
          {parseFloat(average.toFixed(2))} out of {totalNumberOfStars}
        </span>
      )}
    </div>
  );
};

export default Stars;

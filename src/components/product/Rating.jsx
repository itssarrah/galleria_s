import React from "react";

export const RatingBar = ({ percentage = 50 }) => {
  const style = {
    width: `${percentage}%`,
  };
  return (
    <div className="bar">
      <div style={style}></div>
    </div>
  );
};

const Rating = ({
  ratings = {
    0: 0,
    1: 10,
    2: 0,
    3: 50,
    4: 0,
    5: 100,
  },
}) => {
  const totalRatings = Object.values(ratings).reduce((a, b) => a + b);
  if (totalRatings === 0) return "No ratings yet";
  const ratingsRatios = Object.fromEntries(
    Object.entries(ratings).map(([rating, count]) => {
      return <RatingBar percentage={(100 * count) / totalRatings} />;
    })
  );

  return Object.entries(ratings).map(([rating, count]) => {
    return <RatingBar percentage={(100 * count) / totalRatings} />;
  });
};

export default Rating;

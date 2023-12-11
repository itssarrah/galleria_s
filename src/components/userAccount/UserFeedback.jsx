import React from "react";
import ReviewBar from "../reviews/reviewBar";
import ReviewCard from "../reviews/ReviewCard";
function UserFeedback() {
  return (
    <>
      <ReviewBar />
      <div className="mt-12 flex flex-wrap gap-10 lg:gap-16 justify-center">
        <div className="grid xl:grid-cols-3 gap-3 md:gap-4 xl:gap-8 md:grid-cols-2 grid-cols-1 px-12 py-8">
          {[...Array(8)].map((_) => (
            <ReviewCard />
          ))}
        </div>
      </div>
    </>
  );
}

export default UserFeedback;

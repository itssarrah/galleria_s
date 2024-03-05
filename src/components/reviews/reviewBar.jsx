import React from "react";
import { useState } from "react";
function ReviewBar({ type = "user", onReviewTypeChange, reviewType }) {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (index) => {
    if (activeButton === index) {
      setActiveButton(null);
    } else {
      setActiveButton(index);
    }
  };

  const handleSelectChange = (event) => {
    const newReviewType = event.target.value;
    onReviewTypeChange(newReviewType);
  };

  return (
    <nav className="w-full flex flex-row bg-white px-4 p-4 justify-between items-center z-[9] mt-8 md:px-20 md:gap-0 gap-2">
      <div className="text-[18px]">
        {type == "user" ? (
          <button
            className={`hover:text-main__pink ${
              activeButton === 7 ? "text-main__pink" : ""
            }`}
            onClick={() => handleButtonClick(7)}
          >
            All Feedbacks
          </button>
        ) : (
          <div className="text-[18px] ">
            <select
              className="cursor-pointer outline-none"
              onChange={handleSelectChange}
              value={reviewType}
            >
              <option value="my_reviews">My Products Reviews</option>
              <option value="posted_reviews">Posted Reviews</option>
            </select>
          </div>
        )}
      </div>
      {/* <div className="w-1/4 hidden xl:flex justify-between text-[18px] ">
        <button
          className={`hover:text-main__pink ${
            activeButton === 0 ? "text-main__pink" : ""
          }`}
          onClick={() => handleButtonClick(0)}
        >
          Latest
        </button>
        <button
          className={`hover:text-main__pink ${
            activeButton === 1 ? "text-main__pink" : ""
          }`}
          onClick={() => handleButtonClick(1)}
        >
          Oldest
        </button>
        <button
          className={`hover:text-main__pink ${
            activeButton === 2 ? "text-main__pink" : ""
          }`}
          onClick={() => handleButtonClick(2)}
        >
          5
        </button>
        <button
          className={`hover:text-main__pink ${
            activeButton === 3 ? "text-main__pink" : ""
          }`}
          onClick={() => handleButtonClick(3)}
        >
          4
        </button>
        <button
          className={`hover:text-main__pink ${
            activeButton === 4 ? "text-main__pink" : ""
          }`}
          onClick={() => handleButtonClick(4)}
        >
          3
        </button>
        <button
          className={`hover:text-main__pink ${
            activeButton === 5 ? "text-main__pink" : ""
          }`}
          onClick={() => handleButtonClick(5)}
        >
          2
        </button>
        <button
          className={`hover:text-main__pink ${
            activeButton === 6 ? "text-main__pink" : ""
          }`}
          onClick={() => handleButtonClick(6)}
        >
          1
        </button>
      </div>
      <div className="text-[18px] block xl:hidden ">
        <select className="cursor-pointer outline-none">
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="five">5</option>
          <option value="four">4</option>
          <option value="three">3</option>
          <option value="two">2</option>
          <option value="one">1</option>
        </select>
      </div> */}
    </nav>
  );
}

export default ReviewBar;

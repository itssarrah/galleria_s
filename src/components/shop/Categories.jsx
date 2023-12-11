import React, { useState } from "react";

function Categories() {
  const categories = ["All Categories", "Electronics", "Clothing", "Books"];
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (index) => {
    if (activeButton === index) {
      setActiveButton(null);
    } else {
      setActiveButton(index);
    }
  };

  return (
    <nav className="w-full flex flex-row bg-white p-4 justify-between items-center z-[9]">
      <div className="text-[18px]">
        <button
          className={`hover:text-main__pink ${
            activeButton === 4 ? "text-main__pink" : ""
          }`}
          onClick={() => handleButtonClick(4)}
        >
          All Categories
        </button>
      </div>
      <div className="w-1/4 hidden xl:flex justify-between text-[18px] ">
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
          Popular
        </button>
        <button
          className={`hover:text-main__pink ${
            activeButton === 2 ? "text-main__pink" : ""
          }`}
          onClick={() => handleButtonClick(2)}
        >
          BestSeller
        </button>
        <button
          className={`hover:text-main__pink ${
            activeButton === 3 ? "text-main__pink" : ""
          }`}
          onClick={() => handleButtonClick(3)}
        >
          Sales
        </button>
      </div>
      <div className="text-[18px] block xl:hidden ">
        <select className="cursor-pointer outline-none">
          <option value="latest">Latest</option>
          <option value="popular">Popular</option>
          <option value="bestseller">BestSeller</option>
          <option value="sales">Sales</option>
        </select>
      </div>
    </nav>
  );
}

export default Categories;

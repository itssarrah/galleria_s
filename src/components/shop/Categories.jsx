import React, { useState } from "react";

function Categories({ clearCategories, selectedCategories, handleFilter }) {
  const filterOptions = [""];
  // const filterOptions = ["Latest", "Sales", "Oldest", "Popular"];
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (index) => {
    setActiveButton(index);

    // Check if the button with index 4 is clicked
    if (index === 4) {
      // Call the function to clear categories
      clearCategories();
    } else {
      // Call the function to handle the filter option
      handleFilter(filterOptions[index]);
    }
  };

  return (
    <nav className="w-full flex flex-row bg-white p-4 justify-between items-center z-[9]">
      <div className="text-[18px]">
        <button
          className={`hover:text-main__pink ${
            activeButton === 4 ||
            (selectedCategories.length === 0 && activeButton === null)
              ? "text-main__pink"
              : ""
          }`}
          onClick={() => handleButtonClick(4)}
        >
          All Categories
        </button>
      </div>
      {/* <div className="w-1/4 hidden xl:flex justify-between text-[18px] ">
        {filterOptions.map((option, index) => (
          <button
            key={index}
            className={`hover:text-main__pink ${
              activeButton === index ? "text-main__pink" : ""
            }`}
            onClick={() => handleButtonClick(index)}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="text-[18px] block xl:hidden ">
        <select className="cursor-pointer outline-none">
          {filterOptions.map((option, index) => (
            <option key={index} value={option.toLowerCase()}>
              {option}
            </option>
          ))}
        </select>
      </div> */}
    </nav>
  );
}

export default Categories;

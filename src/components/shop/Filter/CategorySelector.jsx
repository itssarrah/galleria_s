import React from "react";

function CategorySelector({ categories, handleCategoryClick }) {
  return (
    <>
      <p className="text-black font-sofia text-[22px] text-left">
        Categories Selected :
      </p>

      <div>
        <ul className="list-none pl-2 space-y-1 w-full ">
          {categories.map((category, index) => (
            <li
              key={index}
              className={`text-black font-jost  text-18px text-left flex justify-between gap-10 w-full px-2 cursor-pointer`}
              onClick={() => handleCategoryClick(index)}
            >
              <span
                className={`${
                  category.clicked ? "text-[#FF9494]" : "opacity-30"
                } font-jost text-18px w-fit `}
              >
                {category.name}
              </span>{" "}
              <span className="font-jost text-18px opacity-70">
                {category.num_search}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default CategorySelector;

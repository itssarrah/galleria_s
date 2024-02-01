import { useState } from "react";
import "../../css/Filtre.css";
import { FaChevronDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa";

function CategoryList({ toggleItem, categories }) {
  const [listOpen, setListOpen] = useState(false);

  return (
    <div className="categories">
      <div>
        <p className="text-black font-sofia text-[22px] text-left">
          Categories Selected :
        </p>
        <button onClick={() => setListOpen((open) => !open)}>
          {listOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
      <ul
        className={`list-none pl-2 space-y-1 ${
          !listOpen ? "categories--open" : ""
        }`}
      >
        {categories.map((category, index) => (
          <li
            key={index}
            className={`text-black font-sunflower text-18px text-left flex gap-8  xl:gap-20 px-2 cursor-pointer`}
            onClick={() => {
              toggleItem(index, category);
            }}
          >
            <span
              className={`${
                category.clicked ? "text-[#FF9494]" : "opacity-30"
              } font-sunflower text-18px `}
            >
              {category.name}
            </span>{" "}
            <span className="font-sunflower text-18px opacity-70">
              {category.num_search}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;

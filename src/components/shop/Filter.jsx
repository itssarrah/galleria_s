import React, { useState, useRef, useEffect } from "react";
import MultiRangeSlider from "./MultiRangeSlider";
import filterIcon from "../../assets/icons/filter.svg";
import { useQuery } from "react-query";
import Format from "./Format";
import Select from "react-select";
import { BACKEND_URL } from "../../config";

const Filter = ({ type }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [formData, setFormData] = useState({
    selectedFormat: "items/products",
    selectedCategories: [],
    minPrice: 0,
    maxPrice: 1000,
    selectedWilayas: [],
  });

  const {
    data: wilayasList,
    isLoading,
    isError,
  } = useQuery("wilayas", async () => {
    const response = await fetch(`${BACKEND_URL}api/wilayas`);
    const data = await response.json();
    return data;
  });

  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useQuery("categories", async () => {
    const response = await fetch(`${BACKEND_URL}api/categories`);
    const data = await response.json();
    console.log(data);
    return data;
  });

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const handleResize = () => {
    if (window.innerWidth >= 1280) {
      setShowFilter(false);
    }
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const threshold = 400;
    setIsFixed(scrollPosition > threshold);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleWilayaClick = (selectedOption) => {
    setFormData({
      ...formData,
      selectedWilayas: [...formData.selectedWilayas, selectedOption],
    });
  };

  const handleCategoryClick = (index) => {
    const updatedCategories = [...formData.selectedCategories];
    updatedCategories[index].clicked = !updatedCategories[index].clicked;
    setFormData({
      ...formData,
      selectedCategories: updatedCategories,
    });
  };

  const handleSliderChange = ({ min, max }) => {
    console.log(min, max);
    setFormData((prevData) => ({
      ...prevData,
      minPrice: min,
      maxPrice: max,
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !wilayasList) {
    return <div>Error loading data</div>;
  }

  if (categoriesLoading) {
    return <div>Loading categories...</div>;
  }

  if (categoriesError || !categories) {
    return <div>Error loading categories</div>;
  }

  return (
    <div className="relative">
      <button
        className="xl:hidden fixed left-4 bottom-8 px-4 py-2 z-[11] flex items-center"
        onClick={toggleFilter}
      >
        <img src={filterIcon} alt="Filter Icon" className="w-16 h-16 mr-2" />
      </button>
      {isFixed && (
        <div className="w-[258px] h-screen bg-transparent xl:block hidden"></div>
      )}
      <div
        className={`w-[258px] h-screen z-10 bg-white border-white overflow-y-auto flex-col transition-all duration-300 ${
          showFilter
            ? isFixed
              ? "fixed top-[5em] left-0 xl:flex"
              : "absolute top-[6em] xl:top-0 left-0 xl:flex"
            : isFixed
            ? "hidden xl:block xl:bg-transparent xl:border-white xl:border-[5px] fixed top-[6em] left-0"
            : "hidden xl:flex xl:bg-transparent xl:border-white xl:border-[5px] "
        }`}
      >
        <p className="text-center text-[30px] font-sunflower text-[rgb(255,148,148)] font-bold mt-12">
          FILTER
        </p>
        <div className="flex flex-col items-start justify-start px-2 py-8 gap-[20px]">
          <Format type={type} formData={formData} setFormData={setFormData} />
          <p className="text-black font-sofia text-[22px] text-left">
            Categories Selected :
          </p>

          <div>
            <ul className="list-none pl-2 space-y-1">
              {categories.map((category, index) => (
                <li
                  key={index}
                  className={`text-black font-sunflower text-18px text-left flex gap-8 xl:gap-20 px-2 cursor-pointer`}
                  onClick={() => handleCategoryClick(index)}
                >
                  <span
                    className={`${
                      category.clicked ? "text-[#FF9494]" : "opacity-30"
                    } font-sunflower text-18px `}
                  >
                    {/* {category._name} */}
                  </span>{" "}
                  <span className="font-sunflower text-18px opacity-70">
                    {/* 1023 */}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-black font-sofia text-[22px] text-left mt-2">
            Price Ranges :
          </p>
          <MultiRangeSlider min={0} max={1000} onChange={handleSliderChange} />

          <p className="text-black font-sofia text-[22px] text-left">
            Wilaya :
          </p>

          <Select
            className="w-[90%] mx-auto font-jost "
            isSearchable
            placeholder="Select Wilaya..."
            options={wilayasList
              .filter(
                (wilaya) =>
                  !formData.selectedWilayas.some(
                    (selectedWilaya) => selectedWilaya.value === wilaya.name
                  )
              )
              .map((wilaya) => ({
                value: wilaya.name,
                label: wilaya.name,
              }))}
            onChange={handleWilayaClick}
          />

          {formData.selectedWilayas.length > 0 && (
            <div>
              <ul className="list-none pl-4 space-y-1 pb-[10rem]">
                {formData.selectedWilayas.map((wilaya, index) => (
                  <li
                    key={index}
                    className="text-black font-jost text-18px text-left space-x-20 px-2 "
                  >
                    <span className="font-jost text-18px">{wilaya.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;

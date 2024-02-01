/* eslint-disable */

import React, { useState, useRef, useEffect } from "react";
import MultiRangeSlider from "./MultiRangeSlider";
import filterIcon from "../../assets/icons/filter.svg";
import { useForm } from "react-hook-form";

const wilayasList = [
  { name: "Adrar" },
  { name: "Chlef" },
  { name: "Laghouat" },
];

const Filter = ({ type }) => {
  const { register, handleSubmit, watch } = useForm();

  const [showFilter, setShowFilter] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  useEffect(() => {
    // Close the filter when the screen size is xl
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setShowFilter(false);
      }
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // You can adjust the threshold value based on your design
      const threshold = 400; // Adjust as needed

      // Check if the user has scrolled past the threshold
      setIsFixed(scrollPosition > threshold);
    };

    // Attach event listeners
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    // Remove the event listeners on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const wilayasList = [
    { name: "Adrar" },
    { name: "Chlef" },
    { name: "Laghouat" },
  ];
  const initialCategories = [
    {
      name: "Layer Cakes",
      num_search: "2567",
    },
    {
      name: "Layer Cakes",
      num_search: "2567",
    },
    {
      name: "Layer Cakes",
      num_search: "2567",
    },
    {
      name: "Layer Cakes",
      num_search: "2567",
    },
  ];

  const handleWilayaClick = (wilaya) => {
    if (!selectedWilayas.includes(wilaya)) {
      setSelectedWilayas([...selectedWilayas, wilaya]);
    }
  };

  const [categories, setCategories] = useState(initialCategories);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedWilayas, setSelectedWilayas] = useState([]);

  const searchInputRef = useRef(null);

  const handleCategoryClick = (index) => {
    const updatedCategories = [...categories];
    updatedCategories[index].clicked = !updatedCategories[index].clicked;
    setCategories(updatedCategories);
  };

  const toggleSearchInputFocus = () => {
    searchInputRef.current.focus();
  };

  const handleSearch = () => {
    const searchTerm = searchInputRef.current.value.toLowerCase();
    // Filter wilayas based on the search term
    const filteredWilayas = wilayasList.filter((wilaya) =>
      wilaya.name.toLowerCase().includes(searchTerm)
    );
    setSearchResults(filteredWilayas);
  };

  useEffect(() => {
    const subscription = watch(handleSubmit(onSubmit));
    return () => subscription.unsubscribe();
  }, [handleSubmit, watch]);

  function onSubmit(data) {
    console.log("shiiiiit");
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <button
        className="xl:hidden fixed left-4 bottom-8   px-4 py-2  z-[11] flex items-center"
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
          <div
            className={`${type == "false" ? "hidden" : "flex"} flex-col gap-3`}
          >
            <p className="text-black font-sofia text-[22px] text-left">
              Format :
            </p>
            <div className="flex flex-row gap-[8px]">
              <input
                className="relative float-left ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-[rgb(255,148,148)] before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-[#FF9494] dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary  dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#FF9494]"
                type="radio"
                id="small business"
                name="format"
                value="Small business"
                {...register("sm-buisness")}
                onChange={handleSubmit(onSubmit)}
              />
              <label>
                <span className="text-black text-opacity-[70%] font-sunflower text-[18px] text-left">
                  Small business
                </span>
              </label>
            </div>
            <div className="flex flex-row gap-[8px] mt-2">
              <input
                onChange={handleSubmit(onSubmit)}
                className="relative float-left ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-[rgb(255,148,148)] before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-[#FF9494] dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary  dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#FF9494]"
                type="radio"
                id="items"
                name="format"
                value="items/products"
                {...register("items")}
              />
              <label>
                <span className="text-black text-opacity-[70%] font-sunflower text-[18px] text-left">
                  Items / Products
                </span>
              </label>
            </div>
          </div>

          <p className="text-black font-sofia text-[22px] text-left">
            Categories Selected :
          </p>

          <div>
            <ul className="list-none pl-2 space-y-1 ">
              {categories.map((category, index) => (
                <li
                  key={index}
                  className={`text-black font-sunflower text-18px text-left flex gap-8  xl:gap-20 px-2 cursor-pointer`}
                  onClick={() => handleCategoryClick(index)}
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

          <p className="text-black font-sofia text-[22px] text-left mt-2">
            Price Ranges :
          </p>
          <MultiRangeSlider
            min={0}
            max={1000}
            onChange={({ min, max }) =>
              console.log(`min = ${min}, max = ${max}`)
            }
          />

          <p className="text-black font-sofia text-[22px] text-left">
            Wilaya :
          </p>

          <div className="flex flex-col pb-[10rem]">
            <div className="search-input-container">
              <div className="relative flex flex-row items-start justify-center ">
                <input
                  {...register("wilayas")}
                  type="search"
                  list="wilayas"
                  placeholder="type..."
                  className="
                        w-52 h-9 rounded-lg border border-[#FF9494] bg-[#F5EBE0] focus:outline-none px-3 py-2 mb-5 ml-1"
                  ref={searchInputRef}
                  onChange={handleSearch}
                />
                <button
                  className=" search-button bg-[#FF9494] rounded-full px-1.5 py-0 mt-1.5 ml-1"
                  onClick={toggleSearchInputFocus}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          {selectedWilayas.length > 0 && (
            <div>
              <ul className="list-none pl-4 space-y-1">
                {selectedWilayas.map((wilaya, index) => (
                  <li
                    key={index}
                    className="text-black font-sunflower text-18px text-left space-x-20 px-2 "
                  >
                    <span className="font-sunflower text-18px">{wilaya}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};
export default Filter;

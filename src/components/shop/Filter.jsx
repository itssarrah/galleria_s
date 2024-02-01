/* eslint-disable */

import React, { useState, useRef, useEffect } from "react";
import MultiRangeSlider from "./MultiRangeSlider";
import filterIcon from "../../assets/icons/filter.svg";
<<<<<<< HEAD
import { useQuery } from "react-query";
import Format from "./Format";
import Select from "react-select";
import { BACKEND_URL } from "../../config";
=======
import { useForm } from "react-hook-form";

const wilayasList = [
  { name: "Adrar" },
  { name: "Chlef" },
  { name: "Laghouat" },
];
>>>>>>> a9a40f42dba8d42f92fff34ac5863b6abe7e354f

const Filter = ({ type }) => {
  const { register, handleSubmit, watch } = useForm();

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

<<<<<<< HEAD
  const handleWilayaClick = (selectedOption) => {
    setFormData({
      ...formData,
      selectedWilayas: [...formData.selectedWilayas, selectedOption],
    });
=======
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
>>>>>>> a9a40f42dba8d42f92fff34ac5863b6abe7e354f
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
<<<<<<< HEAD
          <Format type={type} formData={formData} setFormData={setFormData} />
=======
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

>>>>>>> a9a40f42dba8d42f92fff34ac5863b6abe7e354f
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

<<<<<<< HEAD
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
=======
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
>>>>>>> a9a40f42dba8d42f92fff34ac5863b6abe7e354f
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
    </form>
  );
};

export default Filter;

import React, { useState, useEffect } from "react";
import {
  ExclamationCircleIcon,
  ChevronDownIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import "../../css/product.css";
import { BACKEND_URL } from "../../config";
import axios from "axios";

function ProductCategory({
  formData,
  setFormData,
  errors,
  setErrors,
  modify = false,
}) {
  const [isExpanded, setExpanded] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [availableCategories, setAvailableCategories] = useState({
    interests: [],
  });

  const [newCategory, setNewCategory] = useState("");
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    // Populate selected categories from formData
    if (formData.categories.length > 0 && modify === true) {
      setSelectedCategories(formData.categories);
    }
  }, [formData.categories]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}api/interests`)
      .then((response) => {
        setAvailableCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tags:", error);
      });

    axios
      .get(`${BACKEND_URL}api/sizes`)
      .then((response) => {
        setSizes(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching sizes:", error);
      });
  }, []);

  const toggleExpansion = () => {
    setExpanded(!isExpanded);
  };

  const handleSelectChange = (e) => {
    e.preventDefault();
    const value = e.target.value;

    if (!selectedCategories.includes(value)) {
      setSelectedCategories((prev) => [...prev, value]);

      setAvailableCategories((prev) => ({
        ...prev,
        interests: prev.interests.filter(
          (category) => category.en_name !== value
        ),
      }));
      console.log(availableCategories);
      console.log(selectedCategories);

      setNewCategory("");

      setFormData((prev) => ({
        ...prev,
        categories: [...prev.categories, value],
      }));
    }
  };

  const handleRemoveCategory = (index) => {
    const removedCategory = selectedCategories[index];

    const updatedCategories = selectedCategories.filter((_, i) => i !== index);

    setSelectedCategories(updatedCategories);

    setFormData((prev) => ({
      ...prev,
      categories: updatedCategories,
    }));

    setAvailableCategories((prev) => ({
      ...prev,
      interests: [...prev.interests, { en_name: removedCategory }],
    }));
  };

  if (!selectedCategories) {
    return null;
  }

  return (
    <div
      className={`expansion-panel mx-auto md:mx-0 ${
        isExpanded ? "expanded" : ""
      }`}
    >
      <div
        className="expansion-panel-header mb-2 p-4 text-xl md:text-2xl xl:text-3xl"
        onClick={toggleExpansion}
      >
        <h2 className="expan_title">Categories / Tags</h2>
        <span className={`arrow mr-2 ${isExpanded ? "up" : "down"}`}></span>
      </div>
      <label className="input_label ml-14 md:ml-16 xl:ml-20">Tags :</label>
      <div className="expansion-panel-content flex flex-col items-center">
        <div className="relative w-10/12 bginput text-sm md:text-lg rounded-xl py-2 h-14 flex flex-col items-center justify-center">
          <select
            className="w-[95%] bg-transparent outline-none appearance-none cursor-pointer"
            value={newCategory}
            onChange={handleSelectChange}
          >
            <option value="" disabled>
              Select Tags
            </option>
            {availableCategories &&
              availableCategories.interests &&
              availableCategories.interests.map((category) => (
                <option key={category.id} value={category.en_name}>
                  {category.en_name}
                </option>
              ))}
          </select>
          <div
            className={`bg-white absolute right-4 top-4 md:top-2 rounded-full w-6 h-6 md:w-10 md:h-10 flex items-center justify-center`}
          >
            <PlusIcon className="w-4 md:w-6 h-4 md:h-6 heart" />
          </div>
        </div>
        {errors.categories && (
          <div className="flex items-center text-red-500 text-xs mt-1">
            <ExclamationCircleIcon className="h-4 w-4 mr-1" />
            {errors.categories}
          </div>
        )}
        {/* Render selected categories as chips */}
        <div className="flex flex-wrap mt-2">
          {selectedCategories &&
            selectedCategories.map((category, index) => (
              <div
                key={index}
                className="chipbg text-sm md:text-lg px-4 py-2 m-2 flex items-center"
              >
                {category}
                <button
                  type="button"
                  className="ml-2 focus:outline-none"
                  onClick={() => handleRemoveCategory(index)}
                >
                  <XMarkIcon className="h-5 w-5 brownbg" />
                </button>
              </div>
            ))}
        </div>
      </div>
      <div className="w-fit mx-auto pb-12">
        <label htmlFor="select" className="input_label text-sm md:text-lg">
          Size :
        </label>
        <div className="relative md:w-[20vw] w-64">
          <select
            name="size"
            className={`block cursor-pointer appearance-none w-full bginput text-sm md:text-lg rounded-xl px-4 py-2 pr-8 outline-none ${
              errors.size ? "border-red-500" : ""
            }`}
            value={formData.size}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, size: e.target.value }));
              setErrors((prev) => ({ ...prev, size: undefined }));
            }}
          >
            <option value="" disabled>
              Select Size
            </option>
            {sizes &&
              sizes.map((size) => (
                <option key={size.id} value={size.size}>
                  {size.size}
                </option>
              ))}
          </select>
          <div
            className={`bg-white absolute right-4 top-[7px] md:top-[6px] rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center`}
          >
            <ChevronDownIcon className="w-4  h-4  heart" />
          </div>
        </div>
        {errors.size && (
          <div className="flex items-center text-red-500 text-xs mt-1">
            <ExclamationCircleIcon className="h-4 w-4 mr-1" />
            {errors.size}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCategory;

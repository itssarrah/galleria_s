import React, { useState, useRef, useEffect } from "react";
import MultiRangeSlider from "./MultiRangeSlider/MultiRangeSlider";
import filterIcon from "../../assets/icons/filter.svg";
import "../../App.css";
import useCategorieCount from "../../api/categoriesWithCount";
import useWilayas from "../../api/wilayas";
import WilayaSelector from "./Filter/WilayaSelector";
import FormatSelector from "./Filter/FormatSelector";
import CategorySelector from "./Filter/CategorySelector";
import { BACKEND_URL } from "../../config";
import useBusinessesWithCategoryCount from "../../api/businessesWithCategoryCount";

const Filter = ({
  type,
  setFilteredProducts,
  products,
  setSelectedFormat,
  selectedFormat,
  setBusinesses,
}) => {
  const [showFilter, setShowFilter] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useCategorieCount();
  const {
    data: businessesData,
    isLoading: isBusinessesLoading,
    isError: isBusinessesError,
  } = useBusinessesWithCategoryCount();
  const timerRef = useRef(null);

  const handlePriceChange = ({ min, max }) => {
    // Clear the previous timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set a new timer to update the price range after 500 milliseconds
    timerRef.current = setTimeout(() => {
      // Check if the new price range is different from the previous one
      if (min !== priceRange.min || max !== priceRange.max) {
        setPriceRange({ min, max });
      }
    }, 500);
  };

  useEffect(() => {
    console.log("hi format is changing RESET", selectedFormat);
    setSelectedCategories([]);
    setSelectedWilayas([]);
    setPriceRange({ min: 0, max: 10000 });

    if (selectedFormat === "Small business") {
      if (isBusinessesError) {
        console.log("Error fetching businesses:", isBusinessesError);
      }
      if (businessesData) {
        const businessCategoryNames = Object.entries(
          businessesData.categories_with_counts
        ).map(([name, num_search]) => ({
          name: name,
          num_search: num_search,
        }));
        setCategories(businessCategoryNames);
      }
    } else if (selectedFormat === "items/products") {
      if (isCategoriesError) {
        console.log("Error fetching categories:", isCategoriesError);
      }
      if (categoriesData && categoriesData.length > 0) {
        const categoryNames = categoriesData.map((category) => ({
          name: category.en_name,
          num_search: category.products_count,
        }));
        setCategories(categoryNames);
      }
    }
  }, [selectedFormat, categoriesData, businessesData]);

  const { data: wilayasData, isWilayaLoading, isWilayaError } = useWilayas();
  const [wilayas, setWilayas] = useState(null);
  useEffect(() => {
    if (isWilayaError) {
      console.log("Error fetching wilayas:", isWilayaError);
    }
    if (wilayasData && wilayasData.length > 0) {
      // Extract the wilaya names from the data and set them in the state
      const wilayaNames = wilayasData.map((wilaya) => ({
        name: wilaya.name,
      }));
      setWilayas(wilayaNames); // Assuming you have a state variable to hold wilayas
    }
  }, [wilayasData, isWilayaError]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  // Wilayas list fetched from API or static
  const wilayasList = wilayas || [
    { name: "Adrar" },
    { name: "Chlef" },
    { name: "Laghouat" },
  ];

  //end
  //@Formdata
  const [formData, setFormData] = useState(new FormData());
  // const [selectedFormat, setSelectedFormat] = useState("items/products");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [categories, setCategories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedWilayas, setSelectedWilayas] = useState([]);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = {
          format: selectedFormat,
          categories: selectedCategories.join(","),
          minPrice: priceRange.min,
          maxPrice: priceRange.max,
          wilayas: selectedWilayas.join(","),
        };

        console.log("Form Data:", formData); // Log the form data

        const response = await fetch(`${BACKEND_URL}api/filter`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch filtered data");
        }
        const data = await response.json();

        // Ensure data is an array before setting filteredProducts or filteredBusinesses
        if (selectedFormat === "items/products") {
          if (Array.isArray(data)) {
            setFilteredProducts(data);
          } else {
            console.error("Fetched data is not an array:", data);
            setFilteredProducts([]); // Set to empty array if data is not an array
          }
        } else if (selectedFormat === "Small business") {
          console.log(data.data);
          if (Array.isArray(data.data)) {
            setBusinesses(data.data);
          } else {
            console.error("Fetched data is not an array:", data);
            setBusinesses([]); // Set to empty array if data is not an array
          }
        }
      } catch (error) {
        console.error("Error fetching filtered data:", error);
        if (selectedFormat === "items/products") {
          setFilteredProducts([]); // Set to empty array if fetching fails
        } else if (selectedFormat === "small business") {
          setBusinesses([]); // Set to empty array if fetching fails
        }
      }
    };

    fetchData();
  }, [selectedFormat, selectedCategories, priceRange, selectedWilayas]);

  //@categories
  const handleCategoryClick = (index) => {
    const updatedCategories = [...categories];
    const category = updatedCategories[index];
    category.clicked = !category.clicked;
    if (category.clicked) {
      setSelectedCategories([...selectedCategories, category.name]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category.name)
      );
    }
    setCategories(updatedCategories);
  };

  //@Responsiveness
  useEffect(() => {
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

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  //end

  //@wilaya
  const [searchTerm, setSearchTerm] = useState("");

  //end
  return (
    <div className="relative filter-container">
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
        <form>
          <p className="text-center text-[30px] font-sunflower text-[rgb(255,148,148)] font-bold mt-12">
            FILTER
          </p>
          <div className="flex flex-col items-start justify-start px-2 py-8 gap-[20px]">
            <FormatSelector
              type={type}
              setSelectedFormat={setSelectedFormat}
              selectedFormat={selectedFormat}
            />
            <CategorySelector
              categories={categories}
              handleCategoryClick={handleCategoryClick}
            />
            <p className="text-black font-sofia text-[22px] text-left mt-2">
              Price Ranges :
            </p>
            <MultiRangeSlider
              min={0}
              max={10000}
              onChange={handlePriceChange}
              //onChange={({ min, max }) => console.log(max, min)}
              // onChange={({ min, max }) => setPriceRange({ min, max })}
            />
            <WilayaSelector
              selectedWilayas={selectedWilayas}
              searchTerm={searchTerm}
              searchResults={searchResults}
              wilayasList={wilayasList}
              setSearchTerm={setSearchTerm}
              setSearchResults={setSearchResults}
              setSelectedWilayas={setSelectedWilayas}
              searchInputRef={searchInputRef}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default Filter;

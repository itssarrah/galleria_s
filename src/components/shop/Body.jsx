import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import Categories from "./Categories";
import { fetchProducts } from "../Landing/TrendingItems";
import { useQuery } from "react-query";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { BACKEND_URL } from "../../config";
import "../../css/ShopBody.css";
import SearchIcon from "../../assets/icons/searchIcon";
import useBusinesses from "../../api/businesses";
import ShopCard from "../cards/ShopCard";
import ProductSlider from "./ProductSlider";
import ShopSlider from "./ShopSlider";
const Body = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery("products", fetchProducts, {
    staleTime: 10000,
    cacheTime: 300000,
  });

  const {
    data: fetchedBusinesses = [],
    isLoading: businessIsLoading,
    isError: businessIsError,
  } = useBusinesses();

  // Initialize filteredProducts with an empty array
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [businesses, setBusinesses] = useState([]);

  const [selectedFormat, setSelectedFormat] = useState("items/products");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  const clearCategories = () => {
    setSelectedCategories([]);
    // Reset the color of all categories
    const updatedCategories = categories.map((category) => ({
      ...category,
      clicked: false, // Reset the clicked state
    }));
    setCategories(updatedCategories);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    // Check if products is initialized before setting filteredProducts
    if (Array.isArray(products) && products.length > 0) {
      setFilteredProducts(products);
    }
  }, [products]);

  useEffect(() => {
    if (Array.isArray(fetchedBusinesses) && fetchedBusinesses.length > 0) {
      setBusinesses(fetchedBusinesses);
    }
  }, [fetchedBusinesses]);

  return (
    <>
      <div className="w-full flex flex-row">
        <Filter
          setFilteredProducts={setFilteredProducts}
          products={products}
          setSelectedFormat={setSelectedFormat}
          selectedFormat={selectedFormat}
          setBusinesses={setBusinesses}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          categories={categories}
          setCategories={setCategories}
        />
        <div className="w-full lg:pl-0 xl:pl-8">
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className=" border border-main__pink rounded-full py-3 px-[20px] w-3/4 shadow-md mb-4 outline-none"
            />
            <button
              className="relative  h-5 w-10 rounded-full bg-main__pink text-white flex items-start  cursor-pointer right-12 bottom-1"
              onClick={() => {
                setSearchTerm("");
              }}
            >
              <SearchIcon className="h-5 w-5" />
            </button>
          </div>
          <Categories
            searchTerm={searchTerm}
            clearCategories={clearCategories}
            selectedCategories={selectedCategories}
          />

          {selectedFormat === "items/products" ? (
            <div className="mt-10">
              <h1 className="font-sofia text-lg md:text-3xl pl-8">
                Featured Products
              </h1>
              {filteredProducts !== null ? (
                <ProductSlider filteredProducts={filteredProducts} />
              ) : (
                <div>Loading...</div>
              )}
            </div>
          ) : (
            <div>
              <ShopSlider businesses={businesses} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Body;

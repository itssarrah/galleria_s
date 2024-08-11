import React, { useState, useEffect, useRef } from "react";
import Filter from "./Filter";
import Categories from "./Categories";
import "@splidejs/splide/dist/css/splide.min.css";
import "../../css/ShopBody.css";
import SearchIcon from "../../assets/icons/searchIcon";
import ProductSlider from "./ProductSlider";
import ShopSlider from "./ShopSlider";
import useProductsByCategory from "../../api/fetchProductsByCategory";
import { ClipLoader } from "react-spinners";
import ItemCard from "../cards/ItemCard";
import ShopCard from "../cards/ShopCard";
import { BACKEND_URL } from "../../config";
import useBusinessesByCategory from "../../api/fetchBusinessesByCategory";
import notFoundImage from "../../assets/images/empty.png";

const ProductSliderWrapper = ({ category }) => {
  const {
    data: products,
    isLoading,
    isError,
  } = useProductsByCategory(category.name, 1);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[40vh] w-full">
        <ClipLoader color="#DD6969" size={50} />
      </div>
    );
  if (isError) return <div>Error fetching products...</div>;

  return <ProductSlider filteredProducts={products.data.data} />;
};

const BusinessSliderWrapper = ({ category }) => {
  const {
    data: businesses,
    isLoading,
    isError,
  } = useBusinessesByCategory(category.name);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[40vh] w-full">
        <ClipLoader color="#DD6969" size={50} />
      </div>
    );
  if (isError) return <div>Error fetching businesses...</div>;

  return <ShopSlider businesses={businesses.data} />;
};

const Body = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOccured, setsearchOccured] = useState(false);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [searchedBusinesses, setSearchedBusinesses] = useState([]);

  // Initialize filteredProducts with an empty array
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [businesses, setBusinesses] = useState([]);

  const [selectedFormat, setSelectedFormat] = useState("items/products");
  const [categories, setCategories] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedWilayas, setSelectedWilayas] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

  const clearCategories = () => {
    setSelectedCategories([]);
    // Reset the color of all categories
    const updatedCategories = categories.map((category) => ({
      ...category,
      clicked: false, // Reset the clicked state
    }));
    setCategories(updatedCategories);
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${BACKEND_URL}api/filter/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          searchTerm: searchTerm,
          selectedFormat: selectedFormat,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Search Results:", data);

      // Set searchedProducts and searchedBusinesses based on the selected format
      if (selectedFormat === "items/products") {
        setSearchedProducts(data.data); // Set searched products
        setSearchedBusinesses([]); // Clear searched businesses
        setsearchOccured(true);
      } else {
        setSearchedBusinesses(data.data); // Set searched businesses
        setSearchedProducts([]); // Clear searched products
        setsearchOccured(true);
      }
    } catch (error) {
      console.error("Error searching:", error.message);
    }
  };

  //@lazy loading
  const [numCategoriesToLoad, setNumCategoriesToLoad] = useState(3);
  const loader = useRef(null);
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  const handleScroll = debounce(() => {
    // Check if the loader is visible in the viewport
    const isVisible =
      loader.current &&
      loader.current.getBoundingClientRect().top <= window.innerHeight;

    // Load more categories if the loader is visible
    if (isVisible) {
      setNumCategoriesToLoad((prevNum) => prevNum + 3); // Increment the number of categories to load
    }
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchTermChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    if (searchTerm === "") {
      setsearchOccured(false);
      setSearchedProducts([]);
      setSearchedBusinesses([]);
    }
  };

  return (
    <>
      <div className="w-full flex flex-row">
        <Filter
          setFilteredProducts={setFilteredProducts}
          setSelectedFormat={setSelectedFormat}
          selectedFormat={selectedFormat}
          setBusinesses={setBusinesses}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          categories={categories}
          setCategories={setCategories}
          selectedWilayas={selectedWilayas}
          setSelectedWilayas={setSelectedWilayas}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />
        <div className="w-full xl:w-[75%] 2xl:w-[85%] lg:pl-0 xl:pl-2">
          <form onSubmit={handleSearch}>
            <div className="flex justify-center">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchTermChange}
                className=" border border-main__pink rounded-full py-3 px-[20px] w-3/4 shadow-md mb-4 outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSearch(e);
                  }
                }}
              />
              <button
                type="submit"
                className="relative h-5 w-10 rounded-full bg-main__pink text-white flex items-start  cursor-pointer right-12 bottom-1"
              >
                <SearchIcon className="h-5 w-5" />
              </button>
            </div>
          </form>

          {searchTerm && searchOccured ? (
            <div>
              {selectedFormat === "items/products" ? (
                <div className="mt-10 flex flex-wrap justify-center items-center">
                  {searchedProducts.length > 0 ? (
                    searchedProducts.map((product) => (
                      <div key={product.id} className="m-2">
                        <ItemCard
                          itemUrl={`${BACKEND_URL}storage/${product.images[0].url}`}
                          sellerUrl={`${BACKEND_URL}storage/${product.business.image}`}
                          title={product.product_name}
                          basePrice={product.product_price}
                          salePrice={product.sale_price}
                          isOnSale={product.isOnSale}
                          isLiked={product.isLiked}
                          seller={product.business.businessname}
                          productId={product.id}
                          businessId={product.business_id}
                        />
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex items-center justify-center w-full md:h-[50vh]">
                        <img
                          src={notFoundImage}
                          alt="No results found"
                          className="w-[15rem] md:w-[40rem]  mx-auto"
                        />
                      </div>
                      <h6 className="mt-4 text-gray-500">
                        No products match the search.
                      </h6>
                    </>
                  )}
                </div>
              ) : (
                <div className="mt-10 flex flex-wrap justify-center items-center">
                  {searchedBusinesses.length > 0 ? (
                    searchedBusinesses.map((business) => (
                      <div key={business.id} className="m-2">
                        <ShopCard
                          key={business.id}
                          businessId={business.id}
                          imageUrl={`${BACKEND_URL}storage/${business.image}`}
                          title={business.businessname}
                          likes={business.likes}
                          location={business.wilaya.name}
                          rating={business.rating}
                          phoneNumber={business.phone}
                        />
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex items-center justify-center w-full h-[50vh]">
                        <img
                          src={notFoundImage}
                          alt="No results found"
                          className="w-[15rem] md:w-[40rem]  mx-auto"
                        />
                      </div>
                      <h6 className="mt-4 text-gray-500">
                        No products match the search.
                      </h6>
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div>
              <Categories
                searchTerm={searchTerm}
                clearCategories={clearCategories}
                selectedCategories={selectedCategories}
              />

              {selectedFormat === "items/products" ? (
                <div className="mt-10">
                  {selectedCategories.length > 0 ||
                  selectedWilayas.length > 0 ||
                  priceRange.min !== 0 ||
                  priceRange.max !== 10000 ? (
                    <div className="flex flex-wrap justify-center items-center">
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                          <div key={product.id} className="m-2">
                            <ItemCard
                              itemUrl={`${BACKEND_URL}storage/${product.images[0].url}`}
                              sellerUrl={`${BACKEND_URL}storage/${product.business.image}`}
                              title={product.product_name}
                              basePrice={product.product_price}
                              salePrice={product.sale_price}
                              isOnSale={product.isOnSale}
                              isLiked={product.isLiked}
                              seller={product.business.businessname}
                              productId={product.id}
                              businessId={product.business_id}
                            />
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="flex items-center justify-center w-full h-[50vh]">
                            <img
                              src={notFoundImage}
                              alt="No products found"
                              className="w-[15rem] md:w-[40rem]  mx-auto"
                            />
                          </div>
                          <h6 className="mt-4 text-gray-500">
                            No products found in this Category (click ALL
                            CATEGORIES).
                          </h6>
                        </>
                      )}
                    </div>
                  ) : (
                    <div>
                      {categories
                        .slice(0, numCategoriesToLoad)
                        .map((category, index) => (
                          <div key={index}>
                            <h1 className="font-sofia text-lg md:text-3xl pl-8">
                              {category.name} :
                            </h1>
                            <ProductSliderWrapper category={category} />
                          </div>
                        ))}
                      <div ref={loader}></div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-10 ">
                  {selectedCategories.length > 0 ||
                  selectedWilayas.length > 0 ||
                  priceRange.min !== 0 ||
                  priceRange.max !== 10000 ? (
                    <div className="flex flex-wrap justify-center items-center">
                      {businesses.length > 0 ? (
                        businesses.map((business) => (
                          <div key={business.id} className="m-2">
                            <ShopCard
                              key={business.id}
                              imageUrl={`${BACKEND_URL}storage/${business.image}`}
                              title={business.businessname}
                              likes={business.likes}
                              location={business.wilaya.name}
                              rating={business.rating}
                              phoneNumber={business.phone}
                              businessId={business.id}
                            />
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="flex items-center justify-center w-full h-[50vh]">
                            <img
                              src={notFoundImage}
                              alt="No businesses found"
                              className="w-[15rem] md:w-[40rem]  mx-auto"
                            />
                          </div>
                          <h6 className="mt-4 text-gray-500">
                            No businesses found in this Category (click ALL
                            CATEGORIES).
                          </h6>
                        </>
                      )}
                    </div>
                  ) : (
                    <div>
                      {categories
                        .slice(0, numCategoriesToLoad)
                        .map((category, index) => (
                          <div key={index}>
                            <h1 className="font-sofia text-lg md:text-3xl pl-8">
                              {category.name} :
                            </h1>
                            <BusinessSliderWrapper category={category} />
                          </div>
                        ))}
                      <div ref={loader}></div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Body;

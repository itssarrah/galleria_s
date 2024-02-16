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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  //@lazy loading
  const [numCategoriesToLoad, setNumCategoriesToLoad] = useState(3);
  const loader = useRef(null);
  const handleScroll = () => {
    // Check if the loader is visible in the viewport
    const isVisible =
      loader.current &&
      loader.current.getBoundingClientRect().top <= window.innerHeight;

    // Load more categories if the loader is visible
    if (isVisible) {
      setNumCategoriesToLoad((prevNum) => prevNum + 3); // Increment the number of categories to load
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
              {selectedCategories.length > 0 ||
              selectedWilayas.length > 0 ||
              priceRange.min !== 0 ||
              priceRange.max !== 10000 ? (
                <div>
                  {filteredProducts.map((product) => (
                    <div key={product.id}>
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
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  {categories.slice(0, numCategoriesToLoad).map((category) => (
                    <div key={category.id}>
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
            <div className="mt-10">
              {selectedCategories.length > 0 ||
              selectedWilayas.length > 0 ||
              priceRange.min !== 0 ||
              priceRange.max !== 10000 ? (
                <div>
                  {businesses.map((business) => (
                    <div key={business.id}>
                      <ShopCard
                        key={business.id}
                        imageUrl={`${BACKEND_URL}storage/${business.image}`}
                        title={business.businessname}
                        likes={business.likes}
                        location={business.wilaya.name}
                        rating={business.rating}
                        phoneNumber={business.phone}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  {categories.slice(0, numCategoriesToLoad).map((category) => (
                    <div key={category.id}>
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
      </div>
    </>
  );
};

export default Body;

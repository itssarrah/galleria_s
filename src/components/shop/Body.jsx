import React from "react";
import Filter from "./Filter";
import Categories from "./Categories";
import { useState, useEffect } from "react";
import { fetchProducts } from "../Landing/TrendingItems";
import { useQuery } from "react-query";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import ItemCard from "../cards/ItemCard";
import { BACKEND_URL } from "../../config";
import "../../css/ShopBody.css";
import SearchIcon from "../../assets/icons/searchIcon";

const Body = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery("products", fetchProducts, {
    staleTime: 10000,
    cacheTime: 300000,
  });

  useEffect(() => {
    // Initialize filteredProducts with all products
    setFilteredProducts(products);
  }, [products]);
  // useEffect(() => {
  //   // Apply additional filtering based on searchTerm, if needed
  //   // For example: filter products based on product name containing the searchTerm
  //   const filteredBySearchTerm = products.filter((product) =>
  //     product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   setFilteredProducts(filteredBySearchTerm);
  // }, [searchTerm, allProducts]);

  return (
    <>
      <div className="w-full flex flex-row">
        <Filter setFilteredProducts={setFilteredProducts} products={products} />
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
          <Categories searchTerm={searchTerm} />

          <div className="mt-10">
            <h1 className="font-sofia text-lg md:text-3xl pl-8">
              Featured Products
            </h1>
            <Splide
              className="mx-auto"
              options={{
                //   type: "loop",
                gap: "1rem",
                perPage: 5,
                perMove: 1,
                autoplay: true,
                interval: 2000,
                pauseOnHover: true,
                speed: 2500,
                arrows: false,
                pagination: false,
                breakpoints: {
                  640: {
                    perPage: 2,
                    autoplay: false,
                    gap: "0.1rem",
                  },
                  1000: {
                    perPage: 3,
                    gap: "0.1rem",
                  },
                  1424: {
                    perPage: 4,
                  },
                  435: {
                    perPage: 2.5,
                    gap: "0.1rem",
                  },
                },
              }}
            >
              {filteredProducts.map((product) => (
                <SplideSlide key={product.id} className="h-[56vh] md:h-[70vh] ">
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
                </SplideSlide>
              ))}
            </Splide>
          </div>
        </div>
      </div>
    </>
  );
};

export default Body;

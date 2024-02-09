import React from "react";
import Filter from "./Filter";
import Categories from "./Categories";
import { useState } from "react";
import { fetchProducts } from "../Landing/TrendingItems";
import { useQuery } from "react-query";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import ItemCard from "../cards/ItemCard";
import { BACKEND_URL } from "../../config";
import Search from "./Search";

import "../../css/ShopBody.css";
import Filter1 from "./Filter1";

const Body = () => {
  const [searchTerm, setSearchTerm] = useState("");

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

  return (
    // <div className="body w-full flex flex-row">
    <div className="body ">
      {/* <Filter /> */}
      <Filter />

      <div>
        {/* <div className="w-full"> */}
        <Search
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />
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
            {products.map((product) => (
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
  );
};

export default Body;

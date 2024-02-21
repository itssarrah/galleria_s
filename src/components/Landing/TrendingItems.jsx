import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import ItemCard from "../cards/ItemCard";
import "../../css/Landingpage.css";
import { BACKEND_URL } from "../../config";
import { ClipLoader } from "react-spinners";
import useProducts from "../../api/fetchTrendingItems";

const TrendingItems = () => {
  const { t } = useTranslation("homepage");
  const { data: products = [], isLoading, isError } = useProducts();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <ClipLoader color="#DD6969" size={50} />
      </div>
    );
  }

  if (isError) {
    return <p>Error fetching products</p>;
  }
  return (
    <>
      <Splide
        className="mx-auto"
        options={{
          type: "loop",
          gap: "1rem",
          width: "75%",
          perPage: 4,
          perMove: 1,
          autoplay: true,
          interval: 2000,
          pauseOnHover: true,
          speed: 2500,
          breakpoints: {
            640: {
              perPage: 2,
              autoplay: false,
              width: "100%",
            },
            1280: {
              perPage: 2,
            },
            1440: {
              perPage: 3,
            },
            435: {
              perPage: 1,
              gap: "0.1rem",
            },
          },
        }}
      >
        {products.map((product) => (
          <SplideSlide key={product.id} className="h-[70vh]">
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
    </>
  );
};

export { TrendingItems };

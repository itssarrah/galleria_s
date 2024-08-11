import React from "react";
import ItemCard from "../cards/ItemCard";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { BACKEND_URL } from "../../config";
import emptyImage from "../../assets/images/empty.png";

function ProductSlider({ filteredProducts }) {
  return (
    <>
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full h-[50vh]">
          <img
            src={emptyImage}
            alt="No products found"
            className="w-[250px] mx-auto object-cover"
          />
          <h6 className="mt-4 text-gray-500">No products found yet.</h6>
        </div>
      ) : (
        <Splide
          className="mx-auto"
          options={{
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
            <SplideSlide key={product.id} className="h-[56vh] md:h-[70vh]">
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
            </SplideSlide>
          ))}
        </Splide>
      )}
    </>
  );
}

export default ProductSlider;

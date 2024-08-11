import React from "react";
import ShopCard from "../cards/ShopCard";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { BACKEND_URL } from "../../config";
import emptyImage from "../../assets/images/empty.png";

function ShopSlider({ businesses }) {
  return (
    <>
      {businesses.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full h-[50vh]">
          <img
            src={emptyImage}
            alt="No businesses found"
            className="w-[250px]  mx-auto object-cover"
          />
          <h6 className="mt-4 text-gray-500">No businesses found yet.</h6>
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
          {businesses.map((business) => (
            <SplideSlide key={business.id} className="h-[40vh] md:h-[50vh]">
              <ShopCard
                key={business.id}
                imageUrl={`${BACKEND_URL}storage/${business.image}`}
                title={business.businessname}
                isLiked={business.isLiked}
                location={business.wilaya.name}
                rating={business.rating}
                phoneNumber={business.phone}
                businessId={business.id}
              />
            </SplideSlide>
          ))}
        </Splide>
      )}
    </>
  );
}

export default ShopSlider;

import React from "react";
import ShopCard from "../cards/ShopCard";
import "@splidejs/splide/dist/css/splide.min.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { BACKEND_URL } from "../../config";

const ShopCardSlider = ({ businesses }) => {
  return (
    <Splide
      className="h-2/4 py-8"
      options={{
        type: "loop",
        perPage: 7, // Number of cards shown at once. Adjust as needed.
        width: "100%",
        height: "50%",
        gap: "0.2rem",
        arrows: false,
        pagination: false,
        autoplay: true,
        interval: 1000,
        pauseOnHover: true,
        perMove: 1,
        speed: 2500,
        breakpoints: {
          1280: {
            perPage: 4,
            gap: "1rem",
          },
          1024: {
            perPage: 3,
            gap: "1rem",
          },
          640: {
            perPage: 2,
            gap: "1rem",
          },
          435: {
            type: "slide",
            arrows: true,
            focus: "center",
            pagination: true,
            autoplay: false,
            perPage: 1,
          },
          768: {
            perPage: 3,
            gap: "1rem",
          },
          1536: {
            perPage: 5,
            gap: "1rem",
          },
          1720: {
            perPage: 6,
            gap: "1rem",
          },
        },
      }}
    >
      {businesses.map((business) => (
        <SplideSlide key={business.id}>
          <ShopCard
            imageUrl={`${BACKEND_URL}storage/${business.image}`}
            title={business.businessname}
            likes={business.likes}
            location={business.wilaya.name}
            rating={business.rating}
            phoneNumber={business.phone}
            businessId={business.id}
            isLiked={business.isLiked}
          />
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default ShopCardSlider;

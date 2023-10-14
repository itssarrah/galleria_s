import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";

const PreviewSlider = ({
  images = [
    "/images/logo.png",
    "/images/logo.png",
    "/images/logo.png",
    "/images/logo.png",
    "/images/logo.png",
    "/images/logo.png",
    "/images/logo.png",
    "/images/logo.png",
  ],
}) => {
  return (
    <Splide
      className="h-2/4 py-8"
      options={{
        type: "loop",
        perPage: 5.5,
        width: "100%",
        height: "50%",
        gap: "0.2rem",
        arrows: false,
        pagination: false,
        autoplay: true,
        interval: 750,
        pauseOnHover: true,
        perMove: 1,
        speed: 1000,
      }}
    >
      {images.map((image, index) => (
        <SplideSlide key={index}>
          <img key={`ps-img-${index}`} src={image} alt="preview product" />
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default PreviewSlider;

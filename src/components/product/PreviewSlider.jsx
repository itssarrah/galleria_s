import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";

const PreviewSlider = ({ images }) => {
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
      interval: 1000,
      pauseOnHover: true,
      perMove: 1,
      speed: 2500,
    }}
  >
    {images.forEach((image, index) => (
      <SplideSlide key={index}>
        <img src={image} alt="preview image" />
      </SplideSlide>
    ))}
  </Splide>;
};

export default PreviewSlider;

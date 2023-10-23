import React, { useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AiFillCloseCircle } from "react-icons/ai";

// css
import "./product.css";

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
  const [imageClicked, setImageClicked] = useState(false);
  const [clickedImageIndex, setClickedImageIndex] = useState(0);

  const showImageOverlay = (event, index) => {
    setImageClicked(true);
    setClickedImageIndex(index);
    document.body.classList.add("modal-open");
  };
  const hideImageOverlay = () => {
    setImageClicked(false);
    document.body.classList.remove("modal-open");
  };

  return (
    <>
      <Splide
        className="h-2/4 py-8"
        options={{
          type: "loop",
          perPage: 5.5,
          width: "100%",
          height: "50%",
          gap: "3rem",
          arrows: false,
          pagination: false,
          autoplay: true,
          interval: 5000,
          pauseOnHover: true,
          perMove: 5,
          speed: 5000,
        }}
      >
        {images.map((image, index) => (
          <SplideSlide key={index}>
            <img
              key={`ps-img-${index}`}
              src={image}
              alt="preview product"
              className="rounded-full"
              onClick={(event) => showImageOverlay(event, index)}
            />
          </SplideSlide>
        ))}
      </Splide>
      {imageClicked && (
        <div className="modal-overlay">
          <AiFillCloseCircle
            className="text-white text-5xl lg:text-7xl absolute top-[3rem] right-[2rem]"
            onClick={hideImageOverlay}
          />
          <img
            src={images[clickedImageIndex]}
            alt="preview item"
            className=""
          />
        </div>
      )}
    </>
  );
};

export default PreviewSlider;

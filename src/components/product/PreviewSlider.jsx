import React, { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AiFillCloseCircle } from "react-icons/ai";

// css
import "../../css/product.css";

const breakpoints = {
  1280: {
    gap: "3rem",
  },
  1024: {
    gap: "2rem",
    height: "200%",
  },
  768: {
    gap: "1rem",
    height: "200%",
  },
  640: {
    gap: "1rem",
    height: "200%",
  },
}


const PreviewSlider = ({
  images = [
    "/images/carditem.png",
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
  const [clickedImageSrc, setClickedImageSrc] = useState("");


  const showImageOverlay = (event) => {
    setClickedImageSrc(event.target.src);
    setImageClicked(true);
    document.body.classList.add("modal-open");
  };
  const hideImageOverlay = () => {
    setImageClicked(false);
    document.body.classList.remove("modal-open");
  };

  useEffect(() => {
    const slideElements = document.querySelectorAll(".preview-slide");

    slideElements.forEach((slide) => {
      slide.addEventListener("click", (event) => {
        showImageOverlay(event);
      });
    });


    return () => {
      slideElements.forEach((slide) => {
        slide.removeEventListener("click", (event) => {
          showImageOverlay(event);
        });
      });
    };
  }, []);

  return (
    <>
      <Splide
        className="h-2/4 py-8"
        options={{
          type: "loop",
          perPage: 5.5,
          width: "100%",
          height: "100%",
          arrows: false,
          pagination: false,
          autoplay: true,
          interval: 5000,
          pauseOnHover: true,
          perMove: 5,
          speed: 5000,
          gap: "3rem",
          breakpoints: breakpoints
        }}
      >
        {images.map((image, index) => (
          <SplideSlide key={index}>
            <img
              key={`ps-img-${index}`}
              src={image}
              alt="preview product"
              className="h-full w-full aspect-square rounded-full preview-slide cursor-pointer"
            />
          </SplideSlide>
        ))}
      </Splide>
      {imageClicked && (
        <div className="modal-overlay">
          <AiFillCloseCircle
            className="text-white text-5xl lg:text-7xl absolute top-[3rem] right-[2rem] cursor-pointer"
            onClick={hideImageOverlay}
          />
          <img
            src={clickedImageSrc}
            alt="preview item"
            className="max-w-sm md:max-w-xl xl:max-w-2xl 2xl:max-w-3xl"
          />
        </div>
      )}
    </>
  );
};

export default PreviewSlider;

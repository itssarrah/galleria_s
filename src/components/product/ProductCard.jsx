import React, { useState } from "react";
import PreviewSlider from "./PreviewSlider";
import { Link } from "react-router-dom";
import { HiLocationMarker, HiPhone } from "react-icons/hi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

// css imports
import "./product.css";

const ProductCard = ({
  itemUrl = "/images/carditem.png",
  sellerUrl = "/images/cardseller.png",
  title = "Layer Cake for birthdays",
  salePrice = "500.00",
  isOnSale = true,
  isLiked = false,
  images = [],
  description = "Lorem ipsum dolor sit amet consectetur. Mattis sed sodales urna nisl facilisi egestas. Congue tortor auctor lectus auctor dolor aenean egestas vel. Et id nunc nisl nulla.",
  location = "Bejaia",
  phoneNumber = "+2135 78 83 29 33",
  seller = "SweetyPie",
}) => {
  const [liked, setLiked] = useState(isLiked);

  const toggleIsLiked = () => setLiked((prevIsLiked) => !prevIsLiked);

  return (
    <div className="product-card grid grid-cols-1 gap-5 md:grid-cols-2">
      <img
        src={itemUrl}
        alt="product"
        id="product-img"
        className="overflow-hidden w-full"
      />
      <div className="px-3 md:py-3 xl:py-[3rem]">
        <div className="mb-3 flex justify-between align-center md:block">
          <div>
            <h2 className="product-title mb-1 md:mb-5 text-2xl lg:text-3xl xl:text-4xl">
              {title}
            </h2>
            <p className="text-black/[.55] md:text-xl lg:text-2xl xl:text-3xl">
              from{" "}
              <Link to={sellerUrl} className="link">
                <span>{seller}</span>
              </Link>
            </p>
          </div>
          <div className="product-price py-3 px-5 md:text-2xl lg:text-3xl xl:text-4xl md:py-[3rem] md:px-[1rem] align-center">
            <span>{salePrice}DZD</span>
          </div>
        </div>

          <div className="detail text-md md:text-lg lg:text-xl xl:text-2xl">
          <HiLocationMarker className="icon" /> <span>{location}</span>
        </div>
        <div className="detail text-md md:text-lg lg:text-xl xl:text-2xl">
          <HiPhone className="icon" />
          <span className="font-black">{phoneNumber}</span>
        </div>
        <p className="pr-[1rem] text-sm md:text-md lg:text-lg xl:text-xl">
          {description} {"\n"}
          {liked ? (
            <AiFillHeart className="heart-icon text-4xl lg:text-5xl xl:text-6xl" onClick={toggleIsLiked} />
          ) : (
            <AiOutlineHeart className="heart-icon text-4xl lg:text-5xl xl:text-6xl" onClick={toggleIsLiked} />
          )}
        </p>
      </div>
      <PreviewSlider />
    </div>
  );
};

export default ProductCard;

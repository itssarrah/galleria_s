import React from "react";
import { Link } from "react-router-dom";
import { HiLocationMarker, HiPhone } from "react-icons/hi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import PreviewSlider from "./PreviewSlider";
import "./product-card.css";

const ProductCard = ({
  itemUrl = "/images/carditem.png",
  sellerUrl = "/images/cardseller.png",
  title = "Layer Cake for birthdays",
  salePrice = "500.00",
  isOnSale = true,
  isLiked = false,
  images = [
    "../../assets/images/logo.png",
    "../../assets/images/logo.png",
    "../../assets/images/logo.png",
    "../../assets/images/logo.png",
    "../../assets/images/logo.png",
  ],
  description = "Lorem ipsum dolor sit amet consectetur. Mattis sed sodales urna nisl facilisi egestas. Congue tortor auctor lectus auctor dolor aenean egestas vel. Et id nunc nisl nulla.",
  location = "Bejaia",
  phoneNumber = "+2135 78 83 29 33",
  seller = "SweetyPie",
}) => {
  return (
    <div className="product-card">
      <div>
        <img src={itemUrl} alt="product image" />
      </div>
      <div className="product-info">
        <h2 className="product-title mb-5">{title}</h2>
        <p className="from-seller">
          from{" "}
          <Link to={sellerUrl}>
            <span className="seller-name">{seller}</span>
          </Link>
        </p>
        <div className="product-price">
          <span>{salePrice}da</span>
        </div>
        <div className="detail">
          <HiLocationMarker className="icon" /> <span>{location}</span>
        </div>
        <div className="detail">
          <HiPhone className="icon" />
          <span className="font-black">{phoneNumber}</span>
        </div>
        <p className="product-description">
          {description} {"\n"}
          {isLiked ? (
            <AiFillHeart className="heart-icon" />
          ) : (
            <AiOutlineHeart className="heart-icon" />
          )}
        </p>
      </div>
      {/* TODO: fix slider */}
      <PreviewSlider images={images} />
    </div>
  );
};

export default ProductCard;
import React from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { MdLocationOn, MdLocalPhone, MdStar } from "react-icons/md";
import { useEffect, useState } from "react";
import "../../css/Landingpage.css";

function ShopCard({
  imageUrl = "https://i.pinimg.com/236x/54/bb/7f/54bb7f2ceeeef406e9ab2ac08ac549d7.jpg",
  title = "Bloom Perfume",
  likes = 233,
  isLiked = false,
  location = "Bejaia",
  phoneNumber = "5 56 78 99 17",
  rating = "4.2",
}) {
  return (
    <>
      <div className="cursor-pointer shopcardcontainer w-44 md:w-52 lg:w-56 rounded-b-3xl rounded-t-lg relative">
        <img className="shopimg rounded-t-lg" src={imageUrl} alt="Shop Image" />
        <div>
          <div className="shopinfo rounded-b-3xl flex w-full px-2 justify-between pt-2 items-center">
            <h1 className="shopname text-sm md:text-base lg:text-lg">
              {title}
            </h1>
            <div>
              {isLiked ? (
                <MdFavorite className="shopheart text-3xl" />
              ) : (
                <MdFavoriteBorder className="shopheart text-3xl " />
              )}
              <h1 className="shoplikes text-sm md:text-base lg:text-lg font-bold">
                {likes}
              </h1>
            </div>
          </div>
          <div className="additional-text space-y-2 ">
            <div className="w-full flex items-center">
              <MdLocationOn className="shopicon text-3xl" />
              <h1>{location}</h1>
            </div>
            <div className="w-full flex items-center">
              <MdLocalPhone className="shopicon text-3xl" />
              <h1>+213{phoneNumber}</h1>
            </div>
            <div className="w-full flex items-center">
              <MdStar className="shopicon text-3xl" />
              {rating} out of 5
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShopCard;

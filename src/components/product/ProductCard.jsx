import React, { useState } from "react";
import PreviewSlider from "./PreviewSlider";
import { Link } from "react-router-dom";
import { HiLocationMarker, HiPhone } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import { BACKEND_URL } from "../../config";
import {
  fetchLikeStatus,
  likeProduct,
  unlikeProduct,
} from "../cards/LikingLogic";
import { useQuery, useMutation, useQueryClient } from "react-query";
// css imports
import "../../css/product.css";

import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

const ProductCard = ({
  productId,
  itemUrl = "/images/carditem.png",
  sellerUrl = "/images/cardseller.png",
  title = "Layer Cake for defaults",
  salePrice = "500.00",
  productPrice = "1000.00",
  isOnSale = true,
  isLiked = false,
  images = [],
  description = "Lorem ipsum dolor sit amet consectetur. Mattis sed sodales urna nisl facilisi egestas. Congue tortor auctor lectus auctor dolor aenean egestas vel. Et id nunc nisl nulla.",
  location = "default",
  phoneNumber = "+2135 00 00 00 00",
  seller = "SweetyPie",
}) => {
  const { t } = useTranslation("product");
  // const [liked, setLiked] = useState(isLiked);
  // const toggleIsLiked = () => setLiked((prevIsLiked) => !prevIsLiked);

  const direction = t("direction");
  const updatedImages = images.map(
    (image) => `${BACKEND_URL}storage/${image.url}`
  );

  const token = localStorage.getItem("authToken");
  const queryClient = useQueryClient();

  const {
    data: likeStatus,
    isLoading,
    isError,
  } = useQuery(
    ["likeStatus", productId],
    () => fetchLikeStatus(productId, token),
    {
      enabled: !!token,
      staleTime: 10000,
    }
  );

  const liked = likeStatus?.isLiked || false;

  const { isLoading: isLiking, mutate } = useMutation({
    mutationFn: liked
      ? () => unlikeProduct(productId, token)
      : () => likeProduct(productId, token),
    onSuccess: () => {
      queryClient.setQueryData(["likeStatus", productId], {
        isLiked: !liked,
      });
    },

    onMutate: () => {
      queryClient.setQueryData(["likeStatus", productId], {
        isLiked: !liked,
      });

      return () => {
        queryClient.setQueryData(["likeStatus", productId], {
          isLiked: liked,
        });
      };
    },
  });

  return (
    <div className="product-card grid grid-cols-1 gap-5 md:grid-cols-2">
      <div>
        <img
          src={itemUrl}
          alt="product"
          id="product-img"
          className="overflow-hidden w-full"
        />
        {images.length > 1 && <PreviewSlider images={updatedImages} />}
      </div>
      <div className="px-3 md:py-3 xl:py-[3rem]">
        <div className="mb-3 flex justify-between align-center md:block">
          <div>
            <h2 className="product-title mb-1 md:mb-5 text-2xl md:text-4xl xl:text-6xl">
              {title}
            </h2>
            <p
              className="text-black/[.55] md:text-xl lg:text-2xl xl:text-3xl font-jost"
              dir={direction}
            >
              {`${t("from")} `}
              <Link to={sellerUrl} className="link">
                <span>{seller}</span>
              </Link>
            </p>
          </div>
          <div
            className={`product-price py-3  md:text-2xl lg:text-4xl xl:text-5xl md:py-[2rem] md:px-[1rem] align-center text-black ${
              isOnSale ? "on-sale" : ""
            }`}
            dir={direction}
          >
            {!isOnSale && (
              <span className="original-price py-3  md:py-[2rem] md:px-[1rem] bg-yes text-black">
                {productPrice}
                {t("dzd")}
              </span>
            )}
            {isOnSale && (
              <div className="flex flex-col-reverse md:flex-row-reverse gap-2 md:gap-7 items-center">
                <span className="original-price text-sm md:text-xl">
                  {productPrice}
                  {t("dzd")}
                </span>
                <span
                  className={`product-price py-3  md:py-[2rem] md:px-[1rem] bg-yes text-md  ${
                    isOnSale ? "on-sale" : ""
                  }`}
                >
                  {salePrice}
                  {t("dzd")}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="detail text-lg md:text-xl lg:text-2xl xl:text-4xl font-jost">
          <HiLocationMarker className="icon md:w-11 md:h-11 w-8 h-8" />{" "}
          <span>{location}</span>
        </div>
        <div className="detail text-lg md:text-xl lg:text-2xl xl:text-4xl font-jost">
          <HiPhone className="icon md:w-11 md:h-11 w-8 h-8" />
          <span className="font-black">+213-{phoneNumber}</span>
        </div>
        <p className="pt-6 px-[1rem] text-md md:text-lg lg:text-xl xl:text-2xl font-jost">
          {description} {"\n"}
          <div className="flex w-[80%] justify-around items-center mt-10">
            <button className="bag_btn py-4 px-6 xl:text-4xl md:text-2xl text-lg">
              Add To Bag
            </button>
            {liked ? (
              <MdFavorite
                className="heart-icon w-11 h-11 md:w-20 md:h-20  cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  !isLiking && mutate();
                }}
              />
            ) : (
              <MdFavoriteBorder
                className="heart-icon w-11 h-11 md:w-20 md:h-20 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  !isLiking && mutate();
                }}
              />
            )}
          </div>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;

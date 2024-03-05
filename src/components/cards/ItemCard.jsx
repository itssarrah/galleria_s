import React, { useState, useEffect } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchLikeStatus, likeProduct, unlikeProduct } from "./LikingLogic";

const ItemCard = ({
  itemUrl = "/images/carditem.png",
  sellerUrl = "/images/cardseller.png",
  title = "Pink Happiness",
  basePrice = "1000.00",
  salePrice = "500.00",
  productId,
  seller = "SweetyPie",
  isLiked = false,
}) => {
  const token = localStorage.getItem("authToken");
  const queryClient = useQueryClient();
  const [liked, setLiked] = useState(isLiked);

  const { isLoading: isLiking, mutate } = useMutation({
    mutationFn: liked
      ? () => unlikeProduct(productId, token)
      : () => likeProduct(productId, token),
    onSuccess: () => {
      // Update the like status in the cache
      queryClient.setQueryData(["likeStatus", productId], {
        liked: !liked,
      });
      // Update the state using the functional form of setLiked
      setLiked((prevLiked) => !prevLiked);
      // Invalidate the products query to fetch the latest data
      queryClient.invalidateQueries("products");
      queryClient.invalidateQueries("likedProducts");
    },
  });

  useEffect(() => {
    // Update the state with the initial value from the cache
    setLiked(isLiked);
  }, [isLiked]);

  const isOnSale = salePrice && parseFloat(salePrice) < parseFloat(basePrice);
  const discountPercentage = isOnSale
    ? Math.round((1 - parseFloat(salePrice) / parseFloat(basePrice)) * 100)
    : 0;

  return (
    <Link to={`/product/${productId}`} className="cursor-pointer">
      <div className="h-[22rem] md:min-h-[35rem] md:max-h-[35rem] relative w-[8rem] sm:w-44 md:w-56 lg:w-64 ">
        <div className="cardcontainer min-h-[70%]">
          <img
            src={itemUrl}
            alt="Item"
            className="rounded-3xl px-2 py-2 h-[10rem] md:h-[35vh] mx-auto object-cover"
          />
          {isOnSale && (
            <img
              src="/images/cardasset1.png"
              alt="asset"
              className="absolute  cardasset"
            />
          )}
          {isOnSale && (
            <h1 className="absolute cardtxt">-{discountPercentage}%</h1>
          )}

          <div className="flex  w-full justify-between px-2">
            <div className="w-[85%]">
              <h1 className="item_title  text-sm md:text-base lg:text-lg">
                {title}
              </h1>
              <div className="flex space-x-1 md:space-x-2">
                <h1
                  className={`${
                    isOnSale ? "sale_price" : "base_price"
                  } text-xs md:text-base lg:text-lg`}
                >
                  {basePrice} DA
                </h1>
                {isOnSale && (
                  <h1 className="new_price text-xs md:text-base lg:text-lg">
                    {salePrice} DA
                  </h1>
                )}
              </div>
            </div>

            <div
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                mutate();
              }}
            >
              {liked ? (
                <MdFavorite className="heart text-3xl h-5 w-5 md:w-8 md:h-8" />
              ) : (
                <MdFavoriteBorder className="heart text-3xl h-5 w-5 md:w-8 md:h-8" />
              )}
            </div>
          </div>
        </div>

        <div className="circle_item ">
          <h1 className="text-xs sm:text-sm md:text-base lg:text-lg px-2">
            By
          </h1>
          <div className="pb-4">
            <img
              alt="seller image"
              src={sellerUrl}
              className="w-8 h-8 rounded-full sm:w-10 sm:h-10 md:w-16 lg:w-24 md:h-16 lg:h-24 mx-auto object-cover"
            />
            <h1 className="seller_txt text-xs sm:text-sm md:text-base lg:text-lg text-center	">
              {seller}
            </h1>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;

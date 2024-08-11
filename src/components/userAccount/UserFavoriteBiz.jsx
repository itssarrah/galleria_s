import React from "react";
import { useQuery } from "react-query";
import { ClipLoader } from "react-spinners";
import { BACKEND_URL } from "../../config";
import ShopCard from "../cards/ShopCard";
import empty from "../../assets/images/empty.png";

function UserFavoriteBiz() {
  const {
    data: likedBusinesses = [],
    isLoading,
    isError,
  } = useQuery(
    "likedBusinesses",
    async () => {
      const token = localStorage.getItem("authToken");

      const response = await fetch(`${BACKEND_URL}api/liked-businesses`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch liked products");
      }

      const data = await response.json();
      console.log(data);
      return data.savedBusinesses;
    },
    {
      staleTime: 120000,
      cacheTime: 300000,
    }
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <ClipLoader color="#DD6969" size={50} />
      </div>
    );
  }

  if (isError) {
    return <p>Error fetching liked products</p>;
  }
  return (
    <>
      <div className="flex items-start w-full h-full ">
        <div className="w-fit overflow-y-hidden flex flex-col pt-8 ">
          {likedBusinesses.length === 0 ? (
            <div className="w-[95vw] flex flex-col justify-center items-center">
              <img
                src={empty}
                className="w-[20rem] md:w-[40rem] pt-10 "
                alt="No items found"
              />
              <h6 className="text-jost text-gray-500 md:text-2xl text-lg pt-10 ">
                No liked Businesses for now .
              </h6>
            </div>
          ) : (
            <div className="w-fit mt-12 px-6 flex flex-wrap gap-10 lg:gap-16 justify-center">
              {likedBusinesses.map((business) => (
                <ShopCard
                  key={business.businessId}
                  imageUrl={`${BACKEND_URL}storage/${business.image}`}
                  title={business.businessname}
                  rating={business.average_rating}
                  isLiked={true}
                  location={business.location}
                  phoneNumber={business.phone}
                  businessId={business.businessId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserFavoriteBiz;

import React from "react";
import { useQuery } from "react-query";
import { BACKEND_URL } from "../../config";
import ItemCard from "../cards/ItemCard";
import { ClipLoader } from "react-spinners";
import empty from "../../assets/images/empty.png";
function UserWishlist() {
  const {
    data: likedProducts = [],
    isLoading,
    isError,
  } = useQuery(
    "likedProducts",
    async () => {
      const token = localStorage.getItem("authToken");

      const response = await fetch(`${BACKEND_URL}api/get-liked-products`, {
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
      return data.likedProducts;
    },
    {
      staleTime: 10000,
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
    <div className="flex items-start w-full">
      {/* <Filter type="false" /> */}
      <div className="w-screen min-h-screen overflow-x-hidden flex flex-col pt-8">
        {/* <Categories /> */}
        <div className="w-screen min-h-screen overflow-x-hidden flex flex-col pt-8">
          {likedProducts.length === 0 ? (
            <div className="flex flex-col justify-center items-center ">
              <img
                src={empty}
                className="w-[20rem] md:w-[40rem] pt-10"
                alt="No items found"
              />
              <h6 className="text-jost text-gray-500 md:text-2xl text-lg pt-10 ">
                No liked items for now .
              </h6>
            </div>
          ) : (
            <div className="mt-12 flex flex-wrap gap-10 lg:gap-16 justify-center">
              {likedProducts.map((product) => (
                <ItemCard
                  key={product.id} // Make sure to include a unique key for each mapped item
                  itemUrl={`${BACKEND_URL}storage/${product.images[0].url}`}
                  sellerUrl={`${BACKEND_URL}storage/${product.business.image}`}
                  title={product.product_name}
                  basePrice={product.product_price}
                  salePrice={product.sale_price}
                  isOnSale={product.isOnSale}
                  isLiked="True"
                  seller={product.business.businessname}
                  productId={product.id}
                  businessId={product.business.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserWishlist;

import React from "react";
import ReviewBar from "../reviews/reviewBar";
import ReviewCard from "../reviews/ReviewCard";
import useAccountRatings from "../../api/accountRatings";
import { BACKEND_URL } from "../../config";
import formatRelativeDate from "../../api/formatDate";
function UserFeedback() {
  const token = localStorage.getItem("authToken");
  const { data: productRatings, isLoading, isError } = useAccountRatings(token);
  return (
    <>
      <ReviewBar />
      {productRatings && (
        <div className="mt-12 flex flex-wrap gap-10 lg:gap-16 justify-center">
          <div className="grid xl:grid-cols-3 gap-3 md:gap-4 xl:gap-8 md:grid-cols-2 grid-cols-1 px-12 py-8">
            {productRatings.map((product, index) => (
              <ReviewCard
                key={index}
                title={product.ratings.rating_title}
                price={product.price}
                image={`${BACKEND_URL}storage/${product.image}`}
                description={product.ratings.rate_txt}
                date={formatRelativeDate(product.ratings.created_at)}
                stars={product.ratings.stars}
                productId={product.id}
                seller={product.business.name}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default UserFeedback;

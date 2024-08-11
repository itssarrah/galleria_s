import React, { useState, useEffect, useRef } from "react";
import ReviewBar from "../reviews/reviewBar";
import ReviewCard from "../reviews/ReviewCard";
import useAccountRatings from "../../api/accountRatings";
import { BACKEND_URL } from "../../config";
import formatRelativeDate from "../../api/utils/formatDate";
import { ClipLoader } from "react-spinners";
import empty from "../../assets/images/empty.png";

const DEFAULT_EMPTY_IMAGE_URL = `${BACKEND_URL}storage/empty.png`;

function UserFeedback() {
  const token = localStorage.getItem("authToken");
  const [reviews, setReviews] = useState([]);
  const endOfPageRef = useRef(null);

  const {
    data: responseData,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useAccountRatings(token, 10, 1);

  useEffect(() => {
    if (responseData) {
      const newReviews = responseData.pages.flatMap((page) => page.data);
      setReviews(newReviews);
    }
  }, [responseData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (endOfPageRef.current) {
      observer.observe(endOfPageRef.current);
    }

    return () => {
      if (endOfPageRef.current) {
        observer.unobserve(endOfPageRef.current);
      }
    };
  }, [endOfPageRef, fetchNextPage, hasNextPage]);

  return (
    <>
      <ReviewBar />
      <div className="mt-12 flex flex-wrap gap-10 lg:gap-16 justify-center">
        {reviews.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-screen w-full">
            <img
              src={empty}
              className="w-[20rem] md:w-[40rem]  "
              alt="No items found"
            />
            <h6 className="text-jost text-gray-500 md:text-2xl text-lg pt-10 ">
              No Feedbacks for now .
            </h6>
          </div>
        ) : (
          <div className="grid xl:grid-cols-3 gap-3 md:gap-4 xl:gap-8 md:grid-cols-2 grid-cols-1 px-12 py-8">
            {reviews.map((product, index) => (
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
        )}
        {(isLoading || hasNextPage) && (
          <div className="flex justify-center items-center h-[30vh] w-full">
            <ClipLoader color="#DD6969" size={50} />
          </div>
        )}
        {isError && <div>Error fetching data</div>}
        <div ref={endOfPageRef}></div>
      </div>
    </>
  );
}

export default UserFeedback;

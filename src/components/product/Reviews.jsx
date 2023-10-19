import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AiFillCloseCircle } from "react-icons/ai";
import Stars from "./Stars";

// css
import "./product.css";

const ReviewCard = ({
  username,
  userPicture,
  title,
  description,
  rating,
  date,
  showDate = false,
  className = "",
}) => {
  return (
    <div className={`review-card flex flex-col justify-around ${className}`}>
      <div className="flex gap-3 items-center">
        <img
          src={userPicture}
          alt="user"
          className="w-10 aspect-square rounded-full inline-block"
        />
        <span className="text-md font-bold">{username}</span>
      </div>
      <div>
        <h2 className="font-bold text-xl my-3">{title}: </h2>
        <p className="text-xl">{description}</p>
      </div>

      <div className="flex justify-between">
        <Stars average={rating} />
        {showDate && <span className="text-black/[.55]">{date}</span>}
      </div>
    </div>
  );
};

const ReviewsModal = ({
  title,
  reviews,
  maxReviewsDisplay,
  setMaxReviewsDisplay,
  closeModal,
}) => {
  if (reviews.length === 0) return null;

  const reviewsCount = reviews.length;

  return (
    <div className="modal-overlay">
      <div className="reviews-modal">
        <AiFillCloseCircle
          className="text-white text-7xl absolute top-[3rem] right-[2rem]"
          onClick={closeModal}
        />
        <div className="text-center p-2">
          <h2 className="product-title">{title}</h2>
          <p className="text-3xl text-black/[.55] font-bold">Reviews</p>
        </div>
        <div className="reviews-container">
          {reviews.slice(0, maxReviewsDisplay).map((review) => (
            <ReviewCard {...review} className="nicer" showDate />
          ))}
          {reviewsCount > maxReviewsDisplay && (
            <Link
              className="block w-full text-center p-3 link"
              onClick={() =>
                setMaxReviewsDisplay((prevMax) =>
                  Math.min(reviewsCount, prevMax * 2)
                )
              }
            >
              Load More
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const Reviews = ({ title = "Layer cake for birthdays", _reviews = [] }) => {
  const [reviews, setReviews] = useState(_reviews);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [showReviews, setShowReviews] = useState(false);
  const [maxReviewsDisplay, setMaxReviewsDisplay] = useState(8);

  const showReviewsModal = () => {
    setShowReviews(true);
    document.body.classList.add("modal-open");
  };
  const hideReviewsModal = () => {
    setShowReviews(false);
    setMaxReviewsDisplay(8);
    document.body.classList.remove("modal-open");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="pl-[4rem]">
        <h2 className="product-title">Top Reviews</h2>
        <p className="text-md text-[#666666]">Swipe to see more reviews!</p>
      </div>
      <Splide>
        {reviews.map((review, index) => (
          <SplideSlide key={`ss-${index}`}>
            <ReviewCard key={`ss-rc-${index}`} {...review} showDate={true} />
          </SplideSlide>
        ))}
      </Splide>
      <Link className="link self-center text-sm" onClick={showReviewsModal}>
        {" "}
        See All{" "}
      </Link>
      {showReviews && (
        <ReviewsModal
          title={title}
          reviews={reviews}
          closeModal={hideReviewsModal}
          maxReviewsDisplay={maxReviewsDisplay}
          setMaxReviewsDisplay={setMaxReviewsDisplay}
        />
      )}
    </div>
  );
};

export default Reviews;

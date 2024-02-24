import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AiFillCloseCircle } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import Stars from "../Stars";
import AddReviewModal from "./AddReviewModal";
// css
import "../../css/product.css";
import useReviewsByProductId from "../../api/reviewsByProductId";
import { BACKEND_URL } from "../../config";
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
  const formatRelativeDate = (inputDate) => {
    const currentDate = new Date();
    const reviewDate = new Date(inputDate);
    const timeDifference = currentDate - reviewDate;
    const secondsDifference = timeDifference / 1000;
    const minutesDifference = secondsDifference / 60;
    const hoursDifference = minutesDifference / 60;
    const daysDifference = hoursDifference / 24;

    if (secondsDifference < 60) {
      return "Just now";
    } else if (minutesDifference < 60) {
      return `${Math.floor(minutesDifference)} minutes ago`;
    } else if (hoursDifference < 24) {
      return `${Math.floor(hoursDifference)} hours ago`;
    } else if (daysDifference < 7) {
      const daysAgo = Math.floor(daysDifference);
      return daysAgo === 1 ? "Yesterday" : `${daysAgo} days ago`;
    } else {
      // If more than a week, return the full date
      return reviewDate.toLocaleDateString();
    }
  };
  return (
    <div
      className={`w-full h-full review-card flex flex-col gap-5 justify-around shadow-md ${className}`}
    >
      <div className="flex gap-3 items-center">
        <img
          src={userPicture}
          alt="user"
          className="w-10 aspect-square rounded-full inline-block object-cover"
        />
        <span className="text-md font-bold">{username}</span>
      </div>
      <div>
        <h2 className="font-bold text-xl my-3">{title}: </h2>
        <p className="text-xl">{description}</p>
      </div>

      <div className="flex justify-between">
        <Stars average={rating} />
        {showDate && (
          <span className="text-black/[.55]">{formatRelativeDate(date)}</span>
        )}
      </div>
    </div>
  );
};

const ReviewsModal = ({
  title,
  reviews,
  initialMaxReviewsDisplay,
  maxReviewsDisplay,
  setMaxReviewsDisplay,
  closeModal,
  t = null,
}) => {
  if (reviews.length === 0) return null;

  const reviewsCount = reviews.length;

  return (
    <div className="modal-overlay px-5 md:px-[5rem] lg:px-[8rem] xl:px-[10rem]">
      <div className="reviews-modal py-20 lg:px-[6rem] xl:px-[8rem]">
        <AiFillCloseCircle
          className="text-white text-5xl lg:text-7xl absolute top-[3rem] right-[2rem] cursor-pointer"
          onClick={closeModal}
        />
        <div className="text-center p-2">
          <h2 className="product-title">{title}</h2>
          <p className="text-3xl text-black/[.55] font-bold">{t("reviews")}</p>
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
              {t("show_more")}
            </Link>
          )}
          {maxReviewsDisplay > initialMaxReviewsDisplay && (
            <Link
              className="block w-full text-center p-3 link"
              onClick={() => setMaxReviewsDisplay(initialMaxReviewsDisplay)}
            >
              {t("show_less")}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const Reviews = ({
  title = "Layer cake for birthdays",
  reviews = [],
  productId,
}) => {
  const { t } = useTranslation("product");
  const initialMaxReviewsDisplay = 8;
  const [showReviews, setShowReviews] = useState(false);
  const [maxReviewsDisplay, setMaxReviewsDisplay] = useState(
    initialMaxReviewsDisplay
  );
  const [showAddReviewModal, setShowAddReviewModal] = useState(false); // State to manage the visibility of the add review modal
  const {
    data: reviewsData,
    isLoading,
    isError,
  } = useReviewsByProductId(productId);
  const handleAddReview = (reviewData) => {
    // Implement the logic to add the review
    console.log("Adding review:", reviewData);
    // Here, you can send the review data to the backend or update the local state with the new review
  };
  const direction = t("direction");

  const showReviewsModal = () => {
    setShowReviews(true);
    document.body.classList.add("modal-open");
  };
  const hideReviewsModal = () => {
    setShowReviews(false);
    setMaxReviewsDisplay(initialMaxReviewsDisplay);
    document.body.classList.remove("modal-open");
  };
  const showAddReviewModalFn = () => {
    setShowAddReviewModal(true);
    document.body.classList.add("modal-open");
  };

  // Define function to close Add Review modal
  const hideAddReviewModal = () => {
    setShowAddReviewModal(false);
    document.body.classList.remove("modal-open");
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex items-center w-full justify-between">
          <div className="mt-10 lg:mt-0">
            <h2
              className="product-title mb-1 md:mb-5 text-2xl lg:text-3xl xl:text-4xl"
              dir={direction}
            >
              {t("top_reviews")}
            </h2>
            <p className="text-md text-[#666666]" dir={direction}>
              {t("swipe_more")}
            </p>
          </div>
          <button
            className="hidden md:block py-2 px-4 bg-[#DD6969] font-jost text-white rounded-xl "
            onClick={showAddReviewModalFn}
          >
            + Add Review
          </button>
          <button
            className="block md:hidden py-2 px-4 bg-[#DD6969] font-jost text-white rounded-xl "
            onClick={showAddReviewModalFn}
          >
            + Add
          </button>
        </div>
        {reviewsData &&
        reviewsData.ratings &&
        reviewsData.ratings.length > 0 ? (
          <>
            <Splide>
              {reviewsData.ratings.map((review, index) => (
                <SplideSlide key={`ss-${index}`} className="p-3">
                  <ReviewCard
                    key={`ss-rc-${index}`}
                    title={review.title}
                    userPicture={`${BACKEND_URL}storage/${review.image}`}
                    username={review.name}
                    price={review.price}
                    rating={review.stars}
                    description={review.description}
                    date={review.date}
                    showDate={true}
                  />
                </SplideSlide>
              ))}
            </Splide>
            <Link
              className="link self-center text-sm"
              onClick={showReviewsModal}
            >
              {` ${t("see_all")} `}
            </Link>
          </>
        ) : (
          <div className="mt-10 lg:mt-0">
            <p className="text-md text-[#666666]">
              There are no reviews yet, be the <b>first</b> to rate!
            </p>
          </div>
        )}

        {showReviews && (
          <ReviewsModal
            title={title}
            reviews={reviews}
            closeModal={hideReviewsModal}
            initialMaxReviewsDisplay={initialMaxReviewsDisplay}
            maxReviewsDisplay={maxReviewsDisplay}
            setMaxReviewsDisplay={setMaxReviewsDisplay}
            t={t}
          />
        )}
        {showAddReviewModal && (
          <AddReviewModal
            title={title}
            closeModal={hideAddReviewModal} // Close modal function
            addReview={handleAddReview}
            productId={productId}
          />
        )}
      </div>
    </>
  );
};

export default Reviews;

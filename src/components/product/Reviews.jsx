import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AiFillCloseCircle } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import Stars from "../Stars";

// css
import "../../css/product.css";

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
    <div
      className={`review-card flex flex-col gap-5 justify-around shadow-md ${className}`}
    >
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

const Reviews = ({ title = "Layer cake for birthdays", reviews = [] }) => {
  const { t } = useTranslation("product");
  const initialMaxReviewsDisplay = 8;
  const [showReviews, setShowReviews] = useState(false);
  const [maxReviewsDisplay, setMaxReviewsDisplay] = useState(
    initialMaxReviewsDisplay
  );

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

  return (
    <>
      {reviews.length > 0 ? (
        <div>
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
                className=" hidden md:block py-2 px-4 bg-[#DD6969] font-jost text-white rounded-xl "
                onClick={showReviewsModal}
              >
                + Add Review
              </button>
              <button className="block md:hidden py-2 px-4 bg-[#DD6969] font-jost text-white rounded-xl ">
                + Add
              </button>
            </div>
            <Splide>
              {reviews.map((review, index) => (
                <SplideSlide key={`ss-${index}`} className="p-3">
                  <ReviewCard
                    key={`ss-rc-${index}`}
                    {...review}
                    showDate={false}
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
          </div>
        </div>
      ) : (
        <div className="mt-10 lg:mt-0">
          <h2 className="product-title mb-1 md:mb-5 text-2xl lg:text-3xl xl:text-4xl">
            Top Reviews
          </h2>
          <p className="text-md text-[#666666]">
            There are no reviews yet, be the <b>first</b> to rate!
          </p>
        </div>
      )}
    </>
  );
};

export default Reviews;

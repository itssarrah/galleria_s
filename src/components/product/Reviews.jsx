import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AiFillCloseCircle } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import Stars from "../Stars";
import AddReviewModal from "./AddReviewModal";
import { ClipLoader } from "react-spinners";

import "../../css/product.css";
import { useReviewsByProductId } from "../../api/reviewsByProductId";
import { BACKEND_URL } from "../../config";
import formatRelativeDate from "../../api/utils/formatDate";
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
  reviews: initialReviews,
  productId,
  t = null,
  showModal,
  setShowReviews,
}) => {
  const [page, setPage] = useState(2);
  const [reviews, setReviews] = useState(initialReviews);
  const modalRef = useRef(null);
  const [shouldPaginate, setShouldPaginate] = useState(true);

  const closeModal = () => {
    if (showModal) {
      setShowReviews(false);
      setReviews([]);
      setPage(2);
      setShouldPaginate(true);

      document.body.classList.remove("modal-open");
    }
  };

  const {
    data: modalReviews,
    isLoading,
    isError,
  } = useReviewsByProductId(productId, page);

  useEffect(() => {
    if (modalRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (
            entry.isIntersecting &&
            !isLoading &&
            !isError &&
            shouldPaginate
          ) {
            setPage((prevPage) => prevPage + 1);
          }
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: 1,
        }
      );

      observer.observe(modalRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [isLoading, isError, shouldPaginate]);

  useEffect(() => {
    if (modalReviews && !isLoading && !isError) {
      if (modalReviews.ratings.length === 0) {
        setShouldPaginate(false);
      }

      setReviews((prevReviews) => [...prevReviews, ...modalReviews.ratings]);
    }
  }, [modalReviews, isLoading, isError]);

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
        <div className="reviews-container ">
          {reviews.map((review, index) => (
            <div key={`${index}`} ref={modalRef} className="h-fit">
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
                className="nicer"
              />
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-center items-center h-[30vh] w-full">
              <ClipLoader color="#DD6969" size={50} />
            </div>
          )}
          {isError && <p>Error fetching reviews</p>}
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

  const [showReviews, setShowReviews] = useState(false);

  const [showAddReviewModal, setShowAddReviewModal] = useState(false);

  const {
    data: reviewsData,
    isLoading,
    isError,
  } = useReviewsByProductId(productId, 1);

  const direction = t("direction");

  const showReviewsModal = () => {
    setShowReviews(true);
    document.body.classList.add("modal-open");
  };

  const showAddReviewModalFn = () => {
    setShowAddReviewModal(true);
    document.body.classList.add("modal-open");
  };

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
        {isLoading && (
          <div className="flex justify-center items-center w-full">
            <ClipLoader color="#DD6969" size={50} />
          </div>
        )}
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

        {showReviews && reviewsData && (
          <ReviewsModal
            title={title}
            reviews={reviewsData.ratings}
            t={t}
            productId={productId}
            showModal={showReviews}
            setShowReviews={setShowReviews}
          />
        )}
        {showAddReviewModal && (
          <AddReviewModal
            title={title}
            closeModal={hideAddReviewModal}
            productId={productId}
          />
        )}
      </div>
    </>
  );
};

export default Reviews;

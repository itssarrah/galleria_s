import ReviewCard from "../reviews/ReviewCard";
import useBusinessProductRatings from "../../api/businessAllProductRatings";
import React, { useState, useRef, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { BACKEND_URL } from "../../config";
import formatRelativeDate from "../../api/formatDate";
import ReviewBar from "../reviews/reviewBar";
import useAccountRatings from "../../api/accountRatings";
import "../../css/product.css";

import {
  fetchReviewsByProductId,
  useReviewsByProductId,
} from "../../api/reviewsByProductId";

const FeedbackAndReviews = () => {
  const token = localStorage.getItem("authToken");
  const [productPage, setProductPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(10);
  const [ratingPages, setRatingPages] = useState({});
  const [ratingPerPage, setRatingPerPage] = useState(10);
  const [expandedPanels, setExpandedPanels] = useState([]);
  const [lastProductPage, setLastProductPage] = useState(false);
  const [products, setProducts] = useState([]);

  const productContainerRef = useRef(null);

  const {
    data: newProducts,
    isLoading,
    isError,
  } = useBusinessProductRatings(token, productPage);

  const {
    data: accountRatings,
    isLoading: accountLoading,
    isError: accountError,
  } = useAccountRatings(token);

  const [reviewType, setReviewType] = useState("my_reviews");
  const handleReviewTypeChange = (newReviewType) => {
    setReviewType(newReviewType);
  };

  const toggleExpansion = (index) => {
    setExpandedPanels((prevExpandedPanels) => {
      const newExpandedPanels = [...prevExpandedPanels];
      newExpandedPanels[index] = !newExpandedPanels[index];
      return newExpandedPanels;
    });
  };

  //lazy laoding products
  useEffect(() => {
    const handleProductScroll = ([entry]) => {
      if (entry.isIntersecting && !lastProductPage && !isLoading && !isError) {
        setProductPage((prevPage) => prevPage + 1);
      }
    };

    const observer = new IntersectionObserver(handleProductScroll, {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    });

    if (productContainerRef.current) {
      observer.observe(productContainerRef.current);
    }

    return () => {
      if (productContainerRef.current) {
        observer.unobserve(productContainerRef.current);
      }
    };
  }, [lastProductPage, isLoading, isError]);

  useEffect(() => {
    if (newProducts) {
      if (newProducts.length === 0) {
        setLastProductPage(true);
      } else if (!isLoading) {
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      }
    }
  }, [newProducts]);
  //individual reviews

  //individual reviews

  const [loadedReviews, setLoadedReviews] = useState({});

  useEffect(() => {
    const loadReviewsForProduct = async (productId, page, perPage) => {
      try {
        const data = await fetchReviewsByProductId(productId, page, perPage);

        setLoadedReviews((prevReviews) => ({
          ...prevReviews,
          [productId]: [...(prevReviews[productId] || []), ...data.ratings],
        }));
      } catch (error) {
        console.error("Error loading ratings:", error);
      }
    };

    products.forEach((product, index) => {
      if (expandedPanels[index] && !loadedReviews[product.id]) {
        loadReviewsForProduct(product.id, 1, 2);
      }
    });
  }, [expandedPanels, products, loadedReviews]);

  return (
    <>
      <ReviewBar
        type="business"
        onReviewTypeChange={handleReviewTypeChange}
        reviewType={reviewType}
      />

      <div className="mt-12"></div>
      {reviewType === "my_reviews" && products && (
        <div ref={productContainerRef}>
          {products.map((productRating, index) => (
            <div
              key={index}
              className={`expansion-panel  review w-[90vw] md:mx-0 ${
                expandedPanels[index] ? "expandedreviews" : ""
              }`}
            >
              <div
                className="expansion-panel-header  p-4 text-md md:text-3xl xl:text-4xl "
                onClick={() => toggleExpansion(index)}
              >
                <img
                  src={`${BACKEND_URL}storage/${productRating.image}`}
                  alt="productImage"
                  className="w-[80px] h-[80px] md:w-[200px] md:h-[200px] rounded-[100%] object-cover"
                />
                <h2 className="expan_title font-sofia  ">
                  {productRating.title}
                </h2>
                <span
                  className={`arrow  mr-4 ${
                    expandedPanels[index] ? "up" : "down"
                  }`}
                ></span>
              </div>
              <div className="expansion-panel-content flex flex-col items-center pb-10">
                <div className="mt-12 flex flex-wrap gap-10 lg:gap-16 justify-center w-full">
                  <div className="grid xl:grid-cols-3 gap-3 md:gap-4 xl:gap-8 md:grid-cols-2 grid-cols-1 px-12 py-8">
                    {loadedReviews[productRating.id] &&
                      loadedReviews[productRating.id].map(
                        (rating, ratingIndex) => (
                          <ReviewCard
                            key={ratingIndex}
                            title={rating.title}
                            price={productRating.price}
                            image={`${BACKEND_URL}storage/${productRating.image}`}
                            description={rating.description}
                            date={formatRelativeDate(rating.date)}
                            stars={rating.stars}
                            productId={productRating.id}
                            seller={rating.name}
                          />
                        )
                      )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {reviewType === "posted_reviews" && accountRatings && (
        <div className="mt-12 flex flex-wrap gap-10 lg:gap-16 justify-center w-full">
          <div className="grid xl:grid-cols-3 gap-3 md:gap-4 xl:gap-8 md:grid-cols-2 grid-cols-1 px-12 py-8">
            {accountRatings.map((product, index) => (
              <ReviewCard
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
      {isLoading && (
        <div className="flex justify-center items-center h-[30vh] w-full">
          <ClipLoader color="#DD6969" size={50} />
        </div>
      )}
    </>
  );
};

export default FeedbackAndReviews;

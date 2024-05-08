import React, { useState, useRef, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { BACKEND_URL } from "../../config";
import formatRelativeDate from "../../api/utils/formatDate";
import ReviewBar from "../reviews/reviewBar";
import ReviewCard from "../reviews/ReviewCard";
import { useReviewsByProductId } from "../../api/reviewsByProductId";
import useBusinessProductRatingsById from "../../api/BusinessViewApi/businessAllProductRatingsById";

const FeedbackAndReviewsView = ({ profile = false, businessId = 167 }) => {
  const [productPage, setProductPage] = useState(1);
  const [expandedPanels, setExpandedPanels] = useState([]);
  const [lastProductPage, setLastProductPage] = useState(false);
  const [products, setProducts] = useState([]);
  const productContainerRef = useRef(null);
  const [reviewType, setReviewType] = useState("my_reviews");

  const {
    data: newProducts,
    isLoading: productLoading,
    isError: productError,
  } = useBusinessProductRatingsById(businessId, productPage);

  const toggleExpansion = (index) => {
    setExpandedPanels((prevExpandedPanels) => {
      const newExpandedPanels = [...prevExpandedPanels];
      newExpandedPanels[index] = !newExpandedPanels[index];
      return newExpandedPanels;
    });
  };

  useEffect(() => {
    if (newProducts) {
      if (newProducts.length === 0) {
        setLastProductPage(true);
      } else {
        // Update products list only if it's the first page
        if (productPage === 1) {
          setProducts(newProducts);
        } else {
          // Append new products to the existing list
          setProducts((prevProducts) => [...prevProducts, ...newProducts]);
        }
      }
    }
  }, [newProducts, productPage]);

  useEffect(() => {
    if (productContainerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (
            entry.isIntersecting &&
            !lastProductPage &&
            !productLoading &&
            !productError
          ) {
            loadMoreProducts();
          }
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: 1,
        }
      );
      observer.observe(productContainerRef.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [lastProductPage, productLoading, productError]);

  const loadMoreProducts = () => {
    setProductPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <ReviewBar
        type="business"
        onReviewTypeChange={setReviewType}
        profile={profile}
      />

      <div className="mt-12"></div>

      <div ref={productContainerRef}>
        {products.map((productRating, index) => (
          <div
            key={index}
            className={`expansion-panel review w-[90vw] md:mx-0 ${
              expandedPanels[index] ? "expandedreviews" : ""
            }`}
          >
            <div
              className="expansion-panel-header p-4 text-md md:text-3xl xl:text-4xl"
              onClick={() => toggleExpansion(index)}
            >
              <img
                src={`${BACKEND_URL}storage/${productRating.image}`}
                alt="productImage"
                className="w-[80px] h-[80px] md:w-[200px] md:h-[200px] rounded-[100%] object-cover"
              />
              <h2 className="expan_title font-sofia">{productRating.title}</h2>
              <span
                className={`arrow mr-4 ${
                  expandedPanels[index] ? "up" : "down"
                }`}
              ></span>
            </div>
            <div className="expansion-panel-content flex flex-col items-center pb-10">
              <div className="mt-12 flex flex-wrap gap-10 lg:gap-16 justify-center w-full">
                <div className="grid xl:grid-cols-3 gap-3 md:gap-4 xl:gap-8 md:grid-cols-2 grid-cols-1 px-12 py-8">
                  <ProductReviews
                    productId={productRating.id}
                    expanded={expandedPanels[index]}
                    productImage={productRating.image}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        {productLoading && (
          <div className="flex justify-center items-center h-[30vh] w-full">
            <ClipLoader color="#DD6969" size={50} />
          </div>
        )}
      </div>
    </>
  );
};

const ProductReviews = ({ productId, expanded, productImage }) => {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data, isLoading, isError } = useReviewsByProductId(productId, page);

  useEffect(() => {
    if (data) {
      setReviews((prevReviews) => [...prevReviews, ...data.ratings]);
      setLastPage(data.ratings.length === 0);
    }
  }, [data]);

  useEffect(() => {
    if (expanded && !lastPage && !isLoading && !isError) {
      setLoading(true);
      setPage((prevPage) => prevPage + 1);
    }
  }, [expanded, lastPage, isLoading, isError]);

  useEffect(() => {
    if (page > 1 && loading && !isLoading && !isError) {
      setLoading(false);
    }
  }, [page, loading, isLoading, isError]);

  return (
    <>
      {reviews.map((review, index) => (
        <ReviewCard
          key={index}
          title={review.title}
          price={review.price}
          image={`${BACKEND_URL}storage/${productImage}`}
          description={review.description}
          date={formatRelativeDate(review.date)}
          stars={review.stars}
          productId={productId}
          seller={review.name}
        />
      ))}
      {loading && (
        <div className="flex justify-center items-center h-[30vh] w-full">
          <ClipLoader color="#DD6969" size={50} />
        </div>
      )}
    </>
  );
};

export default FeedbackAndReviewsView;

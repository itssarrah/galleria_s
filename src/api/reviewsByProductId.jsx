import { useQuery } from "react-query";
import { BACKEND_URL } from "../config";

const fetchReviewsByProductId = async (productId, page, perPage) => {
  try {
    const response = await fetch(
      `${BACKEND_URL}api/reviews/product/${productId}?page=${page}&perPage=${perPage}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    throw new Error("Failed to fetch reviews: " + error.message);
  }
};

const useReviewsByProductId = (productId, initialPage = 1, perPage = 8) => {
  return useQuery(
    ["reviews", productId, initialPage],
    () => fetchReviewsByProductId(productId, initialPage, perPage),
    {
      staleTime: 1000,
      cacheTime: 1000,
    }
  );
};

export { fetchReviewsByProductId, useReviewsByProductId };

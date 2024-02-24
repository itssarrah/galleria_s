import { useQuery } from "react-query";
import { BACKEND_URL } from "../config";

const fetchReviewsByProductId = async (productId) => {
  try {
    const response = await fetch(
      `${BACKEND_URL}api/reviews/product/${productId}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw new Error("Failed to fetch reviews: " + error.message);
  }
};

const useReviewsByProductId = (productId) => {
  return useQuery(
    ["reviews", productId],
    () => fetchReviewsByProductId(productId),
    {
      staleTime: 120000,
      cacheTime: 300000,
    }
  );
};

export default useReviewsByProductId;

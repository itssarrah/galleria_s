import { useQuery } from "react-query";
import { BACKEND_URL } from "../config";

const fetchRatingsByProductId = async (productId) => {
  try {
    const response = await fetch(
      `${BACKEND_URL}api/product/${productId}/ratings/statistics`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    throw new Error("Failed to fetch ratings: " + error.message);
  }
};

const useRatingsByProductId = (productId) => {
  return useQuery(
    ["ratings", productId],
    () => fetchRatingsByProductId(productId),
    {
      staleTime: 120000,
      cacheTime: 300000,
    }
  );
};

export default useRatingsByProductId;

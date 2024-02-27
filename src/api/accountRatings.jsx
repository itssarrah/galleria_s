import { useQuery } from "react-query";
import { BACKEND_URL } from "../config";

const fetchAccountProductRatings = async (token) => {
  try {
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await fetch(`${BACKEND_URL}api/account/ratings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw new Error("Failed to fetch product ratings: " + error.message);
  }
};

const useAccountRatings = (token) => {
  return useQuery(
    "accountProductRatings",
    () => fetchAccountProductRatings(token),
    {
      staleTime: 120000,
      cacheTime: 300000,
    }
  );
};

export default useAccountRatings;

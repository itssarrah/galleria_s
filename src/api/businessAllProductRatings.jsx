import { useQuery } from "react-query";
import { BACKEND_URL } from "../config";

const fetchBusinessProductRatings = async (
  token,
  productPage,
  ratingPage,
  productPerPage,
  ratingPerPage
) => {
  try {
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await fetch(
      `${BACKEND_URL}api/business/products-ratings?productPage=${productPage}&ratingPage=${ratingPage}&productPerPage=${productPerPage}&ratingPerPage=${ratingPerPage}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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

const useBusinessProductRatings = (
  token,
  productPage = 1,
  ratingPage = 1,
  productPerPage = 10,
  ratingPerPage = 2
) => {
  return useQuery(
    ["businessProductRatings", productPage, ratingPage], // Include the page numbers in the query key
    () =>
      fetchBusinessProductRatings(
        token,
        productPage,
        ratingPage,
        productPerPage,
        ratingPerPage
      ),
    {
      staleTime: 120000,
      cacheTime: 300000,
    }
  );
};

export default useBusinessProductRatings;

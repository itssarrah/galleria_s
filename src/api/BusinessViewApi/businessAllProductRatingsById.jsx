import { useQuery } from "react-query";
import { BACKEND_URL } from "../../config";

const fetchBusinessProductRatingsById = async (
  businessId,
  productPage,
  ratingPage,
  productPerPage,
  ratingPerPage
) => {
  try {
    const response = await fetch(
      `${BACKEND_URL}api/business/products-ratingsbyid?productPage=${productPage}&businessId=${businessId}ratingPage=${ratingPage}&productPerPage=${productPerPage}&ratingPerPage=${ratingPerPage}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    throw new Error("Failed to fetch product ratings: " + error.message);
  }
};

const useBusinessProductRatingsById = (
  businessId,
  productPage = 1,
  ratingPage = 1,
  productPerPage = 10,
  ratingPerPage = 2
) => {
  return useQuery(
    ["businessProductRatingsById", productPage, ratingPage, businessId], // Include the page numbers in the query key
    () =>
      fetchBusinessProductRatingsById(
        businessId,
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

export default useBusinessProductRatingsById;

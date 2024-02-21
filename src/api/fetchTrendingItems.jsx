import { useQuery, useQueryClient } from "react-query";
import { BACKEND_URL } from "../config";

const useProducts = () => {
  const queryClient = useQueryClient(); // Define queryClient here

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const headers = {
        "Content-Type": "application/json",
      };

      // Add token to headers if it exists
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(`${BACKEND_URL}api/products`, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json(); // Extract data from the response
      console.log(data.data);
      return data.data; // Return the extracted data
    } catch (error) {
      throw new Error("Failed to fetch products: " + error.message);
    }
  };

  const queryKey = "products";
  const query = useQuery(queryKey, fetchProducts, {
    staleTime: 120000,
    cacheTime: 300000,
  });

  const invalidateProductsQuery = () => {
    queryClient.invalidateQueries(queryKey);
  };

  return { ...query, invalidateProductsQuery };
};

export default useProducts;

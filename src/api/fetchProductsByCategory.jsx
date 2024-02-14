import { useQuery } from "react-query";
import { BACKEND_URL } from "../config";

const fetchProducts = async (category, page) => {
  try {
    const response = await fetch(`${BACKEND_URL}api/products/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category, page }), // Send category and page as JSON in the request body
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json(); // Extract data from the response
    // console.log(data.data.data);
    return data; // Return the extracted data
  } catch (error) {
    throw new Error("Failed to fetch products: " + error.message);
  }
};

const useProductsByCategory = (category, page) => {
  return useQuery(
    ["products", category, page],
    () => fetchProducts(category, page),
    {
      staleTime: 120000,
      cacheTime: 300000,
    }
  );
};

export default useProductsByCategory;

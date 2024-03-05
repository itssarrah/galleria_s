// Import the necessary modules
import { useQuery, useQueryClient } from "react-query";
import { BACKEND_URL } from "../config";

// Define the function to fetch businesses by category
const fetchBusinessesByCategory = async (categoryName) => {
  try {
    const token = localStorage.getItem("authToken");
    const headers = {
      "Content-Type": "application/json",
    };

    // Add token to headers if it exists
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(
      `${BACKEND_URL}api/businesses/category/${categoryName}`,
      {
        method: "GET",
        headers,
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    throw new Error("Failed to fetch businesses: " + error.message);
  }
};

// Define the custom hook to use businesses by category
const useBusinessesByCategory = (categoryName) => {
  const queryClient = useQueryClient();

  const queryKey = ["businesses", categoryName];

  const { data, ...query } = useQuery(
    queryKey,
    () => fetchBusinessesByCategory(categoryName),
    {
      staleTime: 120000,
      cacheTime: 300000,
      // Use initialData to retain previous data and avoid refetching on navigation
      initialData: () => {
        return queryClient.getQueryData(queryKey);
      },
      // Refetch data on window focus to ensure updated likes are reflected
      refetchOnWindowFocus: true,
    }
  );

  const invalidateBusinessesQuery = () => {
    queryClient.invalidateQueries(queryKey);
  };

  return { data, invalidateBusinessesQuery, ...query };
};

export default useBusinessesByCategory;

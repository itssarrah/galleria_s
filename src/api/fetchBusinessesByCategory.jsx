import { useQuery } from "react-query";
import { BACKEND_URL } from "../config";

const fetchBusinessesByCategory = async (categoryName) => {
  try {
    const response = await fetch(
      `${BACKEND_URL}api/businesses/category/${categoryName}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch businesses: " + error.message);
  }
};

const useBusinessesByCategory = (categoryName) => {
  return useQuery(
    ["businesses", categoryName],
    () => fetchBusinessesByCategory(categoryName),
    {
      staleTime: 120000,
      cacheTime: 300000,
    }
  );
};

export default useBusinessesByCategory;

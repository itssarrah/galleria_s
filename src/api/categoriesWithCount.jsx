import { useQuery } from "react-query";
import { BACKEND_URL } from "../config";

const fetchCategories = async () => {
  const response = await fetch(`${BACKEND_URL}api/categoriescount`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json(); // Extract data from the response
  // console.log(data); // Check the structure of the data
  return data; // Return the extracted data
};

const useCategorieCount = () => {
  return useQuery("categories", fetchCategories, {
    method: "GET",
    staleTime: 60000,
    cacheTime: 3600000,
  });
};

export default useCategorieCount;

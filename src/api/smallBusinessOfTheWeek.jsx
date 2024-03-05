import { useQuery } from "react-query";
import { BACKEND_URL } from "../config";

const fetchSmallBusinessOfWeek = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}api/businessoftheweek`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(
      "Failed to fetch small business of the week: " + error.message
    );
  }
};

const useSmallBusinessOfWeek = () => {
  return useQuery("smallBusinessOfWeek", () => fetchSmallBusinessOfWeek(), {
    staleTime: 120000,
    cacheTime: 300000,
  });
};

export default useSmallBusinessOfWeek;

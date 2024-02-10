import { useQuery } from "react-query";
import { BACKEND_URL } from "../config";

const fetchBusinesses = async () => {
  const response = await fetch(`${BACKEND_URL}api/businesses`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};

const useBusinesses = () => {
  return useQuery("businesses", fetchBusinesses, {
    method: "GET",
    staleTime: 60000,
    cacheTime: 3600000,
  });
};

export default useBusinesses;

import { useQuery } from "react-query";
import { BACKEND_URL } from "../config";

const fetchWilayas = async () => {
  const response = await fetch(`${BACKEND_URL}api/wilayas`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json(); // Extract data from the response
  //   console.log(data); // Check the structure of the data
  return data;
};

const useWilayas = () => {
  return useQuery("wilayas", fetchWilayas, {
    staleTime: 60000,
    cacheTime: 3600000,
  });
};

export default useWilayas;

import { useQuery } from "react-query";
import { BACKEND_URL } from "../../config";

const fetchBusinessById = async (businessId) => {
  const response = await fetch(`${BACKEND_URL}api/viewbusiness/${businessId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch business data");
  }

  return response.json();
};

const useBusinessDataById = (businessId) => {
  return useQuery(["businessDataById", businessId], () =>
    fetchBusinessById(businessId)
  );
};

export default useBusinessDataById;

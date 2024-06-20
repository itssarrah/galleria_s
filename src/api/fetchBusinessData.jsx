// import { useQuery } from "react-query";
// import { BACKEND_URL } from "../config";

// const useBusinessData = (token) => {
//   return useQuery("businessData", () => fetchBusinessData(token), {
//     onError: (error) => {
//       if (error.response?.status === 401) {
//         console.error("Unauthorized. Redirecting to login page.");
//         window.location.href = "/login";
//       }
//     },
//   });
// };

// const fetchBusinessData = async (token) => {
//   const response = await fetch(`${BACKEND_URL}api/business/profile`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Failed to fetch business data");
//   }

//   return response.json();
// };

// export default useBusinessData;
import { useQuery, useQueryClient } from "react-query";
import { BACKEND_URL } from "../config";

const useBusinessData = (token) => {
  const queryClient = useQueryClient();

  const queryKey = "businessData";
  const query = useQuery(queryKey, () => fetchBusinessData(token), {
    onError: (error) => {
      if (error.response?.status === 401) {
        console.error("Unauthorized. Redirecting to login page.");
        window.location.href = "/login";
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey); // Invalidate the query on successful fetch
    },
  });

  return query;
};

const fetchBusinessData = async (token) => {
  const response = await fetch(`${BACKEND_URL}api/business/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch business data");
  }

  return response.json();
};

export default useBusinessData;

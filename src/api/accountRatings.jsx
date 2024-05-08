// import { useQuery } from "react-query";
// import { BACKEND_URL } from "../config";

// const fetchAccountProductRatings = async (token, perPage, page) => {
//   try {
//     if (!token) {
//       throw new Error("Authentication token not found");
//     }

//     const response = await fetch(
//       `${BACKEND_URL}api/account/ratings?perPage=${perPage}&page=${page}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const data = await response.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     throw new Error("Failed to fetch product ratings: " + error.message);
//   }
// };

// const useAccountRatings = (token, perPage, page) => {
//   return useQuery(
//     ["accountProductRatings", perPage, page],
//     () => fetchAccountProductRatings(token, perPage, page),
//     {
//       staleTime: 120000,
//       cacheTime: 300000,
//     }
//   );
// };

// export default useAccountRatings;
import { useQuery, useInfiniteQuery } from "react-query";
import { BACKEND_URL } from "../config";

const fetchAccountProductRatings = async (token, perPage, page) => {
  try {
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await fetch(
      `${BACKEND_URL}api/account/ratings?perPage=${perPage}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw new Error("Failed to fetch product ratings: " + error.message);
  }
};

const useAccountRatings = (token, perPage, page) => {
  return useInfiniteQuery(
    ["accountProductRatings", perPage, page],
    ({ pageParam = page }) =>
      fetchAccountProductRatings(token, perPage, pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.meta.current_page < lastPage.meta.last_page) {
          return lastPage.meta.current_page + 1;
        }
        return undefined; // return undefined when there are no more pages
      },
      staleTime: 120000,
      cacheTime: 300000,
    }
  );
};

export default useAccountRatings;

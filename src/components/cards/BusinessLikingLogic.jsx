import { BACKEND_URL } from "../../config";

const fetchBusinessLikeStatus = async (businessId, token) => {
  const response = await fetch(
    `${BACKEND_URL}api/liked-business/status?saved_business_id=${businessId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch like status");
  }
  return response.json();
};

const likeBusiness = async (businessId, token) => {
  console.log("you are liking id : ", businessId);
  if (!token) {
    // Redirect user to login page if token is empty
    window.location.href = "/login";
    return;
  }
  const response = await fetch(`${BACKEND_URL}api/liked-business/save`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ saved_business_id: businessId }),
  });
  if (!response.ok) {
    throw new Error("Failed to like the business");
  }
  return response.json();
};

const unlikeBusiness = async (businessId, token) => {
  if (!token) {
    // Redirect user to login page if token is empty
    window.location.href = "/login";
    return;
  }
  const response = await fetch(`${BACKEND_URL}api/liked-business/unlike`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ saved_business_id: businessId }),
  });
  if (!response.ok) {
    throw new Error("Failed to unlike the business");
  }
  return response.json();
};

export { unlikeBusiness, likeBusiness, fetchBusinessLikeStatus };

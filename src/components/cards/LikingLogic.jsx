import { BACKEND_URL } from "../../config";

const fetchLikeStatus = async (productId, token) => {
  const response = await fetch(
    `${BACKEND_URL}api/get-like-status?product_id=${productId}`,
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

const likeProduct = async (productId, token) => {
  const response = await fetch(`${BACKEND_URL}api/save-liked-product`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product_id: productId }),
  });
  if (!response.ok) {
    throw new Error("Failed to like the product");
  }
  return response.json();
};

const unlikeProduct = async (productId, token) => {
  const response = await fetch(`${BACKEND_URL}api/unlike-product`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product_id: productId }),
  });
  if (!response.ok) {
    throw new Error("Failed to unlike the product");
  }
  return response.json();
};

export { unlikeProduct, likeProduct, fetchLikeStatus };

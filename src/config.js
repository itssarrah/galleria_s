export const BACKEND_URL =
  import.meta.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_URL_PROD
    : import.meta.env.VITE_BACKEND_URL_LOCAL;

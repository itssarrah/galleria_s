export const BACKEND_URL =
  import.meta.env.NODE_ENV === "production"
    ? import.meta.env.REACT_APP_BACKEND_URL_PROD
    : import.meta.env.REACT_APP_BACKEND_URL_LOCAL;

import axios from "axios";

export * from "./categories/getCategories";

const api = axios.create({
  baseURL:
    (process.env.STORE_ADMIN_API_BASE_URL as string) ||
    (process.env.NEXT_PUBLIC_STORE_ADMIN_API_BASE_URL as string),
});

export const api_monolith = axios.create({
  baseURL:
    (process.env.PFC_API_BASE_URL as string) ||
    (process.env.NEXT_PUBLIC_PFC_API_BASE_URL as string),
});

export default api;

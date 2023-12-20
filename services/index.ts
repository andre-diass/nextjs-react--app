import axios from "axios";

export * from "./categories/getCategories";

const api = axios.create({
  baseURL:
    (process.env.STORE_ADMIN_API_BASE_URL as string) ||
    (process.env.NEXT_PUBLIC_STORE_ADMIN_API_BASE_URL as string),
});

export default api;

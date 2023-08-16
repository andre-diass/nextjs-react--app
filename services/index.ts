import axios from "axios";

const api = axios.create({
  baseURL: process.env.STORE_ADMIN_API_BASE_URL as string,
});

export default api;

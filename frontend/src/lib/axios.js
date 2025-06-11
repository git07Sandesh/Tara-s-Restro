import axios from "axios";

const baseURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/api"
    : `${import.meta.env.VITE_API_URL}/api`; // Not just "/api"!

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

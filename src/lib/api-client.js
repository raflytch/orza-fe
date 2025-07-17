import axios from "axios";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URI;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      deleteCookie("token");
      window.location.href = "/sign-in";
    }
    return Promise.reject(error);
  }
);

export default apiClient;

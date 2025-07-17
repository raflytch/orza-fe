import apiClient from "@/lib/api-client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URI;

export const authService = {
  login: async (credentials) => {
    const response = await apiClient.post("/users/login", credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await apiClient.post("/users/register", userData);
    return response.data;
  },

  verifyOtp: async (otpData) => {
    const response = await apiClient.post("/users/verify-otp", otpData);
    return response.data;
  },

  getProfile: async () => {
    const response = await apiClient.get("/users/profile");
    return response.data;
  },

  getGoogleAuthUrl: () => {
    return `${API_BASE_URL}/users/auth/google`;
  },
};

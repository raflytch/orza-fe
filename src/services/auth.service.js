import apiClient from "@/lib/api-client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URI;

export const authService = {
  login: async (credentials) => {
    const response = await apiClient.post("/users/login", credentials);
    return response.data;
  },

  getGoogleAuthUrl: () => {
    return `${API_BASE_URL}/users/auth/google`;
  },
};

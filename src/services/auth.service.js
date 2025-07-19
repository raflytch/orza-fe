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

  resendOtp: async (email) => {
    const response = await apiClient.post("/users/resend-otp", { email });
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await apiClient.post("/users/forgot-password", { email });
    return response.data;
  },

  resetPassword: async (data) => {
    const response = await apiClient.post("/users/reset-password", data);
    return response.data;
  },

  changePassword: async (data) => {
    const response = await apiClient.put("/users/change-password", data);
    return response.data;
  },

  updateProfile: async (data) => {
    const formData = new FormData();
    if (data.name) formData.append("name", data.name);
    if (data.password) formData.append("password", data.password);
    if (data.avatar) formData.append("avatar", data.avatar);

    const response = await apiClient.put("/users/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  getGoogleAuthUrl: () => {
    return `${API_BASE_URL}/users/auth/google`;
  },
};

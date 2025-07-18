import apiClient from "@/lib/api-client";

export const userService = {
  // Get user profile
  getProfile: async () => {
    const response = await apiClient.get("/users/profile");
    return response.data;
  },

  // Update user profile
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

  // Request delete account
  requestDeleteAccount: async () => {
    const response = await apiClient.post("/users/delete-account/request");
    return response.data;
  },

  // Confirm delete account
  confirmDeleteAccount: async (otp) => {
    const response = await apiClient.delete("/users/delete-account", {
      data: { otp },
    });
    return response.data;
  },

  // Get liked posts
  getLikedPosts: async (page = 1, limit = 10) => {
    const response = await apiClient.get(
      `/likes/my?page=${page}&limit=${limit}`
    );
    return response.data;
  },
};

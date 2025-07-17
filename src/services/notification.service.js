import apiClient from "@/lib/api-client";

export const notificationService = {
  getNotifications: async (page = 1, limit = 100) => {
    const response = await apiClient.get(
      `/notifications?page=${page}&limit=${limit}`
    );
    return response.data;
  },

  markAsRead: async (id) => {
    const response = await apiClient.patch(`/notifications/${id}/read`);
    return response.data;
  },
};

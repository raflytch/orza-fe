import apiClient from "@/lib/api-client";

export const communityService = {
  getAllCommunities: async (page = 1, limit = 10) => {
    const response = await apiClient.get(
      `/communities?page=${page}&limit=${limit}`
    );
    return response.data;
  },

  createCommunity: async (formData) => {
    const response = await apiClient.post("/communities", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updateCommunity: async (id, formData) => {
    const response = await apiClient.put(`/communities/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  joinCommunity: async (communityId) => {
    const response = await apiClient.post("/communities/join", {
      communityId,
    });
    return response.data;
  },

  getMyCommunities: async () => {
    const response = await apiClient.get("/communities/my");
    return response.data;
  },

  getCommunityById: async (id) => {
    try {
      const response = await apiClient.get(`/communities/${id}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        try {
          const allCommunitiesResponse = await apiClient.get(
            "/communities?page=1&limit=100"
          );
          const communities =
            allCommunitiesResponse.data?.data?.communities || [];
          const community = communities.find((c) => c.id === id);

          if (community) {
            return {
              status: "success",
              data: community,
            };
          } else {
            throw new Error("Komunitas tidak ditemukan");
          }
        } catch (fallbackError) {
          throw fallbackError;
        }
      }
      throw error;
    }
  },

  deleteCommunity: async (id) => {
    const response = await apiClient.delete(`/communities/${id}`);
    return response.data;
  },

  leaveCommunity: async (communityId) => {
    const response = await apiClient.delete(`/communities/leave`, {
      data: { communityId },
    });
    return response.data;
  },
};

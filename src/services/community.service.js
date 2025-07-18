import apiClient from "@/lib/api-client";

export const communityService = {
  // Get all communities with pagination
  getAllCommunities: async (page = 1, limit = 10) => {
    const response = await apiClient.get(`/communities?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Create new community
  createCommunity: async (formData) => {
    const response = await apiClient.post("/communities", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Update community
  updateCommunity: async (id, data) => {
    const response = await apiClient.put(`/communities/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },

  // Join community
  joinCommunity: async (communityId) => {
    const response = await apiClient.post("/communities/join", {
      communityId,
    });
    return response.data;
  },

  // Get my communities
  getMyCommunities: async () => {
    const response = await apiClient.get("/communities/my");
    return response.data;
  },

// Get community by ID - dengan fallback jika endpoint detail tidak ada
getCommunityById: async (id) => {
  try {
    // Coba endpoint detail terlebih dahulu
    const response = await apiClient.get(`/communities/${id}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      // Jika endpoint detail tidak ada, ambil dari list dan filter
      try {
        const allCommunitiesResponse = await apiClient.get("/communities?page=1&limit=100");
        const communities = allCommunitiesResponse.data?.data?.communities || [];
        const community = communities.find(c => c.id === id);
        
        if (community) {
          return {
            status: "success",
            data: community
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

  // Delete community (assuming this endpoint exists)
  deleteCommunity: async (id) => {
    const response = await apiClient.delete(`/communities/${id}`);
    return response.data;
  },

  // Leave community (assuming this endpoint exists)
  leaveCommunity: async (communityId) => {
    const response = await apiClient.delete(`/communities/leave`, {
      data: { communityId },
    });
    return response.data;
  },
};
import apiClient from "@/lib/api-client";

export const predictionService = {
  getCrops: async () => {
    const response = await apiClient.get("/predictions/crops");
    return response.data;
  },

  createPrediction: async (data) => {
    const formData = new FormData();
    formData.append("cropType", data.cropType);
    formData.append("image", data.image);

    const response = await apiClient.post("/predictions", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  getPredictions: async (page = 1, limit = 10) => {
    const response = await apiClient.get(
      `/predictions?page=${page}&limit=${limit}`
    );
    return response.data;
  },

  getPredictionById: async (id) => {
    const response = await apiClient.get(`/predictions/${id}`);
    return response.data;
  },

  deletePrediction: async (id) => {
    const response = await apiClient.delete(`/predictions/${id}`);
    return response.data;
  },

  getStats: async () => {
    const response = await apiClient.get("/predictions/stats");
    return response.data;
  },
};

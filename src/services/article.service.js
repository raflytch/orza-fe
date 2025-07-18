import apiClient from "@/lib/api-client";

export const articleService = {
  getAllArticles: async (page = 1, limit = 10) => {
    const response = await apiClient.get(
      `/articles?page=${page}&limit=${limit}`
    );
    return response.data;
  },

  getMyArticles: async (page = 1, limit = 10) => {
    const response = await apiClient.get(
      `/articles/my?page=${page}&limit=${limit}`
    );
    return response.data;
  },

  getCategories: async () => {
    const response = await apiClient.get("/articles/categories");
    return response.data;
  },

  createArticle: async (formData) => {
    const response = await apiClient.post("/articles", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updateArticle: async (id, formData) => {
    const response = await apiClient.put(`/articles/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  deleteArticle: async (id) => {
    const response = await apiClient.delete(`/articles/${id}`);
    return response.data;
  },
};

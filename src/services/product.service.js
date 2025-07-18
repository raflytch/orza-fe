import apiClient from "@/lib/api-client";

export const getProductSuggestions = async () => {
  const response = await apiClient.get("/products");
  return response.data;
};

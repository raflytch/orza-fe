import { useQuery } from "@tanstack/react-query";
import { getProductSuggestions } from "@/services/product.service";

export const useProductSuggestions = () => {
  return useQuery({
    queryKey: ["product-suggestions"],
    queryFn: getProductSuggestions,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};

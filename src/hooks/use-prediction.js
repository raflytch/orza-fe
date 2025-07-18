import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { predictionService } from "@/services/prediction.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useCrops = () => {
  return useQuery({
    queryKey: ["crops"],
    queryFn: predictionService.getCrops,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreatePrediction = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: predictionService.createPrediction,
    onSuccess: (data) => {
      toast.success("Prediksi berhasil dibuat!");
      queryClient.invalidateQueries({ queryKey: ["predictions"] });
      queryClient.invalidateQueries({ queryKey: ["prediction-stats"] });
      router.push(`/predict/${data.data.id}`);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal membuat prediksi");
    },
  });
};

export const usePredictions = () => {
  return useInfiniteQuery({
    queryKey: ["predictions"],
    queryFn: ({ pageParam = 1 }) =>
      predictionService.getPredictions(pageParam, 10),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });
};

export const usePredictionById = (id) => {
  return useQuery({
    queryKey: ["prediction", id],
    queryFn: () => predictionService.getPredictionById(id),
    enabled: !!id,
  });
};

export const useDeletePrediction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: predictionService.deletePrediction,
    onSuccess: () => {
      toast.success("Prediksi berhasil dihapus!");
      queryClient.invalidateQueries({ queryKey: ["predictions"] });
      queryClient.invalidateQueries({ queryKey: ["prediction-stats"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal menghapus prediksi");
    },
  });
};

export const usePredictionStats = () => {
  return useQuery({
    queryKey: ["prediction-stats"],
    queryFn: predictionService.getStats,
    staleTime: 5 * 60 * 1000,
  });
};

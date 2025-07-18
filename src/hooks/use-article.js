import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { articleService } from "@/services/article.service";

export const useGetAllArticles = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["articles", page, limit],
    queryFn: () => articleService.getAllArticles(page, limit),
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetMyArticles = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["my-articles", page, limit],
    queryFn: () => articleService.getMyArticles(page, limit),
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["article-categories"],
    queryFn: articleService.getCategories,
    staleTime: 10 * 60 * 1000,
  });
};

export const useCreateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: articleService.createArticle,
    onSuccess: (data) => {
      toast.success(data.message || "Artikel berhasil dibuat");
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["my-articles"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal membuat artikel");
    },
  });
};

export const useUpdateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => articleService.updateArticle(id, data),
    onSuccess: (data) => {
      toast.success(data.message || "Artikel berhasil diperbarui");
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["my-articles"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal memperbarui artikel");
    },
  });
};

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: articleService.deleteArticle,
    onSuccess: (data) => {
      toast.success(data.message || "Artikel berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["my-articles"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal menghapus artikel");
    },
  });
};

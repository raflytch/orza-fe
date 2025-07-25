import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { communityService } from "@/services/community.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useGetCommunities = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["communities", page, limit],
    queryFn: () => communityService.getAllCommunities(page, limit),
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetCommunityById = (id) => {
  return useQuery({
    queryKey: ["community", id],
    queryFn: () => communityService.getCommunityById(id),
    enabled: !!id,
    retry: 1,
  });
};

export const useGetMyCommunities = () => {
  return useQuery({
    queryKey: ["my-communities"],
    queryFn: communityService.getMyCommunities,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateCommunity = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: communityService.createCommunity,
    onSuccess: (data) => {
      toast.success(data.message || "Komunitas berhasil dibuat");
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      queryClient.invalidateQueries({ queryKey: ["my-communities"] });
      if (data.data?.id) {
        router.push(`/community/${data.data.id}`);
      }
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Gagal membuat komunitas";
      toast.error(errorMessage);
    },
  });
};

export const useUpdateCommunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => communityService.updateCommunity(id, data),
    onSuccess: (data, variables) => {
      toast.success(data.message || "Komunitas berhasil diperbarui");
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      queryClient.invalidateQueries({ queryKey: ["community", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["my-communities"] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Gagal memperbarui komunitas";
      toast.error(errorMessage);
    },
  });
};

export const useJoinCommunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: communityService.joinCommunity,
    onSuccess: (data) => {
      toast.success(data.message || "Berhasil bergabung dengan komunitas");
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      queryClient.invalidateQueries({ queryKey: ["my-communities"] });
      queryClient.invalidateQueries({ queryKey: ["community"] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Gagal bergabung dengan komunitas";
      toast.error(errorMessage);
    },
  });
};

export const useLeaveCommunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: communityService.leaveCommunity,
    onSuccess: (data) => {
      toast.success(data.message || "Berhasil keluar dari komunitas");
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      queryClient.invalidateQueries({ queryKey: ["my-communities"] });
      queryClient.invalidateQueries({ queryKey: ["community"] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Gagal keluar dari komunitas";
      toast.error(errorMessage);
    },
  });
};

export const useDeleteCommunity = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: communityService.deleteCommunity,
    onSuccess: (data) => {
      toast.success(data.message || "Komunitas berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      queryClient.invalidateQueries({ queryKey: ["my-communities"] });
      router.push("/community");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Gagal menghapus komunitas";
      toast.error(errorMessage);
    },
  });
};

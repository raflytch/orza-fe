import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { userService } from "@/services/user.service";
import { deleteCookie } from "cookies-next/client";

// Get user profile
export const useGetUserProfile = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: userService.getProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

// Update user profile
export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.updateProfile,
    onSuccess: (data) => {
      toast.success(data.message || "Profil berhasil diperbarui");
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Gagal memperbarui profil";
      toast.error(errorMessage);
    },
  });
};

// Request delete account
export const useRequestDeleteAccount = () => {
  return useMutation({
    mutationFn: userService.requestDeleteAccount,
    onSuccess: (data) => {
      toast.success(
        data.message || "OTP konfirmasi hapus akun telah dikirim ke email Anda"
      );
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Gagal mengirim OTP";
      toast.error(errorMessage);
    },
  });
};

// Confirm delete account
export const useConfirmDeleteAccount = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.confirmDeleteAccount,
    onSuccess: (data) => {
      toast.success(data.message || "Akun berhasil dihapus");
      deleteCookie("token");
      queryClient.clear();
      router.push("/");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Gagal menghapus akun";
      toast.error(errorMessage);
    },
  });
};

// Get liked posts with infinite scroll
export const useGetLikedPosts = (limit = 10) => {
  return useInfiniteQuery({
    queryKey: ["liked-posts", limit],
    queryFn: ({ pageParam = 1 }) => userService.getLikedPosts(pageParam, limit),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data;
      return page < totalPages ? page + 1 : undefined;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

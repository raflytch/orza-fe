import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "@/services/notification.service";
import { toast } from "sonner";

export const useNotifications = (page = 1, limit = 100) => {
  return useQuery({
    queryKey: ["notifications", page, limit],
    queryFn: () => notificationService.getNotifications(page, limit),
    refetchInterval: 30000,
    staleTime: 0,
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationService.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Gagal menandai notifikasi");
    },
  });
};

export const useUnreadCount = () => {
  const { data: notifications } = useNotifications();

  if (!notifications?.data?.notifications) return 0;

  const unreadCount = notifications.data.notifications.filter(
    (notification) => !notification.isRead
  ).length;

  return unreadCount >= 100 ? "99+" : unreadCount;
};

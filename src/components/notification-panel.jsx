"use client";

import { useState } from "react";
import { FaBell, FaCheck } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useNotifications,
  useMarkAsRead,
  useUnreadCount,
} from "@/hooks/use-notification";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { Loader2 } from "lucide-react";

export default function NotificationPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: notifications, isLoading } = useNotifications();
  const markAsRead = useMarkAsRead();
  const unreadCount = useUnreadCount();

  const handleMarkAsRead = (notificationId) => {
    markAsRead.mutate(notificationId);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "prediction":
        return "🔬";
      case "community":
        return "👥";
      case "article":
        return "📰";
      default:
        return "🔔";
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 relative"
        >
          <FaBell className="text-gray-600 dark:text-gray-400 text-lg" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 sm:w-96">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <FaBell className="text-gray-600 dark:text-gray-400" />
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              Notifikasi
            </span>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
        </div>

        <ScrollArea className="h-80 sm:h-96">
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </div>
          ) : notifications?.data?.notifications?.length > 0 ? (
            <div className="divide-y">
              {notifications.data.notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                    !notification.isRead ? "bg-blue-50 dark:bg-blue-900/20" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-xl sm:text-2xl flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base line-clamp-2">
                          {notification.title}
                        </h4>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {!notification.isRead && (
                            <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                          )}
                          {!notification.isRead && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMarkAsRead(notification.id)}
                              disabled={markAsRead.isPending}
                              className="h-6 w-6 p-0 text-blue-600 hover:text-blue-700"
                            >
                              {markAsRead.isPending ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                <FaCheck className="h-3 w-3" />
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-3">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        {formatDistanceToNow(new Date(notification.createdAt), {
                          addSuffix: true,
                          locale: id,
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-gray-500 dark:text-gray-400">
              <FaBell className="h-12 w-12 mb-4 opacity-50" />
              <p className="text-sm">Tidak ada notifikasi</p>
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

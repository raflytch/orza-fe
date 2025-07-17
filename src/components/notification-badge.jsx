"use client";

import { FaBell } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useUnreadCount } from "@/hooks/use-notification";

export default function NotificationBadge({ className = "" }) {
  const unreadCount = useUnreadCount();

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 relative ${className}`}
    >
      <FaBell className="text-gray-600 dark:text-gray-400 text-lg" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
          {unreadCount}
        </span>
      )}
    </Button>
  );
}

'use client';

import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useConvexUser } from "./useConvexUser";

export function useNotifications() {
  const { convexUser } = useConvexUser();
  
  const notifications = useQuery(api.notifications.getUserNotifications, convexUser ? { userId: convexUser._id } : "skip");
  const unreadCount = useQuery(api.notifications.getUnreadCount, convexUser ? { userId: convexUser._id } : "skip");
  
  const markRead = useMutation(api.notifications.markRead);
  const markAllRead = useMutation(api.notifications.markAllRead);

  return {
    notifications: notifications ?? [],
    unreadCount: unreadCount ?? 0,
    markRead: (notificationId: any) => markRead({ notificationId }),
    markAllRead: () => convexUser && markAllRead({ userId: convexUser._id }),
    isStale: notifications === undefined && !!convexUser
  };
}

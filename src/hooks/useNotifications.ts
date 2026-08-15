import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api';
import { useUIStore } from '@/stores';
import type { ApiResponse } from '@/types';

export const NOTIFICATIONS_QUERY_KEY = ['notifications'] as const;

export interface NotificationItem {
  _id: string;
  type: string;
  message: string;
  time: string;
  read: boolean;
}

const getErrorMessage = (error: unknown, fallback: string) => {
  const apiError = error as
    | { response?: { data?: { message?: string } } }
    | null;
  return apiError?.response?.data?.message || fallback;
};

const toStoreNotification = (n: NotificationItem) => ({
  id: n._id,
  type: (['connection', 'appointment', 'message', 'system'] as const).includes(
    n.type as never
  )
    ? (n.type as 'connection' | 'appointment' | 'message' | 'system')
    : 'system',
  title: n.message,
  message: n.message,
  time: n.time,
  read: n.read,
});

export function useNotifications() {
  const queryClient = useQueryClient();
  const markNotificationAsRead = useUIStore((s) => s.markNotificationAsRead);
  const markAllNotificationsAsRead = useUIStore(
    (s) => s.markAllNotificationsAsRead
  );
  const clearNotifications = useUIStore((s) => s.clearNotifications);

  const query = useQuery({
    queryKey: NOTIFICATIONS_QUERY_KEY,
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<NotificationItem[]>>(
        '/users/notifications'
      );
      return response.data.data ?? [];
    },
  });

  useEffect(() => {
    if (!query.data) return;
    // Server is the source of truth for persisted notifications; socket-added
    // items (no _id collision) are preserved by merging on id.
    const existing = useUIStore.getState().notifications;
    const serverIds = new Set(query.data.map((n) => n._id));
    const merged = [
      ...query.data.map(toStoreNotification),
      ...existing.filter((n) => !serverIds.has(n.id)),
    ];
    const unread = merged.filter((n) => !n.read).length;
    useUIStore.setState({ notifications: merged, unreadNotificationsCount: unread });
  }, [query.data]);

  const markRead = useMutation({
    mutationFn: async (ids: string[]) => {
      const response = await apiClient.patch<ApiResponse>(
        '/users/notifications/read',
        { ids }
      );
      return response.data;
    },
    onSuccess: (_data, ids) => {
      ids.forEach((id) => markNotificationAsRead(id));
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });
    },
    onError: (error) => {
      console.error(getErrorMessage(error, 'Failed to mark notification as read'));
    },
  });

  const markAllRead = useMutation({
    mutationFn: async () => {
      const response = await apiClient.patch<ApiResponse>(
        '/users/notifications/read',
        {}
      );
      return response.data;
    },
    onSuccess: () => {
      markAllNotificationsAsRead();
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });
    },
    onError: (error) => {
      console.error(getErrorMessage(error, 'Failed to mark notifications as read'));
    },
  });

  const clearAll = useMutation({
    mutationFn: async () => {
      const response = await apiClient.delete<ApiResponse>(
        '/users/notifications'
      );
      return response.data;
    },
    onSuccess: () => {
      clearNotifications();
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });
    },
    onError: (error) => {
      console.error(getErrorMessage(error, 'Failed to clear notifications'));
    },
  });

  return {
    notifications: query.data ?? [],
    isLoading: query.isLoading,
    refetch: query.refetch,
    markRead: markRead.mutate,
    markAllRead: markAllRead.mutate,
    clearAll: clearAll.mutate,
    isMarkingAllRead: markAllRead.isPending,
    isClearing: clearAll.isPending,
  };
}
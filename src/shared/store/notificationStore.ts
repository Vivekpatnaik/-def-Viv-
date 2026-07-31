import { create } from 'zustand';

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  type: 'info' | 'warning' | 'success';
  read: boolean;
  createdAt: string;
}

interface NotificationState {
  notifications: NotificationItem[];
  unreadCount: number;
  addNotification: (title: string, body: string, type?: NotificationItem['type']) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,

  addNotification: (title, body, type = 'info') =>
    set((state) => {
      const newItem: NotificationItem = {
        id: Math.random().toString(36).substring(2, 9),
        title,
        body,
        type,
        read: false,
        createdAt: new Date().toISOString(),
      };
      const updated = [newItem, ...state.notifications];
      return {
        notifications: updated,
        unreadCount: updated.filter((n) => !n.read).length,
      };
    }),

  markAsRead: (id) =>
    set((state) => {
      const updated = state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      );
      return {
        notifications: updated,
        unreadCount: updated.filter((n) => !n.read).length,
      };
    }),

  markAllAsRead: () =>
    set((state) => {
      const updated = state.notifications.map((n) => ({ ...n, read: true }));
      return {
        notifications: updated,
        unreadCount: 0,
      };
    }),

  clearNotifications: () => set({ notifications: [], unreadCount: 0 }),
}));

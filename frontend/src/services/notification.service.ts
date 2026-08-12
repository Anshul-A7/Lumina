import api from './api';

export interface Notification {
  id: number;
  userId: number;
  title: string;
  description: string;
  type: string;
  read: boolean;
  createdAt: string;
}

export const notificationService = {
  getUserNotifications: async (): Promise<Notification[]> => {
    const response = await api.get('/notifications');
    return response.data;
  },

  getUnreadNotifications: async (): Promise<Notification[]> => {
    const response = await api.get('/notifications/unread');
    return response.data;
  },

  markAsRead: async (id: number): Promise<void> => {
    await api.put(`/notifications/${id}/read`);
  },

  deleteNotification: async (id: number): Promise<void> => {
    await api.delete(`/notifications/${id}`);
  }
};

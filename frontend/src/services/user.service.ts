import { apiClient } from '../lib/api';

export interface UserSettings {
  id?: number;
  userId?: number;
  theme: string;
  defaultModel: string;
  autoTitle: boolean;
  updatedAt?: string;
}

export interface Notification {
  id: number;
  userId: number;
  title: string;
  description: string;
  type: string;
  read: boolean;
  createdAt: string;
}

export const UserService = {
  updateProfileName: async (name: string) => {
    const response = await apiClient.put('/user/profile/name', { name });
    return response.data;
  },

  getSettings: async (): Promise<UserSettings> => {
    const response = await apiClient.get('/user/settings');
    return response.data;
  },

  updateSettings: async (settings: Partial<UserSettings>): Promise<UserSettings> => {
    const response = await apiClient.put('/user/settings', settings);
    return response.data;
  },

  getNotifications: async (): Promise<Notification[]> => {
    const response = await apiClient.get('/user/notifications');
    return response.data;
  },

  markNotificationsAsRead: async () => {
    const response = await apiClient.put('/user/notifications/read');
    return response.data;
  }
};

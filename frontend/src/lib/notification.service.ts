import { apiClient } from './api';

export interface Notification {
  id: number;
  userId: number;
  title: string;
  description: string;
  type: string;
  read: boolean;
  createdAt: string;
}

export async function getUserNotifications(): Promise<Notification[]> {
  const { data } = await apiClient.get('/user/notifications');
  return data;
}

export async function getUnreadNotifications(): Promise<Notification[]> {
  const { data } = await apiClient.get('/user/notifications/unread');
  return data;
}

export async function markAsRead(id: number): Promise<void> {
  await apiClient.put(`/user/notifications/${id}/read`);
}

export async function markAllAsRead(): Promise<void> {
  await apiClient.put('/user/notifications/read');
}

export async function deleteNotification(id: number): Promise<void> {
  await apiClient.delete(`/user/notifications/${id}`);
}

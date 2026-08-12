"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { notificationService, Notification } from '@/services/notification.service';
import { useAuth } from '@/components/auth/AuthProvider'; // Assuming AuthProvider exists

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: number) => Promise<void>;
  deleteNotification: (id: number) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user } = useAuth(); // Only fetch if user is logged in

  const fetchNotifications = async () => {
    if (!user) return;
    try {
      const data = await notificationService.getUserNotifications();
      setNotifications(data);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  const markAsRead = async (id: number) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const deleteNotification = async (id: number) => {
    try {
      await notificationService.deleteNotification(id);
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Poll every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [user]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, fetchNotifications, markAsRead, deleteNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

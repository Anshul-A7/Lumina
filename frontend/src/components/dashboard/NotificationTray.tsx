import React, { useEffect, useState } from 'react';
import { Bell, X, Trash2, CheckCircle2 } from 'lucide-react';
import * as NotificationService from '@/lib/notification.service';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificationTrayProps {
  onClose: () => void;
}

export default function NotificationTray({ onClose }: NotificationTrayProps) {
  const [notifications, setNotifications] = useState<NotificationService.Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await NotificationService.getUserNotifications();
      setNotifications(data);
    } catch (err) {
      console.error("Failed to load notifications", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await NotificationService.markAsRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (err) {
      console.error("Failed to mark notification as read", err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await NotificationService.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (err) {
      console.error("Failed to mark all as read", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await NotificationService.deleteNotification(id);
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (err) {
      console.error("Failed to delete notification", err);
    }
  };

  const handleSeedDemo = async () => {
    try {
      setIsLoading(true);
      await import('@/lib/api').then(m => m.apiClient.post('/user/notifications/seed-demo'));
      await fetchNotifications();
    } catch (err) {
      console.error("Failed to seed notifications", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="absolute bottom-16 left-4 w-[380px] bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden flex flex-col z-50 max-h-[60vh]"
    >
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          <Bell className="w-4 h-4 text-gray-500" />
          Notifications
        </h3>
        <div className="flex items-center gap-2">
          <button onClick={handleSeedDemo} className="text-[10px] uppercase font-bold text-gray-400 hover:text-gray-700 bg-gray-100 px-2 py-1 rounded">
            Seed Demo
          </button>
          {notifications.some(n => !n.read) && (
            <button onClick={handleMarkAllAsRead} className="text-xs text-indigo-600 font-medium hover:text-indigo-700">
              Mark all read
            </button>
          )}
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        {isLoading ? (
          <div className="p-8 text-center text-sm text-gray-400">Loading...</div>
        ) : notifications.length === 0 ? (
          <div className="p-8 flex flex-col items-center justify-center text-center gap-2">
            <Bell className="w-8 h-8 text-gray-200" />
            <p className="text-sm text-gray-500 font-medium">No notifications yet</p>
          </div>
        ) : (
          <div className="space-y-1">
            <AnimatePresence>
              {notifications.map(notification => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`p-3 rounded-xl flex gap-3 group relative ${notification.read ? 'bg-transparent' : 'bg-indigo-50/50'}`}
                >
                  <div className="mt-0.5 shrink-0">
                    {!notification.read && <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 leading-tight mb-1">{notification.title}</h4>
                    <p className="text-xs text-gray-600 leading-snug">{notification.description}</p>
                    <div className="text-[10px] text-gray-400 mt-2 font-medium">
                      {new Date(notification.createdAt).toLocaleString()}
                    </div>
                  </div>
                  
                  {/* Actions overlay */}
                  <div className="absolute top-2 right-2 flex items-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur rounded-lg shadow-sm border border-gray-100 p-0.5">
                    {!notification.read && (
                      <button 
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="p-1.5 text-gray-500 hover:text-indigo-600 rounded hover:bg-indigo-50 transition-colors"
                        title="Mark as read"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button 
                      onClick={() => handleDelete(notification.id)}
                      className="p-1.5 text-gray-500 hover:text-red-600 rounded hover:bg-red-50 transition-colors"
                      title="Delete notification"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
}

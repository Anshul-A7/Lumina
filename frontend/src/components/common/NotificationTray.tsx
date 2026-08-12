"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { useNotifications } from '@/context/NotificationContext';
import { motion, AnimatePresence } from 'framer-motion';

export const NotificationTray = () => {
  const { notifications, unreadCount, markAsRead, deleteNotification } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const trayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (trayRef.current && !trayRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={trayRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      >
        <Bell className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl z-50"
          >
            <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex justify-between items-center sticky top-0 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md">
              <h3 className="font-semibold text-neutral-900 dark:text-white">Notifications</h3>
            </div>
            
            <div className="p-2">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-sm text-neutral-500">
                  No notifications yet.
                </div>
              ) : (
                notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`relative p-3 mb-2 rounded-lg group ${!notification.read ? 'bg-indigo-50/50 dark:bg-indigo-900/20' : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/50'}`}
                    onMouseEnter={() => {
                      if (!notification.read) markAsRead(notification.id);
                    }}
                  >
                    <div className="pr-6">
                      <h4 className={`text-sm font-medium ${!notification.read ? 'text-indigo-900 dark:text-indigo-200' : 'text-neutral-800 dark:text-neutral-200'}`}>
                        {notification.title}
                      </h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                        {notification.description}
                      </p>
                      <p className="text-[10px] text-neutral-400 mt-2">
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="absolute top-3 right-2 p-1 text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded opacity-0 group-hover:opacity-100 transition-all"
                      title="Remove notification"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

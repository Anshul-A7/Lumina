"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  Settings, 
  LogOut, 
  Search,
  Bell,
  User,
  Sparkles,
  Network,
  Mic,
  Plus,
  Check,
  Compass,
  Cloud,
  CheckCircle2,
  Tag as TagIcon
} from "lucide-react";
import { AuthService } from "@/services/auth.service";
import { UserService, Notification } from "@/services/user.service";
import LuminaLogo from "@/components/common/LuminaLogo";
import { getSubscription } from "@/lib/subscription.service";

/* ══════════════════════════════════════════════════════════════════════════
   LUMINA · CLEAN HUMAN DASHBOARD LAYOUT
   - 3-line sidebar toggle button before logo
   - Lumina logo & clean name
   - Search & quick keyboard shortcut (Cmd+K)
   - Notification bell icon beside account
   - Account avatar in far right corner
   - Full-width unpadded content area
   ══════════════════════════════════════════════════════════════════════════ */

const SERIF = "'Playfair Display', Georgia, serif";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPlan, setUserPlan] = useState("Free Account");
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState("editor");

  const notificationsRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setAccountMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleSwitch = (e: any) => {
      if (e.detail) setActiveTab(e.detail);
    };
    window.addEventListener("lumina:switch_tab", handleSwitch);
    return () => window.removeEventListener("lumina:switch_tab", handleSwitch);
  }, []);

  useEffect(() => {
    // If no token, assign demo session so user can freely explore
    if (!AuthService.isAuthenticated()) {
      if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", "lumina_active_session_" + Date.now());
      }
    }
    
    if (typeof window !== "undefined") {
      const email = localStorage.getItem("lumina_user_email") || localStorage.getItem("note_xz_user_email");
      const name = localStorage.getItem("lumina_user_name") || localStorage.getItem("note_xz_user_name");
      if (email) setUserEmail(email);
      if (name) setUserName(name);
    }

    setIsAuthenticated(true);
  }, [router]);

  const handleLogout = () => {
    AuthService.logout();
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("lumina_user_email");
      localStorage.removeItem("lumina_user_name");
    }
    router.push("/login");
  };

  const [notificationsList, setNotificationsList] = useState<Notification[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      UserService.getNotifications().then(data => {
        setNotificationsList(data);
        setUnreadCount(data.filter(n => !n.read).length);
      }).catch(err => console.error("Failed to fetch notifications:", err));

      getSubscription().then(sub => {
        if (sub && sub.plan) {
           setUserPlan(sub.plan === "FREE" ? "Free Account" : (sub.plan === "PLUS" ? "Plus Account" : "Pro Account"));
        }
      }).catch(err => console.error("Failed to fetch subscription in layout:", err));
    }
  }, [isAuthenticated]);

  const handleMarkAllRead = async () => {
    try {
      await UserService.markNotificationsAsRead();
      setNotificationsList(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error("Failed to mark notifications as read:", err);
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full bg-background text-foreground font-sans antialiased overflow-hidden select-none">
      
      {/* ───────────────────────────────────────────────────────────────────────
          1. HEADER (Fixed, High-Contrast, Full Width)
          - 3 lines before logo for sidebar toggle
          - Lumina logo & brand name
          - Global search bar
          - Notification icon with badge
          - Account avatar on far right corner
          ─────────────────────────────────────────────────────────────────────── */}
      <header className="h-14 w-full bg-background border-b border-foreground/[0.08] dark:border-white/[0.08] px-3 sm:px-4 flex items-center justify-between z-30 shrink-0 select-none shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        
        {/* Left: 3-Line Sidebar Toggle + Logo & Brand Name */}
        <div className="flex items-center gap-3">
          {/* 3 Lines Hamburger Sidebar Toggle */}
          <button
            onClick={() => {
              const newState = !sidebarOpen;
              setSidebarOpen(newState);
              window.dispatchEvent(new CustomEvent("lumina:toggle_sidebar", { detail: newState }));
            }}
            title="Toggle Sidebar"
            className="w-8 h-8 rounded-lg flex flex-col items-center justify-center gap-[4px] hover:bg-foreground/[0.05] active:bg-foreground/[0.1] transition-colors cursor-pointer group"
          >
            <span className={`w-4 h-[1.5px] bg-foreground/80 rounded-full transition-transform duration-200 ${!sidebarOpen ? "w-3" : ""}`} />
            <span className="w-4 h-[1.5px] bg-foreground/80 rounded-full transition-transform duration-200" />
            <span className={`w-4 h-[1.5px] bg-foreground/80 rounded-full transition-transform duration-200 ${!sidebarOpen ? "w-3" : ""}`} />
          </button>

          {/* Vertical Divider */}
          <div className="h-4 w-[1px] bg-foreground/[0.08]" />

          {/* Logo & Brand Name */}
          <Link href="/dashboard" className="cursor-pointer">
            <LuminaLogo size={28} badge="Notes" />
          </Link>
        </div>

        {/* Center: Global Search & Quick Action Palette (Cmd+K) */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
          <div className="w-full relative flex items-center">
            <Search className="w-3.5 h-3.5 text-foreground/40 absolute left-3 pointer-events-none" />
            <input 
              type="text"
              placeholder="Search all notes, ideas, and checklists..."
              className="w-full h-8 pl-8 pr-12 text-xs bg-secondary hover:bg-accent focus:bg-background border border-foreground/[0.06] focus:border-foreground/30 rounded-lg outline-none transition-all placeholder:text-foreground/40 text-foreground"
            />
            <div className="absolute right-2 flex items-center gap-0.5 pointer-events-none text-[10px] font-mono text-foreground/40 bg-foreground/[0.04] px-1.5 py-0.5 rounded">
              <span>⌘</span>K
            </div>
          </div>
        </div>

        {/* Right Corner: Notification Icon + Account Icon */}
        <div className="flex items-center gap-2 sm:gap-3">
          


          {/* Notification Icon beside Account */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setAccountMenuOpen(false);
              }}
              title="Notifications"
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors relative cursor-pointer ${
                notificationsOpen ? "bg-foreground/[0.08] text-foreground" : "text-foreground/60 hover:text-foreground hover:bg-foreground/[0.04]"
              }`}
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-foreground rounded-full ring-2 ring-background" />
              )}
            </button>

            {/* Notification Popover Dropdown */}
            <AnimatePresence>
              {notificationsOpen && (
                <>
                  {/* Mobile Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setNotificationsOpen(false)}
                    className="fixed inset-0 bg-black/40 z-40 sm:hidden"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="fixed bottom-0 left-0 right-0 w-full rounded-t-3xl pb-8 sm:pb-4 sm:rounded-2xl sm:absolute sm:right-0 sm:bottom-auto sm:left-auto sm:mt-2 sm:w-80 md:w-96 bg-background border border-foreground/[0.08] shadow-2xl p-4 z-50 overflow-hidden"
                  >
                  <div className="flex items-center justify-between pb-3 border-b border-foreground/[0.06]">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-foreground">Notifications</span>
                      <span className="text-[10px] font-mono font-semibold bg-black text-white px-1.5 py-0.2 rounded-full">
                        {unreadCount} new
                      </span>
                    </div>
                    <button 
                      onClick={handleMarkAllRead}
                      className="text-xs text-foreground/50 hover:text-foreground transition-colors"
                    >
                      Mark all as read
                    </button>
                  </div>

                  <div className="divide-y divide-black/[0.04] max-h-72 overflow-y-auto py-1">
                    {notificationsList.length === 0 && (
                      <div className="py-8 text-center text-xs text-foreground/40 font-medium">No notifications yet.</div>
                    )}
                    {notificationsList.map((n) => (
                      <div key={n.id} className={`py-3 flex items-start gap-3 hover:bg-foreground/[0.02] px-2 rounded-xl transition-colors cursor-pointer ${!n.read ? 'bg-foreground/[0.03]' : ''}`}>
                        <div className="w-7 h-7 rounded-lg bg-foreground/[0.05] flex items-center justify-center shrink-0 mt-0.5">
                          {n.type === "note" && <FileText className="w-3.5 h-3.5 text-foreground" />}
                          {n.type === "task" && <CheckCircle2 className="w-3.5 h-3.5 text-foreground" />}
                          {n.type === "system" && <Sparkles className="w-3.5 h-3.5 text-foreground" />}
                          {n.type === "sync" && <Cloud className="w-3.5 h-3.5 text-foreground" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className={`text-xs text-foreground ${!n.read ? 'font-bold' : 'font-semibold'}`}>{n.title}</p>
                            <span className="text-[10px] text-foreground/40 font-mono">
                              {new Date(n.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                          <p className="text-[11px] text-foreground/60 font-light mt-0.5 line-clamp-2 leading-relaxed">
                            {n.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-foreground/[0.06] text-center">
                    <button 
                      onClick={() => setNotificationsOpen(false)}
                      className="text-xs font-medium text-foreground/70 hover:text-foreground py-1"
                    >
                      Close notifications
                    </button>
                  </div>
                </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Account Icon in Far Right Corner */}
          <div className="relative" ref={accountRef}>
            <button
              onClick={() => {
                setAccountMenuOpen(!accountMenuOpen);
                setNotificationsOpen(false);
              }}
              title="Account Settings"
              className="flex items-center gap-3 px-3 py-1.5 rounded-xl hover:bg-foreground/[0.05] transition-colors text-left cursor-pointer group"
            >
              <div className="w-[26px] h-[26px] rounded-full bg-primary text-primary-foreground font-bold text-[11px] flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                {userName ? userName.charAt(0).toUpperCase() : "N"}
              </div>
              <div className="hidden sm:flex flex-col flex-1 min-w-0">
                <span className="text-[13px] font-semibold text-foreground truncate leading-tight">{userName}</span>
                {userEmail ? <span className="text-[11px] text-foreground/50 truncate leading-tight">{userEmail}</span> : <span className="text-[11px] text-foreground/50 truncate leading-tight">Personal</span>}
              </div>
            </button>

            {/* Account Profile Popover Dropdown */}
            <AnimatePresence>
              {accountMenuOpen && (
                <>
                  {/* Mobile Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setAccountMenuOpen(false)}
                    className="fixed inset-0 bg-black/40 z-40 sm:hidden"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="fixed bottom-0 left-0 right-0 w-full rounded-t-3xl pb-8 sm:pb-3 sm:rounded-2xl sm:absolute sm:right-0 sm:bottom-auto sm:left-auto sm:mt-2 sm:w-64 bg-background border border-foreground/[0.08] shadow-2xl p-3 z-50 overflow-hidden"
                  >
                  <div className="p-2 border-b border-foreground/[0.06] pb-3">
                    <p className="text-xs font-bold text-foreground">{userName}</p>
                    <p className="text-[11px] text-foreground/50 font-mono truncate">{userEmail}</p>
                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-foreground/[0.05] text-foreground text-[10px] font-semibold">
                      <span>{userPlan}</span>
                    </div>
                  </div>

                  <div className="py-2 space-y-1 text-xs">
                    <Link
                      href="/dashboard?tab=workspace"
                      onClick={() => setAccountMenuOpen(false)}
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-foreground hover:bg-foreground/[0.04] transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5 text-foreground/60" />
                      <span>My Notes Workspace</span>
                    </Link>
                    <Link
                      href="/dashboard?tab=account"
                      onClick={() => setAccountMenuOpen(false)}
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-foreground hover:bg-foreground/[0.04] transition-colors"
                    >
                      <User className="w-3.5 h-3.5 text-foreground/60" />
                      <span>Account</span>
                    </Link>
                    <Link
                      href="/dashboard?tab=settings"
                      onClick={() => setAccountMenuOpen(false)}
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-foreground hover:bg-foreground/[0.04] transition-colors"
                    >
                      <Settings className="w-3.5 h-3.5 text-foreground/60" />
                      <span>Settings</span>
                    </Link>
                  </div>

                  <div className="pt-2 border-t border-foreground/[0.06]">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors text-left cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

        </div>
      </header>

      {/* ───────────────────────────────────────────────────────────────────────
          2. WORKSPACE BODY (Managed by page.tsx)
          ─────────────────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex w-full overflow-hidden relative">

        {/* ───────────────────────────────────────────────────────────────────
            3. FULL-WIDTH, UNPADDED CONTENT CANVAS
            - Zero restrictive padding: full width note writing and viewing
            ─────────────────────────────────────────────────────────────────── */}
        <main className="flex-1 w-full min-w-0 h-full overflow-hidden flex flex-col relative z-10 bg-background">
          {children}
        </main>
      </div>

    </div>
  );
}

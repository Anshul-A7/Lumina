"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Settings2, Palette, Volume2, Globe, Brain, Trash2, Loader2 } from "lucide-react";
import { AuthService } from "@/services/auth.service";
import { UserService, UserSettings } from "@/services/user.service";
import { getSubscription } from "@/lib/subscription.service";

export default function SettingsView() {
  const [theme, setTheme] = useState("system");
  const [defaultModel, setDefaultModel] = useState("gpt-4o");
  const [autoTitle, setAutoTitle] = useState(true);
  const [userPlan, setUserPlan] = useState("Free Account");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settings = await UserService.getSettings();
        setTheme(settings.theme || "system");
        setDefaultModel(settings.defaultModel || "gpt-4o");
        setAutoTitle(settings.autoTitle ?? true);
      } catch (err) {
        console.error("Failed to load settings:", err);
      }
      try {
        const sub = await getSubscription();
        if (sub && sub.plan) {
           setUserPlan(sub.plan === "FREE" ? "Free Account" : (sub.plan === "PLUS" ? "Plus Account" : "Pro Account"));
        }
      } catch (err) {
        console.error("Failed to load subscription in settings:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const saveSettings = useCallback(async (newSettings: Partial<UserSettings>) => {
    setIsSaving(true);
    try {
      await UserService.updateSettings({
        theme,
        defaultModel,
        autoTitle,
        ...newSettings
      });
    } catch (err) {
      console.error("Failed to save settings:", err);
    } finally {
      setIsSaving(false);
    }
  }, [theme, defaultModel, autoTitle]);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    saveSettings({ theme: newTheme });
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newModel = e.target.value;
    setDefaultModel(newModel);
    saveSettings({ defaultModel: newModel });
  };

  const handleAutoTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAutoTitle = e.target.checked;
    setAutoTitle(newAutoTitle);
    saveSettings({ autoTitle: newAutoTitle });
  };

  const handleDeleteAccount = async () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        setIsDeleting(true);
        await AuthService.deleteAccount();
        window.location.href = "/login";
      } catch (err) {
        alert("Failed to delete account. Please try again.");
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-white p-6 md:p-8">
      <div className="w-full h-full flex flex-col">
        <h1 className="text-lg font-semibold mb-6 text-black">Settings</h1>
        
        <div className="border-b border-black/[0.06] pb-8 mb-8">
          <h2 className="text-sm font-semibold mb-4 flex items-center gap-2 text-black">
            <Palette className="w-4 h-4 text-black/60" /> Appearance
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-[13px] font-medium text-black/60 mb-2">Theme Preference</label>
              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => handleThemeChange("light")}
                  className={`flex-1 py-2 px-3 rounded-xl border text-[13px] font-medium transition-colors ${theme === 'light' ? 'border-black bg-white text-black shadow-sm' : 'border-black/10 bg-transparent text-black/60 hover:bg-black/[0.02]'}`}
                >
                  Light
                </button>
                <button 
                  onClick={() => handleThemeChange("dark")}
                  className={`flex-1 py-2 px-3 rounded-xl border text-[13px] font-medium transition-colors ${theme === 'dark' ? 'border-black bg-black text-white shadow-sm' : 'border-black/10 bg-transparent text-black/60 hover:bg-black/[0.02]'}`}
                >
                  Dark
                </button>
                <button 
                  onClick={() => handleThemeChange("system")}
                  className={`flex-1 py-2 px-3 rounded-xl border text-[13px] font-medium transition-colors ${theme === 'system' ? 'border-black bg-white text-black shadow-sm' : 'border-black/10 bg-transparent text-black/60 hover:bg-black/[0.02]'}`}
                >
                  System
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-black/[0.06] pb-8 mb-8">
          <h2 className="text-sm font-semibold mb-4 flex items-center gap-2 text-black">
            <Brain className="w-4 h-4 text-black/60" /> AI & Models
          </h2>
          
          <div className="space-y-5 w-full">
            <div>
              <label className="block text-[13px] font-medium text-black/60 mb-1">Default Model</label>
              <select 
                value={defaultModel}
                onChange={handleModelChange}
                className="w-full bg-white border border-black/10 rounded-xl px-3 py-2 text-[13px] text-black focus:outline-none focus:border-black/30 appearance-none cursor-pointer"
              >
                <option value="gpt-4o">Lumina Ultra (Fastest)</option>
                <option value="gpt-4-turbo">Lumina Reasoning (Best at logic)</option>
                <option value="claude-3-opus">Lumina Creative (Best writing)</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-[13px] text-black">Auto-title Conversations</h3>
                <p className="text-[11px] text-black/50">Automatically generate titles based on your first message</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={autoTitle}
                  onChange={handleAutoTitleChange} 
                />
                <div className="w-9 h-5 bg-black/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-black"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div className="border-b border-black/[0.06] pb-8 mb-8">
          <h2 className="text-sm font-semibold mb-4 flex items-center gap-2 text-black">
            <Globe className="w-4 h-4 text-black/60" /> Subscription & Plan
          </h2>
          <div className="bg-black/[0.02] border border-black/5 rounded-xl p-4 w-full flex items-center justify-between">
            <div>
              <h3 className="text-[13px] font-semibold text-black mb-1">Active Plan: {userPlan}</h3>
              <p className="text-[11px] text-black/60 m-0">
                {userPlan === "Free Account" ? "You are on the free plan with limited PDF and image generation." : "You have access to premium features, increased limits, and faster models."}
              </p>
            </div>
            {userPlan === "Free Account" && (
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('lumina:switch_tab', { detail: 'get-plus' }))}
                className="bg-black text-white text-[12px] font-medium px-4 py-1.5 rounded-lg hover:bg-black/80 transition-colors"
              >
                Upgrade Plan
              </button>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold mb-4 flex items-center gap-2 text-red-600">
            <Trash2 className="w-4 h-4" /> Danger Zone
          </h2>
          <div className="bg-red-50/50 border border-red-100 rounded-xl p-4 w-full flex items-center justify-between">
            <div>
              <h3 className="text-[13px] font-semibold text-red-700 mb-1">Delete Account</h3>
              <p className="text-[11px] text-red-600/80 m-0">
                Once you delete your account, there is no going back. Please be certain.
              </p>
            </div>
            <button 
              onClick={handleDeleteAccount}
              disabled={isDeleting}
              className="bg-red-600 text-white text-[12px] font-medium px-4 py-1.5 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete Account"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

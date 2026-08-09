"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Settings2, Palette, Volume2, Globe, Brain, Trash2, Loader2 } from "lucide-react";
import { AuthService } from "@/services/auth.service";
import { UserService, UserSettings } from "@/services/user.service";
import { getSubscription } from "@/lib/subscription.service";
import { useTheme } from "next-themes";

export default function SettingsView() {
  const [themeState, setThemeState] = useState("system");
  const { setTheme } = useTheme();
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
        setThemeState(settings.theme || "system");
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
  }, [setTheme]);

  const saveSettings = useCallback(async (newSettings: Partial<UserSettings>) => {
    setIsSaving(true);
    try {
      await UserService.updateSettings({
        theme: themeState,
        defaultModel,
        autoTitle,
        ...newSettings
      });
    } catch (err) {
      console.error("Failed to save settings:", err);
    } finally {
      setIsSaving(false);
    }
  }, [themeState, defaultModel, autoTitle]);

  const handleThemeChange = (newTheme: string) => {
    setThemeState(newTheme);
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
    <div className="flex-1 overflow-y-auto bg-background p-6 md:p-8">
      <div className="w-full h-full flex flex-col">
        <h1 className="text-lg font-semibold mb-6 text-foreground">Settings</h1>
        
        <div className="border-b border-border pb-8 mb-8">
          <h2 className="text-sm font-semibold mb-4 flex items-center gap-2 text-foreground">
            <Palette className="w-4 h-4 text-muted-foreground" /> Appearance
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-[13px] font-medium text-muted-foreground mb-2">Theme Preference</label>
              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => handleThemeChange("light")}
                  className={`flex-1 py-2 px-3 rounded-xl border text-[13px] font-medium transition-colors ${themeState === 'light' ? 'border-foreground bg-foreground text-background shadow-sm' : 'border-border bg-transparent text-muted-foreground hover:bg-muted/50'}`}
                >
                  Light
                </button>
                <button 
                  onClick={() => handleThemeChange("dark")}
                  className={`flex-1 py-2 px-3 rounded-xl border text-[13px] font-medium transition-colors ${themeState === 'dark' ? 'border-foreground bg-foreground text-background shadow-sm' : 'border-border bg-transparent text-muted-foreground hover:bg-muted/50'}`}
                >
                  Dark
                </button>
                <button 
                  onClick={() => handleThemeChange("system")}
                  className={`flex-1 py-2 px-3 rounded-xl border text-[13px] font-medium transition-colors ${themeState === 'system' ? 'border-foreground bg-foreground text-background shadow-sm' : 'border-border bg-transparent text-muted-foreground hover:bg-muted/50'}`}
                >
                  System
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-border pb-8 mb-8">
          <h2 className="text-sm font-semibold mb-4 flex items-center gap-2 text-foreground">
            <Brain className="w-4 h-4 text-muted-foreground" /> AI & Models
          </h2>
          
          <div className="space-y-5 w-full">
            <div>
              <label className="block text-[13px] font-medium text-muted-foreground mb-1">Default Model</label>
              <select 
                value={defaultModel}
                onChange={handleModelChange}
                className="w-full bg-background border border-border rounded-xl px-3 py-2 text-[13px] text-foreground focus:outline-none focus:border-foreground/30 appearance-none cursor-pointer"
              >
                <option value="gpt-4o">Lumina Ultra (Fastest)</option>
                <option value="gpt-4-turbo">Lumina Reasoning (Best at logic)</option>
                <option value="claude-3-opus">Lumina Creative (Best writing)</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-[13px] text-foreground">Auto-title Conversations</h3>
                <p className="text-[11px] text-muted-foreground">Automatically generate titles based on your first message</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={autoTitle}
                  onChange={handleAutoTitleChange} 
                />
                <div className="w-9 h-5 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-background after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-foreground"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div className="border-b border-border pb-8 mb-8">
          <h2 className="text-sm font-semibold mb-4 flex items-center gap-2 text-foreground">
            <Globe className="w-4 h-4 text-muted-foreground" /> Subscription & Plan
          </h2>
          <div className="bg-muted/50 border border-border rounded-xl p-4 w-full flex items-center justify-between">
            <div>
              <h3 className="text-[13px] font-semibold text-foreground mb-1">Active Plan: {userPlan}</h3>
              <p className="text-[11px] text-muted-foreground m-0">
                {userPlan === "Free Account" ? "You are on the free plan with limited PDF and image generation." : "You have access to premium features, increased limits, and faster models."}
              </p>
            </div>
            {userPlan === "Free Account" && (
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('lumina:switch_tab', { detail: 'get-plus' }))}
                className="bg-foreground text-background text-[12px] font-medium px-4 py-1.5 rounded-lg hover:bg-foreground/80 transition-colors"
              >
                Upgrade Plan
              </button>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold mb-4 flex items-center gap-2 text-destructive">
            <Trash2 className="w-4 h-4" /> Danger Zone
          </h2>
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 w-full flex items-center justify-between">
            <div>
              <h3 className="text-[13px] font-semibold text-destructive mb-1">Delete Account</h3>
              <p className="text-[11px] text-destructive/80 m-0">
                Once you delete your account, there is no going back. Please be certain.
              </p>
            </div>
            <button 
              onClick={handleDeleteAccount}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground text-[12px] font-medium px-4 py-1.5 rounded-lg hover:bg-destructive/90 transition-colors disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete Account"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

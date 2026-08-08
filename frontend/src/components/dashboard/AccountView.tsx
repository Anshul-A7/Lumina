"use client";

import React, { useState, useEffect } from "react";
import { User, Mail, Shield, Key, Bell, LogOut, CheckCircle2, FileText, Download, Trash2, Loader2 } from "lucide-react";
import { AuthService, UserProfile } from "@/services/auth.service";
import { UserService } from "@/services/user.service";
import { listPdfs, downloadBlobAsFile, downloadPdf, deletePdf, PdfMetadata, formatFileSize } from "@/lib/pdf.service";
import { getSubscription } from "@/lib/subscription.service";

export default function AccountView() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userPlan, setUserPlan] = useState("Free Account");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [pdfs, setPdfs] = useState<PdfMetadata[]>([]);
  const [loadingPdfs, setLoadingPdfs] = useState(true);

  useEffect(() => {
    const cachedUser = AuthService.getCachedUser();
    if (cachedUser) {
      setUser(cachedUser);
      setUsername(cachedUser.username || "");
      setEmail(cachedUser.email || "");
    }
    
    listPdfs()
      .then(setPdfs)
      .catch(err => console.error("Failed to load PDFs:", err))
      .finally(() => setLoadingPdfs(false));

    getSubscription()
      .then(sub => {
        if (sub && sub.plan) {
           setUserPlan(sub.plan === "FREE" ? "Free Account" : (sub.plan === "PLUS" ? "Plus Account" : "Pro Account"));
        }
      })
      .catch(err => console.error("Failed to load subscription in account:", err));
  }, []);

  const handleDownloadPdf = async (pdf: PdfMetadata) => {
    try {
      const blob = await downloadPdf(pdf.id);
      downloadBlobAsFile(blob, pdf.title);
    } catch (err) {
      alert("Failed to download PDF.");
    }
  };

  const handleDeletePdf = async (id: number) => {
    if (!confirm("Are you sure you want to delete this PDF?")) return;
    try {
      await deletePdf(id);
      setPdfs(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      alert("Failed to delete PDF.");
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await UserService.updateProfileName(username);
      
      // Update local storage user
      const currentUser = AuthService.getCachedUser();
      if (currentUser) {
        const updatedUser = { ...currentUser, username };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      alert("Failed to update profile name.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await AuthService.logout();
    window.location.href = "/login";
  };

  return (
    <div className="flex-1 overflow-y-auto bg-white p-6 md:p-8">
      <div className="w-full h-full flex flex-col">
        <h1 className="text-lg font-semibold mb-6 text-black">Account</h1>
        
        <div className="border-b border-black/[0.06] pb-8 mb-8">
          <h2 className="text-sm font-semibold mb-4 flex items-center gap-2 text-black">
            <User className="w-4 h-4 text-black/60" /> Profile Information
          </h2>
          
          <div className="space-y-4 w-full">
            <div>
              <label className="block text-[13px] font-medium text-black/60 mb-1">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white border border-black/10 rounded-xl px-3 py-2 text-[13px] text-black focus:outline-none focus:border-black/30 transition-colors"
                placeholder="Your username"
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-black/60 mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                disabled
                className="w-full bg-black/[0.02] border border-black/5 rounded-xl px-3 py-2 text-[13px] text-black/60 cursor-not-allowed"
              />
              <p className="text-[11px] text-black/40 mt-1">Email cannot be changed directly.</p>
            </div>
            
            <div>
              <label className="block text-[13px] font-medium text-black/60 mb-1">Current Plan</label>
              <div className="flex items-center gap-3">
                <div className="w-full bg-black/[0.02] border border-black/5 rounded-xl px-3 py-2 text-[13px] text-black/80 font-semibold flex items-center">
                  {userPlan}
                </div>
                {userPlan === "Free Account" && (
                  <button onClick={() => window.dispatchEvent(new CustomEvent('lumina:switch_tab', { detail: 'get-plus' }))} className="shrink-0 bg-black text-white text-[12px] font-medium px-4 py-2 rounded-xl hover:bg-black/80 transition-colors">
                    Upgrade
                  </button>
                )}
              </div>
            </div>
            
            <div className="pt-2 flex items-center gap-3">
              <button 
                onClick={handleSave}
                disabled={isSaving || (user?.username === username)}
                className="bg-black text-white text-[13px] font-medium px-4 py-2 rounded-xl hover:bg-black/80 transition-colors disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
              {saveSuccess && (
                <span className="text-[12px] text-green-600 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Saved
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="border-b border-black/[0.06] pb-8 mb-8">
          <h2 className="text-sm font-semibold mb-4 flex items-center gap-2 text-black">
            <FileText className="w-4 h-4 text-black/60" /> Generated PDFs
          </h2>
          
          <div className="space-y-3 w-full">
            {loadingPdfs ? (
              <div className="flex items-center justify-center p-6 text-black/40">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : pdfs.length === 0 ? (
              <p className="text-sm text-black/40 bg-black/[0.02] p-4 rounded-xl border border-black/5">
                No PDFs generated yet. You can generate PDFs from AI responses in the chat.
              </p>
            ) : (
              <div className="grid gap-3">
                {pdfs.map(pdf => (
                  <div key={pdf.id} className="flex items-center justify-between bg-white border border-black/10 rounded-xl px-4 py-3 hover:bg-black/[0.02] transition-colors">
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-[13px] text-black font-medium truncate">{pdf.title}</span>
                      <div className="flex items-center gap-2 text-[11px] text-black/40 mt-1">
                        <span>{new Date(pdf.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{formatFileSize(pdf.fileSizeBytes)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pl-4">
                      <button 
                        onClick={() => handleDownloadPdf(pdf)}
                        className="p-2 text-black/40 hover:text-black hover:bg-black/5 rounded-lg transition-colors"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeletePdf(pdf.id)}
                        className="p-2 text-red-500/60 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="border-b border-black/[0.06] pb-8 mb-8">
          <h2 className="text-sm font-semibold mb-4 flex items-center gap-2 text-black">
            <Shield className="w-4 h-4 text-black/60" /> Security
          </h2>
          
          <div className="space-y-3 w-full">
            <button className="w-full flex items-center justify-between bg-white border border-black/10 rounded-xl px-4 py-3 hover:bg-black/[0.02] transition-colors group">
              <span className="flex items-center gap-3 text-[13px] text-black font-medium">
                <Key className="w-4 h-4 text-black/40 group-hover:text-black/60 transition-colors" /> Change Password
              </span>
            </button>
            
            <button className="w-full flex items-center justify-between bg-white border border-black/10 rounded-xl px-4 py-3 hover:bg-black/[0.02] transition-colors group">
              <span className="flex items-center gap-3 text-[13px] text-black font-medium">
                <Bell className="w-4 h-4 text-black/40 group-hover:text-black/60 transition-colors" /> Two-Factor Authentication
              </span>
              <span className="text-[11px] font-medium text-black/40 bg-black/5 px-2 py-0.5 rounded-full">Not set up</span>
            </button>
          </div>
        </div>

        <div className="mt-8">
          <button 
            onClick={handleLogout}
            className="text-black/60 hover:text-black hover:bg-black/5 px-4 py-2 rounded-xl transition-colors text-[13px] font-medium flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, ArrowLeft, Loader2, Check, Sparkles, Shield, Lock, CheckCircle2, XCircle } from "lucide-react";
import { AuthService } from "@/services/auth.service";
import LuminaLogo from "@/components/common/LuminaLogo";

/* ══════════════════════════════════════════════════════════════════════════
   LUMINA · Animated Luxury Authentication · Sign Up
   Dynamic Dual-Mode Switcher · Custom Animated Toggle Switch ·
   Luxury Segmented Password Strength Bar · Interactive Requirement Badges
   ══════════════════════════════════════════════════════════════════════════ */

const SERIF = "'Playfair Display', Georgia, serif";
const easeOut = [0.16, 1, 0.3, 1] as const;

// Google Identity Services callback type
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: Record<string, unknown>) => void;
          renderButton: (element: HTMLElement, config: Record<string, unknown>) => void;
          prompt: () => void;
        };
      };
    };
    handleGoogleCredentialResponse?: (response: { credential: string }) => void;
  }
}

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // ── Auth Guard: Redirect authenticated users to dashboard ──
  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      AuthService.getCurrentUser()
        .then(() => {
          router.replace("/dashboard");
        })
        .catch(() => {
          setIsCheckingAuth(false);
        });
    } else {
      setIsCheckingAuth(false);
    }
  }, [router]);

  // Validation logic
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const criteria = [
    { label: "8+ Characters", met: hasMinLength },
    { label: "Uppercase (A-Z)", met: hasUppercase },
    { label: "Number (0-9)", met: hasNumber },
    { label: "Symbol (@#$)", met: hasSpecial },
  ];

  const strengthScore = criteria.filter((c) => c.met).length;

  const getStrengthMeta = () => {
    switch (strengthScore) {
      case 1:
        return { label: "Weak", color: "bg-red-500", text: "text-red-600", border: "border-red-200", badgeBg: "bg-red-50" };
      case 2:
        return { label: "Fair", color: "bg-amber-500", text: "text-amber-600", border: "border-amber-200", badgeBg: "bg-amber-50" };
      case 3:
        return { label: "Good", color: "bg-teal-500", text: "text-teal-600", border: "border-teal-200", badgeBg: "bg-teal-50" };
      case 4:
        return { label: "Supreme Security", color: "bg-emerald-500", text: "text-emerald-700", border: "border-emerald-200", badgeBg: "bg-emerald-50" };
      default:
        return { label: "Required", color: "bg-black/10", text: "text-black/40", border: "border-black/10", badgeBg: "bg-black/[0.03]" };
    }
  };

  const strengthMeta = getStrengthMeta();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!fullName.trim() || !email.trim() || !password) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please verify.");
      return;
    }

    if (strengthScore < 3) {
      setErrorMessage("Please meet at least 3 of the security criteria below.");
      return;
    }

    if (!agreeTerms) {
      setErrorMessage("Please accept the Terms of Service to proceed.");
      return;
    }

    setIsLoading(true);

    try {
      await AuthService.register({
        username: fullName.trim(),
        email: email.trim(),
        password,
      });

      router.push(`/verify-email?email=${encodeURIComponent(email.trim())}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to complete registration. Please try again.";
      setErrorMessage(message);
      setIsLoading(false);
    }
  };

  const handleGoogleCredentialResponse = useCallback(async (response: { credential: string }) => {
    setIsGoogleLoading(true);
    setErrorMessage("");

    try {
      const authResponse = await AuthService.googleLogin(response.credential);

      if (typeof window !== "undefined") {
        localStorage.setItem("lumina_user_name", authResponse.user.username);
        localStorage.setItem("lumina_user_email", authResponse.user.email);
        localStorage.setItem("note_xz_user_name", authResponse.user.username);
        localStorage.setItem("note_xz_user_email", authResponse.user.email);
        if (authResponse.user.profileImageUrl) {
          localStorage.setItem("lumina_user_avatar", authResponse.user.profileImageUrl);
        }
      }

      router.push("/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Google sign-up failed. Please try again.";
      setErrorMessage(message);
      setIsGoogleLoading(false);
    }
  }, [router]);

  // Initialize Google Identity Services
  useEffect(() => {
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!googleClientId) return;

    window.handleGoogleCredentialResponse = handleGoogleCredentialResponse;

    const initGoogle = () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: handleGoogleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        // Render the official Google button
        const buttonContainer = document.getElementById("google-signup-btn");
        if (buttonContainer) {
          window.google.accounts.id.renderButton(buttonContainer, {
            type: "standard",
            theme: "outline",
            size: "large",
            text: "signup_with",
            shape: "rectangular",
            logo_alignment: "center",
            width: buttonContainer.offsetWidth > 400 ? 400 : buttonContainer.offsetWidth,
          });
        }
      }
    };

    if (window.google?.accounts?.id) {
      initGoogle();
    } else {
      const checkInterval = setInterval(() => {
        if (window.google?.accounts?.id) {
          initGoogle();
          clearInterval(checkInterval);
        }
      }, 200);
      setTimeout(() => clearInterval(checkInterval), 10000);
    }

    return () => {
      window.handleGoogleCredentialResponse = undefined;
    };
  }, [handleGoogleCredentialResponse]);

  // We no longer use a custom button click handler for Google.
  // The official button renders itself into the #google-signup-btn container.

  const isAnyLoading = isLoading || isGoogleLoading;


  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans selection:bg-black selection:text-white overflow-hidden">
      {/* Luxury Split Card Container */}
      <motion.div 
        key="register-page"
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: easeOut }}
        className="w-full max-w-6xl min-h-[780px] bg-white rounded-[2.5rem] border border-black/[0.08] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12"
      >
        
        {/* Left Column: Artistic Fluid Gradient Card */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: easeOut }}
          className="hidden lg:flex lg:col-span-6 relative bg-black p-12 flex-col justify-between overflow-hidden rounded-[2.2rem] m-3"
        >
          {/* Animated High-Resolution Fluid Wave Background */}
          <motion.img
            src="/images/auth-waves-cyan.png"
            alt="Fluid Waves Art"
            animate={{ scale: [1, 1.05, 1], rotate: [0, -0.5, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
          />
          
          {/* Ambient Dark Vignette & Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 pointer-events-none" />

          {/* Top Brand Quote Header */}
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative z-10"
          >
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase font-semibold text-white/90 drop-shadow-sm">
                KNOWLEDGE PERSISTENCE
              </span>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="h-[1px] bg-white/50" 
              />
            </div>
          </motion.div>

          {/* Bottom Editorial Quote */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: easeOut }}
            className="relative z-10 space-y-4 max-w-md"
          >
            <h1 
              style={{ fontFamily: SERIF }} 
              className="text-4xl sm:text-5xl font-normal tracking-tight text-white leading-[1.15]"
            >
              Build Your <br />
              Second Brain
            </h1>
            <p className="text-white/75 text-sm sm:text-base font-light leading-relaxed">
              Mastering your thoughts is the single most asymmetric advantage in modern creative and strategic work.
            </p>
          </motion.div>
        </motion.div>

        {/* Right Column: Clean White Minimalist Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: easeOut }}
          className="lg:col-span-6 p-8 sm:p-12 md:p-14 flex flex-col justify-between bg-white overflow-y-auto"
        >
          
          {/* Top Header Row with Logo & Animated Dual-Mode Switcher */}
          <div className="flex items-center justify-between pb-4">
            <Link href="/" className="cursor-pointer">
              <LuminaLogo size={32} />
            </Link>

            {/* Animated Dual Mode Switcher Bar */}
            <div className="flex items-center p-1 bg-[#F4F3EE] rounded-full border border-black/[0.06] text-xs font-semibold">
              <Link href="/login" className="relative px-3.5 py-1.5 text-black/50 hover:text-black transition-colors rounded-full">
                Sign In
              </Link>
              <div className="relative px-3.5 py-1.5 text-black rounded-full shadow-xs">
                <motion.div
                  layoutId="auth-tab-pill"
                  className="absolute inset-0 bg-white rounded-full border border-black/[0.08]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
                <span className="relative z-10 font-bold">Sign Up</span>
              </div>
            </div>
          </div>

          {/* Form Content Area */}
          <div className="my-auto max-w-md w-full mx-auto py-4">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-6"
            >
              <h2 
                style={{ fontFamily: SERIF }} 
                className="text-3xl sm:text-4xl font-normal text-black tracking-tight mb-1.5"
              >
                Create Account
              </h2>
              <p className="text-black/60 text-xs sm:text-sm font-light">
                Start organizing your thoughts and research with Lumina
              </p>
            </motion.div>

            {/* Error Message Toast */}
            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -8 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -8 }}
                  className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 overflow-hidden"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                  <span>{errorMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleRegister} className="space-y-3.5">
              {/* Full Name Input */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="space-y-1"
              >
                <label className="block text-xs font-semibold text-black/80">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full h-11 px-4 rounded-xl bg-[#F4F3EE]/70 border border-black/[0.08] text-sm text-black placeholder:text-black/35 focus:outline-none focus:border-black/40 focus:bg-white transition-all shadow-2xs"
                  required
                />
              </motion.div>

              {/* Email Input */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="space-y-1"
              >
                <label className="block text-xs font-semibold text-black/80">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full h-11 px-4 rounded-xl bg-[#F4F3EE]/70 border border-black/[0.08] text-sm text-black placeholder:text-black/35 focus:outline-none focus:border-black/40 focus:bg-white transition-all shadow-2xs"
                  required
                />
              </motion.div>

              {/* Password Input & Luxury Strength Meter */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-black/80">
                    Password
                  </label>
                  {password.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold border ${strengthMeta.badgeBg} ${strengthMeta.border} ${strengthMeta.text}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${strengthMeta.color}`} />
                      <span>{strengthMeta.label}</span>
                    </motion.div>
                  )}
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full h-11 pl-4 pr-11 rounded-xl bg-[#F4F3EE]/70 border border-black/[0.08] text-sm text-black placeholder:text-black/35 focus:outline-none focus:border-black/40 focus:bg-white transition-all shadow-2xs"
                    required
                  />
                  {/* Animated Eye Toggle Switch */}
                  <motion.button
                    whileTap={{ scale: 0.85, rotate: 15 }}
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors cursor-pointer"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={showPassword ? "hide" : "show"}
                        initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </motion.div>
                    </AnimatePresence>
                  </motion.button>
                </div>

                {/* Segmented Strength Bar & Interactive Badge Checklist */}
                {password.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-2 space-y-2.5 overflow-hidden"
                  >
                    {/* 4-Segment Progress Bar */}
                    <div className="grid grid-cols-4 gap-1.5">
                      {[1, 2, 3, 4].map((step) => {
                        const isMet = step <= strengthScore;
                        return (
                          <div key={step} className="h-1.5 rounded-full bg-black/[0.06] overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: isMet ? "100%" : "0%" }}
                              transition={{ duration: 0.35, ease: "easeOut" }}
                              className={`h-full rounded-full ${
                                strengthScore === 4
                                  ? "bg-emerald-500"
                                  : strengthScore === 3
                                  ? "bg-teal-500"
                                  : strengthScore === 2
                                  ? "bg-amber-500"
                                  : "bg-red-400"
                              }`}
                            />
                          </div>
                        );
                      })}
                    </div>

                    {/* 4 Clean Interactive Badge Pills */}
                    <div className="grid grid-cols-2 gap-1.5 pt-1">
                      {criteria.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition-all duration-300 ${
                            item.met
                              ? "bg-emerald-50/80 border-emerald-200 text-emerald-800 shadow-2xs"
                              : "bg-[#F4F3EE]/50 border-black/[0.05] text-black/45"
                          }`}
                        >
                          <motion.div
                            animate={{ scale: item.met ? [1, 1.25, 1] : 1 }}
                            transition={{ duration: 0.3 }}
                            className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${
                              item.met ? "bg-emerald-500 text-white" : "bg-black/10 text-transparent"
                            }`}
                          >
                            <Check size={9} strokeWidth={3} />
                          </motion.div>
                          <span className="truncate">{item.label}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Confirm Password Input */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="space-y-1"
              >
                <label className="block text-xs font-semibold text-black/80">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full h-11 pl-4 pr-11 rounded-xl bg-[#F4F3EE]/70 border border-black/[0.08] text-sm text-black placeholder:text-black/35 focus:outline-none focus:border-black/40 focus:bg-white transition-all shadow-2xs"
                    required
                  />
                  <motion.button
                    whileTap={{ scale: 0.85, rotate: 15 }}
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors cursor-pointer"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={showConfirmPassword ? "hide" : "show"}
                        initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </motion.div>
                    </AnimatePresence>
                  </motion.button>
                </div>
              </motion.div>

              {/* Animated Custom iOS-Style Toggle Switch for Terms */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.45 }}
                className="pt-2"
              >
                <div 
                  onClick={() => setAgreeTerms(!agreeTerms)}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#F4F3EE]/60 border border-black/[0.06] cursor-pointer group hover:bg-[#F4F3EE] transition-colors"
                >
                  <div className="text-xs text-black/75 pr-3 select-none leading-tight">
                    I agree to the <span className="font-semibold text-black underline">Terms</span> and <span className="font-semibold text-black underline">Privacy Charter</span>
                  </div>

                  {/* Animated Spring Switch Pill */}
                  <div className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 shrink-0 ${
                    agreeTerms ? "bg-black" : "bg-black/15"
                  }`}>
                    <motion.div 
                      layout
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className={`w-4 h-4 rounded-full bg-white shadow-xs ${
                        agreeTerms ? "ml-auto" : "mr-auto"
                      }`} 
                    />
                  </div>
                </div>
              </motion.div>

              {/* Primary Create Account Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full h-12 mt-2 rounded-xl bg-black text-white font-semibold text-sm hover:bg-black/90 transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Creating Workspace...</span>
                  </>
                ) : (
                  <span>Create Account</span>
                )}
              </motion.button>

              {/* Google Social Button */}
              <div 
                id="google-signup-btn" 
                className="w-full h-11 flex items-center justify-center relative z-10 bg-white rounded-xl overflow-hidden"
              >
                {/* Fallback while loading */}
                {isGoogleLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white z-20 gap-2 text-xs font-semibold text-black/60">
                    <Loader2 size={14} className="animate-spin" />
                    <span>Signing Up with Google...</span>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Bottom Footer Switcher */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="text-center text-xs text-black/60 pt-2"
          >
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-black hover:underline">
              Sign In
            </Link>
          </motion.div>

        </motion.div>

      </motion.div>
    </div>
  );
}

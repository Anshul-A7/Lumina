"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, ArrowLeft, Loader2, Sparkles, Check } from "lucide-react";
import { AuthService } from "@/services/auth.service";
import LuminaLogo from "@/components/common/LuminaLogo";

/* ══════════════════════════════════════════════════════════════════════════
   LUMINA · Animated Luxury Authentication · Sign In
   Dynamic Dual-Mode Switcher · Custom Animated Spring Toggle · Morphing Eye
   ══════════════════════════════════════════════════════════════════════════ */

const SERIF = "'Playfair Display', Georgia, serif";
const easeOut = [0.16, 1, 0.3, 1] as const;

// Google Identity Services callback type
declare global {
  interface Window {
    handleGoogleCredentialResponse?: (response: { credential: string }) => void;
  }
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Please enter both your email address and password.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await AuthService.login({ email, password });

      // Store user display info for dashboard
      if (typeof window !== "undefined") {
        localStorage.setItem("lumina_user_email", response.user.email);
        localStorage.setItem("lumina_user_name", response.user.username);
        localStorage.setItem("note_xz_user_email", response.user.email);
        localStorage.setItem("note_xz_user_name", response.user.username);
        if (response.user.profileImageUrl) {
          localStorage.setItem("lumina_user_avatar", response.user.profileImageUrl);
        }
      }

      router.push("/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Invalid email or password. Please verify your credentials.";
      if (message === "EMAIL_NOT_VERIFIED") {
        router.push(`/verify-email?email=${encodeURIComponent(email.trim())}`);
        return;
      }
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
        localStorage.setItem("lumina_user_email", authResponse.user.email);
        localStorage.setItem("lumina_user_name", authResponse.user.username);
        localStorage.setItem("note_xz_user_email", authResponse.user.email);
        localStorage.setItem("note_xz_user_name", authResponse.user.username);
        if (authResponse.user.profileImageUrl) {
          localStorage.setItem("lumina_user_avatar", authResponse.user.profileImageUrl);
        }
      }

      router.push("/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Google sign-in failed. Please try again.";
      setErrorMessage(message);
      setIsGoogleLoading(false);
    }
  }, [router]);

  // Initialize Google Identity Services
  useEffect(() => {
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!googleClientId) return;

    // Expose callback globally for Google Identity Services
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
        const buttonContainer = document.getElementById("google-signin-btn");
        if (buttonContainer) {
          window.google.accounts.id.renderButton(buttonContainer, {
            type: "standard",
            theme: "outline",
            size: "large",
            text: "signin_with",
            shape: "rectangular",
            logo_alignment: "center",
            width: buttonContainer.offsetWidth > 400 ? 400 : buttonContainer.offsetWidth,
          });
        }
      }
    };

    // Wait for the Google script to load
    if (window.google?.accounts?.id) {
      initGoogle();
    } else {
      const checkInterval = setInterval(() => {
        if (window.google?.accounts?.id) {
          initGoogle();
          clearInterval(checkInterval);
        }
      }, 200);
      // Clean up after 10 seconds
      setTimeout(() => clearInterval(checkInterval), 10000);
    }

    return () => {
      window.handleGoogleCredentialResponse = undefined;
    };
  }, [handleGoogleCredentialResponse]);

  // We no longer use a custom button click handler for Google.
  // The official button renders itself into the #google-signin-btn container.
  
  const isAnyLoading = isLoading || isGoogleLoading;

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans selection:bg-black selection:text-white overflow-hidden">
      {/* Luxury Split Card Container with Entrance Animation */}
      <motion.div 
        key="login-page"
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: easeOut }}
        className="w-full max-w-6xl min-h-[720px] bg-white rounded-[2.5rem] border border-black/[0.08] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12"
      >
        
        {/* Left Column: Animated Artistic Fluid Gradient Card */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: easeOut }}
          className="hidden lg:flex lg:col-span-6 relative bg-black p-12 flex-col justify-between overflow-hidden rounded-[2.2rem] m-3"
        >
          {/* Animated High-Resolution Fluid Wave Background */}
          <motion.img
            src="/images/auth-waves.png"
            alt="Fluid Waves Art"
            animate={{ scale: [1, 1.05, 1], rotate: [0, 0.5, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
          />
          
          {/* Ambient Dark Vignette & Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 pointer-events-none" />

          {/* Top Brand Quote Header with Wave Fade */}
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative z-10"
          >
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase font-semibold text-white/90 drop-shadow-sm">
                A WISE QUOTE
              </span>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="h-[1px] bg-white/50" 
              />
            </div>
          </motion.div>

          {/* Bottom Editorial Quote with Cascade Entry */}
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
              Get Everything <br />
              You Want
            </h1>
            <p className="text-white/75 text-sm sm:text-base font-light leading-relaxed">
              You can get everything you want if you work hard, trust the process, and stick to the plan.
            </p>
          </motion.div>
        </motion.div>

        {/* Right Column: Clean White Minimalist Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: easeOut }}
          className="lg:col-span-6 p-8 sm:p-12 md:p-16 flex flex-col justify-between bg-white"
        >
          
          {/* Top Header Row with Logo & Animated Dual-Mode Switcher */}
          <div className="flex items-center justify-between pb-4">
            <Link href="/" className="cursor-pointer">
              <LuminaLogo size={32} />
            </Link>

            {/* Animated Dual Mode Switcher Bar */}
            <div className="flex items-center p-1 bg-[#F4F3EE] rounded-full border border-black/[0.06] text-xs font-semibold">
              <div className="relative px-3.5 py-1.5 text-black rounded-full shadow-xs">
                <motion.div
                  layoutId="auth-tab-pill"
                  className="absolute inset-0 bg-white rounded-full border border-black/[0.08]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
                <span className="relative z-10 font-bold">Sign In</span>
              </div>
              <Link href="/register" className="relative px-3.5 py-1.5 text-black/50 hover:text-black transition-colors rounded-full">
                Sign Up
              </Link>
            </div>
          </div>

          {/* Form Content Area */}
          <div className="my-auto max-w-md w-full mx-auto py-6">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-8"
            >
              <h2 
                style={{ fontFamily: SERIF }} 
                className="text-3xl sm:text-4xl font-normal text-black tracking-tight mb-1.5"
              >
                Welcome Back
              </h2>
              <p className="text-black/60 text-xs sm:text-sm font-light">
                Enter your email and password to access your workspace
              </p>
            </motion.div>

            {/* Error Message Toast with AnimatePresence */}
            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -8 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -8 }}
                  className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 overflow-hidden"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                  <span>{errorMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Input */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="space-y-1.5"
              >
                <label className="block text-xs font-semibold text-black/80">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full h-12 px-4 rounded-xl bg-[#F4F3EE]/70 border border-black/[0.08] text-sm text-black placeholder:text-black/35 focus:outline-none focus:border-black/40 focus:bg-white transition-all shadow-2xs"
                  required
                />
              </motion.div>

              {/* Password Input with Morphing Eye */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-1.5"
              >
                <label className="block text-xs font-semibold text-black/80">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full h-12 pl-4 pr-11 rounded-xl bg-[#F4F3EE]/70 border border-black/[0.08] text-sm text-black placeholder:text-black/35 focus:outline-none focus:border-black/40 focus:bg-white transition-all shadow-2xs"
                    required
                  />
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
              </motion.div>

              {/* Animated Custom Spring Switch for Remember Me & Forgot Password */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="flex items-center justify-between pt-1 text-xs"
              >
                <div 
                  onClick={() => setRememberMe(!rememberMe)}
                  className="flex items-center gap-2.5 cursor-pointer select-none group"
                >
                  {/* Animated Spring Switch Pill */}
                  <div className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors duration-300 ${
                    rememberMe ? "bg-black" : "bg-black/15"
                  }`}>
                    <motion.div 
                      layout
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className={`w-4 h-4 rounded-full bg-white shadow-xs ${
                        rememberMe ? "ml-auto" : "mr-auto"
                      }`} 
                    />
                  </div>
                  <span className="text-black/75 group-hover:text-black transition-colors">Remember me</span>
                </div>

                <Link
                  href="/forgot-password"
                  className="font-medium text-black/70 hover:text-black transition-colors hover:underline"
                >
                  Forgot Password
                </Link>
              </motion.div>

              {/* Primary Sign In Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isAnyLoading}
                className="w-full h-12 mt-2 rounded-xl bg-black text-white font-semibold text-sm hover:bg-black/90 transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </motion.button>

              {/* Google Social Button */}
              <div 
                id="google-signin-btn" 
                className="w-full h-11 flex items-center justify-center relative z-10 bg-white rounded-xl overflow-hidden"
              >
                {/* Fallback while loading */}
                {isGoogleLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white z-20 gap-2 text-xs font-semibold text-black/60">
                    <Loader2 size={14} className="animate-spin" />
                    <span>Signing In with Google...</span>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Bottom Footer Switcher */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center text-xs text-black/60 pt-4"
          >
            Don't have an account?{" "}
            <Link href="/register" className="font-semibold text-black hover:underline">
              Sign Up
            </Link>
          </motion.div>

        </motion.div>

      </motion.div>
    </div>
  );
}

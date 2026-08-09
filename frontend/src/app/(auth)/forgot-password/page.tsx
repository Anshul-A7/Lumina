"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Loader2, CheckCircle2, Mail } from "lucide-react";
import { AuthService } from "@/services/auth.service";
import LuminaLogo from "@/components/common/LuminaLogo";

/* ══════════════════════════════════════════════════════════════════════════
   LUMINA · Animated Luxury Authentication · Password Recovery
   Clean Password Recovery Flow · Animated Email Confirmation Toast
   ══════════════════════════════════════════════════════════════════════════ */

const SERIF = "'Playfair Display', Georgia, serif";

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim()) {
      setErrorMessage("Please enter the email address associated with your workspace.");
      return;
    }

    setIsLoading(true);

    try {
      await AuthService.forgotPassword(email.trim());
      setIsSubmitted(true);
      setIsLoading(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to send recovery email. Please check the address.";
      setErrorMessage(message);
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans selection:bg-black selection:text-white overflow-hidden">
      {/* Luxury Split Card Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: easeOut }}
        className="w-full max-w-6xl min-h-[700px] bg-white rounded-[2.5rem] border border-black/[0.08] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12"
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
            src="/images/auth-waves.png"
            alt="Fluid Waves Art"
            animate={{ scale: [1, 1.05, 1], rotate: [0, 0.5, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
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
                SECURITY ENCLAVE
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
              Regain Access <br />
              Securely
            </h1>
            <p className="text-white/75 text-sm sm:text-base font-light leading-relaxed">
              Your knowledge base is protected by zero-knowledge safeguards. Recovery tokens are cryptographically verified before access is restored.
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
          
          {/* Top Header Logo */}
          <div className="flex items-center justify-between">
            <Link href="/" className="cursor-pointer">
              <LuminaLogo size={32} />
            </Link>

            <motion.div whileHover={{ x: -3 }}>
              <Link 
                href="/login"
                className="text-xs font-semibold text-black/50 hover:text-black transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft size={14} /> Back to Sign In
              </Link>
            </motion.div>
          </div>

          {/* Form Content Area */}
          <div className="my-auto max-w-md w-full mx-auto py-8">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="text-center mb-8">
                    <h2 
                      style={{ fontFamily: SERIF }} 
                      className="text-3xl sm:text-4xl font-normal text-black tracking-tight mb-2"
                    >
                      Reset Password
                    </h2>
                    <p className="text-black/60 text-xs sm:text-sm font-light">
                      Enter your email address and we will send you a recovery link
                    </p>
                  </div>

                  {errorMessage && (
                    <motion.div 
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                      <span>{errorMessage}</span>
                    </motion.div>
                  )}

                  <form onSubmit={handleReset} className="space-y-4">
                    <div className="space-y-1.5">
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
                    </div>

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
                          <span>Sending Recovery Link...</span>
                        </>
                      ) : (
                        <span>Send Recovery Link</span>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: easeOut }}
                  className="text-center py-6 space-y-4"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 mx-auto flex items-center justify-center shadow-xs"
                  >
                    <Mail size={24} />
                  </motion.div>
                  <h3 
                    style={{ fontFamily: SERIF }} 
                    className="text-2xl sm:text-3xl font-normal text-black tracking-tight"
                  >
                    Check Your Inbox
                  </h3>
                  <p className="text-black/60 text-xs sm:text-sm font-light leading-relaxed max-w-sm mx-auto">
                    We have sent a secure password reset link to <span className="font-semibold text-black">{email}</span>. Click the link in the email to choose a new password.
                  </p>
                  <div className="pt-4">
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                      <Link
                        href="/login"
                        className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-black text-white font-semibold text-xs uppercase tracking-wider hover:bg-black/90 transition-all shadow-xs"
                      >
                        Return to Sign In
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Footer Switcher */}
          <div className="text-center text-xs text-black/60 pt-4">
            Remember your password?{" "}
            <Link href="/login" className="font-semibold text-black hover:underline">
              Sign In
            </Link>
          </div>

        </motion.div>

      </motion.div>
    </div>
  );
}

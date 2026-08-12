"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Check, Zap, Infinity, Loader2, Star, ShieldCheck, X } from "lucide-react";
import { createCheckoutSession, getSubscription, SubscriptionDetails } from "@/lib/subscription.service";
import toast from "react-hot-toast";

// Declare Razorpay on the window object
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function GetPlusView() {
  const [sub, setSub] = useState<SubscriptionDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [billingCycle, setBillingCycle] = useState<"MONTHLY" | "YEARLY">("MONTHLY");

  useEffect(() => {
    getSubscription()
      .then(setSub)
      .finally(() => setLoading(false));
  }, []);

  const handleUpgrade = async (plan: "PLUS" | "PRO") => {
    try {
      setPurchasing(true);
      
      // 1. Initialize checkout session on the backend
      const { subscription_id } = await createCheckoutSession(plan, billingCycle);
      
      // 2. Open Razorpay Checkout Modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
        subscription_id: subscription_id,
        name: "Lumina Notes",
        description: `Upgrade to Lumina ${plan}`,
        handler: async function (response: any) {
          // Razorpay returns razorpay_payment_id, razorpay_subscription_id, razorpay_signature
          // We can optionally verify it here, but the webhook handles the actual entitlement backend update.
          toast.success(`Payment successful! Welcome to Lumina ${plan}. Please wait a moment for the server to activate your account.`);
          
          // Poll or refetch subscription details to reflect new state
          setLoading(true);
          setTimeout(async () => {
             const updatedSub = await getSubscription();
             setSub(updatedSub);
             setLoading(false);
          }, 3000); // Give the webhook a few seconds to process
        },
        theme: {
          color: plan === "PRO" ? "#ec4899" : "#000000",
        },
      };

      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', function (response: any){
         toast.error(response.error.description || "Payment failed. Please try again.");
      });
      
      rzp.open();
      
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to initialize checkout.");
    } finally {
      setPurchasing(false);
    }
  };

  const currentPlan = sub?.plan || "FREE";
  const currentCycle = sub?.billingCycle || "MONTHLY";

  if (loading) {
    return <div className="flex-1 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-black/20" /></div>;
  }

  return (
    <div className="flex-1 overflow-y-auto bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4 text-black flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-pink-500" /> Choose Your Plan
          </h1>
          <p className="text-lg text-black/60 mb-8">Unlock the full potential of your AI assistant.</p>
          
          {/* Billing Cycle Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${billingCycle === "MONTHLY" ? "text-black" : "text-black/50"}`}>Monthly</span>
            <button 
              onClick={() => setBillingCycle(billingCycle === "MONTHLY" ? "YEARLY" : "MONTHLY")}
              className="relative inline-flex h-8 w-16 items-center rounded-full bg-black transition-colors focus:outline-none"
            >
              <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${billingCycle === "YEARLY" ? "translate-x-9" : "translate-x-1"}`} />
            </button>
            <span className={`text-sm font-medium flex items-center gap-2 ${billingCycle === "YEARLY" ? "text-black" : "text-black/50"}`}>
              Yearly <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">Save 20%</span>
            </span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Free Tier */}
          <div className={`bg-[#F4F4F4] rounded-3xl p-8 flex flex-col ${currentPlan === "FREE" ? "border-2 border-black" : "border border-black/5"}`}>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-2">Free</h2>
              <p className="text-black/60 mb-6 text-sm">Perfect for light usage and testing the waters.</p>
              <div className="text-4xl font-bold text-black">₹0<span className="text-lg text-black/40 font-normal">/mo</span></div>
              <div className="text-sm text-transparent mt-1">₹0/mo</div> {/* Placeholder to align height */}
            </div>
            
            <ul className="space-y-4 mb-8 flex-1 text-sm">
              <li className="flex items-start gap-3 text-black/80">
                <Check className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
                <span>5 PDF generations per day</span>
              </li>
              <li className="flex items-start gap-3 text-black/80">
                <Check className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
                <span>10 Image generations per day</span>
              </li>
              <li className="flex items-start gap-3 text-black/80">
                <Check className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
                <span>Attach up to 10 PDFs / 15 Images daily</span>
              </li>
              <li className="flex items-start gap-3 text-black/80">
                <Check className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
                <span>Standard response speed</span>
              </li>
              <li className="flex items-start gap-3 text-black/80">
                <X className="w-5 h-5 text-black/40 mt-0.5 flex-shrink-0" />
                <span className="text-black/60">No Collaboration Workspaces</span>
              </li>
            </ul>
            
            <button className="w-full bg-black/10 text-black px-6 py-3 rounded-xl font-medium cursor-not-allowed">
              {currentPlan === "FREE" ? "Current Plan" : "Downgrade (Contact Support)"}
            </button>
          </div>

          {/* Plus Tier */}
          <div className={`bg-white rounded-3xl p-8 flex flex-col relative overflow-hidden ${currentPlan === "PLUS" && currentCycle === billingCycle ? "border-2 border-black shadow-xl" : "border border-black/10 shadow-lg"}`}>
            {currentPlan === "PLUS" && currentCycle === billingCycle && (
              <div className="absolute top-0 right-0 bg-black text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl">
                CURRENT
              </div>
            )}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-2 flex items-center gap-2"><Zap className="w-6 h-6 text-yellow-500" /> Plus</h2>
              <p className="text-black/60 mb-6 text-sm">For regular users who need more capabilities.</p>
              <div className="flex items-end gap-2">
                <div className="text-4xl font-bold text-black">{billingCycle === "MONTHLY" ? "₹100" : "₹80"}<span className="text-lg text-black/40 font-normal">/mo</span></div>
                {billingCycle === "MONTHLY" && <div className="text-sm text-black/40 line-through mb-1">₹299</div>}
              </div>
              <div className="text-sm text-black/60 mt-1 font-medium">
                {billingCycle === "MONTHLY" ? "Billed Monthly" : "Billed ₹960/yr"}
              </div>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1 text-sm">
              <li className="flex items-start gap-3 text-black/80">
                <Check className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
                <span>25 PDF generations per day</span>
              </li>
              <li className="flex items-start gap-3 text-black/80">
                <Check className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
                <span>50 Image generations per day</span>
              </li>
              <li className="flex items-start gap-3 text-black/80">
                <Infinity className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
                <span>Unlimited PDF & Image attachments</span>
              </li>
              <li className="flex items-start gap-3 text-black/80">
                <Check className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
                <span>Faster response times</span>
              </li>
              <li className="flex items-start gap-3 text-black/80">
                <Check className="w-5 h-5 text-black mt-0.5 flex-shrink-0" />
                <span>Up to 3 Workspaces (5 members each)</span>
              </li>
            </ul>
            
            <button 
              onClick={() => handleUpgrade("PLUS")}
              disabled={(currentPlan === "PLUS" && currentCycle === billingCycle) || currentPlan === "PRO" || purchasing}
              className="w-full bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-black/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {purchasing && <Loader2 className="w-5 h-5 animate-spin text-white" />}
              {currentPlan === "PLUS" && currentCycle === billingCycle ? "Current Plan" : currentPlan === "PRO" ? "Included in Pro" : "Upgrade to Plus"}
            </button>
          </div>

          {/* Pro Tier */}
          <div className={`bg-black rounded-3xl p-8 flex flex-col relative overflow-hidden ${currentPlan === "PRO" && currentCycle === billingCycle ? "ring-4 ring-pink-500 ring-offset-2" : "border border-black/5"}`}>
            <div className="absolute top-0 right-0 bg-pink-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl">
              {currentPlan === "PRO" && currentCycle === billingCycle ? "CURRENT" : "RECOMMENDED"}
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2"><Star className="w-6 h-6 text-pink-400" fill="currentColor" /> Pro</h2>
              <p className="text-white/60 mb-6 text-sm">For power users who need maximum capabilities.</p>
              <div className="text-4xl font-bold text-white">{billingCycle === "MONTHLY" ? "₹499" : "₹399"}<span className="text-lg text-white/40 font-normal">/mo</span></div>
              <div className="text-sm text-white/60 mt-1 font-medium">
                {billingCycle === "MONTHLY" ? "Billed Monthly" : "Billed ₹4788/yr"}
              </div>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1 text-sm">
              <li className="flex items-start gap-3 text-white/90">
                <Check className="w-5 h-5 text-pink-400 mt-0.5 flex-shrink-0" />
                <span>100 PDF generations per day</span>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <Check className="w-5 h-5 text-pink-400 mt-0.5 flex-shrink-0" />
                <span>100 Image generations per day</span>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <Infinity className="w-5 h-5 text-pink-400 mt-0.5 flex-shrink-0" />
                <span>Unlimited PDF & Image attachments</span>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <ShieldCheck className="w-5 h-5 text-pink-400 mt-0.5 flex-shrink-0" />
                <span>Fastest response times (Priority)</span>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <Sparkles className="w-5 h-5 text-pink-400 mt-0.5 flex-shrink-0" />
                <span>Early access to new features</span>
              </li>
              <li className="flex items-start gap-3 text-white/90">
                <Infinity className="w-5 h-5 text-pink-400 mt-0.5 flex-shrink-0" />
                <span>Unlimited Workspaces & Members</span>
              </li>
            </ul>
            
            <button 
              onClick={() => handleUpgrade("PRO")}
              disabled={(currentPlan === "PRO" && currentCycle === billingCycle) || purchasing}
              className="w-full bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {purchasing && <Loader2 className="w-5 h-5 animate-spin text-black" />}
              {currentPlan === "PRO" && currentCycle === billingCycle ? "Current Plan" : "Upgrade to Pro"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

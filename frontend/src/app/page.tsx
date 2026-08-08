"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  type Variants,
} from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Check,
  Plus,
  Minus,
  Brain,
  Zap,
  Shield,
  Layers,
  Search,
  Code2,
  Workflow,
  Share2,
  Sliders,
  ChevronRight,
  CircleDot,
  FileText,
  Clock,
  BookOpen,
  HelpCircle,
  Users,
  Eye,
  CheckCircle2,
  Lock,
  Compass,
  FileEdit,
  FolderTree,
  Tags,
  MessageSquare,
  Flame,
  Layout,
  Star,
  Quote,
  Laptop,
  Smartphone,
  CloudOff,
  Download,
  UploadCloud,
  Send,
  Wand2,
  Play,
  RotateCcw,
  MousePointer,
  MoveRight,
  CheckCheck,
  Network,
  Maximize2,
  Share,
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════════════════
   NOTE-XZ · Animated Sovereign Workspace
   Luxury White Theme (#FBF9F4) · Deep Framer Motion Animations on Every Section
   Smooth Scroll Reveals · Interactive Mind Map · Floating Agent Intelligence
   ══════════════════════════════════════════════════════════════════════════ */

const SERIF = "'Playfair Display', Georgia, serif";

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: easeOut },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const hoverCardEffect = {
  y: -6,
};

const tapEffect = {
  scale: 0.98,
};

const floatingAnimation = {
  y: [0, -6, 0],
};

const Reveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  amount?: number;
}> = ({ children, className = "", variants = fadeUpVariant, amount = 0.15 }) => (
  <motion.div
    className={className}
    variants={variants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false, amount }}
  >
    {children}
  </motion.div>
);

const WipeRevealText: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}> = ({ children, delay = 0, className = "", as: Component = "div" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.2 });
  return (
    <Component ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={inView ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
        transition={{ duration: 0.85, ease: easeOut, delay }}
      >
        {children}
      </motion.div>
    </Component>
  );
};

const CascadeReveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
  staggerAmount?: number;
}> = ({ children, delay = 0, className = "", staggerAmount = 0.08 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.1 });
  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 24, filter: "blur(2px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 24, filter: "blur(2px)" }}
          transition={{ duration: 0.6, delay: delay + i * staggerAmount, ease: easeOut }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
};

const Counter = ({
  end,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  end: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });

  useEffect(() => {
    if (!inView) {
      setVal(0);
      return;
    }
    const dur = 1800;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setVal(eased * end);
      if (elapsed < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, end]);

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
};

import LuminaLogo from "@/components/common/LuminaLogo";

/* ─────────────────────────────  Brand Logo  ───────────────────────────── */

const BrandLogo = ({ size = 36 }: { size?: number }) => (
  <LuminaLogo size={size} subtitle="Intelligent Space" />
);

/* ─────────────────────────────  Navigation Bar  ───────────────────────── */

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: easeOut }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-[#FBF9F4]/90 backdrop-blur-xl border-b border-black/[0.08] py-3.5 shadow-sm"
          : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        <Link href="/">
          <BrandLogo />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-semibold text-black/60">
          {["morph", "agents", "mindmap", "features", "pricing", "faq"].map((item, idx) => (
            <motion.a
              key={item}
              href={`#${item}`}
              whileHover={{ y: -2, color: "#000000" }}
              className="transition-colors capitalize"
            >
              {item === "morph" ? "Morph Demo" : item === "mindmap" ? "Knowledge Graph" : item}
            </motion.a>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-4">
          <Link
            href="/login"
            className="text-xs font-semibold uppercase tracking-wider text-black/70 hover:text-black px-4 py-2 rounded-xl transition-colors"
          >
            Sign In
          </Link>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={tapEffect}>
            <Link
              href="/register"
              className="text-xs font-semibold uppercase tracking-wider bg-black text-white px-5 py-2.5 rounded-xl hover:bg-black/85 transition-all shadow-sm flex items-center gap-2"
            >
              <span>Start Free</span>
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-black/80 hover:text-black"
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <Minus size={20} /> : <Plus size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FBF9F4] border-b border-black/[0.08] px-6 py-6 flex flex-col gap-4 text-xs uppercase font-semibold text-black/80"
          >
            <a href="#morph" onClick={() => setMobileOpen(false)} className="py-2">
              Morph Demo
            </a>
            <a href="#agents" onClick={() => setMobileOpen(false)} className="py-2">
              Autonomous Agents
            </a>
            <a href="#mindmap" onClick={() => setMobileOpen(false)} className="py-2">
              Knowledge Graph
            </a>
            <a href="#features" onClick={() => setMobileOpen(false)} className="py-2">
              Workspace
            </a>
            <a href="#pricing" onClick={() => setMobileOpen(false)} className="py-2">
              Pricing
            </a>
            <a href="#faq" onClick={() => setMobileOpen(false)} className="py-2">
              FAQ
            </a>
            <div className="pt-4 border-t border-black/10 flex flex-col gap-3">
              <Link href="/login" className="w-full text-center py-2.5 border border-black/15 rounded-xl">
                Sign In
              </Link>
              <Link href="/register" className="w-full text-center py-2.5 bg-black text-white rounded-xl">
                Start Free
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

/* ─────────────────────────────  Hero Section  ─────────────────────────── */

const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-36 pb-24 flex flex-col justify-center overflow-hidden bg-[#FBF9F4] text-black">
      {/* Animated subtle glow */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-black/[0.03] to-transparent rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 z-10 w-full text-center">
        {/* Animated Badge */}
        <Reveal className="flex justify-center mb-8">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 bg-white shadow-xs text-xs font-semibold uppercase tracking-widest text-black/70"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>The Calm Intelligence Workspace</span>
            <span className="text-black/20">•</span>
            <span className="text-black/50">Zero Clutter</span>
          </motion.div>
        </Reveal>

        {/* Animated Headline */}
        <div className="max-w-4xl mx-auto mb-8">
          <WipeRevealText
            as="h1"
            className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-black leading-[1.08]"
          >
            <span style={{ fontFamily: SERIF }}>Write in peace.</span> <br />
            <span className="italic font-normal text-black/75">
              Let knowledge connect itself.
            </span>
          </WipeRevealText>

          <Reveal className="mt-8 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-black/60 font-light leading-relaxed">
            Lumina is your distraction-free sanctuary for thoughts, meetings, voice notes, and
            projects. As you write, autonomous agents quietly organize, summarize, and cross-link
            your world.
          </Reveal>
        </div>

        {/* Action Buttons with Spring Hovers */}
        <Reveal className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={tapEffect} className="w-full sm:w-auto">
            <Link
              href="/register"
              className="w-full sm:w-auto h-14 px-8 bg-black text-white font-semibold text-sm rounded-2xl flex items-center justify-center gap-3 shadow-md"
            >
              <span>Create Your Free Workspace</span>
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={tapEffect} className="w-full sm:w-auto">
            <a
              href="#morph"
              className="w-full sm:w-auto h-14 px-8 border border-black/15 bg-white hover:bg-black/[0.02] text-black font-semibold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-xs"
            >
              <Play size={16} className="text-black/70" />
              <span>Watch Live Transformation</span>
            </a>
          </motion.div>
        </Reveal>

        {/* Floating Interactive Live Agent Pulse Card */}
        <Reveal className="max-w-3xl mx-auto">
          <motion.div
            whileHover={{ y: -4 }}
            className="p-4 rounded-2xl bg-white border border-black/[0.08] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-left transition-all"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center shrink-0"
              >
                <Brain size={18} />
              </motion.div>
              <div>
                <div className="text-xs font-bold text-black font-heading">
                  Autonomous Agents at Work
                </div>
                <div className="text-[11px] text-black/50">
                  Synthesis, Citation, & Task Extraction running quietly in the background
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 shrink-0">
              <CheckCheck size={14} /> 100% Private & On-Device
            </div>
          </motion.div>
        </Reveal>

        {/* Hero Numbers with Staggered Motion */}
        <CascadeReveal
          delay={0.2}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {[
            { end: 500000, suffix: "+", label: "Notes Synthesized" },
            { end: 99.9, suffix: "%", label: "Sync Reliability", decimals: 1 },
            { end: 0, suffix: " ms", label: "Typing Latency" },
            { end: 100, suffix: "%", label: "Data Privacy" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-black font-mono">
                <Counter end={stat.end} decimals={stat.decimals || 0} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-black/50 uppercase tracking-widest mt-1 font-semibold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </CascadeReveal>
      </div>
    </section>
  );
};

/* ─────────────────────────────  Live Split Morphing Demo  ─────────────── */

const LiveTransformationSection = () => {
  const [isSynthesized, setIsSynthesized] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const rawMessyNote = `Met with Alex & Sarah regarding Q3 design strategy. 
Need to simplify the mobile navigation because users are getting lost.
Sarah mentioned we should launch the European workspace cluster next month to improve latency.
Tom needs to finish customer interviews by Thursday before the sprint review.
Also remember to cross-reference our battery research document from last quarter.`;

  const handleToggle = () => {
    if (!isSynthesized) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setIsSynthesized(true);
      }, 450);
    } else {
      setIsSynthesized(false);
    }
  };

  return (
    <section id="morph" className="py-32 bg-white text-black relative border-t border-black/[0.08]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-black/10 bg-[#FBF9F4] text-xs font-semibold uppercase tracking-widest text-black/70 mb-4">
            <Wand2 size={14} className="text-black" />
            Live Morphing Demo
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold font-heading">
            From raw stream of consciousness <br />
            <span style={{ fontFamily: SERIF }} className="italic font-normal text-black/80">
              to immaculate structured knowledge.
            </span>
          </h2>
          <p className="text-black/60 text-base sm:text-lg mt-4 font-light leading-relaxed">
            Click the trigger below to see how Lumina automatically turns quick, chaotic thoughts
            into structured executive briefs, action items, and knowledge links.
          </p>

          <div className="mt-8 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={tapEffect}
              onClick={handleToggle}
              disabled={isProcessing}
              className="px-6 py-3 rounded-2xl bg-black text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <Sparkles size={14} className="animate-spin" />
                  <span>Synthesizing...</span>
                </>
              ) : isSynthesized ? (
                <>
                  <RotateCcw size={14} />
                  <span>Show Raw Brain Dump</span>
                </>
              ) : (
                <>
                  <Sparkles size={14} />
                  <span>Synthesize with Lumina</span>
                </>
              )}
            </motion.button>
          </div>
        </Reveal>

        {/* Live Transformation Canvas */}
        <motion.div
          layout
          className="max-w-5xl mx-auto rounded-3xl border border-black/10 bg-[#FBF9F4] p-6 sm:p-10 shadow-xl"
        >
          <div className="flex items-center justify-between pb-6 border-b border-black/[0.08]">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-amber-400/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
              <span className="font-mono text-xs text-black/50 ml-2">
                Workspace / Q3 Product Strategy.note
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-black/40">
                {isSynthesized ? "STATUS: SYNTHESIZED & LINKED" : "STATUS: RAW DRAFT"}
              </span>
            </div>
          </div>

          <div className="pt-8 min-h-[380px]">
            <AnimatePresence mode="wait">
              {!isSynthesized ? (
                <motion.div
                  key="raw"
                  initial={{ opacity: 0, y: 14, filter: "blur(2px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -14, filter: "blur(2px)" }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4 font-mono text-sm text-black/80 leading-loose whitespace-pre-line"
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-black/40 font-sans mb-2">
                    Raw Thought Input
                  </div>
                  {rawMessyNote}
                </motion.div>
              ) : (
                <motion.div
                  key="synthesized"
                  initial={{ opacity: 0, y: 14, filter: "blur(2px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -14, filter: "blur(2px)" }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  {/* Clean Title */}
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      Auto-Structured Brief
                    </span>
                    <h3 className="text-2xl font-bold font-heading text-black mt-2">
                      Q3 Design Strategy & Regional Cluster Deployment
                    </h3>
                  </div>

                  {/* Key Takeaways */}
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="p-4 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-2"
                  >
                    <div className="text-xs font-bold uppercase tracking-wider text-black">
                      Executive Summary (Generated by Synthesis Agent)
                    </div>
                    <ul className="space-y-1.5 text-xs text-black/75 font-light leading-relaxed list-disc list-inside">
                      <li>Simplify mobile navigation drawer to remove user friction.</li>
                      <li>European cluster deployment scheduled for next month to guarantee sub-millisecond sync.</li>
                      <li>Connected with historical document: <span className="font-semibold text-black underline">Battery Chemistry Q1 Research</span>.</li>
                    </ul>
                  </motion.div>

                  {/* Action Items */}
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="p-4 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-2"
                  >
                    <div className="text-xs font-bold uppercase tracking-wider text-black">
                      Action Items (Extracted by Task Agent)
                    </div>
                    <div className="space-y-2 text-xs text-black/80 font-mono">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                        <span>Schedule customer interviews before Thursday (Owner: Tom)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                        <span>Review European cluster cloud infrastructure (Owner: Sarah)</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Connected Graph Links */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <span className="text-xs font-semibold text-black/50">Auto-Linked Entities:</span>
                    {["#MobileDesign", "#EuropeanCluster", "#BatteryResearch"].map((tag) => (
                      <motion.span
                        key={tag}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="px-3 py-1 rounded-lg bg-white border border-black/10 text-xs font-medium text-black cursor-pointer shadow-xs"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ─────────────────────────────  Interactive Mind Map Graph  ────────────── */

const MindMapSection = () => {
  const [activeNode, setActiveNode] = useState<string>("Q3 Product Strategy");

  const nodes = [
    {
      id: "Q3 Product Strategy",
      x: 50,
      y: 50,
      connections: ["Mobile Navigation", "European Cluster", "User Research"],
      summary: "Core strategic umbrella focusing on performance and international expansion.",
    },
    {
      id: "Mobile Navigation",
      x: 20,
      y: 25,
      connections: ["Q3 Product Strategy", "User Research"],
      summary: "Simplifying drawer hierarchy to reduce menu cognitive load.",
    },
    {
      id: "European Cluster",
      x: 80,
      y: 30,
      connections: ["Q3 Product Strategy", "Security Audits"],
      summary: "Deploying high-speed Frankfurt and London workspace instances.",
    },
    {
      id: "User Research",
      x: 25,
      y: 75,
      connections: ["Q3 Product Strategy", "Mobile Navigation"],
      summary: "12 customer interviews scheduled to evaluate rapid writing flow.",
    },
    {
      id: "Security Audits",
      x: 75,
      y: 75,
      connections: ["European Cluster"],
      summary: "GDPR compliance & zero-knowledge client encryption verification.",
    },
  ];

  const selectedNode = nodes.find((n) => n.id === activeNode) || nodes[0];

  return (
    <section id="mindmap" className="py-32 bg-[#FBF9F4] text-black relative border-t border-black/[0.08]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-black/10 bg-white text-xs font-semibold uppercase tracking-widest text-black/70 mb-4">
            <Network size={14} className="text-black" />
            Visual Knowledge Graph
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold font-heading">
            See your ideas connect <br />
            <span style={{ fontFamily: SERIF }} className="italic font-normal text-black/80">
              in a living, visual network.
            </span>
          </h2>
          <p className="text-black/60 text-base sm:text-lg mt-4 font-light leading-relaxed">
            Click on any node in the graph below to inspect how Lumina links related thoughts
            together without requiring manual folders.
          </p>
        </Reveal>

        {/* Interactive SVG / Node Graph Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Visual Graph Viewport */}
          <div className="lg:col-span-8 rounded-3xl bg-white border border-black/10 p-6 sm:p-10 shadow-lg relative min-h-[420px] flex items-center justify-center overflow-hidden">
            {/* SVG Connecting Lines with Pulsing Dash */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <motion.line
                x1="50%" y1="50%" x2="20%" y2="25%"
                stroke="#E5E2D9" strokeWidth="2" strokeDasharray="4 4"
                animate={{ strokeDashoffset: [0, -16] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <motion.line
                x1="50%" y1="50%" x2="80%" y2="30%"
                stroke="#E5E2D9" strokeWidth="2" strokeDasharray="4 4"
                animate={{ strokeDashoffset: [0, -16] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <motion.line
                x1="50%" y1="50%" x2="25%" y2="75%"
                stroke="#E5E2D9" strokeWidth="2" strokeDasharray="4 4"
                animate={{ strokeDashoffset: [0, -16] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <motion.line
                x1="80%" y1="30%" x2="75%" y2="75%"
                stroke="#E5E2D9" strokeWidth="2" strokeDasharray="4 4"
                animate={{ strokeDashoffset: [0, -16] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <motion.line
                x1="20%" y1="25%" x2="25%" y2="75%"
                stroke="#E5E2D9" strokeWidth="2" strokeDasharray="4 4"
                animate={{ strokeDashoffset: [0, -16] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </svg>

            {/* Interactive Animated Nodes */}
            {nodes.map((node) => {
              const isSelected = activeNode === node.id;
              return (
                <motion.button
                  key={node.id}
                  whileHover={{ scale: 1.08 }}
                  whileTap={tapEffect}
                  onClick={() => setActiveNode(node.id)}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-2xl text-xs font-semibold transition-all duration-300 flex items-center gap-2 shadow-xs cursor-pointer ${isSelected
                      ? "bg-black text-white scale-110 shadow-lg ring-4 ring-black/10 z-10"
                      : "bg-[#FDFBF7] text-black border border-black/10 hover:border-black/30"
                    }`}
                >
                  <CircleDot size={12} className={isSelected ? "text-emerald-400 animate-pulse" : "text-black/40"} />
                  <span>{node.id}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Node Inspector Sidebar */}
          <motion.div
            layout
            className="lg:col-span-4 rounded-3xl bg-white border border-black/10 p-6 shadow-md flex flex-col justify-between h-[420px]"
          >
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-black/40 mb-2">
                Selected Knowledge Entity
              </div>
              <h3 className="text-xl font-bold font-heading text-black">{selectedNode.id}</h3>
              <p className="text-xs text-black/60 font-light mt-3 leading-relaxed">
                {selectedNode.summary}
              </p>

              <div className="mt-6 pt-4 border-t border-black/[0.08]">
                <div className="text-xs font-bold uppercase tracking-wider text-black mb-2">
                  Bidirectional Links ({selectedNode.connections.length})
                </div>
                <div className="space-y-1.5">
                  {selectedNode.connections.map((c) => (
                    <motion.div
                      key={c}
                      whileHover={{ x: 3 }}
                      onClick={() => setActiveNode(c)}
                      className="p-2.5 rounded-xl bg-[#FBF9F4] border border-black/[0.06] text-xs text-black/80 font-medium flex items-center justify-between hover:bg-black/[0.04] cursor-pointer transition-colors"
                    >
                      <span>{c}</span>
                      <ArrowUpRight size={12} className="text-black/40" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-[11px] text-black/40 font-mono">
              Auto-indexed by Knowledge Discovery Agent
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────  Autonomous Agents Section  ─────────────── */

const AgentsSection = () => {
  const [activeAgent, setActiveAgent] = useState<number>(0);

  const agents = [
    {
      title: "Synthesis Agent",
      badge: "Content Intelligence",
      icon: <Brain className="w-5 h-5 text-black" />,
      desc: "Takes long meeting transcripts, voice recordings, and scattered bullet points and transforms them into clean, structured briefs with key takeaways and executive summaries.",
      capabilities: [
        "One-click executive summaries",
        "Converts messy audio transcripts into clean bullet points",
        "Generates presentation outlines from raw ideas",
        "Detects missing context and suggests follow-up questions",
      ],
      sampleOutput: "• Project Launch confirmed for Q3\n• Budget approved with 15% contingency\n• Design sign-off pending customer interview",
    },
    {
      title: "Link Discovery Agent",
      badge: "Knowledge Graph",
      icon: <Workflow className="w-5 h-5 text-black" />,
      desc: "Constantly browses your workspace in the background to discover hidden relationships between past ideas, documents, and client conversations without manual tagging.",
      capabilities: [
        "Discovers related notes across folders and projects",
        "Builds visual connection maps automatically",
        "Prevents duplicate research across team members",
        "Surfaces forgotten insights at the exact right moment",
      ],
      sampleOutput: "Connected to: [Design System 2026] and [Q2 User Testing Insights]",
    },
    {
      title: "Action Item Agent",
      badge: "Task Automation",
      icon: <CheckCircle2 className="w-5 h-5 text-black" />,
      desc: "Scans everything you write to identify commitments, deadlines, and deliverables, instantly creating a consolidated checklist so nothing slips through the cracks.",
      capabilities: [
        "Extracts clear tasks from unstructured notes",
        "Assigns deadlines and priorities automatically",
        "Syncs to your daily planner and calendar",
        "Sends daily morning briefings of what matters most",
      ],
      sampleOutput: "[ ] Finalize security review before Friday (Assigned to Alex)",
    },
    {
      title: "Research & Citation Agent",
      badge: "Deep Research",
      icon: <BookOpen className="w-5 h-5 text-black" />,
      desc: "Assists writers and researchers by cross-referencing facts, organizing source materials, and formatting citations without forcing you to switch tabs.",
      capabilities: [
        "Cross-references facts across internal documents",
        "Maintains clean bibliographies and references",
        "Highlights contradictions in team documentation",
        "Drafts comprehensive literature reviews",
      ],
      sampleOutput: "Source verified: Internal Strategy Whitepaper (p. 42, § 3.1)",
    },
  ];

  return (
    <section id="agents" className="py-32 bg-white text-black relative border-t border-black/[0.08]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-black/10 bg-[#FBF9F4] text-xs font-semibold uppercase tracking-widest text-black/70 mb-4">
            <Sparkles size={14} className="text-black" />
            Autonomous Assistants
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold font-heading">
            Agents that work for you <br />
            <span style={{ fontFamily: SERIF }} className="italic font-normal text-black/80">
              while you focus on thinking.
            </span>
          </h2>
          <p className="text-black/60 text-base sm:text-lg mt-4 font-light leading-relaxed">
            You don't need to manually tag, sort, or link documents anymore. Specialized agents
            work quietly in your workspace to keep everything organized.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Agent Picker List */}
          <div className="lg:col-span-5 space-y-3">
            {agents.map((agent, idx) => (
              <motion.div
                key={agent.title}
                whileHover={hoverCardEffect}
                whileTap={tapEffect}
                onClick={() => setActiveAgent(idx)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer ${activeAgent === idx
                    ? "bg-[#FDFBF7] text-black border-black/30 shadow-md scale-[1.01]"
                    : "bg-white text-black/70 border-black/[0.06] hover:border-black/20 hover:bg-[#FAF9F5]"
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-black/10 flex items-center justify-center shadow-xs">
                      {agent.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-black font-heading">{agent.title}</h3>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-black/40">
                        {agent.badge}
                      </span>
                    </div>
                  </div>
                  <ChevronRight
                    size={18}
                    className={activeAgent === idx ? "text-black" : "text-black/20"}
                  />
                </div>
                <p className="text-xs text-black/60 mt-3 font-light leading-relaxed">
                  {agent.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Active Agent Interactive Showcase */}
          <motion.div
            layout
            className="lg:col-span-7 rounded-3xl border border-black/10 bg-[#FDFBF7] p-8 shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-black/[0.08]">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center shadow-sm"
                  >
                    {agents[activeAgent].icon}
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold font-heading text-black">
                      {agents[activeAgent].title}
                    </h3>
                    <p className="text-xs text-black/50 font-medium">
                      Active inside your workspace
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white border border-black/10 text-black shadow-xs">
                  AUTONOMOUS
                </span>
              </div>

              <div className="py-6 space-y-6">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-black/40 mb-3">
                    Core Capabilities
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {agents[activeAgent].capabilities.map((cap) => (
                      <motion.div
                        key={cap}
                        whileHover={{ y: -2 }}
                        className="p-3.5 rounded-xl bg-white border border-black/[0.06] text-xs text-black/80 font-light flex items-start gap-2.5 shadow-xs"
                      >
                        <Check size={14} className="text-black shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-black/40 mb-2">
                    Live Sample Output
                  </h4>
                  <div className="p-4 rounded-2xl bg-white border border-black/10 font-mono text-xs text-black/80 leading-relaxed shadow-xs">
                    {agents[activeAgent].sampleOutput}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-black/[0.08] flex items-center justify-between text-xs text-black/60">
              <span>Runs completely private on your device or private cloud.</span>
              <Link href="/register" className="font-semibold text-black hover:underline flex items-center gap-1">
                Try this agent <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────  Capabilities Bento Grid  ───────────────── */

const WorkspaceFeatures = () => {
  return (
    <section id="features" className="py-32 bg-[#FBF9F4] text-black relative border-t border-black/[0.08]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-black/10 bg-white text-xs font-semibold uppercase tracking-widest text-black/70 mb-4">
            <Layers size={14} className="text-black" />
            Core Workspace
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold font-heading">
            Engineered for <br />
            <span style={{ fontFamily: SERIF }} className="italic font-normal text-black/80">
              speed, focus, and clarity.
            </span>
          </h2>
          <p className="text-black/60 text-base sm:text-lg mt-4 font-light leading-relaxed">
            Every feature is designed to reduce distractions and help you get into a state of deep
            flow.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
          {/* Bento Card 1 - Large Span 2 */}
          <motion.div
            whileHover={hoverCardEffect}
            className="md:col-span-2 rounded-3xl bg-white border border-black/[0.08] p-8 flex flex-col justify-between shadow-xs hover:border-black/20 hover:shadow-md transition-all duration-300"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#FDFBF7] border border-black/10 flex items-center justify-center mb-6">
                <Zap className="w-5 h-5 text-black" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-black mb-2">
                Sub-Millisecond Instant Search
              </h3>
              <p className="text-sm text-black/60 font-light leading-relaxed max-w-lg">
                Find any sentence, quote, meeting note, or research citation instantly. Type a query
                and jump directly into your thoughts with zero loading spinners.
              </p>
            </div>
            <div className="text-xs font-mono text-black/40">Press ⌘K anywhere to search</div>
          </motion.div>

          {/* Bento Card 2 */}
          <motion.div
            whileHover={hoverCardEffect}
            className="rounded-3xl bg-white border border-black/[0.08] p-8 flex flex-col justify-between shadow-xs hover:border-black/20 hover:shadow-md transition-all duration-300"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#FDFBF7] border border-black/10 flex items-center justify-center mb-6">
                <CloudOff className="w-5 h-5 text-black" />
              </div>
              <h3 className="text-xl font-bold font-heading text-black mb-2">Offline-First Design</h3>
              <p className="text-xs text-black/60 font-light leading-relaxed">
                Work seamlessly on flights, trains, or in coffee shops. When you reconnect, Lumina
                syncs without any merge conflicts.
              </p>
            </div>
            <div className="text-xs font-mono text-black/40">100% offline support</div>
          </motion.div>

          {/* Bento Card 3 */}
          <motion.div
            whileHover={hoverCardEffect}
            className="rounded-3xl bg-white border border-black/[0.08] p-8 flex flex-col justify-between shadow-xs hover:border-black/20 hover:shadow-md transition-all duration-300"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#FDFBF7] border border-black/10 flex items-center justify-center mb-6">
                <Users className="w-5 h-5 text-black" />
              </div>
              <h3 className="text-xl font-bold font-heading text-black mb-2">Team Workspaces</h3>
              <p className="text-xs text-black/60 font-light leading-relaxed">
                Collaborate in real time with colleagues. Share specific notebooks with granular
                permissions while keeping your personal notes private.
              </p>
            </div>
            <div className="text-xs font-mono text-black/40">Granular workspace controls</div>
          </motion.div>

          {/* Bento Card 4 - Large Span 2 */}
          <motion.div
            whileHover={hoverCardEffect}
            className="md:col-span-2 rounded-3xl bg-white border border-black/[0.08] p-8 flex flex-col justify-between shadow-xs hover:border-black/20 hover:shadow-md transition-all duration-300"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#FDFBF7] border border-black/10 flex items-center justify-center mb-6">
                <Lock className="w-5 h-5 text-black" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-black mb-2">
                Uncompromising Privacy & Data Ownership
              </h3>
              <p className="text-sm text-black/60 font-light leading-relaxed max-w-lg">
                Your thoughts belong to you. We never train public AI models on your private data.
                Export your notes anytime in standard open Markdown and JSON formats.
              </p>
            </div>
            <div className="text-xs font-mono text-black/40">
              Zero vendor lock-in • Standard Markdown export
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────  Customer Testimonials  ─────────────────── */

const TestimonialsSection = () => {
  const reviews = [
    {
      name: "Marcus Vance",
      role: "Lead Systems Researcher",
      company: "Apex Labs",
      quote:
        "Lumina completely replaced my messy notes setup. The synthesis agent saves me at least 4 hours every week by organizing research papers and team meetings automatically.",
    },
    {
      name: "Elena Rostova",
      role: "Founder & CEO",
      company: "Cognitive Media",
      quote:
        "The visual knowledge graph helped me connect ideas I wrote down six months ago with a new pitch I was writing yesterday. It feels like having a second brain that never forgets.",
    },
    {
      name: "David Chen",
      role: "Staff Product Designer",
      company: "Vanguard Design",
      quote:
        "Clean, pure white luxury design with zero clutter. The typography is gorgeous and the instant search means I never lose a single thought.",
    },
  ];

  return (
    <section className="py-32 bg-white text-black relative border-t border-black/[0.08]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-black/10 bg-[#FBF9F4] text-xs font-semibold uppercase tracking-widest text-black/70 mb-4">
            <Star size={14} className="text-black" />
            Loved by Thinkers
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold font-heading">
            Trusted by creators, founders, <br />
            <span style={{ fontFamily: SERIF }} className="italic font-normal text-black/80">
              and high-performance teams.
            </span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r) => (
            <motion.div
              key={r.name}
              whileHover={hoverCardEffect}
              className="p-8 rounded-3xl bg-[#FDFBF7] border border-black/[0.06] shadow-xs flex flex-col justify-between"
            >
              <div>
                <Quote size={24} className="text-black/20 mb-4" />
                <p className="text-sm text-black/80 font-light leading-relaxed italic mb-8">
                  "{r.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-black/[0.08] flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-black font-heading">{r.name}</h4>
                  <p className="text-xs text-black/50">{r.role}</p>
                </div>
                <span className="text-xs font-mono text-black/40">{r.company}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────  Pricing Matrix  ───────────────────────── */

const PricingSection = () => {
  const [yearly, setYearly] = useState(false);

  const tiers = [
    {
      name: "Personal",
      desc: "For individual thinkers, students, and writers.",
      price: { m: 0, y: 0 },
      feats: [
        "Unlimited personal notes & drafts",
        "Basic Autonomous Synthesis Agent",
        "Instant sub-millisecond search",
        "Markdown import and export",
        "Mobile and desktop sync",
      ],
      cta: "Get Started Free",
      highlight: false,
    },
    {
      name: "Professional",
      desc: "For founders, researchers, and creators.",
      price: { m: 14, y: 11 },
      feats: [
        "All Autonomous Agents unlocked",
        "Full Knowledge Graph discovery",
        "Action item & task extraction",
        "Unlimited audio voice memo transcription",
        "Priority sync with zero latency",
        "Dedicated priority support",
      ],
      cta: "Start 14-Day Free Trial",
      highlight: true,
    },
    {
      name: "Team Workspace",
      desc: "For collaborating organizations and studios.",
      price: { m: 28, y: 22 },
      feats: [
        "Shared team knowledge graphs",
        "Multiplayer real-time editing",
        "Granular permission controls",
        "Centralized billing & admin panel",
        "Custom integration connectors",
        "Direct onboarding assistance",
      ],
      cta: "Start Team Trial",
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-32 bg-[#FBF9F4] text-black relative border-t border-black/[0.08]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-black/10 bg-white text-xs font-semibold uppercase tracking-widest text-black/70 mb-4">
            <Sliders size={14} className="text-black" />
            Simple Pricing
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold font-heading">
            Transparent plans for <br />
            <span style={{ fontFamily: SERIF }} className="italic font-normal text-black/80">
              every stage of thinking.
            </span>
          </h2>
          <p className="text-black/60 text-base sm:text-lg mt-4 font-light leading-relaxed">
            Start free. Upgrade when you need autonomous agent capabilities across your projects.
          </p>

          {/* Monthly / Yearly Toggle */}
          <div className="mt-8 inline-flex items-center gap-1 rounded-full bg-white p-1 border border-black/10 shadow-xs">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${!yearly ? "bg-black text-white shadow-xs" : "text-black/60 hover:text-black"
                }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${yearly ? "bg-black text-white shadow-xs" : "text-black/60 hover:text-black"
                }`}
            >
              Annual Billing <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">Save 20%</span>
            </button>
          </div>
        </Reveal>

        <CascadeReveal delay={0.2} staggerAmount={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((t) => (
            <motion.div
              key={t.name}
              whileHover={{ y: t.highlight ? -8 : -5, transition: { duration: 0.25 } }}
              className={`relative rounded-3xl p-8 flex flex-col justify-between border transition-all duration-300 ${t.highlight
                  ? "bg-white text-black border-black/30 shadow-xl md:-translate-y-3"
                  : "bg-white text-black border-black/[0.08] hover:border-black/20 shadow-xs"
                }`}
            >
              {t.highlight && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full bg-black text-white shadow-sm">
                  Most Popular
                </span>
              )}

              <div>
                <h3 className="text-2xl font-bold font-heading">{t.name}</h3>
                <p className="text-xs mt-2 text-black/60 font-light">{t.desc}</p>

                <div className="my-8 flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold font-mono tracking-tight">
                    ${yearly ? t.price.y : t.price.m}
                  </span>
                  <span className="text-xs uppercase text-black/50 font-medium">/ month</span>
                </div>

                <ul className="space-y-3.5 mb-10 text-xs">
                  {t.feats.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check size={14} className="text-black shrink-0 mt-0.5" />
                      <span className="text-black/80 font-light">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={tapEffect}>
                <Link
                  href="/register"
                  className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-center block transition-all ${t.highlight
                      ? "bg-black text-white hover:bg-black/90 shadow-md"
                      : "bg-[#F4F3EE] text-black hover:bg-black/10"
                    }`}
                >
                  {t.cta}
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </CascadeReveal>
      </div>
    </section>
  );
};

/* ─────────────────────────────  Customer FAQ  ─────────────────────────── */

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Can I import my existing notes from Notion, Obsidian, or Apple Notes?",
      a: "Yes! Lumina offers seamless 1-click import from standard Markdown folders, HTML exports, and Notion workspace zips. All your links, headers, and media attachments will be preserved perfectly.",
    },
    {
      q: "Do you train public AI models on my private documents?",
      a: "Never. Your notes and knowledge graphs are completely private. We maintain a strict zero-knowledge architecture and do not use customer data for public model training.",
    },
    {
      q: "How does offline sync work when I'm traveling?",
      a: "Lumina is built offline-first. You can write, edit, and organize on flights or trains. As soon as your device reconnects to Wi-Fi, your changes merge instantly and seamlessly across all your devices.",
    },
    {
      q: "What makes the autonomous agents different from standard chatbots?",
      a: "Instead of having to copy-paste prompts back and forth in a sidebar chat, Lumina agents live directly inside your documents. They automatically suggest links, clean up outlines, and extract action items as you write.",
    },
    {
      q: "Can I export all my data if I ever decide to leave?",
      a: "Absolutely. We reject vendor lock-in. You can download your entire workspace anytime as standard Markdown files and attachments with a single click.",
    },
    {
      q: "Is there a free trial for the Professional and Team plans?",
      a: "Yes, you can try all Professional and Team agent features completely free for 14 days without entering a credit card.",
    },
  ];

  return (
    <section id="faq" className="py-32 bg-white text-black relative border-t border-black/[0.08]">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <Reveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-black/10 bg-[#FBF9F4] text-xs font-semibold uppercase tracking-widest text-black/70 mb-4">
            <HelpCircle size={14} className="text-black" />
            Frequently Asked Questions
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold font-heading">
            Everything you need <br />
            <span style={{ fontFamily: SERIF }} className="italic font-normal text-black/80">
              to know about Lumina.
            </span>
          </h2>
        </Reveal>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -2 }}
                className="rounded-2xl border border-black/[0.08] bg-[#FBF9F4] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-black/[0.01] transition-colors cursor-pointer"
                >
                  <span className="font-bold text-base font-heading text-black">{faq.q}</span>
                  <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center shrink-0 text-black/60 bg-white shadow-xs">
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: easeOut }}
                      className="px-6 pb-6 text-sm text-black/70 font-light leading-relaxed border-t border-black/[0.04] pt-4"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ─────────────────────────────  Final CTA Section  ─────────────────────── */

const FinalCTA = () => {
  return (
    <section className="py-32 bg-[#FBF9F4] text-black relative border-t border-black/[0.08] overflow-hidden">
      <div className="relative max-w-4xl mx-auto px-6 md:px-10 text-center z-10">
        <Reveal>
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-black/10 bg-white text-xs font-semibold uppercase tracking-widest text-black/70 mb-6 shadow-xs"
          >
            <Flame size={14} className="text-black" />
            Begin Today
          </motion.div>

          <h2 className="text-5xl sm:text-6xl font-bold font-heading tracking-tight leading-tight mb-6">
            Ready to give your ideas <br />
            <span style={{ fontFamily: SERIF }} className="italic font-normal text-black/80">
              the space they deserve?
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-black/60 font-light leading-relaxed mb-10">
            Join thousands of researchers, founders, and product teams building their knowledge
            workspace on Lumina.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={tapEffect} className="w-full sm:w-auto">
              <Link
                href="/register"
                className="w-full sm:w-auto h-14 px-10 bg-black text-white font-bold text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-3 shadow-md"
              >
                <span>Create Free Account</span>
                <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={tapEffect} className="w-full sm:w-auto">
              <Link
                href="/login"
                className="w-full sm:w-auto h-14 px-8 border border-black/15 bg-white hover:bg-black/[0.02] text-black font-semibold text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Sign In</span>
              </Link>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ─────────────────────────────  Expanded Luxury Footer  ───────────────── */

const AppFooter = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-white text-black border-t border-black/[0.08] pt-24 pb-16 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Top Newsletter & Knowledge Briefing Row */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#FBF9F4] border border-black/[0.08] mb-20 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xs">
          <div className="space-y-2 max-w-xl text-center lg:text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-black/50 font-semibold">
              KNOWLEDGE DIGEST
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-black">
              Weekly briefings on thinking, writing, & AI agents.
            </h3>
            <p className="text-black/60 text-xs sm:text-sm font-light leading-relaxed">
              Join over 24,000+ researchers, founders, and knowledge architects receiving our curated weekly essays.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {subscribed ? (
              <div className="px-6 py-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
                <Check size={16} className="text-emerald-600" />
                <span>You are subscribed to the Lumina Knowledge Digest!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-[420px]">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full h-12 px-4 rounded-xl bg-white border border-black/10 text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-black/40 transition-all shadow-2xs"
                  required
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto h-12 px-6 rounded-xl bg-black text-white font-semibold text-xs uppercase tracking-wider hover:bg-black/90 transition-all shrink-0 cursor-pointer shadow-xs"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 5-Column Extensive Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 pb-16 border-b border-black/[0.08]">

          {/* Brand Col - Spans 2 columns */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size={38} />
            <p className="text-black/60 text-xs font-light max-w-sm leading-relaxed mt-4">
              Lumina is the sovereign knowledge platform designed for deep thinkers and fast teams.
              Capture without friction. Let autonomous agents connect, synthesize, and organize your ideas.
            </p>

            <div className="pt-3 space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Global Workspace Nodes: 100% Operational</span>
              </div>
              <div className="text-[11px] font-mono text-black/40">
                SLA Guarantee: 99.999% Uptime • Zero-Knowledge Enclave
              </div>
            </div>
          </div>

          {/* Col 1 - Product & Architecture */}
          <div className="space-y-3">
            <div className="text-black font-bold uppercase tracking-wider text-[11px]">Product</div>
            <ul className="space-y-2.5 text-black/60 font-light text-xs">
              <li><a href="#morph" className="hover:text-black transition-colors">Live Morph Demo</a></li>
              <li><a href="#agents" className="hover:text-black transition-colors">Autonomous Agents</a></li>
              <li><a href="#mindmap" className="hover:text-black transition-colors">Interactive Knowledge Graph</a></li>
              <li><a href="#features" className="hover:text-black transition-colors">Instant Sub-ms Search</a></li>
              <li><a href="#pricing" className="hover:text-black transition-colors">Pricing & Provisioning</a></li>
              <li><Link href="/register" className="hover:text-black transition-colors font-medium">Create Free Workspace</Link></li>
            </ul>
          </div>

          {/* Col 2 - Agent Intelligence */}
          <div className="space-y-3">
            <div className="text-black font-bold uppercase tracking-wider text-[11px]">Agents</div>
            <ul className="space-y-2.5 text-black/60 font-light text-xs">
              <li><span className="hover:text-black transition-colors cursor-pointer">Synthesis Agent</span></li>
              <li><span className="hover:text-black transition-colors cursor-pointer">Link Discovery Agent</span></li>
              <li><span className="hover:text-black transition-colors cursor-pointer">Action Item Agent</span></li>
              <li><span className="hover:text-black transition-colors cursor-pointer">Research & Citation Agent</span></li>
              <li><span className="hover:text-black transition-colors cursor-pointer">Audio Memo Transcriber</span></li>
              <li><span className="hover:text-black transition-colors cursor-pointer">Autonomous Tag Engine</span></li>
            </ul>
          </div>

          {/* Col 3 - Formats & Security */}
          <div className="space-y-3">
            <div className="text-black font-bold uppercase tracking-wider text-[11px]">Data & Trust</div>
            <ul className="space-y-2.5 text-black/60 font-light text-xs">
              <li><span className="hover:text-black transition-colors cursor-pointer">Zero-Knowledge Policy</span></li>
              <li><span className="hover:text-black transition-colors cursor-pointer">Open Markdown Export</span></li>
              <li><span className="hover:text-black transition-colors cursor-pointer">Notion 1-Click Importer</span></li>
              <li><span className="hover:text-black transition-colors cursor-pointer">Obsidian Vault Bridge</span></li>
              <li><span className="hover:text-black transition-colors cursor-pointer">SOC2 Type II Audit</span></li>
              <li><span className="hover:text-black transition-colors cursor-pointer">GDPR Compliance Charter</span></li>
            </ul>
          </div>

          {/* Col 4 - Resources & Support */}
          <div className="space-y-3">
            <div className="text-black font-bold uppercase tracking-wider text-[11px]">Resources</div>
            <ul className="space-y-2.5 text-black/60 font-light text-xs">
              <li><a href="#faq" className="hover:text-black transition-colors">Frequently Asked Questions</a></li>
              <li><span className="hover:text-black transition-colors cursor-pointer">Markdown Syntax Guide</span></li>
              <li><span className="hover:text-black transition-colors cursor-pointer">Keyboard Shortcuts (⌘K)</span></li>
              <li><span className="hover:text-black transition-colors cursor-pointer">Architecture Manifesto</span></li>
              <li><span className="hover:text-black transition-colors cursor-pointer">Developer API Docs</span></li>
              <li><Link href="/login" className="hover:text-black transition-colors">Access Terminal</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-black/45 text-[11px]">
          <div>
            © {new Date().getFullYear()} Lumina Workspace Inc. Crafted with sovereign precision for modern thinkers.
          </div>
          <div className="flex items-center gap-6 font-medium">
            <span className="hover:text-black cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-black cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-black cursor-pointer transition-colors">Security Disclosure</span>
            <span className="hover:text-black cursor-pointer transition-colors">Status (99.999%)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ─────────────────────────────  Main Landing Export  ─────────────────── */

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FBF9F4] text-black selection:bg-black selection:text-white font-sans antialiased overflow-x-hidden">
      <Navigation />
      <main>
        <HeroSection />
        <LiveTransformationSection />
        <MindMapSection />
        <AgentsSection />
        <WorkspaceFeatures />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <AppFooter />
    </div>
  );
}

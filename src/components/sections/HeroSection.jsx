"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, BrainCircuit, Cpu, Network } from "lucide-react";
import dynamic from "next/dynamic";

const NebulaParticles = dynamic(() => import("../three/NebulaParticles"), {
  ssr: false,
  loading: () => null,
});

const FloatingBadge = ({ icon: Icon, label, className, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.7 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
    className={`absolute hidden lg:flex items-center gap-2.5 px-3 py-2 rounded-2xl bg-[#080d1e]/85 border border-[#1e2d5a] backdrop-blur-xl ${className}`}
  >
    <div className="w-7 h-7 rounded-lg bg-[#7c3aed]/15 border border-[#7c3aed]/25 flex items-center justify-center">
      <Icon size={13} className="text-[#a78bfa]" />
    </div>
    <span className="text-[11px] font-medium text-[#94a3b8] whitespace-nowrap">{label}</span>
  </motion.div>
);

const Stat = ({ value, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    className="flex flex-col items-center gap-1"
  >
    <span
      className="text-2xl font-extrabold tracking-tight"
      style={{
        background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {value}
    </span>
    <span className="text-[10px] font-semibold text-[#475569] uppercase tracking-[0.1em]">
      {label}
    </span>
  </motion.div>
);

const HeroSection = () => {
  const ref = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({ target: ref });
  const rawY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.93]);
  const y = useSpring(rawY, { stiffness: 80, damping: 22 });

  useEffect(() => {
    const onMove = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28"
    >
      {/* Grid BG */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Radial nebula glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 45%, rgba(124,58,237,0.12) 0%, rgba(37,99,235,0.07) 40%, transparent 70%)",
        }}
      />

      {/* Top line */}
      <div
        className="absolute top-0 left-[20%] right-[20%] h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(124,58,237,0.6), rgba(37,99,235,0.5), transparent)",
        }}
      />

      {/* Particles */}
      <motion.div
        style={{ y, opacity, scale }}
        className="absolute inset-0"
      >
        <NebulaParticles mouseRef={mouseRef} />
      </motion.div>

      {/* Floating badges */}
      <FloatingBadge icon={BrainCircuit} label="Neural Processing" className="top-[28%] left-[7%]" delay={1.2} />
      <FloatingBadge icon={Cpu} label="Real-time Inference" className="top-[35%] right-[6%]" delay={1.4} />
      <FloatingBadge icon={Network} label="Data Synthesis" className="bottom-[30%] left-[9%]" delay={1.6} />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1e2d5a] bg-[#0b1128]/70 backdrop-blur-xl mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] shadow-[0_0_8px_#a78bfa] animate-pulse" />
          <span className="text-[12px] font-medium text-[#94a3b8] tracking-wide">
            Xai Intelligence Platform · v2.0 is live
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(44px,7.5vw,82px)] font-extrabold leading-[1.03] tracking-[-0.03em] text-[#f1f5f9] mb-5"
        >
          Raw data becomes{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #a78bfa 0%, #60a5fa 50%, #67e8f9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            intelligence.
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="text-[clamp(16px,2.2vw,20px)] text-[#94a3b8] max-w-[560px] mx-auto leading-[1.65] mb-10"
        >
          Xai transforms unstructured data streams into structured intelligence —
          enabling decisions that were previously impossible.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="flex items-center justify-center gap-3 flex-wrap mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-7 py-3.5 rounded-[14px] bg-gradient-to-r from-[#7c3aed] to-[#2563eb] text-white text-[14px] font-semibold cursor-pointer shadow-[0_8px_32px_rgba(124,58,237,0.45)] hover:shadow-[0_12px_40px_rgba(124,58,237,0.6)] transition-shadow duration-300"
          >
            Start for free <ArrowRight size={15} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-7 py-3.5 rounded-[14px] bg-[#0b1128]/80 border border-[#1e2d5a] text-[#94a3b8] hover:text-[#f1f5f9] text-[14px] font-semibold cursor-pointer backdrop-blur-xl transition-colors duration-200"
          >
            Watch demo
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="flex items-center justify-center gap-10 pt-7 border-t border-[#111b38]"
        >
          <Stat value="10B+" label="Data Points" delay={1.1} />
          <div className="w-px h-8 bg-[#111b38]" />
          <Stat value="99.9%" label="Uptime SLA" delay={1.2} />
          <div className="w-px h-8 bg-[#111b38]" />
          <Stat value="< 50ms" label="Latency" delay={1.3} />
          <div className="w-px h-8 bg-[#111b38]" />
          <Stat value="500+" label="Enterprises" delay={1.4} />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-semibold text-[#475569] tracking-[0.12em] uppercase">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-9"
          style={{ background: "linear-gradient(to bottom, rgba(124,58,237,0.7), transparent)" }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Database, Sparkles, BarChart3, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  {
    id: "01",
    icon: Database,
    title: "Ingest Data",
    desc: "Connect any source — REST APIs, webhooks, files, or live streams. Xai ingests structured and unstructured data in real-time with zero-overhead pipelines.",
    color: "#7c3aed",
    borderActive: "border-[#7c3aed]/40",
    tagColor: "text-[#a78bfa] bg-[#7c3aed]/10 border-[#7c3aed]/20",
    tags: ["REST APIs", "Webhooks", "Streams", "Files"],
    Visual: () => (
      <div className="relative h-36 flex items-center justify-center">
        <div className="grid grid-cols-5 gap-1.5">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              viewport={{ once: true }}
              className="w-6 h-6 rounded-[6px] bg-[#7c3aed]/10 border border-[#7c3aed]/20 flex items-center justify-center"
            >
              <div className="w-1.5 h-1.5 rounded-sm bg-[#a78bfa]/50" />
            </motion.div>
          ))}
        </div>
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25">
          {[35, 70, 105].map((y, i) => (
            <motion.line
              key={i} x1="0" y1={y} x2="100%" y2={y}
              stroke="#7c3aed" strokeWidth={0.8} strokeDasharray="5 5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ delay: i * 0.2, duration: 1.2 }}
              viewport={{ once: true }}
            />
          ))}
        </svg>
      </div>
    ),
  },
  {
    id: "02",
    icon: Sparkles,
    title: "Analyze with AI",
    desc: "Multi-modal AI models process, classify, and correlate across dimensions impossible for human analysis — delivering results in milliseconds.",
    color: "#4f46e5",
    borderActive: "border-[#4f46e5]/40",
    tagColor: "text-[#818cf8] bg-[#4f46e5]/10 border-[#4f46e5]/20",
    tags: ["LLM Processing", "Classification", "Embedding", "Correlation"],
    Visual: () => {
      const nodes = [[28,30],[28,70],[28,110],[105,20],[105,60],[105,100],[105,140],[182,50],[182,100]];
      const edges = [[0,3],[0,4],[1,3],[1,4],[1,5],[2,4],[2,5],[2,6],[3,7],[4,7],[4,8],[5,7],[5,8],[6,8]];
      return (
        <div className="h-36 flex items-center justify-center">
          <svg width="210" height="160">
            {edges.map(([f, t], i) => (
              <motion.line key={i}
                x1={nodes[f][0]} y1={nodes[f][1]} x2={nodes[t][0]} y2={nodes[t][1]}
                stroke="#4f46e5" strokeWidth={0.8} strokeOpacity={0.4}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ delay: i * 0.04, duration: 0.5 }}
                viewport={{ once: true }}
              />
            ))}
            {nodes.map(([x, y], i) => (
              <motion.circle key={i} cx={x} cy={y} r={i < 3 ? 6 : i < 7 ? 7 : 9}
                fill="rgba(79,70,229,0.15)" stroke="#4f46e5" strokeWidth={1.5}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                viewport={{ once: true }}
              />
            ))}
          </svg>
        </div>
      );
    },
  },
  {
    id: "03",
    icon: BarChart3,
    title: "Generate Insight",
    desc: "Intelligence surfaces as decision-ready reports, automated alerts, and real-time dashboards — distilled from noise into clarity at scale.",
    color: "#2563eb",
    borderActive: "border-[#2563eb]/40",
    tagColor: "text-[#60a5fa] bg-[#2563eb]/10 border-[#2563eb]/20",
    tags: ["Reports", "Alerts", "Dashboards", "APIs"],
    Visual: () => (
      <div className="h-36 flex items-end gap-1.5 px-3">
        {[48, 72, 38, 90, 65, 84, 55, 96].map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-sm"
            style={{
              background: "linear-gradient(to top, rgba(37,99,235,0.75), rgba(96,165,250,0.35))",
              border: "1px solid rgba(37,99,235,0.2)",
              borderBottom: "none",
            }}
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            transition={{ delay: i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          />
        ))}
      </div>
    ),
  },
];

const StageCard = ({ stage, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-12% 0px -12% 0px" });
  const Icon = stage.icon;
  const Visual = stage.Visual;

  return (
    <motion.div
      ref={ref}
      animate={{ opacity: isInView ? 1 : 0.3, scale: isInView ? 1 : 0.95, y: isInView ? 0 : 14 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`flex-1 rounded-3xl border bg-[#0b1128] overflow-hidden relative transition-[border-color] duration-500 ${
        isInView ? stage.borderActive : "border-[#111b38]"
      }`}
    >
      {/* Top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-28 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse 80% 100% at 50% 0%, ${stage.color}18, transparent)`,
          opacity: isInView ? 1 : 0,
        }}
      />

      <div className="relative p-7">
        {/* Icon + number */}
        <div className="flex items-center justify-between mb-5">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center"
            style={{ background: `${stage.color}18`, border: `1px solid ${stage.color}30` }}
          >
            <Icon size={18} style={{ color: stage.color }} />
          </div>
          <span className="text-[42px] font-black opacity-[0.07] leading-none" style={{ color: stage.color }}>
            {stage.id}
          </span>
        </div>

        {/* Visual */}
        <div className="rounded-2xl bg-[#050816]/60 border border-[#111b38] overflow-hidden mb-5 p-3">
          <Visual />
        </div>

        <h3 className="text-[17px] font-bold text-[#f1f5f9] mb-2.5">{stage.title}</h3>
        <p className="text-[13px] text-[#94a3b8] leading-[1.65] mb-5">{stage.desc}</p>

        <div className="flex flex-wrap gap-1.5">
          {stage.tags.map((t) => (
            <span key={t} className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border ${stage.tagColor}`}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const InsightFlowSection = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(124,58,237,0.14) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-18 opacity-0">
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/05 text-[#a78bfa] text-[11px] font-semibold tracking-[0.1em] uppercase mb-5">
            Intelligence Pipeline
          </span>
          <h2 className="text-[clamp(30px,4.5vw,52px)] font-extrabold text-[#f1f5f9] tracking-[-0.025em] leading-[1.1] mb-4">
            From noise to{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #a78bfa, #60a5fa, #67e8f9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              clarity.
            </span>
          </h2>
          <p className="text-[16px] text-[#94a3b8] max-w-[460px] mx-auto leading-[1.65]">
            Three stages that transform chaos into precision intelligence.
          </p>
        </div>

        {/* Stage cards */}
        <div className="flex gap-5 items-stretch">
          {STAGES.map((stage, i) => (
            <div key={stage.id} className="flex flex-1 items-center gap-5">
              <StageCard stage={stage} index={i} />
              {i < STAGES.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.15 }}
                  className="flex-shrink-0 flex flex-col items-center gap-1"
                >
                  <div className="w-px h-5 bg-gradient-to-b from-transparent to-[#1e2d5a]" />
                  <ArrowRight size={14} className="text-[#2d3f7a]" />
                  <div className="w-px h-5 bg-gradient-to-b from-[#1e2d5a] to-transparent" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightFlowSection;
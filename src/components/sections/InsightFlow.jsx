"use client";
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Terminal, Cpu, HardDrive, Share2 } from 'lucide-react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const InsightFlow = () => {
  const triggerRef = useRef(null);
  const pathRef = useRef(null);
  const [activeStage, setActiveStage] = useState(0);

  const modules = [
    {
      id: 0,
      title: "Data Ingestion Pipeline",
      tag: "STEP 01 // INPUT",
      desc: "Capturing distributed unstructured packets via live secure webhooks.",
      icon: HardDrive,
      color: "text-blue-400",
      bgGlow: "shadow-blue-500/10"
    },
    {
      id: 1,
      title: "Neural Tokenizer Core",
      tag: "STEP 02 // ANALYZE",
      desc: "Mapping vectorized contextual attributes in an isolated environment.",
      icon: Cpu,
      color: "text-indigo-400",
      bgGlow: "shadow-indigo-500/10"
    },
    {
      id: 2,
      title: "Automated Action Dispatch",
      tag: "STEP 03 // DISPATCH",
      desc: "Synthesizing relational clusters into instantly executable triggers.",
      icon: Share2,
      color: "text-emerald-400",
      bgGlow: "shadow-emerald-500/10"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Pin the whole section for a smooth scroll duration
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top top",
        end: "+=250%",
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress;
          if (p < 0.35) setActiveStage(0);
          else if (p >= 0.35 && p < 0.7) setActiveStage(1);
          else setActiveStage(2);
        }
      });

      // 2. Animate the glowing SVG path stroke based on scroll depth
      gsap.fromTo(pathRef.current, 
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "+=250%",
            scrub: 0.5,
          }
        }
      );
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={triggerRef} className="w-full h-screen bg-[#09090b] flex flex-col justify-center items-center px-6 relative overflow-hidden border-t border-zinc-900">
      
      {/* Upper Meta Branding */}
      <div className="absolute top-12 left-12 hidden md:block">
        <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-500 tracking-wider">
          <Terminal className="h-3.5 w-3.5 text-zinc-600" />
          <span>SYSTEM_PIPELINE_ORCHESTRATOR // ACTIVE</span>
        </div>
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full max-h-[600px] relative">
        
        {/* LEFT COLUMN: Clean descriptive cards shifting layout highlights dynamically */}
        <div className="lg:col-span-5 space-y-4 z-10">
          {modules.map((mod, i) => {
            const IconComponent = mod.icon;
            const isSelected = activeStage === i;

            return (
              <div
                key={mod.id}
                className={`p-6 rounded-xl border transition-all duration-500 bg-[#0d0d0f]/90 ${
                  isSelected 
                    ? `border-zinc-700 bg-zinc-900/40 translate-x-2 shadow-xl ${mod.bgGlow}` 
                    : 'border-zinc-900 opacity-30 translate-x-0'
                }`}
              >
                <span className={`font-mono text-[9px] tracking-widest block font-medium ${mod.color}`}>
                  {mod.tag}
                </span>
                <div className="flex items-center gap-3 mt-2">
                  <IconComponent className={`h-5 w-5 ${mod.color}`} />
                  <h3 className="text-lg font-medium text-zinc-200 tracking-tight">
                    {mod.title}
                  </h3>
                </div>
                <p className="text-zinc-400 text-xs mt-2 leading-relaxed">
                  {mod.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* RIGHT COLUMN: The Interactive Schematic Central Network System */}
        <div className="lg:col-span-7 h-full w-full flex items-center justify-center relative min-h-[350px] lg:min-h-0">
          
          {/* Static Background Blueprint Grid */}
          <div className="absolute inset-0 border border-zinc-900/60 bg-[linear-gradient(to_right,#141416_1px,transparent_1px),linear-gradient(to_bottom,#141416_1px,transparent_1px)] bg-[size:24px_24px] rounded-2xl pointer-events-none" />

          {/* Dynamic Interactive SVG Laser Paths */}
          <svg className="absolute w-full h-full p-8 overflow-visible z-0" viewBox="0 0 600 400" fill="none">
            {/* Base Background Path */}
            <path 
              d="M 50,200 C 150,200 150,80 280,80 C 400,80 420,200 550,200 M 280,80 C 400,80 420,320 550,320" 
              className="stroke-zinc-800/40" 
              strokeWidth="2" 
            />
            {/* The Animating Foreground Data Flow Stream */}
            <path 
              ref={pathRef}
              d="M 50,200 C 150,200 150,80 280,80 C 400,80 420,200 550,200 M 280,80 C 400,80 420,320 550,320" 
              className="stroke-blue-500" 
              strokeWidth="2.5" 
              strokeDasharray="1000"
              strokeDashoffset="1000"
              strokeLinecap="round"
            />
          </svg>

          {/* Node 1: Input Hub */}
          <div className={`absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-xl border bg-[#09090b] transition-all duration-300 z-10 ${
            activeStage === 0 ? 'border-blue-500 shadow-lg shadow-blue-500/20 scale-105' : 'border-zinc-800 scale-100'
          }`}>
            <HardDrive className={`h-6 w-6 ${activeStage === 0 ? 'text-blue-400' : 'text-zinc-600'}`} />
          </div>

          {/* Node 2: Centered Processing Core */}
          <div className={`absolute left-1/2 top-[80px] -translate-x-1/2 -translate-y-1/2 p-5 rounded-xl border bg-[#09090b] transition-all duration-300 z-10 ${
            activeStage === 1 ? 'border-indigo-500 shadow-lg shadow-indigo-500/20 scale-110' : 'border-zinc-800 scale-100'
          }`}>
            <Cpu className={`h-7 w-7 ${activeStage === 1 ? 'text-indigo-400 animate-spin-slow' : 'text-zinc-600'}`} />
          </div>

          {/* Node 3 & 4: Split Outcome Terminal Points */}
          <div className="absolute right-4 top-[80px] -translate-y-1/2 flex flex-col items-center gap-1 z-10">
            <div className={`p-4 rounded-xl border bg-[#09090b] transition-all duration-300 ${
              activeStage === 2 ? 'border-emerald-500 shadow-lg shadow-emerald-500/20 scale-105' : 'border-zinc-800'
            }`}>
              <Share2 className={`h-6 w-6 ${activeStage === 2 ? 'text-emerald-400' : 'text-zinc-600'}`} />
            </div>
            <span className="text-[8px] font-mono text-zinc-600">ENDPOINT_A</span>
          </div>

          <div className="absolute right-4 top-[320px] -translate-y-1/2 flex flex-col items-center gap-1 z-10">
            <div className={`p-4 rounded-xl border bg-[#09090b] transition-all duration-300 ${
              activeStage === 2 ? 'border-emerald-500 shadow-lg shadow-emerald-500/20 scale-105' : 'border-zinc-800'
            }`}>
              <Share2 className={`h-6 w-6 ${activeStage === 2 ? 'text-emerald-400' : 'text-zinc-600'}`} />
            </div>
            <span className="text-[8px] font-mono text-zinc-600">ENDPOINT_B</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InsightFlow;
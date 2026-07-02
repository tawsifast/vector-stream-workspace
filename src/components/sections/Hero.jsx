"use client";
import React from 'react';
import { motion } from 'framer-motion';
import HeroParticles from '../canvas/HeroParticles';


const Hero = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 bg-[#09090b]">
      <HeroParticles />

      <div className="relative z-10 max-w-4xl text-center flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/60 backdrop-blur-md mb-6"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[11px] font-mono tracking-wider text-zinc-400 uppercase">Introducing Workspace v1.0</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-semibold tracking-tight text-zinc-100 max-w-3xl leading-[1.15]"
        >
          Turn Raw Data Into <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-zinc-500">
            Structured Intelligence.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-zinc-400 text-sm md:text-base mt-6 max-w-xl leading-relaxed"
        >
          Xai transforms unorganized data pools into highly actionable, automated execution workflows tailored for business operations.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center gap-4 mt-10"
        >
          <button className="px-5 py-2.5 text-xs font-medium text-black bg-zinc-100 hover:bg-zinc-200 transition-colors duration-200 rounded-lg shadow-md shadow-black/40">
            Enter Workspace
          </button>
          <button className="px-5 py-2.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/80 transition-all duration-200 rounded-lg">
            Read Docs
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#09090b] to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
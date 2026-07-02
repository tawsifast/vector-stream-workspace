"use client";
import React, { useState } from 'react';

import { ShieldCheck, RefreshCw } from 'lucide-react';
import MorphingNodes from '../canvas/MorphingNodes';

const SignatureInteraction = () => {
  const [shape, setShape] = useState('grid');

  const toggleShape = () => {
    setShape((prev) => (prev === 'grid' ? 'sphere' : 'grid'));
  };

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center py-24 px-4 bg-[#09090b] border-t border-zinc-900">
      <div className="max-w-4xl w-full text-center space-y-4">
        <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase bg-purple-500/10 px-3 py-1 rounded-full">
          Section 4 // Signature Morphing Mechanics
        </span>
        
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100">
          The Network Restructuring Engine
        </h2>
        
        <p className="text-zinc-400 text-sm max-w-lg mx-auto">
          Click the optimization matrix trigger below to see how Xai consolidates volatile data parameters back into clean structures.
        </p>

        <div className="relative w-full max-w-xl mx-auto border border-zinc-800 bg-[#0d0d0f]/60 backdrop-blur-md rounded-2xl p-6 mt-8 shadow-2xl overflow-hidden">
          <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] font-mono text-zinc-500">
            <ShieldCheck className="h-3 w-3 text-purple-400" />
            <span>State Matrix: {shape.toUpperCase()}</span>
          </div>

          <MorphingNodes currentShape={shape} />

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <button
              onClick={toggleShape}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-mono font-medium text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 active:scale-95 transition-all duration-200 rounded-lg shadow-xl"
            >
              <RefreshCw className={`h-3 w-3 text-blue-400 ${shape === 'grid' ? 'rotate-180' : 'rotate-0'} transition-transform duration-500`} />
              Reorganize Clusters
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignatureInteraction;
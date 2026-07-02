"use client";
import React, { useState } from 'react';
import { LayoutDashboard, Database, Cpu, Sliders, Terminal } from 'lucide-react';

const DashboardPreview = () => {
  const [activeTab, setActiveTab] = useState('insights');

  const metrics = [
    { label: "Data Ingestion Rate", value: "4.2 GB/s", status: "+12%" },
    { label: "AI Model Latency", value: "14ms", status: "Optimal" },
    { label: "Automation Accuracy", value: "99.8%", status: "Stable" }
  ];

  return (
    <section className="min-h-screen w-full flex items-center justify-center py-24 px-4 bg-[#09090b] border-t border-zinc-800">
      <div className="max-w-6xl w-full">
        <div className="mb-12 text-center md:text-left">
          <span className="text-xs font-mono text-blue-500 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full">
            Phase 3 // Live Engine Preview
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-4 text-zinc-100">
            Intelligence Workspace
          </h2>
          <p className="text-zinc-400 mt-2 max-w-xl">
            A unified, low-latency control center transforming unstructured clusters into operational automation.
          </p>
        </div>

        <div className="w-full h-[600px] bg-[#121214] border border-zinc-800 rounded-xl flex overflow-hidden shadow-2xl shadow-black/80">
          <aside className="w-64 border-r border-zinc-800 bg-[#0d0d0f] p-4 flex flex-col justify-between hidden md:flex">
            <div className="space-y-6">
              <div className="flex items-center gap-2 px-2 py-1">
                <div className="h-6 w-6 rounded bg-blue-500 flex items-center justify-center font-bold text-xs text-black">X</div>
                <span className="font-medium text-sm tracking-tight text-zinc-200">Xai Workspace</span>
              </div>
              
              <nav className="space-y-1">
                {[
                  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                  { id: 'sources', label: 'Data Sources', icon: Database },
                  { id: 'insights', label: 'AI Insights', icon: Cpu },
                  { id: 'automations', label: 'Automations', icon: Sliders },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
                        activeTab === item.id 
                          ? 'bg-zinc-800 text-white' 
                          : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="border-t border-zinc-800 pt-4 flex items-center gap-2 px-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase">System Live</span>
            </div>
          </aside>

          <main className="flex-1 bg-[#121214] flex flex-col overflow-hidden">
            <header className="h-14 border-b border-zinc-800 flex items-center justify-between px-6 bg-[#0d0d0f]/50">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <Terminal className="h-3.5 w-3.5 text-blue-400" />
                <span>root/workspace/{activeTab}</span>
              </div>
            </header>

            <div className="p-6 flex-1 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {metrics.map((metric, idx) => (
                  <div key={idx} className="bg-[#161619] border border-zinc-800/80 p-4 rounded-xl">
                    <p className="text-[11px] font-medium text-zinc-400 tracking-wide">{metric.label}</p>
                    <div className="flex items-baseline justify-between mt-2">
                      <span className="text-2xl font-semibold tracking-tight text-zinc-100">{metric.value}</span>
                      <span className={`text-[10px] font-mono font-medium px-1.5 py-0.5 rounded ${
                        metric.status === 'Optimal' || metric.status.startsWith('+') 
                          ? 'text-emerald-400 bg-emerald-500/10' 
                          : 'text-blue-400 bg-blue-500/10'
                      }`}>{metric.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-64 border border-zinc-800/60 bg-[#161619]/40 rounded-xl p-6 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
                <div>
                  <h3 className="text-sm font-medium text-zinc-200 capitalize">{activeTab} Stream Analysis</h3>
                  <p className="text-xs text-zinc-500 mt-1">Real-time vector token cluster state updates.</p>
                </div>

                <div className="w-full flex items-end justify-between h-32 pt-4 gap-2">
                  {[40, 55, 45, 60, 75, 50, 65, 80, 95, 70, 85, 100].map((height, i) => (
                    <div key={i} className="flex-1 bg-zinc-800 hover:bg-blue-500/40 rounded-sm transition-colors duration-200 group relative" style={{ height: `${height}%` }}>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-zinc-900 border border-zinc-700 text-[9px] font-mono px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-zinc-200">
                        {height}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  LayoutDashboard,
  Database,
  Sparkles,
  BarChart3,
  Settings,
  Search,
  TrendingUp,
  TrendingDown,
  Activity,
  Users,
  Zap,
  ArrowUpRight,
  Bell,
} from "lucide-react";

const NAV = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: Database, label: "Data Sources" },
  { icon: Sparkles, label: "AI Models" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Activity, label: "Monitoring" },
  { icon: Settings, label: "Settings" },
];

const METRICS = [
  {
    title: "Data Processed",
    value: "2.4 TB",
    change: "+12.5%",
    up: true,
    icon: Database,
    textColor: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    title: "AI Inferences",
    value: "847K",
    change: "+28.3%",
    up: true,
    icon: Sparkles,
    textColor: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
  },
  {
    title: "Active Pipelines",
    value: "24",
    change: "-2.1%",
    up: false,
    icon: Zap,
    textColor: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Team Members",
    value: "128",
    change: "+4.0%",
    up: true,
    icon: Users,
    textColor: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
];

const TAB_DATA = {
  models: [
    { name: "Customer Sentiment", type: "NLP", status: "Running", acc: 98.2, tput: "14.2K/s" },
    { name: "Market Signals", type: "Time Series", status: "Running", acc: 94.7, tput: "8.9K/s" },
    { name: "Risk Assessment", type: "Classification", status: "Queued", acc: 91.3, tput: "—" },
    { name: "Demand Forecast", type: "Regression", status: "Running", acc: 89.6, tput: "6.1K/s" },
    { name: "Anomaly Detection", type: "Clustering", status: "Paused", acc: 95.8, tput: "—" },
  ],
  performance: [
    { name: "Real-time Bidding", type: "RL", status: "Running", acc: 99.1, tput: "45.0K/s" },
    { name: "Search Ranking", type: "Ranking", status: "Running", acc: 93.4, tput: "32.1K/s" },
    { name: "Image Tagging", type: "CV", status: "Paused", acc: 96.5, tput: "—" },
  ],
  alerts: [
    { name: "Fraud Detection Peak", type: "Anomalies", status: "Queued", acc: 97.8, tput: "—" },
    { name: "Data Drift Alert", type: "Monitoring", status: "Paused", acc: 84.2, tput: "—" },
  ],
};

const CHART = [38, 54, 42, 70, 62, 84, 73, 91, 80, 96, 88, 100];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const getStatusClass = (status) => {
  if (status === "Running") return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  if (status === "Queued") return "bg-amber-500/10 text-amber-400 border-amber-500/20";
  return "bg-slate-800/50 text-slate-500 border-slate-700/50";
};

const BarChart = ({ isInView }) => {
  const max = Math.max(...CHART);
  return (
    <div className="flex items-end gap-1 h-[90px] px-1">
      {CHART.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full">
          <div className="flex-1 flex items-end w-full">
            <motion.div
              className="w-full rounded-t-[3px] bg-gradient-to-t from-purple-600 to-purple-400/40"
              style={{ opacity: 0.4 + (v / max) * 0.6 }}
              initial={{ height: 0 }}
              animate={isInView ? { height: `${(v / max) * 100}%` } : {}}
              transition={{
                delay: i * 0.055,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </div>
          {i % 3 === 0 && <span className="text-[8px] text-slate-500">{MONTHS[i]}</span>}
        </div>
      ))}
    </div>
  );
};

const DashboardSection = () => {
  const [tab, setTab] = useState("models");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const activeRows = TAB_DATA[tab] || [];

  return (
    <section className="relative py-32 overflow-hidden bg-slate-950 text-slate-200" style={{ zIndex: 1 }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(79,70,229,0.06)_0%,transparent_70%)]" />

      <div className="relative max-w-[1240px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-indigo-400 text-[11px] font-600 tracking-widest uppercase mb-5">
            Intelligence Dashboard
          </span>
          <h2 className="text-[clamp(32px,5vw,52px)] font-extrabold text-white tracking-tight leading-none mb-4">
            Everything in{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              one workspace.
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-[440px] mx-auto leading-relaxed">
            A unified command center for your intelligence operations.
          </p>
        </motion.div>

        {/* Dashboard frame */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-slate-800 bg-slate-900/50 overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.7)]"
          style={{ zIndex: 10 }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800/60">
            <div className="flex items-center gap-2.5">
              <div className="flex gap-1.5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                ))}
              </div>
              <span className="text-[11px] text-slate-500 font-mono">xai.intelligence.workspace</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950 border border-slate-800/60">
                <Search size={11} className="text-slate-500" />
                <span className="text-[11px] text-slate-500">Search...</span>
              </div>
              <Bell size={14} className="text-slate-500" />
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-600 to-blue-600" />
            </div>
          </div>

          {/* Body */}
          <div className="flex h-[520px]">
            {/* Sidebar */}
            <div className="w-[210px] border-r border-slate-800/60 p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 px-2 py-0.5 mb-7">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-[0_4px_12px_rgba(124,58,237,0.35)]">
                    <Zap size={13} className="text-white fill-white" />
                  </div>
                  <span className="text-sm font-bold text-white">Xai</span>
                </div>

                <nav className="flex flex-col gap-1">
                  {NAV.map(({ icon: Icon, label, active }) => (
                    <div
                      key={label}
                      className={
                        active
                          ? "flex items-center gap-2.5 px-3 py-2 rounded-xl border bg-purple-600/10 border-purple-500/20 text-purple-400"
                          : "flex items-center gap-2.5 px-3 py-2 rounded-xl border bg-transparent border-transparent text-slate-500 hover:text-slate-300"
                      }
                    >
                      <Icon size={15} />
                      <span className="text-xs font-medium">{label}</span>
                      {active && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_6px_#a78bfa]" />
                      )}
                    </div>
                  ))}
                </nav>
              </div>

              <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-600/5 to-blue-600/5 border border-purple-500/15">
                <p className="text-[10px] text-slate-400 font-semibold mb-2">Pro Plan · 68% used</p>
                <div className="w-full h-1 rounded-full bg-slate-800">
                  <div className="w-[68%] h-full rounded-full bg-gradient-to-r from-purple-600 to-blue-500" />
                </div>
              </div>
            </div>

            {/* Main panel */}
            <div className="flex-1 p-5 overflow-y-auto">
              {/* Metric cards */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                {METRICS.map(({ title, value, change, up, icon: Icon, textColor, bgColor }) => (
                  <div
                    key={title}
                    className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800/60"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-8 h-8 rounded-xl ${bgColor} flex items-center justify-center`}>
                        <Icon size={14} className={textColor} />
                      </div>
                      <div className={`flex items-center gap-0.5 text-[10px] font-bold ${up ? "text-emerald-400" : "text-rose-400"}`}>
                        {up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                        {change}
                      </div>
                    </div>
                    <div className="text-2xl font-extrabold text-white tracking-tight">{value}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{title}</div>
                  </div>
                ))}
              </div>

              {/* Chart + Table */}
              <div className="grid grid-cols-[2fr_3fr] gap-3">
                {/* Chart */}
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800/60">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-xs font-bold text-white">Processing Volume</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">Last 12 months</p>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5">
                      <ArrowUpRight size={11} /> 34.2%
                    </span>
                  </div>
                  <BarChart isInView={isInView} />
                </div>

                {/* Table */}
                <div className="rounded-2xl bg-slate-900 border border-slate-800/60 overflow-hidden">
                  <div className="flex items-center gap-2.5 px-4 py-3 border-b border-slate-800/60">
                    <p className="text-xs font-bold text-white flex-1">Active Models</p>
                    
                    {/* Fixed explicit button handling for Tailwind builds */}
                    <button
                      type="button"
                      onClick={() => setTab("models")}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold capitalize border cursor-pointer select-none relative z-30 ${
                        tab === "models"
                          ? "bg-purple-600/10 border-purple-500/30 text-purple-400"
                          : "bg-transparent border-transparent text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      Models
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setTab("performance")}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold capitalize border cursor-pointer select-none relative z-30 ${
                        tab === "performance"
                          ? "bg-purple-600/10 border-purple-500/30 text-purple-400"
                          : "bg-transparent border-transparent text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      Performance
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setTab("alerts")}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold capitalize border cursor-pointer select-none relative z-30 ${
                        tab === "alerts"
                          ? "bg-purple-600/10 border-purple-500/30 text-purple-400"
                          : "bg-transparent border-transparent text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      Alerts
                    </button>
                  </div>
                  
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800/60">
                        {["Model", "Type", "Status", "Accuracy", "Throughput"].map((h) => (
                          <th key={h} className="px-3 py-2 text-left text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {activeRows.map((row) => (
                        <tr
                          key={row.name}
                          className="border-b border-slate-800/60 last:border-b-0"
                        >
                          <td className="px-3 py-2.5 text-xs font-semibold text-white">{row.name}</td>
                          <td className="px-3 py-2.5 text-[10px] text-slate-500">{row.type}</td>
                          <td className="px-3 py-2.5">
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getStatusClass(row.status)}`}>
                              {row.status}
                            </span>
                          </td>
                          <td className="px-3 py-2.5">
                            <div className="flex items-center gap-1.5">
                              <div className="flex-1 h-1 rounded-full bg-slate-800 min-w-[50px]">
                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-purple-600 to-blue-400"
                                  style={{ width: `${row.acc}%` }}
                                />
                              </div>
                              <span className="text-[10px] text-slate-400 min-w-[32px] text-right">{row.acc}%</span>
                            </div>
                          </td>
                          <td className="px-3 py-2.5 text-[10px] text-slate-400 font-mono">{row.tput}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardSection;
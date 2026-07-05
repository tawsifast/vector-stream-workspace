"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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
  HardDrive,
  Cpu,
  AlertTriangle,
} from "lucide-react";

const NAV = [
  { icon: LayoutDashboard, label: "Overview" },
  { icon: Database, label: "Data Sources" },
  { icon: Sparkles, label: "AI Models" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Activity, label: "Monitoring" },
  { icon: Settings, label: "Settings" },
];

// Dynamic Dashboard Views Content Map
const VIEW_DATA = {
  Overview: {
    metrics: [
      { title: "Data Processed", value: "2.4 TB", change: "+12.5%", up: true, icon: Database, color: "#7c3aed" },
      { title: "AI Inferences", value: "847K", change: "+28.3%", up: true, icon: Sparkles, color: "#4f46e5" },
      { title: "Active Pipelines", value: "24", change: "-2.1%", up: false, icon: Zap, color: "#2563eb" },
      { title: "Team Members", value: "128", change: "+4.0%", up: true, icon: Users, color: "#06b6d4" },
    ],
    chartTitle: "Processing Volume",
    tabs: [
      { key: "models", label: "Models" },
      { key: "performance", label: "Performance" },
      { key: "alerts", label: "Alerts" },
    ],
    tableData: {
      models: [
        { name: "Customer Sentiment", type: "NLP", status: "Running", acc: 98.2, tput: "14.2K/s" },
        { name: "Market Signals", type: "Time Series", status: "Running", acc: 94.7, tput: "8.9K/s" },
        { name: "Risk Assessment", type: "Classification", status: "Queued", acc: 91.3, tput: "—" },
      ],
      performance: [
        { name: "Real-time Bidding", type: "RL", status: "Running", acc: 99.1, tput: "45.0K/s" },
        { name: "Search Ranking", type: "Ranking", status: "Running", acc: 93.4, tput: "32.1K/s" },
      ],
      alerts: [{ name: "Fraud Peak", type: "Anomalies", status: "Queued", acc: 97.8, tput: "—" }],
    }
  },
  "Data Sources": {
    metrics: [
      { title: "Total Connectors", value: "12 Active", change: "Stable", up: true, icon: HardDrive, color: "#06b6d4" },
      { title: "Sync Success Rate", value: "99.94%", change: "+0.02%", up: true, icon: Activity, color: "#10b981" },
      { title: "Queued Payloads", value: "0", change: "Optimal", up: true, icon: Zap, color: "#f59e0b" },
      { title: "Bandwidth Cost", value: "$412/mo", change: "-8.4%", up: true, icon: Settings, color: "#6366f1" },
    ],
    chartTitle: "Ingestion Rate (GB/s)",
    tabs: [
      { key: "production", label: "Production" },
      { key: "staging", label: "Staging" },
    ],
    tableData: {
      production: [
        { name: "S3 Event Stream", type: "Object Storage", status: "Running", acc: 100, tput: "850MB/s" },
        { name: "PostgreSQL Replica", type: "Database", status: "Running", acc: 99.9, tput: "45K QPS" },
      ],
      staging: [
        { name: "Kafka Mock Feed", type: "Message Broker", status: "Paused", acc: 0, tput: "—" },
      ]
    }
  },
  "AI Models": {
    metrics: [
      { title: "Loaded Weights", value: "8 Models", change: "+2 New", up: true, icon: Cpu, color: "#a855f7" },
      { title: "Avg Latency", value: "14.2ms", change: "-3.1ms", up: true, icon: Activity, color: "#10b981" },
      { title: "VRAM Allocation", value: "88.4%", change: "+4.2%", up: false, icon: Settings, color: "#ef4444" },
      { title: "Model Drift Score", value: "0.02", change: "None", up: true, icon: AlertTriangle, color: "#f59e0b" },
    ],
    chartTitle: "Inference Volume Breakdown",
    tabs: [
      { key: "active_inference", label: "Active Nodes" },
    ],
    tableData: {
      active_inference: [
        { name: "LLaMA-3 FineTune", type: "Generative", status: "Running", acc: 94.2, tput: "85 t/s" },
        { name: "ResNet Visual Core", type: "Computer Vision", status: "Running", acc: 97.6, tput: "410 img/s" },
      ]
    }
  }
};

const CHART = [38, 54, 42, 70, 62, 84, 73, 91, 80, 96, 88, 100];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const statusStyle = (s) =>
  ({
    Running: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Queued: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Paused: "bg-[#1e2d5a]/40 text-[#475569] border-[#1e2d5a]/30",
  })[s] ?? "bg-[#1e2d5a]/40 text-[#475569] border-[#1e2d5a]/30";

const BarChart = ({ isInView }) => {
  const max = Math.max(...CHART);
  return (
    <div className="flex items-end gap-1 h-[88px] px-1">
      {CHART.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full">
          <div className="flex-1 flex items-end w-full">
            <motion.div
              className="w-full rounded-t-sm"
              style={{
                background: "linear-gradient(to top, #7c3aed, rgba(167,139,250,0.35))",
                opacity: 0.35 + (v / max) * 0.65,
              }}
              initial={{ height: 0 }}
              animate={isInView ? { height: `${(v / max) * 100}%` } : { height: 0 }}
              transition={{ delay: i * 0.05, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          {i % 3 === 0 && <span className="text-[8px] text-[#475569]">{MONTHS[i]}</span>}
        </div>
      ))}
    </div>
  );
};

const TableRows = ({ rows = [] }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={rows.map((r) => r.name).join(",")}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-[#111b38]">
            {["Identity Grid", "Type Class", "Status Status", "Metric / Accuracy", "Capacity"].map((h) => (
              <th key={h} className="px-3 py-2.5 text-left text-[9px] font-bold text-[#475569] uppercase tracking-wider">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-b border-[#0d1230] last:border-b-0 hover:bg-[#0e1535]/40 transition-colors">
              <td className="px-3 py-2.5 text-[11px] font-semibold text-[#f1f5f9]">{row.name}</td>
              <td className="px-3 py-2.5 text-[10px] text-[#475569]">{row.type}</td>
              <td className="px-3 py-2.5">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${statusStyle(row.status)}`}>
                  {row.status}
                </span>
              </td>
              <td className="px-3 py-2.5">
                <div className="flex items-center gap-1.5">
                  <div className="flex-1 h-1 rounded-full bg-[#111b38] min-w-[44px]">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#7c3aed] to-[#60a5fa]" style={{ width: `${row.acc}%` }} />
                  </div>
                  <span className="text-[10px] text-[#94a3b8] min-w-[30px] text-right">{row.acc}%</span>
                </div>
              </td>
              <td className="px-3 py-2.5 text-[10px] text-[#94a3b8] font-mono">{row.tput}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  </AnimatePresence>
);

const DashboardSection = () => {
  const [activeNav, setActiveNav] = useState("Overview");
  
  // Fallback cleanly to 'Overview' configuration structural keys if non-mapped route selected
  const activeConfig = VIEW_DATA[activeNav] || VIEW_DATA["Overview"];
  
  // Track current table sub-tabs based on chosen view config layout map setup
  const [tab, setTab] = useState(activeConfig.tabs[0]?.key || "models");

  const frameRef = useRef(null);
  const isInView = useInView(frameRef, { once: true, margin: "-80px" });

  const handleNavSwitch = (label) => {
    setActiveNav(label);
    const targetConfig = VIEW_DATA[label] || VIEW_DATA["Overview"];
    setTab(targetConfig.tabs[0]?.key);
  };

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(79,70,229,0.06) 0%, transparent 70%)" }} />

      <div className="relative max-w-[1240px] mx-auto px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full border border-[#4f46e5]/30 bg-[#4f46e5]/05 text-[#818cf8] text-[11px] font-semibold tracking-widest uppercase mb-5">
            Intelligence Control Command
          </span>
          <h2 className="text-[clamp(32px,5vw,52px)] font-extrabold text-[#f1f5f9] tracking-tight leading-none mb-4">
            Everything in <span style={{ background: "linear-gradient(135deg, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>one workspace.</span>
          </h2>
          <p className="text-[17px] text-[#94a3b8] max-w-[440px] mx-auto leading-relaxed">
            Active Workspace Node: {activeNav} Reporting Mode.
          </p>
        </motion.div>

        {/* Dashboard frame */}
        <motion.div ref={frameRef} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15, duration: 0.75, ease: [0.22, 1, 0.36, 1] }} className="rounded-3xl border border-[#1e2d5a] bg-[#080d1e] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.65)]">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#111b38]">
            <div className="flex items-center gap-2.5">
              <div className="flex gap-1.5">{[0, 1, 2].map((i) => <div key={i} className="w-2.5 h-2.5 rounded-full bg-[#1e2d5a]" />)}</div>
              <span className="text-[11px] text-[#475569] font-mono">xai.{activeNav.toLowerCase().replace(" ", "")}.workspace</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0b1128] border border-[#111b38]">
                <Search size={11} className="text-[#475569]" />
                <span className="text-[11px] text-[#475569]">Search node configuration...</span>
              </div>
              <Bell size={14} className="text-[#475569]" />
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#2563eb]" />
            </div>
          </div>

          {/* Body layout */}
          <div className="flex h-[520px]">
            {/* Sidebar Router Component */}
            <div className="w-[210px] border-r border-[#111b38] p-4 flex flex-col gap-6">
              <div className="flex items-center gap-2 px-2">
                <div className="w-7 h-7 rounded-[9px] bg-gradient-to-br from-[#7c3aed] to-[#2563eb] flex items-center justify-center shadow-[0_4px_12px_rgba(124,58,237,0.4)]">
                  <Zap size={13} className="text-white fill-white" />
                </div>
                <span className="text-[14px] font-bold text-[#f1f5f9]">Xai Base</span>
              </div>
              
              <nav className="flex flex-col gap-1 flex-1">
                {NAV.map(({ icon: Icon, label }) => {
                  const isActive = activeNav === label;
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => handleNavSwitch(label)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl border transition-all duration-200 text-left cursor-pointer ${
                        isActive
                          ? "bg-[#7c3aed]/10 border-[#7c3aed]/20 text-[#a78bfa]"
                          : "bg-transparent border-transparent text-[#475569] hover:text-[#94a3b8] hover:bg-[#0b1128]"
                      }`}
                    >
                      <Icon size={15} />
                      <span className="text-xs font-medium">{label}</span>
                      {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#a78bfa] shadow-[0_0_6px_#a78bfa]" />}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Dynamic View Workspace Grid */}
            <div className="flex-1 p-5 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div key={activeNav} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                  
                  {/* Performance Metric Cards Block */}
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {activeConfig.metrics.map(({ title, value, change, up, icon: Icon, color }, i) => (
                      <div key={title} className="p-3.5 rounded-2xl bg-[#0b1128] border border-[#111b38]">
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${color}18` }}>
                            <Icon size={14} style={{ color }} />
                          </div>
                          <div className={`flex items-center gap-0.5 text-[10px] font-bold ${up ? "text-emerald-400" : "text-rose-400"}`}>
                            {up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                            {change}
                          </div>
                        </div>
                        <div className="text-xl font-extrabold text-[#f1f5f9] tracking-tight">{value}</div>
                        <div className="text-[10px] text-[#475569] mt-0.5">{title}</div>
                      </div>
                    ))}
                  </div>

                  {/* Chart + Selected Matrix Output Table Component */}
                  <div className="grid grid-cols-[2fr_3fr] gap-3">
                    <div className="p-3.5 rounded-2xl bg-[#0b1128] border border-[#111b38]">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="text-xs font-bold text-[#f1f5f9]">{activeConfig.chartTitle}</p>
                          <p className="text-[10px] text-[#475569] mt-0.5">Realtime Infrastructure Stream</p>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5">
                          <ArrowUpRight size={11} /> Live Telemetry
                        </span>
                      </div>
                      <BarChart isInView={isInView} />
                    </div>

                    {/* Table View panel */}
                    <div className="rounded-2xl bg-[#0b1128] border border-[#111b38] overflow-hidden flex flex-col">
                      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#111b38] flex-shrink-0">
                        <p className="text-xs font-bold text-[#f1f5f9] flex-1">Active Topology</p>
                        <div className="flex items-center gap-1.5">
                          {activeConfig.tabs.map(({ key, label }) => (
                            <button
                              key={key}
                              type="button"
                              onClick={() => setTab(key)}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border transition-all duration-200 select-none ${
                                tab === key
                                  ? "bg-[#7c3aed]/15 border-[#7c3aed]/30 text-[#a78bfa]"
                                  : "bg-transparent border-transparent text-[#475569] hover:text-[#94a3b8]"
                              }`}
                              style={{ cursor: "pointer" }}
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex-1 overflow-auto">
                        <TableRows rows={activeConfig.tableData[tab] || []} />
                      </div>
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardSection;
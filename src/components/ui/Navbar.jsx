"use client";

import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";

const NAV_LINKS = ["Product", "Intelligence", "Pricing", "Docs"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (y) => setScrolled(y > 40));
  }, [scrollY]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 pt-5"
    >
      <div
        className={`flex items-center justify-between w-full max-w-6xl px-5 py-3 rounded-2xl transition-all duration-500 ${
          scrolled
            ? "bg-[#080d1e]/90 backdrop-blur-2xl border border-[#1e2d5a]"
            : "bg-transparent border border-transparent"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-[#7c3aed] to-[#2563eb] flex items-center justify-center shadow-[0_4px_16px_rgba(124,58,237,0.4)]">
            <Zap size={15} className="text-white fill-white" />
          </div>
          <span className="text-[15px] font-bold text-[#f1f5f9] tracking-wide">
            X<span className="text-[#a78bfa]">ai</span>
          </span>
        </div>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-[13px] font-medium text-[#94a3b8] hover:text-[#f1f5f9] transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden md:block text-[13px] font-medium text-[#94a3b8] hover:text-[#f1f5f9] transition-colors duration-200"
          >
            Sign in
          </a>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#2563eb] text-white text-[13px] font-semibold cursor-pointer shadow-[0_4px_20px_rgba(124,58,237,0.4)] hover:shadow-[0_6px_28px_rgba(124,58,237,0.55)] transition-shadow duration-300"
          >
            Get Started
            <ArrowRight size={13} />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
"use client";

import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";
import { colors } from "../../lib/theme";

const NAV_LINKS = ["Product", "Intelligence", "Pricing", "Docs"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => scrollY.on("change", (y) => setScrolled(y > 40)), [scrollY]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "center",
        padding: "20px 24px 0",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "1200px",
          padding: "10px 20px",
          borderRadius: "20px",
          border: `1px solid ${scrolled ? colors.border.default : "transparent"}`,
          background: scrolled ? "rgba(8, 13, 30, 0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          transition: "all 0.4s ease",
          boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.4)" : "none",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: "linear-gradient(135deg, #7c3aed, #2563eb)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 16px rgba(124,58,237,0.4)",
            }}
          >
            <Zap size={16} color="white" fill="white" />
          </div>
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: colors.text.primary,
              letterSpacing: "0.02em",
            }}
          >
            X<span style={{ color: "#a78bfa" }}>ai</span>
          </span>
        </div>

        {/* Nav Links */}
        <nav style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: colors.text.secondary,
                textDecoration: "none",
                letterSpacing: "0.01em",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = colors.text.primary)}
              onMouseLeave={(e) => (e.target.style.color = colors.text.secondary)}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a
            href="#"
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: colors.text.secondary,
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.color = colors.text.primary)}
            onMouseLeave={(e) => (e.target.style.color = colors.text.secondary)}
          >
            Sign in
          </a>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 18px",
              borderRadius: 12,
              background: "linear-gradient(135deg, #7c3aed, #2563eb)",
              border: "none",
              color: "white",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(124,58,237,0.35)",
              letterSpacing: "0.01em",
            }}
          >
            Get Started
            <ArrowRight size={14} />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
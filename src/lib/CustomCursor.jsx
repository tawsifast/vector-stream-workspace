"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { colors, shadows } from './theme'; // Ensure this relative path is correct for your project setup

const CustomCursor = () => {
  const dotRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const frame = frameRef.current;

    // Guard clause: Disable rendering on mobile touch viewports
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const onMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;

      // Pinpoint center tracking
      gsap.to(dot, {
        x: x,
        y: y,
        duration: 0,
      });

      // Rigid geometric lag tracking for the corners frame
      gsap.to(frame, {
        x: x - 12, // Offset based on bounding box dimension (24px width / 2)
        y: y - 12,
        duration: 0.3,
        ease: "power3.out"
      });
    };

    // Geometric transformation on hover (box collapses around object like a scanner lock-on)
    const onMouseEnterLink = () => {
      gsap.to(frame, {
        scale: 1.5,
        rotation: 45, // Rotates the tracking diamond dynamically
        borderColor: colors.border.glow,
        boxShadow: shadows.glow,
        backgroundColor: colors.glow.purple,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
      gsap.to(dot, {
        scale: 1.5,
        backgroundColor: colors.accent.cyan,
        duration: 0.2
      });
    };

    const onMouseLeaveLink = () => {
      gsap.to(frame, {
        scale: 1,
        rotation: 0,
        borderColor: colors.border.default,
        boxShadow: "none",
        backgroundColor: "transparent",
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(dot, {
        scale: 1,
        backgroundColor: colors.accent.purple,
        duration: 0.2
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    // Track standard interface items automatically
    const targetElements = document.querySelectorAll("a, button, [role='button'], .interactive-card");
    targetElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterLink);
      el.addEventListener("mouseleave", onMouseLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      targetElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterLink);
        el.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      {/* 1. Ultra-Sharp Core Crosshair Pinpoint */}
      <div
        ref={dotRef}
        style={{ backgroundColor: colors.accent.purple }}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block mix-blend-screen"
      />

      {/* 2. Professional 4-Corner Target Bracket Frame */}
      <div
        ref={frameRef}
        style={{ borderColor: colors.border.default }}
        className="fixed top-0 left-0 w-6 h-6 border rounded-sm pointer-events-none z-[9998] hidden md:block will-change-transform mix-blend-screen transition-all duration-200"
      >
        {/* Top Left Corner Tick */}
        <span style={{ borderColor: colors.accent.cyan }} className="absolute -top-[1.5px] -left-[1.5px] w-1 h-1 border-t border-l" />
        {/* Top Right Corner Tick */}
        <span style={{ borderColor: colors.accent.cyan }} className="absolute -top-[1.5px] -right-[1.5px] w-1 h-1 border-t border-r" />
        {/* Bottom Left Corner Tick */}
        <span style={{ borderColor: colors.accent.cyan }} className="absolute -bottom-[1.5px] -left-[1.5px] w-1 h-1 border-b border-l" />
        {/* Bottom Right Corner Tick */}
        <span style={{ borderColor: colors.accent.cyan }} className="absolute -bottom-[1.5px] -right-[1.5px] w-1 h-1 border-b border-r" />
      </div>
    </>
  );
};

export default CustomCursor;
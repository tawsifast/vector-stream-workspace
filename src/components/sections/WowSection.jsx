"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Stars } from "@react-three/drei";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import * as THREE from "three";
import dynamic from "next/dynamic";
import { ArrowRight, Layers, Globe, Shield } from "lucide-react";

// Morphing 3D sphere
const MorphingSphere = ({ scrollProgress }) => {
  const meshRef = useRef(null);
  const materialRef = useRef(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    meshRef.current.rotation.x = time * 0.12;
    meshRef.current.rotation.y = time * 0.18;
    meshRef.current.rotation.z = time * 0.06;

    // Scale pulse
    const pulse = 1 + Math.sin(time * 0.8) * 0.04;
    meshRef.current.scale.setScalar(pulse);
  });

  return (
    <Sphere ref={meshRef} args={[1.8, 128, 128]}>
      <MeshDistortMaterial
        ref={materialRef}
        color="#3b82f6"
        attach="material"
        distort={0.45}
        speed={2.5}
        roughness={0}
        metalness={0.9}
        envMapIntensity={1}
        transparent
        opacity={0.85}
        wireframe={false}
      />
    </Sphere>
  );
};

// Orbiting cubes
const OrbitingCubes = () => {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
  });

  return (
    <group ref={groupRef}>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 3;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(angle * 2) * 0.5;

        return (
          <mesh key={i} position={[x, y, z]}>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#6366f1" : "#8b5cf6"}
              transparent
              opacity={0.7}
              emissive={i % 2 === 0 ? "#6366f1" : "#8b5cf6"}
              emissiveIntensity={0.4}
            />
          </mesh>
        );
      })}
    </group>
  );
};

const WowCanvas = () => (
  <Canvas
    camera={{ position: [0, 0, 6], fov: 50 }}
    style={{ background: "transparent" }}
    gl={{ antialias: true, alpha: true }}
    dpr={[1, 2]}
  >
    <ambientLight intensity={0.3} />
    <pointLight position={[5, 5, 5]} intensity={2} color="#3b82f6" />
    <pointLight position={[-5, -5, -5]} intensity={1.5} color="#8b5cf6" />
    <pointLight position={[0, 5, -5]} intensity={1} color="#06b6d4" />
    <Stars radius={80} depth={50} count={2000} factor={3} fade speed={1} />
    <MorphingSphere />
    <OrbitingCubes />
  </Canvas>
);

const DynamicCanvas = dynamic(() => Promise.resolve(WowCanvas), { ssr: false });

const features = [
  {
    icon: Layers,
    title: "Multi-modal Intelligence",
    desc: "Process text, images, audio, and structured data simultaneously.",
  },
  {
    icon: Globe,
    title: "Global Infrastructure",
    desc: "Deployed across 40+ regions with sub-50ms latency guarantees.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    desc: "SOC 2 Type II, GDPR, and HIPAA compliant by design.",
  },
];

const WowSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const sphereY = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden min-h-screen flex items-center"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 60% 50%, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.04) 40%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/5 text-violet-400 text-xs font-semibold tracking-wider uppercase mb-6">
                The WOW Moment
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Intelligence that{" "}
                <span className="gradient-text-blue">thinks ahead.</span>
              </h2>
              <p className="text-[#94a3b8] text-lg leading-relaxed mb-10">
                Xai`s core engine doesn`t just process what exists — it
                anticipates what comes next. Built on adaptive neural
                architectures that evolve with your data.
              </p>

              {/* Features */}
              <div className="space-y-5 mb-10">
                {features.map(({ icon: Icon, title, desc }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 group-hover:border-indigo-500/40 transition-colors duration-200">
                      <Icon className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-semibold mb-1">
                        {title}
                      </h4>
                      <p className="text-[#94a3b8] text-sm leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                // transition={{ delay: 0.8 }}
                whileTap={{ scale: 0.92 }}
                transition={{ duration: 0.1 }}
                className="group flex items-center gap-2 px-6 py-3 bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500  hover:to-violet-500 text-white text-sm font-semibold rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/25 hover:-translate-y-0.5"
              >
                Explore the Engine
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </div>

          {/* Right - 3D Canvas */}
          <motion.div
            style={{ y: sphereY, opacity }}
            className="relative h-[500px] lg:h-[600px]"
          >
            {/* Glow rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 rounded-full border border-indigo-500/10 animate-pulse" />
              <div
                className="absolute w-96 h-96 rounded-full border border-blue-500/5"
                style={{ animation: "spin 20s linear infinite" }}
              />
            </div>

            <DynamicCanvas />

            {/* Floating data chips */}
            {[
              { label: "98.3% Accuracy", x: "5%", y: "25%" },
              { label: "< 12ms Response", x: "65%", y: "15%" },
              { label: "AI Powered", x: "70%", y: "70%" },
            ].map(({ label, x, y }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8 + i * 0.2 }}
                className="absolute px-3 py-1.5 rounded-xl bg-[#0d1424]/90 border border-[#1a2540] backdrop-blur-sm"
                style={{ left: x, top: y }}
              >
                <span className="text-[11px] text-[#94a3b8] font-medium">
                  {label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WowSection;

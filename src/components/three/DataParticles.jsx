"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Inner particle sphere that reacts to mouse
const ParticleField = ({ mouse }) => {
  const pointsRef = useRef(null);
  const { viewport } = useThree();

  const [positions, colors] = useMemo(() => {
    const count = 2500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorPalette = [
      new THREE.Color("#3b82f6"), // blue
      new THREE.Color("#6366f1"), // indigo
      new THREE.Color("#8b5cf6"), // violet
      new THREE.Color("#06b6d4"), // cyan
    ];

    for (let i = 0; i < count; i++) {
      // Sphere distribution
      const radius = Math.random() * 2.8 + 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Color based on position
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.elapsedTime;

    // Gentle auto rotation
    pointsRef.current.rotation.y = time * 0.05;
    pointsRef.current.rotation.x = Math.sin(time * 0.03) * 0.2;

    // Mouse reaction
    if (mouse.current) {
      const targetX = (mouse.current.x / window.innerWidth - 0.5) * 0.4;
      const targetY = -(mouse.current.y / window.innerHeight - 0.5) * 0.4;
      pointsRef.current.rotation.y += (targetX - pointsRef.current.rotation.y) * 0.02;
      pointsRef.current.rotation.x += (targetY - pointsRef.current.rotation.x) * 0.02;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        vertexColors
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

// Orbiting rings
const OrbitalRing = ({ radius, speed, color, tiltX = 0, tiltZ = 0 }) => {
  const ringRef = useRef(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.z += speed;
  });

  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 128; i++) {
      const angle = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0));
    }
    return pts;
  }, [radius]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [points]);

  return (
    <line ref={ringRef} rotation={[tiltX, 0, tiltZ]}>
      <bufferGeometry attach="geometry" {...geometry} />
      <lineBasicMaterial attach="material" color={color} transparent opacity={0.25} />
    </line>
  );
};

// Main Three Canvas
const DataParticles = ({ mouseRef }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.5} />
      <ParticleField mouse={mouseRef} />
      <OrbitalRing radius={3.2} speed={0.003} color="#3b82f6" tiltX={0.4} tiltZ={0.1} />
      <OrbitalRing radius={2.5} speed={-0.002} color="#6366f1" tiltX={-0.6} tiltZ={0.3} />
      <OrbitalRing radius={3.8} speed={0.0015} color="#8b5cf6" tiltX={1.2} tiltZ={-0.2} />
    </Canvas>
  );
};

export default DataParticles;
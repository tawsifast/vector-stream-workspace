"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const Particles = ({ mouseRef }) => {
  const ref = useRef(null);

  const [positions, colors] = useMemo(() => {
    const count = 3000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#7c3aed"),
      new THREE.Color("#4f46e5"),
      new THREE.Color("#2563eb"),
      new THREE.Color("#06b6d4"),
      new THREE.Color("#a78bfa"),
    ];
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 3 + 0.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.04;
    ref.current.rotation.x = Math.sin(t * 0.025) * 0.15;
    if (mouseRef?.current) {
      const tx = (mouseRef.current.x / window.innerWidth - 0.5) * 0.5;
      const ty = -(mouseRef.current.y / window.innerHeight - 0.5) * 0.5;
      ref.current.rotation.y += (tx - ref.current.rotation.y) * 0.015;
      ref.current.rotation.x += (ty - ref.current.rotation.x) * 0.015;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent vertexColors size={0.013} sizeAttenuation
        depthWrite={false} opacity={0.85} blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const Ring = ({ radius, speed, color, rx = 0, rz = 0 }) => {
  const ref = useRef(null);
  const geo = useMemo(() => {
    const pts = Array.from({ length: 256 }, (_, i) => {
      const a = (i / 256) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0);
    });
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [radius]);
  useFrame(() => { if (ref.current) ref.current.rotation.z += speed; });
  return (
    <line ref={ref} geometry={geo} rotation={[rx, 0, rz]}>
      <lineBasicMaterial color={color} transparent opacity={0.18} />
    </line>
  );
};

const NebulaParticles = ({ mouseRef }) => (
  <Canvas
    camera={{ position: [0, 0, 5.5], fov: 55 }}
    style={{ background: "transparent" }}
    gl={{ antialias: true, alpha: true }}
    dpr={[1, 2]}
  >
    <Particles mouseRef={mouseRef} />
    <Ring radius={3.5} speed={0.003} color="#7c3aed" rx={0.5} rz={0.1} />
    <Ring radius={2.8} speed={-0.002} color="#2563eb" rx={-0.7} rz={0.3} />
    <Ring radius={4.1} speed={0.0013} color="#06b6d4" rx={1.3} rz={-0.2} />
    <Ring radius={2.2} speed={-0.004} color="#a78bfa" rx={0.2} rz={0.8} />
  </Canvas>
);

export default NebulaParticles;
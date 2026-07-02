"use client";
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

const generateRandomPositions = (count) => {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    arr[i] = (Math.random() - 0.5) * 2.5;
  }
  return arr;
};

const ParticleCluster = () => {
  const pointsRef = useRef();
  const { pointer } = useThree();
  const positions = useMemo(() => generateRandomPositions(1200), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.x = time * 0.05;
    pointsRef.current.rotation.y = time * 0.075;
    pointsRef.current.position.x = pointer.x * 0.3;
    pointsRef.current.position.y = pointer.y * 0.3;
  });

  return (
    <group dispose={null}>
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#3b82f6"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          blending={2}
        />
      </Points>
    </group>
  );
};

const HeroParticles = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 1.5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <ParticleCluster />
      </Canvas>
    </div>
  );
};

export default HeroParticles;
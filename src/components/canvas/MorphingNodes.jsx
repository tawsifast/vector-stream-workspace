"use client";
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

const particleCount = 600;

const getShapePositions = (type) => {
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    if (type === 'sphere') {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 0.8;
      
      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);
    } else {
      positions[i3] = ((i % 8) - 3.5) * 0.25;
      positions[i3 + 1] = ((Math.floor(i / 8) % 8) - 3.5) * 0.25;
      positions[i3 + 2] = ((Math.floor(i / 64) % 8) - 3.5) * 0.25;
    }
  }
  return positions;
};

const NodeMatrix = ({ currentShape }) => {
  const pointsRef = useRef();

  const spherePositions = useMemo(() => getShapePositions('sphere'), []);
  const gridPositions = useMemo(() => getShapePositions('grid'), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const targetPositions = currentShape === 'sphere' ? spherePositions : gridPositions;
    const currentPositions = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < currentPositions.length; i++) {
      currentPositions[i] += (targetPositions[i] - currentPositions[i]) * 0.08;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.1;
    pointsRef.current.rotation.x = time * 0.05;
  });

  return (
    <Points ref={pointsRef} positions={spherePositions.slice()} stride={3}>
      <PointMaterial
        transparent
        color={currentShape === 'sphere' ? '#a78bfa' : '#3b82f6'}
        size={0.025}
        sizeAttenuation={true}
        depthWrite={false}
        blending={2}
      />
    </Points>
  );
};

const MorphingNodes = ({ currentShape }) => {
  return (
    <div className="w-full h-[400px] relative pointer-events-none">
      <Canvas camera={{ position: [0, 0, 2], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <NodeMatrix currentShape={currentShape} />
      </Canvas>
    </div>
  );
};

export default MorphingNodes;
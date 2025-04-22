import { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SparkBurst({ position, onDone, count = 15, lifetime = 0.6 }) {
  const pointsRef = useRef();
  const velocities = useRef([]);
  const age = useRef(0);

  const positions = useMemo(() => {
    const arr = [];
    velocities.current = [];
    for (let i = 0; i < count; i++) {
      const dir = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize().multiplyScalar(0.5);
      velocities.current.push(dir);
      arr.push(0, 0, 0);
    }
    return new Float32Array(arr);
  }, [count]);

  useFrame((_, delta) => {
    age.current += delta;
    if (age.current > lifetime) {
      onDone?.();
      return;
    }

    const positionsArray = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      positionsArray[i * 3] += velocities.current[i].x * delta;
      positionsArray[i * 3 + 1] += velocities.current[i].y * delta;
      positionsArray[i * 3 + 2] += velocities.current[i].z * delta;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.material.opacity = 1 - age.current / lifetime;
  });

  useEffect(() => {
    if (pointsRef.current) {
      pointsRef.current.position.set(...position);
    }
  }, [position]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#ffff88" size={0.04} transparent depthWrite={false} opacity={1} sizeAttenuation />
    </points>
  );
}

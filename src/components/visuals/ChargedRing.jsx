import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ChargedRing({
  radius = 1.4,
  count = 150,
  color = '#00ffff',
  rotationSpeed = 0.15,
  wobble = 0.03,
  ringOffset = 0,
  opacity = 0.6,
  size = 0.07,
}) {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.02;
      const y = ringOffset + (Math.random() - 0.5) * wobble;
      const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 0.02;
      pos.push(x, y, z);
    }
    return new Float32Array(pos);
  }, [radius, count, ringOffset, wobble]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color={color} size={size} sizeAttenuation transparent depthWrite={false} opacity={opacity} />
    </points>
  );
}

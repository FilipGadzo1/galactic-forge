import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshWobbleMaterial } from '@react-three/drei';
import { useGameStore } from '../../store/useGameStore';

export default function StellarCore({ onClickCore, ...props }) {
  const meshRef = useRef();
  const materialRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    const mesh = meshRef.current;
    const material = materialRef.current;

    if (mesh) {
      mesh.rotation.y += 0.005;
      mesh.rotation.x += 0.0025;
    }

    if (material) {
      const t = performance.now() * 0.001;
      const base = hovered ? 0.6 : 0.4;
      const pulse = base + Math.sin(t * 2) * 0.15;

      material.emissiveIntensity = pulse;

      const shift = 0.05 + Math.sin(t * 2) * 0.05;
      material.emissive.setRGB(0, 0.5 + shift, 0.6 + shift);
    }
  });

  function handleCoreClick(e) {
    const { addEnergy, energyPerClick } = useGameStore.getState();
    addEnergy();

    onClickCore?.(e, energyPerClick);
  }

  return (
    <mesh
      ref={meshRef}
      {...props}
      castShadow
      receiveShadow
      onClick={handleCoreClick}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'default';
      }}
    >
      <icosahedronGeometry args={[1, 6]} />
      <MeshWobbleMaterial
        ref={materialRef}
        color={hovered ? '#00d2d2' : '#00bebe'}
        emissive={hovered ? '#008a8a' : '#005f5f'}
        emissiveIntensity={0.4}
        factor={0.3}
        speed={1.5}
      />
    </mesh>
  );
}

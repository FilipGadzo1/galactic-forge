import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshWobbleMaterial } from '@react-three/drei';
import { useGameStore } from '../../store/useGameStore';

export default function StellarCore({ onClickCore, ...props }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Rotation
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.rotation.x += delta * 0.25;
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
      <icosahedronGeometry args={[1, 4]} />
      <MeshWobbleMaterial
        color={hovered ? '#00d2d2' : '#00bebe'}
        emissive={hovered ? '#008a8a' : '#005f5f'}
        emissiveIntensity={0.4}
        factor={0.3}
        speed={1.5}
      />
    </mesh>
  );
}

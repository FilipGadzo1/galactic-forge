import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import StellarCore from '../components/StellarCore';

export default function Experience({ onClickCore }) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }} shadows gl={{ antialias: true }}>
      <color attach="background" args={['black']} />
      <ambientLight intensity={0.15} />

      <directionalLight
        position={[2, 4, 2]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={10}
        shadow-camera-left={-3}
        shadow-camera-right={3}
        shadow-camera-top={3}
        shadow-camera-bottom={-3}
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
        <shadowMaterial opacity={0.3} />
      </mesh>

      <StellarCore position={[0, 0, 0]} onClickCore={onClickCore} />

      <Stars radius={200} depth={100} count={8000} factor={6} fade />
      <OrbitControls enablePan={false} />
    </Canvas>
  );
}

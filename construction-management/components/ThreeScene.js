"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, Float } from "@react-three/drei";
import { useRef } from "react";

// 3D Model Component
export function ConstructionModel({ scale = 1.5, position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const modelRef = useRef();
  
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
    }
  });
  
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={modelRef} position={position} rotation={rotation} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#FF7420" metalness={0.8} roughness={0.2} />
      </mesh>
    </Float>
  );
}

export default function ThreeScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <ConstructionModel />
      <Environment preset="city" />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
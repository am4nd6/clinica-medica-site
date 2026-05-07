import { useGLTF } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// 👇 fallback (seu coração atual simplificado)
function ProceduralHeart() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const beat = Math.pow(Math.max(0, Math.sin(t * 2.8)), 8) * 0.08;
    const scale = 1 + beat;
    groupRef.current.scale.set(scale, scale, scale);
  });

  return (
    <group ref={groupRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#8B1A1A" />
    </group>
  );
}

// 👇 modelo real com fallback automático
function RealHeartModel() {
  const group = useRef<THREE.Group>(null);
  const [modelExists, setModelExists] = useState(true);

  // tenta carregar
  let gltf;
  try {
    gltf = useGLTF("/models/heart.glb");
  } catch (e) {
    gltf = null;
  }

  useEffect(() => {
    if (!gltf) {
      setModelExists(false);
    }
  }, [gltf]);

  useFrame((state) => {
    if (!group.current) return;

    const t = state.clock.getElapsedTime();

    const beat =
      Math.sin(t * 2.5) * 0.03 +
      Math.sin(t * 5) * 0.01;

    const scale = 1 + Math.max(0, beat);
    group.current.scale.set(scale, scale, scale);

    group.current.rotation.y += 0.002;
  });

  // 👇 fallback automático
  if (!modelExists || !gltf) {
    return <ProceduralHeart />;
  }

  return (
    <primitive
      ref={group}
      object={gltf.scene}
      scale={1.8}
      position={[0, -1, 0]}
    />
  );
}

export default RealHeartModel;
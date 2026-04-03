import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

function HeartMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();
  const [hovered, setHovered] = useState(false);

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo(x, y + 0.5);
    shape.bezierCurveTo(x, y + 0.5, x - 0.5, y + 1.5, x - 1.5, y + 1.5);
    shape.bezierCurveTo(x - 3, y + 1.5, x - 3, y, x - 3, y);
    shape.bezierCurveTo(x - 3, y - 1, x - 1.5, y - 2.5, x, y - 3.5);
    shape.bezierCurveTo(x + 1.5, y - 2.5, x + 3, y - 1, x + 3, y);
    shape.bezierCurveTo(x + 3, y, x + 3, y + 1.5, x + 1.5, y + 1.5);
    shape.bezierCurveTo(x + 0.5, y + 1.5, x, y + 0.5, x, y + 0.5);

    const extrudeSettings = {
      depth: 1.5,
      bevelEnabled: true,
      bevelSegments: 12,
      steps: 2,
      bevelSize: 0.6,
      bevelThickness: 0.6,
      curveSegments: 24,
    };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Heartbeat pulsing
    const beat = 1 + Math.sin(t * 2.5) * 0.04 + Math.sin(t * 5) * 0.02;
    const scale = hovered ? beat * 1.08 : beat;
    meshRef.current.scale.set(scale, scale, scale);

    // Mouse-driven rotation
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      pointer.x * 0.4,
      0.05
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      -pointer.y * 0.3 + 0.1,
      0.05
    );
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[Math.PI, 0, 0]}
      position={[0, 0.5, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshPhysicalMaterial
        color="#c0392b"
        roughness={0.35}
        metalness={0.15}
        clearcoat={0.6}
        clearcoatRoughness={0.3}
        envMapIntensity={1.2}
      />
    </mesh>
  );
}

function HeartScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <directionalLight position={[-3, 3, -3]} intensity={0.4} color="#00C2B8" />
      <pointLight position={[0, -3, 3]} intensity={0.6} color="#e74c3c" />
      <spotLight position={[0, 8, 4]} angle={0.4} penumbra={0.5} intensity={0.8} />
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <HeartMesh />
      </Float>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={(2 * Math.PI) / 3}
      />
    </Canvas>
  );
}

const floatingData = [
  { label: "BPM", value: "72", x: "left-4 md:left-8", y: "top-1/4" },
  { label: "Pressão", value: "120/80", x: "right-4 md:right-8", y: "top-1/3" },
  { label: "SpO2", value: "98%", x: "left-8 md:left-16", y: "bottom-1/4" },
  { label: "Temp.", value: "36.5°", x: "right-8 md:right-16", y: "bottom-1/3" },
];

const Heart3DSection = () => {
  return (
    <section className="section-padding relative overflow-hidden bg-secondary">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-foreground mb-4">
            Monitoramento <span className="text-primary">Inteligente</span>
          </h2>
          <p className="text-secondary-foreground/70 text-lg max-w-2xl mx-auto">
            Acompanhe seus sinais vitais com tecnologia de ponta e visualizações interativas em tempo real.
          </p>
        </motion.div>

        <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
          <HeartScene />

          {/* Floating data cards */}
          {floatingData.map((data, i) => (
            <motion.div
              key={data.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
              className={`absolute ${data.x} ${data.y} glass-card rounded-xl p-3 md:p-4 animate-float border border-primary/20`}
              style={{ animationDelay: `${i * 0.5}s`, background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)" }}
            >
              <div className="text-xs text-primary font-medium">{data.label}</div>
              <div className="text-lg md:text-xl font-heading font-bold text-secondary-foreground">{data.value}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Heart3DSection;

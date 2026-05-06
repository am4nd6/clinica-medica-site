import { OrbitControls, Float } from "@react-three/drei";
import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "framer-motion";

// Coração anatômico procedural de alta fidelidade
function AnatomicalHeart() {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  const heartGeometries = useMemo(() => {
    const geos: { geo: THREE.BufferGeometry; color: string; pos: [number, number, number]; scale: [number, number, number]; rot: [number, number, number] }[] = [];
    
    // Ventrículos
    const leftVentricle = new THREE.SphereGeometry(1.2, 32, 32);
    leftVentricle.scale(1, 1.3, 1);
    geos.push({ geo: leftVentricle, color: "#8B1A1A", pos: [-0.4, -0.3, 0], scale: [1, 1, 0.9], rot: [0, 0, 0.15] });
    
    const rightVentricle = new THREE.SphereGeometry(1.05, 32, 32);
    rightVentricle.scale(1, 1.2, 0.95);
    geos.push({ geo: rightVentricle, color: "#A02020", pos: [0.5, -0.2, 0.15], scale: [1, 1, 0.85], rot: [0, 0, -0.1] });

    // Átrios
    const leftAtrium = new THREE.SphereGeometry(0.75, 32, 32);
    geos.push({ geo: leftAtrium, color: "#7A1515", pos: [-0.6, 1.1, 0], scale: [1.1, 0.8, 0.85], rot: [0, 0, 0.2] });

    const rightAtrium = new THREE.SphereGeometry(0.7, 32, 32);
    geos.push({ geo: rightAtrium, color: "#901818", pos: [0.5, 1.0, 0.1], scale: [1, 0.75, 0.8], rot: [0, 0, -0.15] });

    return geos;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const beat = Math.pow(Math.max(0, Math.sin(t * 2.8)), 8) * 0.08;
    const scale = 1 + beat;
    groupRef.current.scale.set(scale, scale, scale);
    
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointer.x * 0.5, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -pointer.y * 0.3, 0.05);
  });

  return (
    <group ref={groupRef}>
      {heartGeometries.map((item, i) => (
        <mesh key={i} geometry={item.geo} position={item.pos} scale={item.scale} rotation={item.rot}>
          <meshPhysicalMaterial 
            color={item.color} 
            roughness={0.4} 
            metalness={0.1} 
            clearcoat={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

const floatingData = [
  { label: "BPM", value: "72", x: "left-2 md:left-8", y: "top-1/4" },
  { label: "Pressão", value: "120/80", x: "right-2 md:right-8", y: "top-1/3" },
  { label: "SpO2", value: "98%", x: "left-4 md:left-16", y: "bottom-1/4" },
  { label: "Temp.", value: "36.5°", x: "right-4 md:right-16", y: "bottom-1/3" },
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

        <div className="relative w-full max-w-3xl mx-auto" style={{ aspectRatio: "4/3" }}>
          <div className="absolute inset-0">
            <Canvas
              camera={{ position: [0, 0.5, 6], fov: 40 }}
              style={{ width: "100%", height: "100%" }}
              gl={{ antialias: true, alpha: true }}
              dpr={[1, 2]}
            >
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <pointLight position={[-10, -10, -10]} color="#ff0000" intensity={0.5} />
              <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                <AnatomicalHeart />
              </Float>
              <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
          </div>

          {floatingData.map((data, i) => (
            <motion.div
              key={data.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
              className={`absolute ${data.x} ${data.y} rounded-xl p-3 md:p-4 animate-float border border-primary/20`}
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
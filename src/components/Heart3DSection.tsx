import { useRef, useMemo, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

function AnatomicalHeart() {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer, viewport } = useThree();
  const [hovered, setHovered] = useState(false);

  // Create a more anatomically realistic heart using multiple merged shapes
  const heartGeometries = useMemo(() => {
    const geos: { geo: THREE.BufferGeometry; color: string; pos: [number, number, number]; scale: [number, number, number]; rot: [number, number, number] }[] = [];

    // Main ventricles (two large bulbous shapes)
    const leftVentricle = new THREE.SphereGeometry(1.2, 32, 32);
    leftVentricle.scale(1, 1.3, 1);
    geos.push({ geo: leftVentricle, color: "#8B1A1A", pos: [-0.4, -0.3, 0], scale: [1, 1, 0.9], rot: [0, 0, 0.15] });

    const rightVentricle = new THREE.SphereGeometry(1.05, 32, 32);
    rightVentricle.scale(1, 1.2, 0.95);
    geos.push({ geo: rightVentricle, color: "#A02020", pos: [0.5, -0.2, 0.15], scale: [1, 1, 0.85], rot: [0, 0, -0.1] });

    // Atria (upper chambers)
    const leftAtrium = new THREE.SphereGeometry(0.75, 32, 32);
    geos.push({ geo: leftAtrium, color: "#7A1515", pos: [-0.6, 1.1, 0], scale: [1.1, 0.8, 0.85], rot: [0, 0, 0.2] });

    const rightAtrium = new THREE.SphereGeometry(0.7, 32, 32);
    geos.push({ geo: rightAtrium, color: "#901818", pos: [0.5, 1.0, 0.1], scale: [1, 0.75, 0.8], rot: [0, 0, -0.15] });

    // Aorta (main artery arching up and back)
    const aortaPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 1.3, 0),
      new THREE.Vector3(-0.2, 2.0, 0),
      new THREE.Vector3(0.1, 2.5, -0.1),
      new THREE.Vector3(0.5, 2.3, -0.3),
      new THREE.Vector3(0.7, 1.8, -0.5),
    ]);
    const aortaGeo = new THREE.TubeGeometry(aortaPath, 20, 0.28, 12, false);
    geos.push({ geo: aortaGeo, color: "#C42B2B", pos: [0, 0, 0], scale: [1, 1, 1], rot: [0, 0, 0] });

    // Pulmonary artery
    const pulmonaryPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.3, 1.4, 0.2),
      new THREE.Vector3(0.1, 2.1, 0.3),
      new THREE.Vector3(-0.3, 2.3, 0.2),
      new THREE.Vector3(-0.6, 2.0, 0.1),
    ]);
    const pulmonaryGeo = new THREE.TubeGeometry(pulmonaryPath, 16, 0.22, 10, false);
    geos.push({ geo: pulmonaryGeo, color: "#3A5BA0", pos: [0, 0, 0], scale: [1, 1, 1], rot: [0, 0, 0] });

    // Superior vena cava
    const svcPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.6, 1.2, -0.1),
      new THREE.Vector3(0.7, 1.8, -0.15),
      new THREE.Vector3(0.65, 2.4, -0.2),
    ]);
    const svcGeo = new THREE.TubeGeometry(svcPath, 12, 0.18, 10, false);
    geos.push({ geo: svcGeo, color: "#2E4A80", pos: [0, 0, 0], scale: [1, 1, 1], rot: [0, 0, 0] });

    // Coronary arteries (surface vessels)
    const coronary1Path = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.1, 0.8, 0.9),
      new THREE.Vector3(-0.5, 0.2, 1.0),
      new THREE.Vector3(-0.3, -0.5, 0.85),
      new THREE.Vector3(0.1, -1.0, 0.7),
    ]);
    const coronary1 = new THREE.TubeGeometry(coronary1Path, 16, 0.06, 8, false);
    geos.push({ geo: coronary1, color: "#D44040", pos: [0, 0, 0], scale: [1, 1, 1], rot: [0, 0, 0] });

    const coronary2Path = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.2, 0.9, 0.85),
      new THREE.Vector3(0.6, 0.3, 0.9),
      new THREE.Vector3(0.5, -0.4, 0.75),
    ]);
    const coronary2 = new THREE.TubeGeometry(coronary2Path, 12, 0.05, 8, false);
    geos.push({ geo: coronary2, color: "#D44040", pos: [0, 0, 0], scale: [1, 1, 1], rot: [0, 0, 0] });

    // Bottom tip
    const tip = new THREE.ConeGeometry(0.6, 1.2, 16);
    geos.push({ geo: tip, color: "#8B1A1A", pos: [0.05, -1.6, 0.05], scale: [1, 1, 0.8], rot: [0, 0, 0.1] });

    return geos;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Heartbeat pulsing - double beat pattern
    const beat1 = Math.pow(Math.max(0, Math.sin(t * 2.8)), 8) * 0.06;
    const beat2 = Math.pow(Math.max(0, Math.sin(t * 2.8 + 0.4)), 8) * 0.03;
    const baseScale = hovered ? 1.06 : 1;
    const scale = baseScale + beat1 + beat2;
    groupRef.current.scale.set(scale, scale, scale);

    // Mouse-driven rotation
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.35,
      0.04
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -pointer.y * 0.2,
      0.04
    );
  });

  const handlePointerOver = useCallback(() => setHovered(true), []);
  const handlePointerOut = useCallback(() => setHovered(false), []);

  return (
    <group
      ref={groupRef}
      position={[0, -0.2, 0]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {heartGeometries.map((item, i) => (
        <mesh
          key={i}
          geometry={item.geo}
          position={item.pos}
          scale={item.scale}
          rotation={item.rot}
        >
          <meshPhysicalMaterial
            color={item.color}
            roughness={0.55}
            metalness={0.05}
            clearcoat={0.3}
            clearcoatRoughness={0.4}
            envMapIntensity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

function HeartScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 6], fov: 40 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.9} color="#ffffff" />
      <directionalLight position={[-3, 3, -3]} intensity={0.3} color="#88cccc" />
      <pointLight position={[0, -3, 3]} intensity={0.5} color="#cc4444" />
      <spotLight position={[0, 6, 4]} angle={0.5} penumbra={0.6} intensity={0.6} />
      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
        <AnatomicalHeart />
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
            <HeartScene />
          </div>

          {/* Floating data cards */}
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

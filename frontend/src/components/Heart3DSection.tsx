import { Suspense, Component, type ReactNode } from "react";
import { useRef, useEffect } from "react";
import { useFrame, useThree, Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, Center } from "@react-three/drei";
import * as THREE from "three";

function ProceduralHeart() {
  return (
    <mesh>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color="#c0392b"
        roughness={0.3}
        metalness={0.2}
        emissive="#7b0000"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

function RealHeartModel() {
  const { scene } = useGLTF("/models/heart.glb");
  return <primitive object={scene} />;
}

interface EBState { hasError: boolean }
class HeartErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, EBState> {
  state: EBState = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

function HeartScene() {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useEffect(() => {
    if (!groupRef.current) return;

    const raf = requestAnimationFrame(() => {
      if (!groupRef.current) return;

      const box = new THREE.Box3().setFromObject(groupRef.current);
      if (box.isEmpty()) return;

      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      if (maxDim < 0.001) return;

      const pCamera = camera as THREE.PerspectiveCamera;
      if (pCamera.fov !== undefined) {
        const vFov = (pCamera.fov * Math.PI) / 180;
        const dist = maxDim / (2 * Math.tan(vFov / 2));

        pCamera.position.set(center.x, center.y, Math.max(dist * 1.6, 3));
        pCamera.lookAt(center);
        pCamera.updateProjectionMatrix();
      }
    });

    return () => cancelAnimationFrame(raf);
  });

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const beat = 1 + Math.pow(Math.max(0, Math.sin(t * 2.7)), 8) * 0.07;
    groupRef.current.scale.set(beat, beat, beat);
    groupRef.current.rotation.y += 0.004;
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
      <directionalLight position={[-5, -3, -5]} intensity={0.4} color="#ff6b6b" />
      <pointLight position={[0, 3, 4]} intensity={0.8} color="#ff4444" />
      <Environment preset="city" />

      <group ref={groupRef}>
        <Center>
          <HeartErrorBoundary fallback={<ProceduralHeart />}>
            <Suspense fallback={<ProceduralHeart />}>
              <RealHeartModel />
            </Suspense>
          </HeartErrorBoundary>
        </Center>
      </group>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={(5 * Math.PI) / 6}
      />
    </>
  );
}

export default function Heart3DSection() {
  return (
    <section
      id="coracao-3d"
      className="relative py-12 md:py-16 lg:py-20 overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 items-center">
          <div className="flex items-center justify-center w-full">
            <div className="w-full max-w-full h-56 sm:h-72 md:h-80 lg:h-[400px] rounded-3xl overflow-hidden shadow-2xl bg-black/10">
              <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                style={{ width: "100%", height: "100%" }}
              >
                <HeartScene />
              </Canvas>
            </div>
          </div>

          <div className="space-y-4 md:space-y-6 max-w-full">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Tecnologia Cardíaca
            </div>

            <h2 className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground break-words">
              Cuidando do seu{" "}
              <span className="gradient-text">Coração</span>
            </h2>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-full break-words text-justify">
              Nossa clínica utiliza tecnologia de ponta em cardiologia para
              diagnosticar e tratar doenças cardiovasculares com precisão e
              humanização.
            </p>

            <ul className="space-y-3 text-muted-foreground">
              {[
                "Ecocardiograma de última geração",
                "Monitoramento cardíaco 24h",
                "Equipe especializada em cardiologia",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                  </span>
                  <span className="break-words">{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="#agendar"
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-lg bg-primary text-foreground font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Agendar Consulta Cardíaca
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

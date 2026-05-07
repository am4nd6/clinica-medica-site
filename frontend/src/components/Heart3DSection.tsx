import { Suspense, Component, type ReactNode } from "react";
import { useRef } from "react";
import { useFrame, Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, Center } from "@react-three/drei";
import * as THREE from "three";

// ─── Procedural fallback heart (sphere) ───────────────────────────────────────
function ProceduralHeart() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const beat = Math.pow(Math.max(0, Math.sin(t * 2.8)), 8) * 0.08;
    const scale = 1 + beat;
    groupRef.current.scale.set(scale, scale, scale);
    groupRef.current.rotation.y += 0.005;
  });

  return (
    <Center>
      <group ref={groupRef}>
        <mesh>
          <sphereGeometry args={[2.2, 64, 64]} />
          <meshStandardMaterial
            color="#c0392b"
            roughness={0.3}
            metalness={0.2}
            emissive="#7b0000"
            emissiveIntensity={0.4}
          />
        </mesh>
      </group>
    </Center>
  );
}

// ─── Real GLTF heart model ─────────────────────────────────────────────────────
function RealHeartModel() {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/heart.glb");

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    const beat = Math.sin(t * 2.5) * 0.03 + Math.sin(t * 5) * 0.01;
    const scale = 1 + Math.max(0, beat);
    group.current.scale.set(scale, scale, scale);
    group.current.rotation.y += 0.002;
  });

  return (
    <Center>
      <primitive ref={group} object={scene} />
    </Center>
  );
}

// ─── Error boundary to catch GLTF load failures ───────────────────────────────
interface EBState { hasError: boolean }
class HeartErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, EBState> {
  state: EBState = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

// ─── Scene (used inside Canvas) ───────────────────────────────────────────────
function HeartScene() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.4} castShadow />
      <directionalLight position={[-5, -3, -5]} intensity={0.5} color="#ff6b6b" />
      <pointLight position={[0, 2, 3]} intensity={1.0} color="#ff4444" />
      <pointLight position={[0, -2, -3]} intensity={0.4} color="#ff9999" />
      <Environment preset="city" />

      <HeartErrorBoundary fallback={<ProceduralHeart />}>
        <Suspense fallback={<ProceduralHeart />}>
          <RealHeartModel />
        </Suspense>
      </HeartErrorBoundary>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(3 * Math.PI) / 4}
      />
    </>
  );
}

// ─── Public export: full section with Canvas ──────────────────────────────────
export default function Heart3DSection() {
  return (
    <section
      id="coracao-3d"
      className="relative py-24 overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Canvas — fills its column, heart centered inside */}
          <div className="flex items-center justify-center">
            <div
              className="w-full rounded-3xl overflow-hidden shadow-2xl bg-black/10"
              style={{ height: "480px" }}
            >
              <Canvas
                camera={{ position: [0, 0, 1.8], fov: 65 }}
                gl={{ antialias: true, alpha: true }}
                style={{ width: "100%", height: "100%" }}
              >
                <HeartScene />
              </Canvas>
            </div>
          </div>

          {/* Text */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Tecnologia Cardíaca
            </div>

            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
              Cuidando do seu{" "}
              <span className="gradient-text">Coração</span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
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
                <li key={item} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="#agendar"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Agendar Consulta Cardíaca
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
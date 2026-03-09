import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";

/* ═══════ Car Body Silhouette ═══════ */
function CarBody() {
  const meshRef = useRef<THREE.Group>(null);

  // Car body shape using basic geometries
  return (
    <group ref={meshRef} position={[0, -0.3, 0]}>
      {/* Main body - lower */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4.2, 0.8, 1.8]} />
        <meshStandardMaterial
          color="#0a1a0f"
          transparent
          opacity={0.85}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
      {/* Cabin/roof */}
      <mesh position={[0.3, 0.65, 0]}>
        <boxGeometry args={[2.2, 0.7, 1.6]} />
        <meshStandardMaterial
          color="#0a1a0f"
          transparent
          opacity={0.6}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
      {/* Windshield front */}
      <mesh position={[-0.65, 0.55, 0]} rotation={[0, 0, 0.4]}>
        <boxGeometry args={[0.8, 0.5, 1.5]} />
        <meshStandardMaterial
          color="#1a3a2a"
          transparent
          opacity={0.3}
          roughness={0.1}
          metalness={1}
        />
      </mesh>
      {/* Windshield rear */}
      <mesh position={[1.15, 0.55, 0]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.6, 0.5, 1.5]} />
        <meshStandardMaterial
          color="#1a3a2a"
          transparent
          opacity={0.3}
          roughness={0.1}
          metalness={1}
        />
      </mesh>
      {/* Front wheel wells */}
      <mesh position={[-1.3, -0.35, 0.85]}>
        <cylinderGeometry args={[0.35, 0.35, 0.2, 16]} />
        <meshStandardMaterial color="#111" roughness={0.9} />
      </mesh>
      <mesh position={[-1.3, -0.35, -0.85]}>
        <cylinderGeometry args={[0.35, 0.35, 0.2, 16]} />
        <meshStandardMaterial color="#111" roughness={0.9} />
      </mesh>
      {/* Rear wheel wells */}
      <mesh position={[1.3, -0.35, 0.85]}>
        <cylinderGeometry args={[0.35, 0.35, 0.2, 16]} />
        <meshStandardMaterial color="#111" roughness={0.9} />
      </mesh>
      <mesh position={[1.3, -0.35, -0.85]}>
        <cylinderGeometry args={[0.35, 0.35, 0.2, 16]} />
        <meshStandardMaterial color="#111" roughness={0.9} />
      </mesh>
    </group>
  );
}

/* ═══════ Engine internals (visible through X-ray) ═══════ */
function EngineInternals() {
  return (
    <group position={[-1.2, -0.15, 0]}>
      {/* Engine block */}
      <mesh>
        <boxGeometry args={[0.8, 0.5, 0.7]} />
        <meshStandardMaterial
          color="#1a4a2a"
          transparent
          opacity={0.4}
          emissive="#22c55e"
          emissiveIntensity={0.15}
          wireframe
        />
      </mesh>
      {/* Cylinders */}
      {[-0.15, 0.15].map((x, i) => (
        <mesh key={i} position={[x, 0.1, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.4, 8]} />
          <meshStandardMaterial
            color="#2a5a3a"
            transparent
            opacity={0.5}
            emissive="#22c55e"
            emissiveIntensity={0.2}
            wireframe
          />
        </mesh>
      ))}
      {/* Turbo */}
      <mesh position={[0.3, 0.15, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.12, 0.04, 8, 16]} />
        <meshStandardMaterial
          color="#3a7a4a"
          emissive="#22c55e"
          emissiveIntensity={0.3}
          wireframe
        />
      </mesh>
      {/* Exhaust/FAP pipe */}
      <mesh position={[1.0, -0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 1.8, 8]} />
        <meshStandardMaterial
          color="#2a5a3a"
          transparent
          opacity={0.4}
          emissive="#22c55e"
          emissiveIntensity={0.15}
          wireframe
        />
      </mesh>
      {/* FAP filter */}
      <mesh position={[1.8, -0.15, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.3, 8]} />
        <meshStandardMaterial
          color="#3a7a4a"
          transparent
          opacity={0.5}
          emissive="#22c55e"
          emissiveIntensity={0.25}
          wireframe
        />
      </mesh>
    </group>
  );
}

/* ═══════ Flowing fuel particles ═══════ */
function FlowParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 200;

  const { positions, colors, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const spd = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Particles along the engine path
      pos[i * 3] = -2 + Math.random() * 4.5; // x: along car length
      pos[i * 3 + 1] = -0.5 + Math.random() * 0.6; // y: within engine area
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.8; // z: width

      // Green color variations
      col[i * 3] = 0.1 + Math.random() * 0.2;
      col[i * 3 + 1] = 0.6 + Math.random() * 0.4;
      col[i * 3 + 2] = 0.2 + Math.random() * 0.3;

      spd[i] = 0.5 + Math.random() * 1.5;
    }

    return { positions: pos, colors: col, speeds: spd };
  }, []);

  useFrame((_, delta) => {
    if (!particlesRef.current) return;
    const posArr = particlesRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      posArr[i * 3] += speeds[i] * delta;

      // Reset particle when it exits
      if (posArr[i * 3] > 2.5) {
        posArr[i * 3] = -2;
        posArr[i * 3 + 1] = -0.5 + Math.random() * 0.6;
        posArr[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ═══════ Glow ring scanning effect ═══════ */
function ScanRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ringRef.current) return;
    const t = clock.getElapsedTime();
    // Move ring back and forth along car
    ringRef.current.position.x = Math.sin(t * 0.5) * 2;
    ringRef.current.rotation.y = Math.PI / 2;
    // Pulse scale
    const s = 1 + Math.sin(t * 2) * 0.1;
    ringRef.current.scale.set(s, s, 1);
  });

  return (
    <mesh ref={ringRef} position={[0, -0.1, 0]}>
      <torusGeometry args={[1.1, 0.02, 16, 64]} />
      <meshStandardMaterial
        color="#22c55e"
        emissive="#22c55e"
        emissiveIntensity={1.5}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

/* ═══════ Carbon deposits being cleaned ═══════ */
function CarbonDeposits() {
  const groupRef = useRef<THREE.Group>(null);
  const depositsData = useMemo(() => {
    return Array.from({ length: 30 }, () => ({
      pos: [
        -1.5 + Math.random() * 3,
        -0.5 + Math.random() * 0.6,
        (Math.random() - 0.5) * 0.6,
      ] as [number, number, number],
      scale: 0.02 + Math.random() * 0.04,
      speed: 0.3 + Math.random() * 0.7,
    }));
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const d = depositsData[i];
      // Dissolve effect — particles shrink and become transparent over time cycle
      const cycle = (t * d.speed) % 4;
      const s = cycle < 2 ? d.scale * (1 - cycle / 2) : d.scale * ((cycle - 2) / 2);
      child.scale.setScalar(s);
    });
  });

  return (
    <group ref={groupRef}>
      {depositsData.map((d, i) => (
        <mesh key={i} position={d.pos}>
          <sphereGeometry args={[1, 6, 6]} />
          <meshStandardMaterial
            color="#4a3520"
            emissive="#8b4513"
            emissiveIntensity={0.3}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ═══════ Main Scene ═══════ */
function CarScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.15) * 0.3 + 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <CarBody />
      <EngineInternals />
      <FlowParticles />
      <ScanRing />
      <CarbonDeposits />
    </group>
  );
}

/* ═══════ Export ═══════ */
export function CarXRayAnimation() {
  return (
    <div className="w-full h-[500px] md:h-[600px] relative">
      <Canvas
        camera={{ position: [4, 2, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={0.8} color="#22c55e" />
          <pointLight position={[-5, 3, -3]} intensity={0.4} color="#16a34a" />
          <spotLight
            position={[0, 5, 0]}
            angle={0.5}
            penumbra={0.8}
            intensity={0.6}
            color="#4ade80"
          />

          <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
            <CarScene />
          </Float>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Icosahedron, TorusKnot, Stars, Trail, useScroll,
  MeshDistortMaterial, Float
} from '@react-three/drei';
import * as THREE from 'three';

/* ── Pulsing core orb ── */
function CoreOrb() {
  const orbGroupRef = useRef();
  const innerRef = useRef();
  
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (innerRef.current) {
      innerRef.current.rotation.x = t * 0.2;
      innerRef.current.rotation.y = t * 0.3;
    }
    if (orbGroupRef.current) {
      // Spin the entire globe (wireframe and rings)
      orbGroupRef.current.rotation.y = t * 0.5;
      orbGroupRef.current.rotation.z = Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <group ref={orbGroupRef}>
      {/* Inner solid */}
      <Icosahedron ref={innerRef} args={[1.2, 2]}>
        <MeshDistortMaterial
          color="#0dcfc0"
          emissive="#003820"
          emissiveIntensity={0.6}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.18}
        />
      </Icosahedron>
      {/* Wireframe shell */}
      <Icosahedron args={[1.28, 2]}>
        <meshStandardMaterial
          color="#39d353"
          emissive="#39d353"
          emissiveIntensity={1.2}
          wireframe
        />
      </Icosahedron>
      {/* Outer glow rings */}
      <group>
        <mesh>
          <torusGeometry args={[1.6, 0.015, 8, 80]} />
          <meshBasicMaterial color="#00ff88" transparent opacity={0.6} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.7, 0.01, 8, 80]} />
          <meshBasicMaterial color="#0dcfc0" transparent opacity={0.4} />
        </mesh>
      </group>
    </group>
  );
}

/* ── Orbiting particle band ── */
function ParticleBand({ radius = 3, count = 300, color = '#39d353' }) {
  const pointsRef = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const spread = (Math.random() - 0.5) * 0.6;
      const r = radius + spread;
      arr[i * 3] = Math.cos(angle) * r;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 1.2;
      arr[i * 3 + 2] = Math.sin(angle) * r;
    }
    return arr;
  }, [count, radius]);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.elapsedTime * 0.06;
      pointsRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.1) * 0.15;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.04} sizeAttenuation transparent opacity={0.7} />
    </points>
  );
}

/* ── Outer floating debris ── */
function FloatingDebris({ count = 120 }) {
  const pointsRef = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 4;
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      arr[i * 3] = r * Math.cos(theta) * Math.sin(phi);
      arr[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.elapsedTime * 0.04;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#00d4cc" size={0.025} sizeAttenuation transparent opacity={0.5} />
    </points>
  );
}

/* ── Tactical Cyber Drone (Warfare Element) ── */
function CyberDrone() {
  const droneRef = useRef();
  const gunRef = useRef();
  
  useFrame(({ clock }) => {
    if (!droneRef.current || !gunRef.current) return;
    const t = clock.elapsedTime;
    // Hovering motion pattern
    droneRef.current.position.y = Math.sin(t * 1.5) * 0.3 + 2.0;
    droneRef.current.position.x = Math.cos(t * 0.8) * 0.5 + 2.5;
    droneRef.current.position.z = Math.sin(t * 0.5) * 0.2 + 1.0;
    
    // Aggressive scanning rotation
    droneRef.current.rotation.y = Math.sin(t * 0.5) * 0.8;
    droneRef.current.rotation.z = Math.sin(t * 1.2) * 0.15;
    droneRef.current.rotation.x = Math.sin(t * 2) * 0.1;

    // Recoil/Radar animation on the guns
    gunRef.current.rotation.x = t * 2;
  });

  return (
    <group ref={droneRef} scale={0.7}>
      {/* Central Core Shell */}
      <mesh>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color="#041a14" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Inner Glowing Eye (Red Target Lock) */}
      <mesh position={[0, 0, 0.38]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
      
      {/* Tactical Wireframe Shield */}
      <mesh>
        <octahedronGeometry args={[0.65, 0]} />
        <meshBasicMaterial color="#39d353" wireframe transparent opacity={0.4} />
      </mesh>

      {/* Orbiting Radar Targeting Rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.015, 16, 64]} />
        <meshBasicMaterial color="#0dcfc0" transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.005, 16, 64]} />
        <meshBasicMaterial color="#ef4444" transparent opacity={0.3} />
      </mesh>
      
      {/* Vertical crosshair axis */}
      <mesh>
        <cylinderGeometry args={[0.005, 0.005, 3.5, 4]} />
        <meshBasicMaterial color="#39d353" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.005, 0.005, 3.5, 4]} />
        <meshBasicMaterial color="#39d353" transparent opacity={0.3} />
      </mesh>

      {/* Twin Pulse Cannons */}
      <group ref={gunRef}>
        <mesh position={[0.6, 0.2, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.06, 0.6, 8]} />
          <meshStandardMaterial color="#020806" metalness={1} />
        </mesh>
        <mesh position={[-0.6, 0.2, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.06, 0.6, 8]} />
          <meshStandardMaterial color="#020806" metalness={1} />
        </mesh>
      </group>
      
      {/* Engine Thrust Glow */}
      <mesh position={[0, -0.6, 0]}>
        <coneGeometry args={[0.25, 1.0, 16]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

/* ── Point light that orbits ── */
function OrbitLight() {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.position.set(
      Math.cos(t * 0.5) * 4,
      Math.sin(t * 0.3) * 2,
      Math.sin(t * 0.5) * 4
    );
  });
  return <pointLight ref={ref} color="#39d353" intensity={2} distance={12} />;
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.1} color="#041a14" />
      <directionalLight position={[5, 8, 5]} intensity={0.4} color="#39d353" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#0dcfc0" />

      <Suspense fallback={null}>
        <Stars radius={60} depth={30} count={2000} factor={3} fade speed={0.3} />
        
        {/* Main Globe Cluster - Shifted further to the right */}
        <group position={[3.2, 0, -1]}>
          <OrbitLight />
          <CoreOrb />
          <ParticleBand radius={3} count={280} color="#39d353" />
          <ParticleBand radius={4.2} count={160} color="#0dcfc0" />
          <FloatingDebris count={100} />
        </group>
      </Suspense>
    </Canvas>
  );
}

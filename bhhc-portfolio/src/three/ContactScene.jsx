import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Trail } from '@react-three/drei';
import * as THREE from 'three';

function Envelope() {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.4) * 0.3;
    groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.3) * 0.05;
  });

  const matProps = { color: '#0dcfc0', emissive: '#0dcfc0', emissiveIntensity: 0.5, metalness: 0.6, roughness: 0.3 };

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.6}>
      <group ref={groupRef}>
        {/* Envelope body */}
        <mesh>
          <boxGeometry args={[2.2, 1.4, 0.06]} />
          <meshStandardMaterial color="#050f0a" emissive="#001a0a" emissiveIntensity={0.2} metalness={0.2} roughness={0.6} />
        </mesh>

        {/* Envelope border lines */}
        {[
          [[0, 0, 0.032], [2.22, 1.42, 0.04]],
        ].map((_, i) => null)}

        {/* Flap (top triangle) */}
        <mesh position={[0, 0.7, 0.04]}>
          <coneGeometry args={[1.56, 0.9, 3]} />
          <meshStandardMaterial {...matProps} />
        </mesh>

        {/* Seal circle */}
        <mesh position={[0, 0, 0.06]}>
          <circleGeometry args={[0.22, 32]} />
          <meshStandardMaterial color="#39d353" emissive="#39d353" emissiveIntensity={1.5} />
        </mesh>

        {/* Bottom triangles */}
        <mesh position={[-0.55, -0.35, 0.04]} rotation={[0, 0, Math.PI / 4]}>
          <planeGeometry args={[1.1, 1.1]} />
          <meshStandardMaterial {...matProps} transparent opacity={0.7} />
        </mesh>
        <mesh position={[0.55, -0.35, 0.04]} rotation={[0, 0, -Math.PI / 4]}>
          <planeGeometry args={[1.1, 1.1]} />
          <meshStandardMaterial {...matProps} transparent opacity={0.7} />
        </mesh>

        {/* Neon outline frame */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(2.2, 1.4, 0.06)]} />
          <lineBasicMaterial color="#00ff88" />
        </lineSegments>

        {/* Glowing point on seal */}
        <pointLight color="#39d353" intensity={2} distance={3} position={[0, 0, 0.3]} />
      </group>
    </Float>
  );
}

function SignalRings() {
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    [ring1, ring2, ring3].forEach((r, i) => {
      if (!r.current) return;
      const scale = 1 + ((t * 0.3 + i * 0.4) % 1.2);
      r.current.scale.set(scale, scale, scale);
      r.current.material.opacity = Math.max(0, 0.5 - scale * 0.35);
    });
  });

  const torusProps = { args: [1.4, 0.015, 8, 60] };
  return (
    <group position={[0, 0, 0]}>
      <mesh ref={ring1}>
        <torusGeometry {...torusProps} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.5} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry {...torusProps} />
        <meshBasicMaterial color="#0dcfc0" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring3}>
        <torusGeometry {...torusProps} />
        <meshBasicMaterial color="#39d353" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

export default function ContactScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[3, 3, 3]} intensity={0.8} color="#39d353" />
      <pointLight position={[-3, -3, -3]} intensity={0.4} color="#0dcfc0" />
      <Suspense fallback={null}>
        <Envelope />
        <SignalRings />
      </Suspense>
    </Canvas>
  );
}

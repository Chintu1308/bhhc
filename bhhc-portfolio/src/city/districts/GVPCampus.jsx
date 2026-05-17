import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Building, PalmTree } from '../CityPrimitives';

/* District 3 — GVP Campus (Education + Experience) */
export default function GVPCampus() {
  const clockRef = useRef();
  const smokeRef = useRef();

  useFrame(({ clock }) => {
    if (clockRef.current) clockRef.current.rotation.y = clock.elapsedTime * 0.5;
    if (smokeRef.current) {
      smokeRef.current.position.y = 6 + Math.sin(clock.elapsedTime) * 0.3;
      smokeRef.current.material.opacity = 0.15 + Math.sin(clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <group position={[18, 0, 8]}>
      {/* ── Campus Gate ── */}
      <group position={[0, 0, 5]}>
        {/* Left pillar */}
        <mesh position={[-2, 1.5, 0]}>
          <boxGeometry args={[0.5, 3, 0.5]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.7} />
        </mesh>
        {/* Right pillar */}
        <mesh position={[2, 1.5, 0]}>
          <boxGeometry args={[0.5, 3, 0.5]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.7} />
        </mesh>
        {/* Arch */}
        <mesh position={[0, 3.2, 0]}>
          <boxGeometry args={[4.5, 0.4, 0.5]} />
          <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={0.4} />
        </mesh>
        {/* Gate sign */}
        <Text position={[0, 3.8, 0.3]} fontSize={0.22} color="#818cf8" anchorX="center"
  >
          GVP COLLEGE OF ENGINEERING
        </Text>
      </group>

      {/* ── Main Academic Building ── */}
      <Building position={[0, 0, 0]} width={5} height={4} depth={3} color="#818cf8" windowColor="#818cf8" windowRows={3} windowCols={5} />

      {/* ── Clock Tower ── */}
      <group position={[0, 0, -3]}>
        <mesh position={[0, 3.5, 0]}>
          <cylinderGeometry args={[0.3, 0.4, 7, 8]} />
          <meshStandardMaterial color="#1a1a12" metalness={0.6} />
        </mesh>
        {/* Clock face */}
        <group ref={clockRef} position={[0, 7, 0.4]}>
          <mesh>
            <circleGeometry args={[0.5, 16]} />
            <meshBasicMaterial color="#818cf8" />
          </mesh>
          {/* Clock hands */}
          <mesh position={[0, 0.15, 0.02]}>
            <boxGeometry args={[0.03, 0.35, 0.02]} />
            <meshBasicMaterial color="#050f0a" />
          </mesh>
          <mesh position={[0.1, 0.05, 0.02]} rotation={[0, 0, -0.8]}>
            <boxGeometry args={[0.02, 0.2, 0.02]} />
            <meshBasicMaterial color="#050f0a" />
          </mesh>
        </group>
        {/* Tower top */}
        <mesh position={[0, 7.5, 0]}>
          <coneGeometry args={[0.5, 1, 4]} />
          <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={0.3} />
        </mesh>
      </group>

      {/* ── JK Paper Internship Building ── */}
      <group position={[7, 0, 0]}>
        <Building position={[0, 0, 0]} width={3} height={4} depth={2.5} color="#39d353" windowColor="#39d353" windowRows={3} windowCols={3} />
        {/* Chimney */}
        <mesh position={[1, 5, -0.5]}>
          <cylinderGeometry args={[0.2, 0.3, 3, 8]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.6} />
        </mesh>
        {/* Smoke */}
        <mesh ref={smokeRef} position={[1, 6.5, -0.5]}>
          <sphereGeometry args={[0.4, 8, 8]} />
          <meshBasicMaterial color="#aaaaaa" transparent opacity={0.15} />
        </mesh>
        <Text position={[0, 4.5, 1.3]} fontSize={0.2} color="#39d353" anchorX="center"
  >
          JK PAPER LTD.
        </Text>
        <Text position={[0, 4.1, 1.3]} fontSize={0.12} color="#0dcfc0" anchorX="center"
>
          Summer Intern 2025
        </Text>
      </group>

      {/* Trees around campus */}
      {[-3, 3, -5, 5].map((x, i) => (
        <PalmTree key={i} position={[x, 0, 4]} height={2 + Math.random()} />
      ))}

      {/* Campus light */}
      <pointLight position={[0, 8, 0]} color="#818cf8" intensity={2} distance={20} />
    </group>
  );
}

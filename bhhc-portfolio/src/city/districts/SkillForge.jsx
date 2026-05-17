import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

/* District 4 — Skill Forge (Skills) */
const SKILL_ORBS = [
  { name: 'React', cat: 'frontend', color: '#39d353', angle: 0 },
  { name: 'Spring Boot', cat: 'backend', color: '#818cf8', angle: 0.9 },
  { name: 'MQTT', cat: 'iot', color: '#f59e0b', angle: 1.8 },
  { name: 'AWS', cat: 'devops', color: '#f0c040', angle: 2.7 },
  { name: 'Python', cat: 'lang', color: '#ef4444', angle: 3.6 },
  { name: 'JavaScript', cat: 'lang', color: '#00ff88', angle: 4.5 },
  { name: 'Three.js', cat: 'frontend', color: '#0dcfc0', angle: 5.4 },
  { name: 'MongoDB', cat: 'devops', color: '#a3e635', angle: 6.1 },
];

function SkillOrb({ name, color, angle, radius = 4, yOffset = 3 }) {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    const a = angle + t * 0.3;
    groupRef.current.position.x = Math.cos(a) * radius;
    groupRef.current.position.z = Math.sin(a) * radius;
    groupRef.current.position.y = yOffset + Math.sin(t * 2 + angle) * 0.3;
  });

  return (
    <group ref={groupRef}>
      {/* Orb */}
      <mesh>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} transparent opacity={0.8} />
      </mesh>
      {/* Glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.45, 0.02, 8, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} />
      </mesh>
      {/* Label */}
      <Text
        position={[0, 0.55, 0]}
        fontSize={0.15}
        color={color}
        anchorX="center"
      >
        {name}
      </Text>
      <pointLight color={color} intensity={0.5} distance={3} />
    </group>
  );
}

export default function SkillForge() {
  const coreRef = useRef();
  const ringsRef = useRef();

  useFrame(({ clock }) => {
    if (coreRef.current) {
      coreRef.current.rotation.y = clock.elapsedTime * 0.5;
      coreRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.2;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.y = -clock.elapsedTime * 0.2;
    }
  });

  return (
    <group position={[0, 0, -18]}>
      {/* ── Central Reactor Core ── */}
      <group position={[0, 4, 0]}>
        {/* Glowing core sphere */}
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1.2, 1]} />
          <meshStandardMaterial
            color="#0dcfc0"
            emissive="#39d353"
            emissiveIntensity={1.5}
            wireframe
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.8, 16, 16]} />
          <meshBasicMaterial color="#00ff88" transparent opacity={0.2} />
        </mesh>

        {/* Orbiting rings */}
        <group ref={ringsRef}>
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[2, 0.03, 8, 48]} />
            <meshBasicMaterial color="#39d353" transparent opacity={0.5} />
          </mesh>
          <mesh rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
            <torusGeometry args={[2.5, 0.02, 8, 48]} />
            <meshBasicMaterial color="#0dcfc0" transparent opacity={0.3} />
          </mesh>
        </group>

        {/* Core point light */}
        <pointLight color="#00ff88" intensity={4} distance={15} />
      </group>

      {/* ── Skill Orbs orbiting the core ── */}
      {SKILL_ORBS.map((skill, i) => (
        <SkillOrb key={i} {...skill} />
      ))}

      {/* ── Forge Base Structure ── */}
      {/* Foundation platform */}
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[6, 6]} />
        <meshStandardMaterial color="#0a1a12" metalness={0.8} />
      </mesh>
      {/* Support pillars */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 5, 1.5, Math.sin(a) * 5]}>
            <cylinderGeometry args={[0.15, 0.2, 3, 6]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.8} />
          </mesh>
        );
      })}

      {/* Title */}
      <Text
        position={[0, 8, 0]}
        fontSize={0.5}
        color="#a3e635"
        anchorX="center"

      >
        SKILL FORGE
      </Text>
    </group>
  );
}

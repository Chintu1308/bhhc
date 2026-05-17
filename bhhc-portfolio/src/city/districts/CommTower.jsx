import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

/* District 6 — Comm Tower (Contact / Blog) */
export default function CommTower() {
  const antennaRef = useRef();
  const dishRef = useRef();
  const pulseRef = useRef();

  useFrame(({ clock }) => {
    if (antennaRef.current) {
      antennaRef.current.children.forEach((child, i) => {
        if (child.material && child.material.emissiveIntensity !== undefined) {
          child.material.emissiveIntensity = 0.5 + Math.sin(clock.elapsedTime * 3 + i) * 0.5;
        }
      });
    }
    if (dishRef.current) {
      dishRef.current.rotation.y = clock.elapsedTime * 0.3;
    }
    if (pulseRef.current) {
      const scale = 1 + Math.sin(clock.elapsedTime * 2) * 0.3;
      pulseRef.current.scale.set(scale, scale, scale);
      pulseRef.current.material.opacity = 0.3 - Math.sin(clock.elapsedTime * 2) * 0.15;
    }
  });

  return (
    <group position={[0, 0, -24]}>
      {/* ── Hill base ── */}
      <mesh position={[0, 1.5, 0]}>
        <coneGeometry args={[8, 3, 8]} />
        <meshStandardMaterial color="#0a1a0e" flatShading />
      </mesh>

      {/* ── Main Tower Structure ── */}
      <group position={[0, 3, 0]}>
        {/* Tower trunk (lattice structure) */}
        <mesh position={[0, 5, 0]}>
          <cylinderGeometry args={[0.15, 0.6, 10, 4]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} />
        </mesh>
        {/* Wireframe overlay */}
        <mesh position={[0, 5, 0]}>
          <cylinderGeometry args={[0.2, 0.65, 10, 4]} />
          <meshBasicMaterial color="#39d353" wireframe transparent opacity={0.3} />
        </mesh>

        {/* Antenna array at top */}
        <group ref={antennaRef} position={[0, 10.5, 0]}>
          <mesh>
            <cylinderGeometry args={[0.02, 0.02, 2, 4]} />
            <meshStandardMaterial color="#39d353" emissive="#39d353" emissiveIntensity={0.5} />
          </mesh>
          {/* Red blinker */}
          <mesh position={[0, 1.2, 0]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={1} />
          </mesh>
          {/* Side antennas */}
          <mesh position={[0.3, 0.5, 0]} rotation={[0, 0, 0.5]}>
            <cylinderGeometry args={[0.015, 0.015, 1, 4]} />
            <meshStandardMaterial color="#39d353" emissive="#39d353" emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[-0.3, 0.5, 0]} rotation={[0, 0, -0.5]}>
            <cylinderGeometry args={[0.015, 0.015, 1, 4]} />
            <meshStandardMaterial color="#39d353" emissive="#39d353" emissiveIntensity={0.5} />
          </mesh>
        </group>

        {/* Signal pulse ring */}
        <mesh ref={pulseRef} position={[0, 11, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.5, 0.02, 8, 32]} />
          <meshBasicMaterial color="#00ff88" transparent opacity={0.3} />
        </mesh>

        {/* Platform rings along tower */}
        {[2, 4, 6, 8].map((y, i) => (
          <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.5 - i * 0.08, 0.03, 8, 16]} />
            <meshStandardMaterial color="#0dcfc0" emissive="#0dcfc0" emissiveIntensity={0.3} />
          </mesh>
        ))}
      </group>

      {/* ── Satellite Dish ── */}
      <group ref={dishRef} position={[3, 4, 2]}>
        {/* Dish */}
        <mesh rotation={[-0.5, 0, 0]}>
          <sphereGeometry args={[1, 12, 12, 0, Math.PI]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} side={2} />
        </mesh>
        {/* Feed horn */}
        <mesh position={[0, 0.8, -0.5]} rotation={[-0.5, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 1, 6]} />
          <meshStandardMaterial color="#333" metalness={0.8} />
        </mesh>
        {/* Base */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.1, 0.15, 1.5, 6]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.7} />
        </mesh>
      </group>

      {/* ── Title ── */}
      <Text
        position={[0, 15, 0]}
        fontSize={0.5}
        color="#ef4444"
        anchorX="center"

      >
        COMM TOWER
      </Text>
      <Text
        position={[0, 14.3, 0]}
        fontSize={0.2}
        color="#0dcfc0"
        anchorX="center"
      >
        Contact · Blog · Signal
      </Text>

      {/* Tower lighting */}
      <pointLight position={[0, 14, 0]} color="#ef4444" intensity={2} distance={15} />
      <pointLight position={[0, 6, 0]} color="#39d353" intensity={1.5} distance={12} />
    </group>
  );
}

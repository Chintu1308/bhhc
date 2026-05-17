import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Building } from '../CityPrimitives';

/* District 5 — Hackathon Arena + Patent HQ (Achievements) */
export default function HackathonArena() {
  const trophyRef = useRef();
  const docRef = useRef();
  const [fireworks, setFireworks] = useState([]);

  useFrame(({ clock }) => {
    if (trophyRef.current) {
      trophyRef.current.rotation.y = clock.elapsedTime * 0.8;
      trophyRef.current.position.y = 5 + Math.sin(clock.elapsedTime * 1.5) * 0.15;
    }
    if (docRef.current) {
      docRef.current.position.y = 5 + Math.sin(clock.elapsedTime * 0.8) * 0.3;
    }
  });

  return (
    <group position={[-12, 0, -12]}>
      {/* ── Hackathon Arena (Stadium) ── */}
      <group position={[0, 0, 0]}>
        {/* Stadium base - octagonal */}
        <mesh position={[0, 1.5, 0]}>
          <cylinderGeometry args={[5, 5.5, 3, 8]} />
          <meshStandardMaterial color="#0a1a12" metalness={0.5} roughness={0.4} />
        </mesh>
        {/* Inner arena floor */}
        <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[4, 8]} />
          <meshStandardMaterial color="#041a14" emissive="#39d353" emissiveIntensity={0.1} />
        </mesh>
        {/* Stadium rim glow */}
        <mesh position={[0, 3, 0]}>
          <torusGeometry args={[5, 0.08, 8, 8]} />
          <meshBasicMaterial color="#f0c040" transparent opacity={0.6} />
        </mesh>

        {/* Trophy floating above arena */}
        <group ref={trophyRef} position={[0, 5, 0]}>
          {/* Cup body */}
          <mesh>
            <cylinderGeometry args={[0.3, 0.5, 0.8, 8]} />
            <meshStandardMaterial color="#f0c040" emissive="#f0c040" emissiveIntensity={0.8} metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Cup base */}
          <mesh position={[0, -0.6, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.4, 8]} />
            <meshStandardMaterial color="#f0c040" metalness={0.9} />
          </mesh>
          <mesh position={[0, -0.9, 0]}>
            <cylinderGeometry args={[0.35, 0.35, 0.15, 8]} />
            <meshStandardMaterial color="#f0c040" metalness={0.9} />
          </mesh>
        </group>

        {/* Scoreboard */}
        <group position={[0, 4, 5.2]}>
          <mesh>
            <boxGeometry args={[6, 2.5, 0.2]} />
            <meshStandardMaterial color="#050f0a" />
          </mesh>
          <Text position={[0, 0.6, 0.15]} fontSize={0.3} color="#f0c040" anchorX="center"
    >
            HACKATHON ARENA
          </Text>
          <Text position={[0, 0, 0.15]} fontSize={0.18} color="#00ff88" anchorX="center"
>
            WoW Vizag 2025 — WINNER
          </Text>
          <Text position={[0, -0.4, 0.15]} fontSize={0.18} color="#00ff88" anchorX="center"
>
            Hack the Model — WINNER
          </Text>
        </group>
      </group>

      {/* ── Patent HQ Building ── */}
      <group position={[9, 0, 0]}>
        <Building position={[0, 0, 0]} width={3.5} height={5} depth={3} color="#f0c040" windowColor="#f0c040" windowRows={4} windowCols={3} />

        {/* Patent sign */}
        <Text position={[0, 5.5, 1.6]} fontSize={0.25} color="#f0c040" anchorX="center"
  >
          PATENT HQ
        </Text>

        {/* Floating patent document */}
        <group ref={docRef} position={[0, 5, 2]}>
          <mesh>
            <boxGeometry args={[1.2, 1.6, 0.03]} />
            <meshBasicMaterial color="#f0c040" transparent opacity={0.2} />
          </mesh>
          <mesh>
            <boxGeometry args={[1.2, 1.6, 0.03]} />
            <meshBasicMaterial color="#f0c040" wireframe transparent opacity={0.5} />
          </mesh>
          <Text position={[0, 0.4, 0.03]} fontSize={0.1} color="#f0c040" anchorX="center"
>
            INDIAN PATENT
          </Text>
          <Text position={[0, 0.15, 0.03]} fontSize={0.08} color="#0dcfc0" anchorX="center" maxWidth={1}
>
            IoT Energy Monitoring
          </Text>
        </group>
      </group>

      {/* Arena lights */}
      <pointLight position={[0, 8, 0]} color="#f0c040" intensity={3} distance={20} />
      <pointLight position={[9, 7, 0]} color="#f0c040" intensity={1.5} distance={12} />
    </group>
  );
}

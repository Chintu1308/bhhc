import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Building, StreetLamp } from '../CityPrimitives';

/* District 2 — Project District (Projects) */
export default function ProjectDistrict() {
  const globeRef = useRef();
  const craneRef = useRef();

  useFrame(({ clock }) => {
    if (globeRef.current) globeRef.current.rotation.y = clock.elapsedTime * 0.3;
    if (craneRef.current) craneRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.3) * 0.3;
  });

  return (
    <group position={[0, 0, 8]}>
      {/* ── EnergyMeter Building — Power plant aesthetic ── */}
      <group position={[-5, 0, 0]}>
        <Building position={[0, 0, 0]} width={3} height={6} depth={3} color="#f59e0b" windowColor="#f59e0b" windowRows={4} windowCols={3} />
        {/* Cooling towers */}
        <mesh position={[-1.2, 4, -1.2]}>
          <cylinderGeometry args={[0.5, 0.8, 3, 12]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.5} />
        </mesh>
        <mesh position={[1.2, 4, -1.2]}>
          <cylinderGeometry args={[0.5, 0.8, 3, 12]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.5} />
        </mesh>
        {/* Green steam from towers */}
        <pointLight position={[-1.2, 6, -1.2]} color="#39d353" intensity={1} distance={4} />
        <pointLight position={[1.2, 6, -1.2]} color="#39d353" intensity={1} distance={4} />
        {/* Sign */}
        <Text position={[0, 7, 1.6]} fontSize={0.35} color="#f59e0b" anchorX="center"
  >
          ENERGY METER
        </Text>
      </group>

      {/* ── Borderless Safety Building — Airport/globe aesthetic ── */}
      <group position={[0, 0, 0]}>
        <Building position={[0, 0, 0]} width={3.5} height={5} depth={3} color="#0dcfc0" windowColor="#0dcfc0" windowRows={3} windowCols={4} />
        {/* Globe on rooftop */}
        <group ref={globeRef} position={[0, 6.5, 0]}>
          <mesh>
            <sphereGeometry args={[0.8, 16, 16]} />
            <meshBasicMaterial color="#0dcfc0" wireframe transparent opacity={0.5} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.75, 16, 16]} />
            <meshStandardMaterial color="#041a14" transparent opacity={0.3} />
          </mesh>
        </group>
        <Text position={[0, 5.5, 1.6]} fontSize={0.3} color="#0dcfc0" anchorX="center"
  >
          BORDERLESS
        </Text>
      </group>

      {/* ── IT Service Desk Building — Corporate glass office ── */}
      <group position={[5, 0, 0]}>
        <Building position={[0, 0, 0]} width={2.5} height={5.5} depth={2.5} color="#818cf8" windowColor="#818cf8" windowRows={4} windowCols={3} />
        <Text position={[0, 6.2, 1.3]} fontSize={0.25} color="#818cf8" anchorX="center"
  >
          IT SERVICE DESK
        </Text>
      </group>

      {/* ── Construction Zone — Coming Soon ── */}
      <group ref={craneRef} position={[9, 0, 2]}>
        {/* Crane arm */}
        <mesh position={[0, 4, 0]}>
          <cylinderGeometry args={[0.05, 0.08, 8, 6]} />
          <meshStandardMaterial color="#f59e0b" />
        </mesh>
        <mesh position={[1.5, 8, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 3, 6]} />
          <meshStandardMaterial color="#f59e0b" />
        </mesh>
        {/* Scaffolding base */}
        <mesh position={[0, 1.5, 0]}>
          <boxGeometry args={[2, 3, 2]} />
          <meshBasicMaterial color="#f59e0b" wireframe transparent opacity={0.3} />
        </mesh>
        <Text position={[0, 3.5, 1.1]} fontSize={0.18} color="#f59e0b" anchorX="center"
>
          COMING SOON
        </Text>
      </group>

      {/* Street lamps and roads */}
      <StreetLamp position={[-7, 0, 3]} color="#f59e0b" />
      <StreetLamp position={[3, 0, 3]} color="#0dcfc0" />

      {/* District light */}
      <pointLight position={[0, 10, 0]} color="#f59e0b" intensity={2} distance={20} />
    </group>
  );
}

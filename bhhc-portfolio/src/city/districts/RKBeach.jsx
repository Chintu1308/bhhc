import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Building, PalmTree, StreetLamp, OceanPlane } from '../CityPrimitives';

/* District 0 — RK Beach Promenade (Hero / Landing) */
export default function RKBeach() {
  const signRef = useRef();
  const subRef = useRef();

  useFrame(({ clock }) => {
    if (signRef.current) {
      signRef.current.position.y = 4 + Math.sin(clock.elapsedTime * 1.5) * 0.15;
    }
    if (subRef.current) {
      subRef.current.rotation.y = clock.elapsedTime * 0.1;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Ocean */}
      <OceanPlane size={60} />

      {/* Beach ground (sand) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 5]}>
        <planeGeometry args={[20, 12]} />
        <meshStandardMaterial color="#1a1a0e" />
      </mesh>

      {/* Promenade walkway */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 8]}>
        <planeGeometry args={[18, 2]} />
        <meshStandardMaterial color="#111a14" />
      </mesh>

      {/* Giant BHHC.EXE sign floating above the beach */}
      <Text
        ref={signRef}
        position={[0, 4, 2]}
        fontSize={2}
        color="#00ff88"

        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#39d353"
      >
        BHHC.EXE
      </Text>

      {/* Subtitle */}
      <Text
        position={[0, 2.5, 2]}
        fontSize={0.4}
        color="#0dcfc0"
        anchorX="center"
        anchorY="middle"
      >
        Building things that work. Breaking things that don't.
      </Text>

      {/* INS Kursura Submarine */}
      <group ref={subRef} position={[-6, 0.3, 2]}>
        {/* Hull */}
        <mesh rotation={[0, 0, 0]}>
          <capsuleGeometry args={[0.4, 2.5, 8, 16]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Conning tower */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[0.3, 0.5, 0.6]} />
          <meshStandardMaterial color="#111111" metalness={0.8} />
        </mesh>
        {/* Periscope */}
        <mesh position={[0, 1, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.5, 6]} />
          <meshStandardMaterial color="#333" metalness={0.9} />
        </mesh>
      </group>

      {/* Palm trees along the promenade */}
      {[-7, -4, -1, 2, 5, 8].map((x, i) => (
        <PalmTree key={i} position={[x, 0, 9.5]} height={2 + Math.random()} />
      ))}

      {/* Street lamps */}
      {[-8, -3, 3, 8].map((x, i) => (
        <StreetLamp key={i} position={[x, 0, 7.5]} color="#f0c040" />
      ))}

      {/* Beach district point light */}
      <pointLight position={[0, 5, 3]} color="#0dcfc0" intensity={2} distance={20} />
    </group>
  );
}

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Building, StreetLamp } from '../CityPrimitives';

/* District 1 — Tech HQ Tower (About / Bio) */
export default function TechHQTower() {
  const holoRef = useRef();
  const logoRef = useRef();

  useFrame(({ clock }) => {
    if (holoRef.current) {
      holoRef.current.rotation.y = clock.elapsedTime * 0.8;
    }
    if (logoRef.current) {
      logoRef.current.position.y = 12.5 + Math.sin(clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group position={[12, 0, 0]}>
      {/* Main HQ Skyscraper */}
      <Building
        position={[0, 0, 0]}
        width={3}
        height={12}
        depth={3}
        color="#39d353"
        windowColor="#00ff88"
        windowRows={8}
        windowCols={4}
      />

      {/* Glowing BHHC logo on top */}
      <group ref={logoRef}>
        <Text
          position={[0, 12.5, 1.6]}
          fontSize={0.6}
          color="#00ff88"
  
          anchorX="center"
        >
          BHHC
        </Text>
      </group>

      {/* Rotating hologram beside tower */}
      <group ref={holoRef} position={[4, 5, 0]}>
        {/* Holographic card */}
        <mesh>
          <boxGeometry args={[1.8, 2.4, 0.05]} />
          <meshBasicMaterial color="#0dcfc0" transparent opacity={0.15} />
        </mesh>
        <mesh>
          <boxGeometry args={[1.8, 2.4, 0.05]} />
          <meshBasicMaterial color="#0dcfc0" wireframe transparent opacity={0.4} />
        </mesh>
        <Text
          position={[0, 0.6, 0.04]}
          fontSize={0.2}
          color="#00ff88"
          anchorX="center"

        >
          BONGU HARI
        </Text>
        <Text
          position={[0, 0.3, 0.04]}
          fontSize={0.2}
          color="#00ff88"
          anchorX="center"

        >
          HARA CHARAN
        </Text>
        <Text
          position={[0, -0.1, 0.04]}
          fontSize={0.12}
          color="#0dcfc0"
          anchorX="center"

        >
          DevSecOps Engineer
        </Text>
        <Text
          position={[0, -0.4, 0.04]}
          fontSize={0.1}
          color="#39d353"
          anchorX="center"

        >
          GVP · CSE · 2022-2026
        </Text>
      </group>

      {/* Neighboring smaller buildings */}
      <Building position={[-4, 0, 2]} width={1.5} height={5} depth={1.5} color="#0dcfc0" windowColor="#0dcfc0" windowRows={3} windowCols={2} />
      <Building position={[4, 0, -2]} width={2} height={7} depth={2} color="#39d353" windowColor="#39d353" windowRows={5} windowCols={3} />
      <Building position={[-3, 0, -3]} width={1.8} height={4} depth={1.8} color="#818cf8" windowColor="#818cf8" windowRows={3} windowCols={2} />

      {/* Street lamps */}
      <StreetLamp position={[-2, 0, 3]} />
      <StreetLamp position={[2, 0, 3]} />

      {/* District light */}
      <pointLight position={[0, 14, 0]} color="#39d353" intensity={3} distance={25} />
      <pointLight position={[4, 6, 0]} color="#0dcfc0" intensity={1} distance={10} />
    </group>
  );
}

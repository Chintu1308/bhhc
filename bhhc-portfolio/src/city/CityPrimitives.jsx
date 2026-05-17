import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════
   HIGH-END PROCEDURAL CITY PRIMITIVES
   PBR Materials · Glass Facades · Neon Accents
   ═══════════════════════════════════════════════ */

/* ── Glass Skyscraper ── */
export function Building({
  position = [0, 0, 0],
  width = 1,
  height = 3,
  depth = 1,
  color = '#39d353',
  emissive = '#39d353',
  emissiveIntensity = 0.15,
  windowColor = '#00ff88',
  windowRows = 4,
  windowCols = 3,
  glassOpacity = 0.35,
  rooftopDetail = true,
}) {
  const meshRef = useRef();

  // Generate window pattern — lit/unlit randomization is memoized
  const windowPattern = useMemo(() =>
    Array.from({ length: windowRows * windowCols }, () => Math.random() > 0.2),
    [windowRows, windowCols]
  );

  return (
    <group position={position}>
      <RigidBody type="fixed" colliders="cuboid">
        {/* ── Main glass body ── */}
        <mesh position={[0, height / 2, 0]} ref={meshRef} castShadow receiveShadow>
          <boxGeometry args={[width, height, depth]} />
          <meshPhysicalMaterial
            color="#080e0a"
            metalness={0.95}
            roughness={0.05}
            clearcoat={1}
            clearcoatRoughness={0.1}
            reflectivity={1}
            envMapIntensity={1.5}
          />
        </mesh>
      </RigidBody>

      {/* ── Glass facade overlay ── */}
      <mesh position={[0, height / 2, depth / 2 + 0.005]}>
        <planeGeometry args={[width * 0.98, height * 0.98]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={glassOpacity}
          metalness={0.8}
          roughness={0.1}
          clearcoat={0.5}
        />
      </mesh>

      {/* ── Emissive windows on front face ── */}
      {windowPattern.map((lit, idx) => {
        const row = Math.floor(idx / windowCols);
        const col = idx % windowCols;
        const ww = (width * 0.75) / windowCols;
        const wh = (height * 0.65) / windowRows;
        const gapX = (width * 0.05);
        const gapY = (height * 0.08);
        const startX = -width * 0.375 + ww * 0.5 + gapX;
        const startY = height * 0.12;
        const x = startX + col * (ww + gapX * 0.5);
        const y = startY + row * (wh + gapY * 0.3);

        return (
          <mesh key={idx} position={[x, y, depth / 2 + 0.015]}>
            <planeGeometry args={[ww * 0.85, wh * 0.75]} />
            <meshBasicMaterial
              color={lit ? windowColor : '#030a06'}
              transparent
              opacity={lit ? 0.9 : 0.4}
            />
          </mesh>
        );
      })}

      {/* ── LED accent strips (horizontal) ── */}
      {[0.25, 0.5, 0.75].map((frac, i) => (
        <mesh key={`led-${i}`} position={[0, height * frac, depth / 2 + 0.012]}>
          <planeGeometry args={[width * 0.95, 0.015]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} />
        </mesh>
      ))}

      {/* ── Vertical edge neon strips ── */}
      {[-1, 1].map((side) => (
        <mesh key={`edge-${side}`} position={[side * width / 2, height / 2, depth / 2 + 0.01]}>
          <planeGeometry args={[0.02, height * 0.9]} />
          <meshBasicMaterial color={color} transparent opacity={0.3} />
        </mesh>
      ))}

      {/* ── Rooftop detail ── */}
      {rooftopDetail && (
        <group position={[0, height, 0]}>
          {/* Roof slab */}
          <mesh position={[0, 0.04, 0]}>
            <boxGeometry args={[width + 0.08, 0.08, depth + 0.08]} />
            <meshStandardMaterial color="#0a1410" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Accent trim */}
          <mesh position={[0, 0.1, 0]}>
            <boxGeometry args={[width + 0.12, 0.02, depth + 0.12]} />
            <meshBasicMaterial color={color} transparent opacity={0.6} />
          </mesh>
          {/* AC unit */}
          <mesh position={[width * 0.2, 0.2, -depth * 0.2]}>
            <boxGeometry args={[0.3, 0.2, 0.3]} />
            <meshStandardMaterial color="#111" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Antenna */}
          <mesh position={[-width * 0.3, 0.4, depth * 0.15]}>
            <cylinderGeometry args={[0.01, 0.015, 0.7, 4]} />
            <meshStandardMaterial color="#222" metalness={0.9} />
          </mesh>
        </group>
      )}

      {/* ── Base glow ── */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width + 0.5, depth + 0.5]} />
        <meshBasicMaterial color={color} transparent opacity={0.04} />
      </mesh>
    </group>
  );
}

/* ── Palm Tree (detailed low-poly) ── */
export function PalmTree({ position = [0, 0, 0], height = 2.5 }) {
  return (
    <group position={position}>
      {/* Trunk — curved segments */}
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[0.04, 0.1, height, 8]} />
        <meshStandardMaterial color="#2a1a0f" roughness={0.9} />
      </mesh>
      {/* Trunk rings */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} position={[0, height * 0.2 + i * height * 0.15, 0]}>
          <torusGeometry args={[0.07 - i * 0.005, 0.01, 4, 8]} />
          <meshStandardMaterial color="#1a0f05" />
        </mesh>
      ))}
      {/* Leaves — elongated cones */}
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((angle * Math.PI) / 180) * 0.5,
            height + 0.1,
            Math.sin((angle * Math.PI) / 180) * 0.5,
          ]}
          rotation={[0.9 + Math.random() * 0.2, (angle * Math.PI) / 180, 0]}
        >
          <coneGeometry args={[0.25, 1.4, 3]} />
          <meshStandardMaterial color="#0d3a18" flatShading />
        </mesh>
      ))}
    </group>
  );
}

/* ── Street Lamp (detailed) ── */
export function StreetLamp({ position = [0, 0, 0], color = '#f0c040' }) {
  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.1, 8]} />
        <meshStandardMaterial color="#111" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Pole */}
      <mesh position={[0, 1.6, 0]}>
        <cylinderGeometry args={[0.025, 0.04, 3.2, 8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Arm */}
      <mesh position={[0.25, 3.1, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.015, 0.02, 0.6, 6]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} />
      </mesh>
      {/* Lamp housing */}
      <mesh position={[0.4, 3.15, 0]}>
        <boxGeometry args={[0.15, 0.06, 0.1]} />
        <meshStandardMaterial color="#222" metalness={0.8} />
      </mesh>
      {/* Light element */}
      <mesh position={[0.4, 3.1, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* Cone of light */}
      <mesh position={[0.4, 2, 0]}>
        <coneGeometry args={[0.8, 2.2, 16, 1, true]} />
        <meshBasicMaterial color={color} transparent opacity={0.02} side={THREE.DoubleSide} />
      </mesh>
      <pointLight position={[0.4, 3, 0]} color={color} intensity={1.5} distance={6} decay={2} />
    </group>
  );
}

/* ── Road segment with markings ── */
export function Road({ start = [0, 0, 0], end = [10, 0, 0], width = 1.8 }) {
  const dx = end[0] - start[0];
  const dz = end[2] - start[2];
  const length = Math.sqrt(dx * dx + dz * dz);
  const angle = Math.atan2(dz, dx);
  const cx = (start[0] + end[0]) / 2;
  const cz = (start[2] + end[2]) / 2;

  return (
    <group position={[cx, 0.01, cz]} rotation={[0, -angle, 0]}>
      {/* Asphalt */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[length, width]} />
        <meshStandardMaterial color="#0a0e0c" roughness={0.9} metalness={0.1} />
      </mesh>
      {/* Center dashed line */}
      {Array.from({ length: Math.floor(length / 0.8) }).map((_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[-length / 2 + i * 0.8 + 0.2, 0.005, 0]}>
          <planeGeometry args={[0.4, 0.04]} />
          <meshBasicMaterial color="#39d353" transparent opacity={0.25} />
        </mesh>
      ))}
      {/* Edge lines */}
      {[-1, 1].map(side => (
        <mesh key={side} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, side * width * 0.45]}>
          <planeGeometry args={[length * 0.95, 0.03]} />
          <meshBasicMaterial color="#0dcfc0" transparent opacity={0.15} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Animated Ocean with reflections ── */
export function OceanPlane({ size = 80 }) {
  const meshRef = useRef();
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(size, size, 128, 128);
    g.rotateX(-Math.PI / 2);
    return g;
  }, [size]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position;
    const t = clock.elapsedTime;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      pos.setY(
        i,
        Math.sin(x * 0.25 + t * 0.6) * 0.12 +
        Math.cos(z * 0.35 + t * 0.5) * 0.08 +
        Math.sin((x + z) * 0.15 + t * 0.3) * 0.06
      );
    }
    pos.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} geometry={geo} position={[0, -0.5, -35]}>
      <meshPhysicalMaterial
        color="#021015"
        metalness={0.95}
        roughness={0.05}
        clearcoat={0.8}
        clearcoatRoughness={0.2}
        transparent
        opacity={0.9}
        envMapIntensity={2}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ── Reflective Ground Plane with Grid ── */
export function GroundPlane({ size = 120 }) {
  const gridRef = useRef();

  return (
    <group>
      {/* Main ground */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[0, -0.5, 0]} receiveShadow>
          <boxGeometry args={[size, 1, size]} />
          <meshPhysicalMaterial
            color="#030806"
            metalness={0.7}
            roughness={0.4}
            clearcoat={0.3}
            clearcoatRoughness={0.8}
          />
        </mesh>
      </RigidBody>

      {/* Glowing grid lines */}
      <gridHelper
        ref={gridRef}
        args={[size, size / 2, '#39d35310', '#39d35308']}
        position={[0, 0.005, 0]}
      />

      {/* Radial glow from center */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[30, 64]} />
        <meshBasicMaterial
          color="#0dcfc0"
          transparent
          opacity={0.015}
        />
      </mesh>
    </group>
  );
}

/* ── Firefly particles (enhanced) ── */
export function Fireflies({ count = 80, range = 50 }) {
  const pointsRef = useRef();
  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = [];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * range;
      pos[i * 3 + 1] = Math.random() * 12 + 0.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * range;
      vel.push({
        x: (Math.random() - 0.5) * 0.005,
        y: (Math.random() - 0.5) * 0.003,
        z: (Math.random() - 0.5) * 0.005,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return { positions: pos, velocities: vel };
  }, [count, range]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position;
    const t = clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const v = velocities[i];
      pos.setX(i, pos.getX(i) + v.x + Math.sin(t + v.phase) * 0.002);
      pos.setY(i, pos.getY(i) + Math.sin(t * 1.5 + v.phase) * 0.003);
      pos.setZ(i, pos.getZ(i) + v.z + Math.cos(t + v.phase) * 0.002);
      // Wrap around
      if (Math.abs(pos.getX(i)) > range / 2) pos.setX(i, -pos.getX(i) * 0.9);
      if (Math.abs(pos.getZ(i)) > range / 2) pos.setZ(i, -pos.getZ(i) * 0.9);
    }
    pos.needsUpdate = true;
    // Pulse size
    pointsRef.current.material.size = 0.06 + Math.sin(t * 3) * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        color="#39d353"
        size={0.07}
        sizeAttenuation
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ── Atmospheric Dust / Volumetric particles ── */
export function AtmosphericDust({ count = 200, range = 60 }) {
  const pointsRef = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * range;
      arr[i * 3 + 1] = Math.random() * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * range;
    }
    return arr;
  }, [count, range]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position;
    const t = clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      pos.setY(i, pos.getY(i) - 0.003);
      pos.setX(i, pos.getX(i) + Math.sin(t * 0.1 + i) * 0.001);
      if (pos.getY(i) < 0) pos.setY(i, 20);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.02}
        sizeAttenuation
        transparent
        opacity={0.15}
        depthWrite={false}
      />
    </points>
  );
}

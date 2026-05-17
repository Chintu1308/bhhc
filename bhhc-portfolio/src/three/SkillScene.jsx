import { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Line } from '@react-three/drei';
import * as THREE from 'three';

const SKILL_NODES = [
  { id: 'bhhc',   label: 'DevSecOps Core', pos: [0, 0, 0],       color: '#00ff88', size: 0.45, category: 'core' },
  // ── Ring 1: Categories (Radius 3.0)
  { id: 'sec',    label: 'App Security',   pos: [-3.0, 0, 0],    color: '#0dcfc0', size: 0.26, category: 'security' },
  { id: 'back',   label: 'Backend Sys',    pos: [3.0, 0, 0],     color: '#39d353', size: 0.26, category: 'backend' },
  { id: 'ops',    label: 'Cloud & Ops',    pos: [0, 0, 3.0],     color: '#a3e635', size: 0.26, category: 'devops' },
  { id: 'lang',   label: 'Languages',      pos: [0, 0, -3.0],    color: '#818cf8', size: 0.26, category: 'lang' },

  // ── Ring 2: Security Sub-skills (Radius 5.5, around -X axis)
  { id: 'owasp',  label: 'OWASP Top 10',   pos: [-5.0, 0, 2.2],  color: '#0dcfc0', size: 0.18, category: 'security' },
  { id: 'pentest',label: 'Pen Testing',    pos: [-5.5, 0, 0],    color: '#0dcfc0', size: 0.18, category: 'security' },
  { id: 'rbac',   label: 'RBAC/IAM',       pos: [-5.0, 0, -2.2], color: '#0dcfc0', size: 0.18, category: 'security' },

  // ── Ring 2: Backend Sub-skills (Radius 5.5, around +X axis)
  { id: 'spring', label: 'Spring Boot',    pos: [5.0, 0, -2.2],  color: '#39d353', size: 0.18, category: 'backend' },
  { id: 'micro',  label: 'Microservices',  pos: [5.5, 0, 0],     color: '#39d353', size: 0.18, category: 'backend' },
  { id: 'db',     label: 'SQL / NoSQL',    pos: [5.0, 0, 2.2],   color: '#39d353', size: 0.18, category: 'backend' },

  // ── Ring 2: DevOps Sub-skills (Radius 5.5, around +Z axis)
  { id: 'aws',    label: 'AWS / Cloud',    pos: [2.2, 0, 5.0],   color: '#a3e635', size: 0.18, category: 'devops' },
  { id: 'docker', label: 'Docker / K8s',   pos: [0, 0, 5.5],     color: '#a3e635', size: 0.18, category: 'devops' },
  { id: 'cicd',   label: 'CI/CD Pipelines',pos: [-2.2, 0, 5.0],  color: '#a3e635', size: 0.18, category: 'devops' },

  // ── Ring 2: Lang Sub-skills (Radius 5.5, around -Z axis)
  { id: 'python', label: 'Python / Bash',  pos: [-2.2, 0, -5.0], color: '#818cf8', size: 0.18, category: 'lang' },
  { id: 'java',   label: 'Java / C++',     pos: [0, 0, -5.5],    color: '#818cf8', size: 0.18, category: 'lang' },
  { id: 'react',  label: 'React / JS',     pos: [2.2, 0, -5.0],  color: '#818cf8', size: 0.18, category: 'lang' },
];

const CONNECTIONS = [
  ['bhhc','sec'],['bhhc','back'],['bhhc','ops'],['bhhc','lang'],
  ['sec','owasp'],['sec','pentest'],['sec','rbac'],
  ['back','spring'],['back','micro'],['back','db'],
  ['ops','aws'],['ops','docker'],['ops','cicd'],
  ['lang','python'],['lang','java'],['lang','react'],
];

function SkillNode({ node, onHover }) {
  const meshRef = useRef();
  const glowRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    // Nodes float up and down slightly depending on distance from center
    const dist = Math.sqrt(node.pos[0]**2 + node.pos[2]**2);
    meshRef.current.position.y = node.pos[1] + Math.sin(t * 0.8 + dist) * 0.2;
    const s = hovered ? 1.6 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.12);
    if (glowRef.current) {
      glowRef.current.material.opacity = hovered
        ? 0.22
        : 0.06 + Math.sin(t * 1.5 + node.pos[0]) * 0.03;
    }
  });

  return (
    <group position={[node.pos[0], node.pos[1], node.pos[2]]}>
      {/* Outer glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[node.size * 2.4, 16, 16]} />
        <meshStandardMaterial color={node.color} transparent opacity={0.06} emissive={node.color} emissiveIntensity={0.2} />
      </mesh>

      {/* Core node */}
      <mesh
        ref={meshRef}
        onPointerEnter={(e) => { e.stopPropagation(); setHovered(true); onHover(node); }}
        onPointerLeave={() => { setHovered(false); onHover(null); }}
        cursor="pointer"
      >
        <sphereGeometry args={[node.size, 32, 32]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={hovered ? 3 : 1.2}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Ring accent for core node */}
      {node.id === 'bhhc' && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.7, 0.018, 8, 60]} />
          <meshBasicMaterial color="#00ff88" transparent opacity={0.8} />
        </mesh>
      )}

      {/* HTML label */}
      <Html
        position={[0, node.size + 0.28, 0]}
        center
        style={{ pointerEvents: 'none', userSelect: 'none' }}
        distanceFactor={10}
      >
        <div style={{
          color: hovered ? '#fff' : node.color,
          fontSize: node.id === 'bhhc' ? '13px' : '9px',
          fontFamily: 'JetBrains Mono, monospace',
          fontWeight: node.id === 'bhhc' ? '700' : '500',
          whiteSpace: 'nowrap',
          textShadow: `0 0 8px ${node.color}`,
          background: hovered ? `${node.color}22` : 'transparent',
          padding: hovered ? '1px 5px' : '0',
          borderRadius: '3px',
          transition: 'all 0.2s',
        }}>
          {node.label}
        </div>
      </Html>

      {hovered && <pointLight color={node.color} intensity={3} distance={4} />}
    </group>
  );
}

function ConnectionLine({ from, to }) {
  const a = SKILL_NODES.find(n => n.id === from);
  const b = SKILL_NODES.find(n => n.id === to);
  if (!a || !b) return null;
  return (
    <Line
      points={[new THREE.Vector3(...a.pos), new THREE.Vector3(...b.pos)]}
      color="#39d353"
      lineWidth={0.6}
      transparent
      opacity={0.18}
    />
  );
}

function OrbitRings() {
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      {/* Ring 1 - Categories */}
      <mesh>
        <torusGeometry args={[3.0, 0.008, 16, 100]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.15} />
      </mesh>
      {/* Ring 2 - Sub skills */}
      <mesh>
        <torusGeometry args={[5.5, 0.004, 16, 100]} />
        <meshBasicMaterial color="#0dcfc0" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

function Scene({ onHover }) {
  const groupRef = useRef();
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.06;
    }
  });

  return (
    <group rotation={[Math.PI / 8, 0, 0]}>
      <group ref={groupRef}>
        <OrbitRings />
        {CONNECTIONS.map(([a, b]) => <ConnectionLine key={`${a}-${b}`} from={a} to={b} />)}
        {SKILL_NODES.map(node => <SkillNode key={node.id} node={node} onHover={onHover} />)}
      </group>
    </group>
  );
}

export default function SkillScene({ onNodeHover }) {
  return (
    <Canvas
      camera={{ position: [0, 1, 9.5], fov: 55 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.4} color="#041a14" />
      <pointLight position={[6, 6, 6]} intensity={1.2} color="#39d353" />
      <pointLight position={[-6, -6, -6]} intensity={0.6} color="#0dcfc0" />
      <pointLight position={[0, 0, 6]} intensity={0.4} color="#818cf8" />

      <Suspense fallback={null}>
        <Scene onHover={onNodeHover} />
      </Suspense>
    </Canvas>
  );
}

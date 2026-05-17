import { Suspense, useRef, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Environment, KeyboardControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { EffectComposer, Bloom, ChromaticAberration, Vignette, ToneMapping } from '@react-three/postprocessing';
import { BlendFunction, ToneMappingMode } from 'postprocessing';
import { gsap } from 'gsap';
import * as THREE from 'three';

import { DISTRICTS } from './cityData';
import { GroundPlane, Fireflies, AtmosphericDust } from './CityPrimitives';
import RKBeach from './districts/RKBeach';
import TechHQTower from './districts/TechHQTower';
import ProjectDistrict from './districts/ProjectDistrict';
import GVPCampus from './districts/GVPCampus';
import SkillForge from './districts/SkillForge';
import HackathonArena from './districts/HackathonArena';
import CommTower from './districts/CommTower';
import MiniMap from './MiniMap';
import Vehicle from './Vehicle';

/* ── Professional Lighting Rig ── */
function CityLighting() {
  const spotRef = useRef();
  useFrame(({ clock }) => {
    if (spotRef.current) {
      spotRef.current.position.x = Math.sin(clock.elapsedTime * 0.05) * 20;
    }
  });

  return (
    <>
      {/* Ambient base — very low to keep shadows dramatic */}
      <ambientLight intensity={0.04} color="#0a1a14" />

      {/* Key light — warm golden directional (sunset simulation) */}
      <directionalLight
        position={[40, 25, 15]}
        intensity={0.4}
        color="#f0c040"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={100}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
      />

      {/* Fill light — cool teal from opposite side */}
      <directionalLight position={[-30, 18, -20]} intensity={0.15} color="#0dcfc0" />

      {/* Rim light — subtle backlight */}
      <directionalLight position={[0, 30, -40]} intensity={0.08} color="#818cf8" />

      {/* Moving spot — simulates helicopter/drone searchlight */}
      <spotLight
        ref={spotRef}
        position={[0, 35, 0]}
        angle={0.15}
        penumbra={0.8}
        intensity={0.6}
        color="#0dcfc0"
        distance={80}
        castShadow={false}
      />

      {/* Hemisphere for sky/ground color bleed */}
      <hemisphereLight
        skyColor="#0a1520"
        groundColor="#050a08"
        intensity={0.1}
      />

      {/* Volumetric fog */}
      <fogExp2 attach="fog" color="#050f0a" density={0.012} />
    </>
  );
}

/* ── District HUD overlay ── */
function DistrictHUD({ district, teleporting }) {
  const d = DISTRICTS[district];
  return (
    <div
      className="fixed top-20 left-6 z-50 transition-all duration-700"
      style={{ opacity: teleporting ? 0.3 : 1, transform: teleporting ? 'translateY(-10px)' : 'translateY(0)' }}
    >
      <div className="font-mono text-[9px] text-textMuted tracking-[0.3em] uppercase mb-1">
        DISTRICT {d.id.toString().padStart(2, '0')} / {DISTRICTS.length - 1}
      </div>
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{
            background: `${d.color}15`,
            border: `1px solid ${d.color}30`,
            fontSize: '1rem',
          }}
        >
          {d.icon}
        </div>
        <div>
          <span className="font-display font-bold text-base" style={{ color: d.color }}>
            {d.name}
          </span>
          <div className="font-mono text-[10px] text-textMuted">{d.tag}</div>
        </div>
      </div>
      <div
        className="font-mono text-[10px] max-w-[220px] leading-relaxed pl-1"
        style={{
          color: 'rgba(122,175,160,0.6)',
          borderLeft: `2px solid ${d.color}30`,
          paddingLeft: '8px',
        }}
      >
        {d.description}
      </div>
    </div>
  );
}

/* ── Loading screen (terminal-style) ── */
function CityLoader({ progress }) {
  const barLength = 30;
  const filled = Math.floor((progress / 100) * barLength);
  const bar = '█'.repeat(filled) + '░'.repeat(barLength - filled);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center" style={{ background: '#030806' }}>
      <div className="mb-8">
        <div className="font-mono text-[10px] text-textMuted mb-4 tracking-widest">INITIALIZING CITY ENGINE</div>
        <div
          className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(57,211,83,0.1), rgba(13,207,192,0.05))',
            border: '1px solid rgba(57,211,83,0.2)',
          }}
        >
          <span style={{ fontSize: '2rem' }}>🏙️</span>
        </div>
      </div>

      <div className="font-mono text-xs space-y-1 text-center" style={{ color: '#39d353' }}>
        <div><span className="text-textMuted">$ </span>vizag --load-city</div>
        <div className="mt-2" style={{ color: '#0dcfc0', letterSpacing: '1px' }}>[{bar}]</div>
        <div className="text-textMuted">{Math.floor(progress)}% — Loading districts...</div>
      </div>
    </div>
  );
}

const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
  { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
  { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
  { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
];

/* ═════════════════════════════════
   MAIN CITY SCENE
   ═════════════════════════════════ */
export default function CityScene({ onBack }) {
  const [currentDistrict, setCurrentDistrict] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [teleporting, setTeleporting] = useState(false);
  const scrollCooldown = useRef(false);

  // Progressive loading simulation
  useEffect(() => {
    let p = 0;
    const timer = setInterval(() => {
      p += Math.random() * 12 + 3;
      if (p >= 100) {
        p = 100;
        clearInterval(timer);
        setTimeout(() => setLoading(false), 600);
      }
      setLoadProgress(p);
    }, 250);
    return () => clearInterval(timer);
  }, []);

  // Keyboard navigation for exiting
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        onBack();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onBack]);

  const handleTeleport = useCallback((districtId) => {
    // In driving mode, minimap clicks might teleport the vehicle (not implemented yet)
    // For now we just let the vehicle drive
  }, []);

  if (loading) return <CityLoader progress={loadProgress} />;

  return (
    <KeyboardControls map={keyboardMap}>
      <div className="fixed inset-0 z-40" style={{ background: '#030806' }}>
        {/* ── 3D Canvas ── */}
        <Canvas
        camera={{
          position: DISTRICTS[0].cameraPos,
          fov: 45,
          near: 0.1,
          far: 200,
        }}
        shadows
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        dpr={[1, 2]}
        style={{ background: '#030806' }}
      >
        <CityLighting />

        <Suspense fallback={null}>
          <Physics>
            {/* Starfield sky */}
            <Stars radius={120} depth={60} count={5000} factor={4} fade speed={0.15} />

            {/* Environment map for reflections */}
            <Environment preset="night" />

            {/* Ground */}
            <GroundPlane size={120} />

            {/* Atmospheric effects */}
            <Fireflies count={60} range={55} />
            <AtmosphericDust count={150} range={60} />

            {/* ── All Districts ── */}
            <RKBeach />
            <TechHQTower />
            <ProjectDistrict />
            <GVPCampus />
            <SkillForge />
            <HackathonArena />
            <CommTower />
            
            {/* ── Vehicle ── */}
            <Vehicle setCurrentDistrict={setCurrentDistrict} />
          </Physics>

          {/* ── Post-processing pipeline ── */}
          <EffectComposer multisampling={4}>
            <Bloom
              intensity={1.2}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              radius={0.85}
              mipmapBlur
            />
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL}
              offset={[0.0005, 0.0005]}
            />
            <Vignette
              eskil={false}
              offset={0.25}
              darkness={0.7}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>

      {/* ── UI Overlays ── */}
      <DistrictHUD district={currentDistrict} teleporting={teleporting} />
      <MiniMap currentDistrict={currentDistrict} onTeleport={handleTeleport} />

      {/* Back to portfolio */}
      <button
        onClick={onBack}
        className="fixed top-20 right-6 z-50 px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all duration-300 group"
        style={{
          background: 'rgba(5,15,10,0.85)',
          border: '1px solid rgba(57,211,83,0.15)',
          color: '#39d353',
          backdropFilter: 'blur(12px)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(57,211,83,0.4)';
          e.currentTarget.style.boxShadow = '0 0 20px rgba(57,211,83,0.15)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(57,211,83,0.15)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        ← Portfolio
      </button>

      {/* Scroll hint */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 font-mono text-[9px] text-textMuted tracking-widest opacity-60">
        SCROLL · ARROWS · MINIMAP
      </div>

      {/* District progress indicator */}
      <div className="fixed bottom-0 left-0 right-0 z-50 h-[2px]">
        <div
          className="h-full transition-all duration-[2200ms] ease-in-out"
          style={{
            width: `${((currentDistrict + 1) / DISTRICTS.length) * 100}%`,
            background: `linear-gradient(90deg, ${DISTRICTS[currentDistrict]?.color || '#39d353'}, transparent)`,
            boxShadow: `0 0 10px ${DISTRICTS[currentDistrict]?.color || '#39d353'}40`,
          }}
        />
      </div>

        {/* Teleport flash overlay */}
        <div
          className="fixed inset-0 pointer-events-none z-[45] transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at center, ${DISTRICTS[currentDistrict]?.color}08, transparent 70%)`,
            opacity: teleporting ? 1 : 0,
          }}
        />
      </div>
    </KeyboardControls>
  );
}

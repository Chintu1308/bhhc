import { lazy, Suspense, useState } from 'react';
import SectionReveal from './SectionReveal';

const SkillScene = lazy(() => import('../three/SkillScene'));

const CATEGORY_META = {
  core:     { label: 'Core',          color: '#00ff88' },
  frontend: { label: 'Frontend',      color: '#0dcfc0' },
  backend:  { label: 'Backend',       color: '#39d353' },
  devops:   { label: 'DevOps/Cloud',  color: '#a3e635' },
  iot:      { label: 'IoT/Hardware',  color: '#f59e0b' },
  lang:     { label: 'Languages',     color: '#818cf8' },
};

const NODE_CONTEXT = {
  bhhc:   'The center of the skill universe',
  react:  'EnergyMeter, Borderless Safety, IT Desk',
  html:   'Foundation of all web UI work',
  figma:  'UI design & high-fidelity prototyping',
  framer: 'Component animations & micro-interactions',
  spring: 'Backend for IT Service Desk @ JK Paper',
  rest:   'RESTful API design across all projects',
  rbac:   'Enterprise role-based access control',
  git:    'Version control across all projects',
  aws:    'Cloud deployment & services',
  mongo:  'NoSQL database in EnergyMeter',
  mqtt:   'Real-time messaging in EnergyMeter IoT',
  ws:     'Live telemetry streaming',
  supa:   'Backend-as-a-service in EnergyMeter',
  js:     'Primary language across all frontend',
  java:   'Spring Boot enterprise backend',
  python: 'IoT device scripts & ML experiments',
  cpp:    'Systems programming & competitive coding',
};

export default function Skills() {
  const [hovered, setHovered] = useState(null);

  return (
    <SectionReveal
      id="skills"
      chapter="05"
      label="Chapter 05 · The Arsenal"
      title="The Skill Forge"
      sub="./skill-tree --render 3d --interactive"
      color="#a3e635"
      bgVariant="right"
    >
      <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-start">
        {/* 3D Canvas */}
        <div
          className="relative rounded-2xl border overflow-hidden"
          style={{
            height: 'clamp(420px, 62vh, 660px)',
            borderColor: 'rgba(163,230,53,0.15)',
            background: 'rgba(0,255,136,0.01)',
            boxShadow: '0 0 60px rgba(57,211,83,0.04)',
          }}
        >
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="font-mono text-xs text-textMuted text-center animate-pulse">
                <div className="text-3xl mb-3" style={{ filter: 'drop-shadow(0 0 12px #39d353)' }}>⚡</div>
                &gt; Loading 3D forge...
              </div>
            </div>
          }>
            <SkillScene onNodeHover={setHovered} />
          </Suspense>

          {/* Corner brackets */}
          {[['top-3 left-3','border-t border-l'],['top-3 right-3','border-t border-r'],
            ['bottom-3 left-3','border-b border-l'],['bottom-3 right-3','border-b border-r']].map(([pos, b]) => (
            <div key={pos} className={`absolute ${pos} w-5 h-5 ${b} border-accent/25`} />
          ))}

          {/* Hint overlay */}
          <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
            <span className="font-mono text-[10px] text-textMuted bg-background/60 px-3 py-1 rounded-full backdrop-blur-sm">
              Hover nodes · Drag to rotate
            </span>
          </div>
        </div>

        {/* Info panel */}
        <div className="flex flex-col gap-4">
          {/* Hover card */}
          <div
            className="rounded-2xl p-5 border transition-all duration-400"
            style={{
              background: hovered ? `${hovered.color}0d` : 'rgba(0,255,136,0.02)',
              borderColor: hovered ? `${hovered.color}44` : 'rgba(0,255,136,0.1)',
              boxShadow: hovered ? `0 0 30px ${hovered.color}18` : 'none',
              minHeight: 120,
            }}
          >
            {hovered ? (
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 rounded-full" style={{ background: hovered.color, boxShadow: `0 0 10px ${hovered.color}` }} />
                  <span className="font-display font-bold text-lg" style={{ color: hovered.color }}>{hovered.label}</span>
                </div>
                <div className="font-mono text-[10px] text-textMuted uppercase tracking-widest mb-3">
                  {CATEGORY_META[hovered.category]?.label}
                </div>
                <div className="h-px mb-3" style={{ background: `${hovered.color}22` }} />
                <p className="font-mono text-xs text-textMuted leading-relaxed">
                  {NODE_CONTEXT[hovered.id] || 'Core skill in the stack'}
                </p>
              </div>
            ) : (
              <div className="font-mono text-xs text-textMuted h-full flex flex-col justify-center">
                <div className="text-primary mb-2">$ hover --node</div>
                <div>&gt; Waiting for selection...</div>
                <span className="cursor-blink inline-block w-2 h-3 bg-primary mt-2" />
              </div>
            )}
          </div>

          {/* Category legend */}
          <div className="rounded-2xl p-5 border glass" style={{ borderColor: 'rgba(0,255,136,0.08)' }}>
            <p className="font-mono text-xs text-textMuted mb-4">$ legend --colors</p>
            <div className="space-y-2.5">
              {Object.entries(CATEGORY_META).map(([key, { label, color }]) => (
                <div key={key} className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
                  <span className="font-mono text-xs text-textMuted">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

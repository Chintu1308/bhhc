import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// OSI model — 7 layers, bottom to top
const OSI_LAYERS = [
  { num: 1, name: 'Physical',     abbr: 'PHY', section: 'about',        color: '#64748b', desc: 'Foundation',  proto: 'Ethernet · WiFi' },
  { num: 2, name: 'Data Link',    abbr: 'DL',  section: 'experience',   color: '#3b82f6', desc: 'Connection',  proto: 'MAC · Switch' },
  { num: 3, name: 'Network',      abbr: 'NET', section: 'projects',     color: '#0dcfc0', desc: 'Routing',     proto: 'IP · OSPF' },
  { num: 4, name: 'Transport',    abbr: 'TRP', section: 'skills',       color: '#39d353', desc: 'Reliability', proto: 'TCP · UDP' },
  { num: 5, name: 'Session',      abbr: 'SES', section: 'achievements', color: '#a3e635', desc: 'State',       proto: 'Socket · Auth' },
  { num: 6, name: 'Presentation', abbr: 'PRS', section: 'blog',         color: '#f59e0b', desc: 'Format',    proto: 'TLS · JSON' },
  { num: 7, name: 'Application',  abbr: 'APP', section: 'contact',      color: '#00ff88', desc: 'Interface',   proto: 'HTTPS · DNS' },
];

function LayerBar({ layer, active, current }) {
  return (
    <div
      className="relative flex items-center gap-1.5 px-1.5 py-1 rounded transition-all duration-500"
      style={{
        background: active ? `${layer.color}12` : 'transparent',
        borderLeft: `2px solid ${active ? layer.color : 'rgba(255,255,255,0.06)'}`,
        opacity: active ? 1 : 0.3,
        transform: active ? 'translateX(0)' : 'translateX(-4px)',
      }}
    >
      {/* Layer number */}
      <span
        className="font-mono flex-shrink-0"
        style={{ fontSize: '8px', color: active ? layer.color : 'rgba(255,255,255,0.2)', fontWeight: 700, width: '10px' }}
      >
        L{layer.num}
      </span>

      {/* Layer name */}
      <span
        className="font-mono truncate"
        style={{ fontSize: '9px', color: active ? layer.color : 'rgba(255,255,255,0.2)', fontWeight: current ? 700 : 400, flex: 1 }}
      >
        {layer.abbr}
        {active && <span style={{ opacity: 0.55, fontSize: '8px' }}> · {layer.desc}</span>}
      </span>

      {/* Status dot */}
      {active && (
        <span
          className="flex-shrink-0 rounded-full"
          style={{
            width: '5px', height: '5px',
            background: layer.color,
            boxShadow: `0 0 5px ${layer.color}`,
            animation: current ? 'glow-pulse 1.2s ease infinite' : 'none',
          }}
        />
      )}
    </div>
  );
}

// SVG stack diagram — all 7 layers rendered, active ones filled
function StackDiagram({ activeCount }) {
  const barH = 14;
  const gap   = 2;
  const totalH = OSI_LAYERS.length * (barH + gap);
  const W = 120;

  return (
    <svg viewBox={`0 0 ${W} ${totalH + 4}`} fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%' }}>

      {/* Render layers bottom-to-top (index 0 = L1 = bottom) */}
      {OSI_LAYERS.map((layer, idx) => {
        // Flip: render L7 at top (first visual row), L1 at bottom (last visual row)
        const row = OSI_LAYERS.length - 1 - idx;
        const y = row * (barH + gap);
        const active = idx < activeCount;
        const current = idx === activeCount - 1;

        return (
          <g key={layer.num}
            style={{
              opacity: active ? 1 : 0.18,
              transition: 'opacity 0.5s ease, filter 0.5s ease',
              filter: active ? `drop-shadow(0 0 4px ${layer.color}99)` : 'none',
            }}
          >
            {/* Background bar */}
            <rect x="0" y={y} width={W} height={barH} rx="2"
              fill={active ? `${layer.color}18` : 'rgba(255,255,255,0.03)'}
              stroke={active ? layer.color : 'rgba(255,255,255,0.06)'}
              strokeWidth="0.6"
            />

            {/* Pulsing left accent for current layer */}
            {current && (
              <rect x="0" y={y} width="3" height={barH} rx="1" fill={layer.color}>
                <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite"/>
              </rect>
            )}

            {/* Layer number */}
            <text x="5" y={y + barH / 2 + 0.5} fontSize="5.5" fill={active ? layer.color : 'rgba(255,255,255,0.2)'}
              fontFamily="JetBrains Mono, monospace" fontWeight="700" dominantBaseline="middle">
              L{layer.num}
            </text>

            {/* Layer name */}
            <text x="17" y={y + barH / 2 + 0.5} fontSize="5.5" fill={active ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.15)'}
              fontFamily="JetBrains Mono, monospace" dominantBaseline="middle">
              {layer.name}
            </text>

            {/* Protocol hint right-aligned */}
            {active && (
              <text x={W - 3} y={y + barH / 2 + 0.5} fontSize="4.5"
                fill={`${layer.color}99`} fontFamily="JetBrains Mono, monospace" textAnchor="end" dominantBaseline="middle">
                {layer.abbr}
              </text>
            )}
          </g>
        );
      })}

      {/* SYSTEM ONLINE overlay when all 7 active */}
      {activeCount >= 7 && (
        <g>
          <rect x="0" y="0" width={W} height={totalH + 4} rx="3"
            fill="rgba(0,255,136,0.04)" stroke="#00ff88" strokeWidth="0.8" strokeOpacity="0.6">
            <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
          </rect>
        </g>
      )}
    </svg>
  );
}

export default function BuildProgress() {
  const [stage, setStage] = useState(0);       // 0 = nothing active
  const [visible, setVisible] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const panelRef = useRef();

  useEffect(() => {
    // Slide in after boot
    gsap.fromTo(panelRef.current,
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 1.4 }
    );

    OSI_LAYERS.forEach((layer, idx) => {
      const el = document.getElementById(layer.section);
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        start: 'top 65%',
        onEnter: () => setStage(prev => Math.max(prev, idx + 1)),
      });
    });
  }, []);

  const handleClose = () => {
    gsap.to(panelRef.current, { opacity: 0, x: 40, duration: 0.4, ease: 'power2.in',
      onComplete: () => setVisible(false) });
  };

  if (!visible) return null;

  const percent = Math.round((stage / OSI_LAYERS.length) * 100);
  const isComplete = stage >= OSI_LAYERS.length;
  const currentLayer = stage > 0 ? OSI_LAYERS[stage - 1] : null;

  return (
    <div
      ref={panelRef}
      className="fixed right-4 top-1/2 z-40 hidden xl:block"
      style={{ transform: 'translateY(-50%)', width: '155px', opacity: 0 }}
    >
      {/* Panel */}
      <div className="rounded-xl overflow-hidden border"
        style={{
          background: 'rgba(2,8,6,0.95)',
          borderColor: 'rgba(0,255,136,0.15)',
          boxShadow: '0 0 40px rgba(0,255,136,0.05), 0 8px 32px rgba(0,0,0,0.5)',
          backdropFilter: 'blur(16px)',
        }}>

        {/* ── Header ── */}
        <div className="flex items-center gap-1.5 px-2.5 py-2 border-b"
          style={{ borderColor: 'rgba(0,255,136,0.1)', background: 'rgba(0,0,0,0.3)' }}>
          {/* Red dot = close button (mac-style) */}
          <button
            onClick={handleClose}
            title="Close"
            className="w-2.5 h-2.5 rounded-full bg-red-500 hover:bg-red-400 transition-colors flex-shrink-0 cursor-pointer"
            style={{ boxShadow: '0 0 4px rgba(239,68,68,0.6)' }}
          />
          <button
            onClick={() => setCollapsed(!collapsed)}
            title="Minimize"
            className="w-2.5 h-2.5 rounded-full bg-yellow-400 hover:bg-yellow-300 transition-colors flex-shrink-0 cursor-pointer"
            style={{ boxShadow: '0 0 4px rgba(250,204,21,0.6)' }}
          />
          <button
            onClick={() => setCollapsed(false)}
            title="Restore"
            className="w-2.5 h-2.5 rounded-full bg-green-500 hover:bg-green-400 transition-colors flex-shrink-0 cursor-pointer"
            style={{ boxShadow: '0 0 4px rgba(34,197,94,0.6)' }}
          />
          <span className="font-mono text-[9px] text-textMuted ml-1 flex-1 tracking-wider">OSI STACK</span>
        </div>

        {/* ── Collapsible Body ── */}
        {!collapsed && (
          <>
            {/* ── Stack diagram SVG ── */}
            <div className="px-2.5 pt-2.5 pb-1">
              <StackDiagram activeCount={stage} />
            </div>

            {/* ── Progress bar ── */}
            <div className="px-2.5 pb-2 pt-1">
              <div className="flex justify-between font-mono mb-1"
                style={{ fontSize: '8px', color: 'rgba(122,175,160,0.55)' }}>
                <span>build progress</span>
                <span style={{ color: currentLayer?.color || '#39d353' }}>{percent}%</span>
              </div>
              <div className="h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(0,255,136,0.08)' }}>
                <div className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${percent}%`,
                    background: `linear-gradient(90deg, #3b82f6, #0dcfc0, ${currentLayer?.color || '#39d353'})`,
                    boxShadow: `0 0 6px ${currentLayer?.color || '#39d353'}`,
                  }}
                />
              </div>
            </div>

            {/* ── Layer log ── */}
            <div className="px-2.5 pb-2.5 space-y-0.5 border-t"
              style={{ borderColor: 'rgba(0,255,136,0.07)' }}>
              <div className="pt-2" />
              {[...OSI_LAYERS].reverse().map((layer, idx) => {
                const originalIdx = OSI_LAYERS.length - 1 - idx;
                return (
                  <LayerBar
                    key={layer.num}
                    layer={layer}
                    active={originalIdx < stage}
                    current={originalIdx === stage - 1}
                  />
                );
              })}
            </div>

            {/* ── Status footer ── */}
            <div className="px-2.5 pb-2.5">
              <div className="rounded-lg px-2 py-1.5 font-mono text-center"
                style={{
                  fontSize: '8px',
                  background: isComplete ? 'rgba(0,255,136,0.08)' : 'rgba(57,211,83,0.04)',
                  border: `1px solid ${isComplete ? 'rgba(0,255,136,0.3)' : 'rgba(57,211,83,0.1)'}`,
                  color: isComplete ? '#00ff88' : 'rgba(122,175,160,0.6)',
                }}>
                {isComplete ? (
                  <span>
                    <span style={{ animation: 'glow-pulse 1s ease infinite', display: 'inline-block', marginRight: '4px' }}>●</span>
                    SYSTEM ONLINE
                  </span>
                ) : stage === 0 ? (
                  '○  Awaiting scroll...'
                ) : (
                  `▶  ${currentLayer?.name} layer active`
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Tooltip on hover showing protocol info */}
      {currentLayer && (
        <div className="mt-1.5 rounded-lg px-2 py-1 border font-mono text-center"
          style={{
            fontSize: '8px',
            background: 'rgba(2,8,6,0.9)',
            borderColor: `${currentLayer.color}22`,
            color: `${currentLayer.color}99`,
          }}>
          {currentLayer.proto}
        </div>
      )}
    </div>
  );
}

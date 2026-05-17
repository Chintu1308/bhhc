import { DISTRICTS, MINIMAP_POSITIONS } from './cityData';

/* 2D SVG Mini-Map for city navigation */
export default function MiniMap({ currentDistrict, onTeleport }) {
  return (
    <div
      className="fixed bottom-6 right-6 z-50"
      style={{
        width: '160px',
        height: '200px',
        background: 'rgba(5,15,10,0.85)',
        border: '1px solid rgba(57,211,83,0.2)',
        borderRadius: '12px',
        backdropFilter: 'blur(12px)',
        padding: '12px',
        boxShadow: '0 0 20px rgba(0,0,0,0.5)',
      }}
    >
      {/* Header */}
      <div className="font-mono text-[8px] text-textMuted mb-2 text-center tracking-widest uppercase">
        MINI MAP
      </div>

      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Connection lines */}
        {MINIMAP_POSITIONS.map((pos, i) => {
          if (i === MINIMAP_POSITIONS.length - 1) return null;
          const next = MINIMAP_POSITIONS[i + 1];
          return (
            <line
              key={`line-${i}`}
              x1={pos.x} y1={pos.y}
              x2={next.x} y2={next.y}
              stroke="rgba(57,211,83,0.15)"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
          );
        })}

        {/* District dots */}
        {MINIMAP_POSITIONS.map((pos, i) => {
          const district = DISTRICTS[i];
          const isActive = i === currentDistrict;
          return (
            <g key={i} onClick={() => onTeleport(i)} style={{ cursor: 'pointer' }}>
              {/* Pulse ring for active */}
              {isActive && (
                <circle
                  cx={pos.x} cy={pos.y} r="6"
                  fill="none"
                  stroke={district.color}
                  strokeWidth="0.5"
                  opacity="0.5"
                >
                  <animate attributeName="r" from="4" to="8" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite" />
                </circle>
              )}
              {/* Main dot */}
              <circle
                cx={pos.x} cy={pos.y}
                r={isActive ? 3.5 : 2.5}
                fill={isActive ? district.color : '#1a1a1a'}
                stroke={district.color}
                strokeWidth={isActive ? 1 : 0.5}
                opacity={isActive ? 1 : 0.6}
              />
              {/* Label */}
              <text
                x={pos.x}
                y={pos.y + 7}
                textAnchor="middle"
                fill={isActive ? district.color : 'rgba(122,175,160,0.5)'}
                fontSize="3.5"
                fontFamily="monospace"
              >
                {district.icon}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

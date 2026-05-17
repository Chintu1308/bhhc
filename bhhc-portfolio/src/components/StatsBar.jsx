import { useEffect, useRef, useState } from 'react';
import { useInView } from '../hooks/useTypewriter';

const STATS = [
  { value: 2,   suffix: 'x',  label: 'Hackathon\nWinner',    color: '#f0c040' },
  { value: 1,   suffix: '',   label: 'Patent\nPublished',     color: '#39d353' },
  { value: 3,   suffix: '+',  label: 'Major\nProjects',       color: '#0dcfc0' },
  { value: 10,  suffix: '+',  label: 'Technologies\nMastered', color: '#f59e0b' },
  { value: 100, suffix: '%',  label: 'Security\nFirst',      color: '#00ff88' },
];

function CountUp({ target, suffix, color, started }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <span
      style={{
        fontFamily: "'Orbitron', monospace",
        fontWeight: 800,
        fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
        color: color,
        textShadow: `0 0 20px ${color}80, 0 0 40px ${color}40`,
      }}
    >
      {count}{suffix}
    </span>
  );
}

export default function StatsBar() {
  const [ref, inView] = useInView(0.3);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (inView && !started) setStarted(true);
  }, [inView, started]);

  return (
    <section className="relative py-20 overflow-hidden" ref={ref}>
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(57,211,83,0.04) 0%, rgba(13,207,192,0.02) 50%, rgba(5,15,10,0) 100%)',
          borderTop: '1px solid rgba(57,211,83,0.08)',
          borderBottom: '1px solid rgba(57,211,83,0.08)',
        }}
      />

      {/* Marquee tech strip above */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden h-7 flex items-center border-b border-cardBorder">
        <div className="marquee-track flex gap-8 whitespace-nowrap">
          {Array(4).fill([
            'React', 'Spring Boot', 'MQTT', 'Three.js', 'GSAP', 'DevSecOps',
            'IoT', 'AWS', 'WebSocket', 'MongoDB', 'Patent Holder', 'Hackathon Winner',
          ]).flat().map((t, i) => (
            <span key={i} className="font-mono text-[10px] text-textMuted px-3">
              <span className="text-primary mr-1">▸</span>{t}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        {/* Chapter label */}
        <div className="text-center mb-12">
          <span className="font-mono text-xs text-textMuted tracking-widest uppercase">
            The Numbers Don't Lie
          </span>
          <div className="neon-line max-w-xs mx-auto mt-2" />
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center text-center gap-3 group ${
                idx === 4 ? 'col-span-2 sm:col-span-1' : ''
              }`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Number */}
              <div className="relative">
                <CountUp
                  target={stat.value}
                  suffix={stat.suffix}
                  color={stat.color}
                  started={started}
                />
                {/* Glow disc behind number */}
                <div
                  className="absolute inset-0 -z-10 blur-2xl opacity-30 rounded-full"
                  style={{ background: stat.color }}
                />
              </div>

              {/* Divider */}
              <div
                className="w-8 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }}
              />

              {/* Label */}
              <p
                className="font-mono text-xs text-textMuted leading-relaxed text-center whitespace-pre-line"
                style={{ fontSize: '10px', letterSpacing: '0.05em' }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

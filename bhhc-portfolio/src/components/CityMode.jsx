import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CITY_INFO, LANDMARKS, CITY_STATS, WHY_VIZAG } from '../data/vizag';

gsap.registerPlugin(ScrollTrigger);

/* ── Animated counter ── */
function CityCounter({ value, started }) {
  const [display, setDisplay] = useState('0');
  useEffect(() => {
    if (!started) return;
    const num = parseInt(value);
    if (isNaN(num)) { setDisplay(value); return; }
    let start = 0;
    const suffix = value.replace(/[0-9]/g, '');
    const timer = setInterval(() => {
      start += Math.ceil(num / 40);
      if (start >= num) { setDisplay(num + suffix); clearInterval(timer); }
      else setDisplay(start + suffix);
    }, 30);
    return () => clearInterval(timer);
  }, [started, value]);
  return <span>{display}</span>;
}

/* ── Particle field background ── */
function CityParticles() {
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    const particles = [];
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 0.5,
        o: Math.random() * 0.4 + 0.1,
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(57,211,83,${p.o})`;
        ctx.fill();
      });
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(13,207,192,${0.08 * (1 - dist / 120)})`;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}

export default function CityMode({ onBack }) {
  const [statsVisible, setStatsVisible] = useState(false);
  const heroRef = useRef();
  const statsRef = useRef();
  const landmarksRef = useRef();

  // Scroll-triggered animations
  useEffect(() => {
    gsap.fromTo(heroRef.current, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.2,
    });

    // Stats observer
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);

    // Landmark cards stagger
    gsap.utils.toArray('.city-landmark').forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
          delay: i * 0.08,
        }
      );
    });

    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen relative" style={{ background: '#050f0a' }}>
      <CityParticles />

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20"
      >
        {/* Decorative rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          {[300, 420, 540].map((size, i) => (
            <div
              key={i}
              className="absolute rounded-full border"
              style={{
                width: `${size}px`, height: `${size}px`,
                borderColor: `rgba(57,211,83,${0.08 - i * 0.02})`,
                animation: `spin ${30 + i * 15}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}`,
              }}
            />
          ))}
        </div>

        {/* City icon */}
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 relative"
          style={{
            background: 'linear-gradient(135deg, rgba(57,211,83,0.15), rgba(13,207,192,0.1))',
            border: '1px solid rgba(57,211,83,0.3)',
            boxShadow: '0 0 40px rgba(57,211,83,0.15)',
          }}
        >
          <span style={{ fontSize: '2.5rem' }}>🏙️</span>
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary animate-pulse" />
        </div>

        {/* Title */}
        <div className="mb-2">
          <span className="font-mono text-xs text-textMuted tracking-[0.3em] uppercase">
            — Phase V · The City —
          </span>
        </div>

        <h1
          className="font-display font-black mb-4"
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            background: 'linear-gradient(135deg, #39d353, #0dcfc0, #00ff88)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.1,
          }}
        >
          {CITY_INFO.alias}
        </h1>

        <p
          className="font-display text-xl sm:text-2xl mb-2"
          style={{ color: 'rgba(255,255,255,0.85)' }}
        >
          {CITY_INFO.tagline}
        </p>

        <p className="font-mono text-xs text-textMuted mb-8">
          {CITY_INFO.coordinates.lat} · {CITY_INFO.coordinates.lng} · {CITY_INFO.state}
        </p>

        {/* Terminal-style info block */}
        <div
          className="max-w-md w-full rounded-xl border p-6 text-left font-mono text-xs"
          style={{
            background: 'rgba(5,15,10,0.8)',
            borderColor: 'rgba(57,211,83,0.15)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span className="ml-2 text-textMuted">vizag.sys</span>
          </div>
          <div style={{ color: '#39d353' }}>
            <div><span className="text-textMuted">$ </span>cat /etc/city.conf</div>
            <div className="mt-2 pl-2 border-l border-primary/20 space-y-1" style={{ color: '#0dcfc0' }}>
              <div>name: <span className="text-textPrimary">{CITY_INFO.name}</span></div>
              <div>population: <span className="text-textPrimary">{CITY_INFO.population}</span></div>
              <div>timezone: <span className="text-textPrimary">{CITY_INFO.timezone}</span></div>
              <div>founded: <span className="text-textPrimary">{CITY_INFO.founded}</span></div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-textMuted">$ </span>
              <span>status: </span>
              <span className="text-green-400">ONLINE ●</span>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="mt-12 animate-bounce">
          <div className="font-mono text-xs text-textMuted tracking-widest">EXPLORE</div>
          <div className="mx-auto mt-2 w-px h-8" style={{ background: 'linear-gradient(180deg, #39d353, transparent)' }} />
        </div>
      </section>

      {/* ── CITY STATS ── */}
      <section ref={statsRef} className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-mono text-xs text-textMuted tracking-widest uppercase">
              City Metrics
            </span>
            <div className="neon-line max-w-xs mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CITY_STATS.map((stat, i) => (
              <div
                key={i}
                className="rounded-xl border p-4 text-center transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(5,15,10,0.6)',
                  borderColor: 'rgba(57,211,83,0.12)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div
                  className="font-display font-bold text-lg"
                  style={{ color: '#00ff88' }}
                >
                  <CityCounter value={stat.value} started={statsVisible} />
                </div>
                <div className="font-mono text-[10px] text-textMuted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LANDMARKS ── */}
      <section ref={landmarksRef} className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-mono text-xs text-textMuted tracking-widest uppercase">
              Discover Landmarks
            </span>
            <h2
              className="font-display font-bold text-3xl sm:text-4xl mt-3"
              style={{ color: 'rgba(255,255,255,0.9)' }}
            >
              Places That Define Vizag
            </h2>
            <div className="neon-line max-w-xs mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {LANDMARKS.map((lm, i) => (
              <div
                key={i}
                className="city-landmark group rounded-2xl border p-6 transition-all duration-500 hover:-translate-y-2 opacity-0 cursor-default"
                style={{
                  background: 'rgba(5,15,10,0.6)',
                  borderColor: `${lm.color}18`,
                  backdropFilter: 'blur(8px)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${lm.color}50`;
                  e.currentTarget.style.boxShadow = `0 8px 40px ${lm.color}15`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = `${lm.color}18`;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                    style={{
                      background: `${lm.color}15`,
                      border: `1px solid ${lm.color}30`,
                    }}
                  >
                    {lm.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm" style={{ color: lm.color }}>{lm.name}</h3>
                    <span className="font-mono text-[9px] text-textMuted uppercase tracking-wider">{lm.type}</span>
                  </div>
                </div>
                <p className="font-mono text-xs leading-relaxed text-textMuted">
                  {lm.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY VIZAG ── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-mono text-xs text-textMuted tracking-widest uppercase">
              Why Vizag Matters
            </span>
            <div className="neon-line max-w-xs mx-auto mt-2" />
          </div>

          <div
            className="rounded-2xl border p-8 sm:p-10"
            style={{
              background: 'rgba(5,15,10,0.6)',
              borderColor: 'rgba(57,211,83,0.12)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div className="font-mono text-xs text-textMuted mb-6">
              <span className="text-primary">$</span> vizag --why-it-matters
            </div>
            <div className="space-y-4">
              {WHY_VIZAG.map((fact, i) => (
                <div key={i} className="flex items-start gap-3 group">
                  <div
                    className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0 transition-all duration-300 group-hover:scale-150"
                    style={{
                      background: `hsl(${140 + i * 15}, 80%, 55%)`,
                      boxShadow: `0 0 8px hsl(${140 + i * 15}, 80%, 55%, 0.4)`,
                    }}
                  />
                  <p className="font-mono text-sm text-textMuted leading-relaxed group-hover:text-textPrimary transition-colors duration-300">
                    {fact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BACK BUTTON ── */}
      <section className="relative z-10 py-20 px-6 text-center">
        <div className="font-mono text-xs text-textMuted mb-6">
          <span className="text-primary">$</span> cd ~/portfolio
        </div>
        <button
          onClick={onBack}
          className="group px-8 py-3 rounded-xl font-mono text-sm font-bold transition-all duration-300 relative overflow-hidden"
          style={{
            background: 'rgba(57,211,83,0.08)',
            border: '1px solid rgba(57,211,83,0.3)',
            color: '#39d353',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(57,211,83,0.15)';
            e.currentTarget.style.boxShadow = '0 0 30px rgba(57,211,83,0.2)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(57,211,83,0.08)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          ← Back to Portfolio
        </button>

        <div className="mt-8 font-mono text-[10px] text-textMuted opacity-50">
          // built with ❤️ in {CITY_INFO.alias}
        </div>
      </section>
    </div>
  );
}

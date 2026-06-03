import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { achievements, patent } from '../data/achievements';

gsap.registerPlugin(ScrollTrigger);

/* ── 3D-style Achievement icon replacement ── */
const ICONS_3D = {
  'WoW Vizag 2025 Hackathon': (color) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <polygon points="14,2 17.5,10.5 27,11.5 20,18 22,27 14,22.5 6,27 8,18 1,11.5 10.5,10.5" fill={`${color}22`} stroke={color} strokeWidth="1.2"/>
      <circle cx="14" cy="14" r="4" fill={color} opacity="0.9"/>
    </svg>
  ),
  'Hack the Model': (color) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <polygon points="14,2 17.5,10.5 27,11.5 20,18 22,27 14,22.5 6,27 8,18 1,11.5 10.5,10.5" fill={`${color}22`} stroke={color} strokeWidth="1.2"/>
      <circle cx="14" cy="14" r="4" fill={color} opacity="0.9"/>
    </svg>
  ),
  'Patent Published': (color) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="4" y="2" width="16" height="22" rx="2" fill={`${color}15`} stroke={color} strokeWidth="1.2"/>
      <line x1="8" y1="9" x2="16" y2="9" stroke={color} strokeWidth="1"/>
      <line x1="8" y1="13" x2="16" y2="13" stroke={color} strokeWidth="1"/>
      <line x1="8" y1="17" x2="13" y2="17" stroke={color} strokeWidth="1"/>
      <circle cx="20" cy="20" r="6" fill={`${color}22`} stroke={color} strokeWidth="1.2"/>
      <text x="20" y="24" textAnchor="middle" fontSize="7" fill={color} fontWeight="bold">✓</text>
    </svg>
  ),
  'B.Tech CSE 2023–2027': (color) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 4 L26 10 L14 16 L2 10 Z" fill={`${color}15`} stroke={color} strokeWidth="1.2"/>
      <path d="M6 13v6c0 2.5 4 5 8 5s8-2.5 8-5v-6" stroke={color} strokeWidth="1.2" fill="none"/>
      <line x1="26" y1="10" x2="26" y2="18" stroke={color} strokeWidth="1.2"/>
    </svg>
  ),
  'Treasurer — AsCI': (color) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="4" y="8" width="20" height="16" rx="2" fill={`${color}15`} stroke={color} strokeWidth="1.2"/>
      <path d="M4 12h20" stroke={color} strokeWidth="1"/>
      <circle cx="14" cy="18" r="3" fill={`${color}44`} stroke={color} strokeWidth="1"/>
    </svg>
  ),
  'Joint Secretary — GCCC': (color) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="10" cy="10" r="4" fill={`${color}15`} stroke={color} strokeWidth="1.2"/>
      <circle cx="18" cy="10" r="4" fill={`${color}15`} stroke={color} strokeWidth="1.2"/>
      <path d="M2 24c0-4 3.5-7 8-7s6 2 8 2 8-3 8 5" stroke={color} strokeWidth="1.2" fill="none"/>
    </svg>
  ),
};

function AchievementCard({ item, index }) {
  const cardRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.7,
        ease: 'back.out(1.4)',
        scrollTrigger: { trigger: cardRef.current, start: 'top 88%' },
        delay: index * 0.08,
      }
    );
  }, [index]);

  const Icon3D = ICONS_3D[item.title];

  return (
    <div
      ref={cardRef}
      className="opacity-0 rounded-xl border p-5 flex items-start gap-4 group transition-all duration-300"
      style={{
        background: 'rgba(0,255,136,0.03)',
        borderColor: 'rgba(0,255,136,0.1)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${item.badgeColor}44`;
        e.currentTarget.style.background = `${item.badgeColor}07`;
        e.currentTarget.style.boxShadow = `0 0 20px ${item.badgeColor}15`;
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(0,255,136,0.1)';
        e.currentTarget.style.background = 'rgba(0,255,136,0.03)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* 3D icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background: `${item.badgeColor}10`,
          border: `1px solid ${item.badgeColor}33`,
          boxShadow: `0 0 12px ${item.badgeColor}20`,
        }}
      >
        {Icon3D ? Icon3D(item.badgeColor) : (
          <div className="w-5 h-5 rounded-full" style={{ background: item.badgeColor }} />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
          <h4 className="font-display font-bold text-sm text-textPrimary group-hover:text-accent transition-colors">
            {item.title}
          </h4>
          <span
            className="px-2 py-0.5 rounded font-mono text-[10px] border flex-shrink-0"
            style={{ color: item.badgeColor, borderColor: `${item.badgeColor}44`, background: `${item.badgeColor}11` }}
          >
            {item.badge}
          </span>
        </div>
        <p className="font-mono text-[11px] mb-1" style={{ color: item.badgeColor }}>{item.subtitle}</p>
        <p className="font-mono text-[11px] text-textMuted">{item.detail}</p>
      </div>
    </div>
  );
}

/* ── Sumedha Coordinator Card with rotating 3D seal ── */
function SumedhaCard() {
  const cardRef = useRef();
  const sealRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, x: 40, scale: 0.96 },
      {
        opacity: 1, x: 0, scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: cardRef.current, start: 'top 85%' },
        delay: 0.3,
      }
    );

    // Spin the seal
    gsap.to(sealRef.current, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: 'none',
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className="opacity-0 rounded-2xl border p-8 flex flex-col gap-5 relative overflow-hidden h-fit"
      style={{
        borderColor: 'rgba(0,255,136,0.4)',
        background: 'rgba(0,255,136,0.04)',
        boxShadow: '0 0 50px rgba(0,255,136,0.1)',
      }}
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(0,255,136,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Corner scan lines decoration */}
      {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
        <div key={i} className={`absolute ${pos} w-8 h-8`}
          style={{
            borderTop: i < 2 ? '1px solid rgba(0,255,136,0.5)' : 'none',
            borderBottom: i >= 2 ? '1px solid rgba(0,255,136,0.5)' : 'none',
            borderLeft: i % 2 === 0 ? '1px solid rgba(0,255,136,0.5)' : 'none',
            borderRight: i % 2 === 1 ? '1px solid rgba(0,255,136,0.5)' : 'none',
          }}
        />
      ))}

      {/* Header */}
      <div className="flex items-center gap-4 relative z-10">
        {/* Rotating event seal SVG */}
        <div ref={sealRef} className="flex-shrink-0">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="27" stroke="#39d353" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.8"/>
            <circle cx="30" cy="30" r="22" stroke="#0dcfc0" strokeWidth="1" opacity="0.5"/>
            <circle cx="30" cy="30" r="16" fill="rgba(57,211,83,0.1)" stroke="#39d353" strokeWidth="1.5"/>
            <text x="30" y="28" textAnchor="middle" fill="#39d353" fontSize="8" fontFamily="JetBrains Mono" fontWeight="bold">EVENT</text>
            <text x="30" y="38" textAnchor="middle" fill="#0dcfc0" fontSize="7" fontFamily="JetBrains Mono">LEAD</text>
          </svg>
        </div>
        <div>
          <div className="font-mono text-xs text-accent uppercase tracking-widest mb-0.5">
            Overall Student Coordinator
          </div>
          <div className="font-mono text-xs text-textMuted">Sumedha</div>
        </div>
      </div>

      {/* Title */}
      <h3
        className="font-display font-bold leading-snug relative z-10"
        style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1rem)', color: '#e8fff4' }}
      >
        "Completely took care of design, promotions, and the smooth organization of events, and also secured several sponsorships."
      </h3>

      {/* Meta */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 relative z-10">
        {[
          ['Role', 'Coordinator'],
          ['Event', 'Sumedha'],
          ['Focus', 'Design & Promo'],
          ['Sponsors', 'Secured'],
        ].map(([k, v]) => (
          <div key={k} className="font-mono text-xs">
            <span className="text-primary">{k}: </span>
            <span className="text-textMuted">{v}</span>
          </div>
        ))}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 relative z-10">
        {['Event Management', 'Design', 'Promotions', 'Sponsorships'].map(tag => (
          <span
            key={tag}
            className="px-2.5 py-0.5 rounded-full font-mono text-[10px] border"
            style={{ color: '#0dcfc0', borderColor: 'rgba(13,207,192,0.3)', background: 'rgba(13,207,192,0.06)' }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: 'linear-gradient(transparent, rgba(0,255,136,0.05))' }}
      />
    </div>
  );
}

export default function Achievements() {
  const titleRef = useRef();
  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 88%' },
      }
    );
  }, []);

  return (
    <section id="achievements" className="py-24 relative">
      {/* Right glow */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="mb-12 opacity-0">
          <p className="font-mono text-textMuted text-sm mb-2">
            <span className="text-primary">06.</span> Achievements
          </p>
          <h2
            className="font-display font-bold"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              background: 'linear-gradient(90deg, #39d353, #0dcfc0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            &gt; sudo cat /etc/achievements.log
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: achievement list */}
          <div className="space-y-3">
            {achievements.map((item, idx) => (
              <AchievementCard key={item.id} item={item} index={idx} />
            ))}
          </div>
          {/* Right: Sumedha Coordinator */}
          <SumedhaCard />
        </div>
      </div>
    </section>
  );
}

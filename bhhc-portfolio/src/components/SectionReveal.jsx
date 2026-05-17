import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectionReveal({
  chapter, label, title, sub, id,
  color = '#39d353',
  children,
  bgVariant = 'left',
}) {
  const sectionRef = useRef();
  const titleRef   = useRef();
  const chapterRef = useRef();
  const lineRef    = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(chapterRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0, duration: 1.4, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
        }
      );
      gsap.fromTo(titleRef.current,
        { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
        {
          clipPath: 'inset(0 0% 0 0)', duration: 1.0, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
          delay: 0.1,
        }
      );
      gsap.fromTo(lineRef.current,
        { scaleX: 0, transformOrigin: 'left' },
        {
          scaleX: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          delay: 0.4,
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const glowPos = bgVariant === 'right' ? '80% 50%' : bgVariant === 'center' ? '50% 50%' : '20% 50%';

  return (
    <section id={id} ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Atmospheric glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 60% 50% at ${glowPos}, ${color}07 0%, transparent 70%)`,
      }} />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">

        {/* ── Section header: two-column to prevent overlap ── */}
        <div className="relative mb-14 flex items-end justify-between gap-4 overflow-hidden">

          {/* LEFT: all readable text — capped to 70% width */}
          <div className="relative z-10 flex flex-col gap-2" style={{ maxWidth: '68%' }}>
            {/* Label above title */}
            <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase" style={{ color }}>
              <span className="inline-block w-5 h-px" style={{ background: color }} />
              {label}
              <span className="inline-block w-5 h-px" style={{ background: `${color}60` }} />
            </div>

            {/* Main title — clip-path reveal */}
            <div
              ref={titleRef}
              style={{ clipPath: 'inset(0 100% 0 0)' }}
            >
              <h2
                className="font-display font-black leading-none"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  letterSpacing: '-0.02em',
                  background: `linear-gradient(135deg, #e8fff4 0%, ${color} 55%, var(--secondary) 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {title}
              </h2>
            </div>

            {/* Sub command */}
            {sub && (
              <p className="font-mono text-xs mt-1" style={{ color: 'rgba(122,175,160,0.65)' }}>
                <span style={{ color }}>$ </span>{sub}
              </p>
            )}

            {/* Animated accent line */}
            <div
              ref={lineRef}
              className="mt-3 h-px"
              style={{
                background: `linear-gradient(90deg, ${color}, var(--secondary), transparent)`,
                maxWidth: '260px',
                boxShadow: `0 0 8px ${color}55`,
              }}
            />
          </div>

          {/* RIGHT: ghost chapter number — safely in its own column */}
          <div
            ref={chapterRef}
            aria-hidden="true"
            className="flex-shrink-0 select-none pointer-events-none"
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: 'clamp(5rem, 12vw, 10rem)',
              fontWeight: 900,
              lineHeight: 1,
              opacity: 0.07,
              background: `linear-gradient(135deg, ${color}, var(--secondary))`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              position: 'relative',
              zIndex: 0,
            }}
          >
            {chapter}
          </div>
        </div>

        {children}
      </div>
    </section>
  );
}

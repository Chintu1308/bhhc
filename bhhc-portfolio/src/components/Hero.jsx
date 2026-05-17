import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';

gsap.registerPlugin(ScrollTrigger);
const HeroScene = lazy(() => import('../three/HeroScene'));

const ROLES = [
  'DevSecOps Engineer',
  'Full-Stack Developer',
  'Security-First Builder',
  'Multi-Domain Engineer',
  'Hackathon Champion ×2',
  'Patent Holder',
  'Open Source Contributor',
];

export default function Hero() {
  const typed = useTypewriter(ROLES, 65, 30, 2000);
  const wrapRef  = useRef();
  const canvasRef = useRef();
  const line1Ref = useRef();
  const line2Ref = useRef();
  const subRef   = useRef();
  const ctaRef   = useRef();
  const chapterRef = useRef();
  const scrollRef  = useRef();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      // Chapter label
      tl.fromTo(chapterRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );

      // Main title lines with clip-path reveal
      tl.fromTo(line1Ref.current,
        { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.0, ease: 'power4.out' }, '-=0.2'
      );
      tl.fromTo(line2Ref.current,
        { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.0, ease: 'power4.out' }, '-=0.6'
      );

      // Sub / tagline
      tl.fromTo(subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3'
      );

      // CTA
      tl.fromTo(ctaRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3'
      );

      // Scroll-driven canvas parallax
      ScrollTrigger.create({
        trigger: wrapRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        onUpdate: (self) => {
          if (!canvasRef.current) return;
          const p = self.progress;
          canvasRef.current.style.transform = `scale(${1 + p * 0.12}) translateY(${p * 60}px)`;
          canvasRef.current.style.opacity = String(1 - p * 1.4);
        },
      });

      // Text parallax up on scroll
      gsap.to('.hero-text-layer', {
        y: -120,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, wrapRef);

    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => { ctx.revert(); window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <section
      id="hero"
      ref={wrapRef}
      className="relative min-h-screen overflow-hidden hero-bg scanlines"
    >
      {/* ── Full-screen 3D canvas (background) ── */}
      <div
        ref={canvasRef}
        className="absolute inset-0 z-0 will-change-transform"
        style={{ transformOrigin: 'center center' }}
      >
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
        {/* Radial vignette so text is readable */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 70% 70% at 65% 45%, transparent 30%, rgba(5,15,10,0.55) 65%, rgba(5,15,10,0.95) 100%)',
          }}
        />
      </div>

      {/* ── Dot grid overlay ── */}
      <div className="absolute inset-0 z-1 dot-grid opacity-30 pointer-events-none" />

      {/* ── Left edge accent line ── */}
      <div
        className="absolute left-8 top-24 bottom-24 w-px z-10 hidden lg:block"
        style={{ background: 'linear-gradient(180deg, transparent, var(--primary) 30%, var(--secondary) 70%, transparent)' }}
      />

      {/* ── Main text layer ── */}
      <div className="hero-text-layer relative z-10 flex flex-col justify-center min-h-screen px-6 sm:px-12 lg:px-20 max-w-[1400px] mx-auto pt-20 pb-16">

        {/* Chapter label */}
        <div ref={chapterRef} className="opacity-0 mb-6">
          <span className="section-label">Chapter 01 · The Boot</span>
        </div>

        {/* Glowing eyebrow — 3D highlighted name */}
        <div
          className="font-mono text-xs sm:text-sm mb-6 tracking-widest relative inline-block group"
        >
          <span className="relative z-10 px-3 py-1 font-bold rounded bg-[rgba(5,15,10,0.8)] border border-[rgba(57,211,83,0.4)] text-[#00ff88]"
            style={{
              textShadow: '0 0 10px rgba(0,255,136,0.6)',
              boxShadow: '4px 4px 0px rgba(13,207,192,0.3)',
              transform: 'translateZ(20px)',
              display: 'inline-block',
              transition: 'all 0.3s ease',
            }}
          >
            &lt; Bongu Hari Hara Charan · Visakhapatnam &gt;
          </span>
        </div>

        {/* MASSIVE hero name — single line */}
        <div
          ref={line1Ref}
          className="overflow-hidden flex items-baseline"
          style={{ clipPath: 'inset(0 100% 0 0)' }}
        >
          <h1
            className="font-display font-black leading-[0.85] tracking-tighter mix-blend-screen relative z-10 flex items-baseline gap-1"
          >
            <span
              style={{
                fontSize: 'clamp(3rem, 9vw, 8rem)',
                background: 'linear-gradient(135deg, #e8fff4 0%, #39d353 40%, #0dcfc0 70%, #e8fff4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 40px rgba(57,211,83,0.4))',
                letterSpacing: '-0.02em',
              }}
            >
              BHHC
            </span>
            <span
              style={{
                fontSize: 'clamp(3rem, 9vw, 8rem)',
                letterSpacing: '-0.02em',
                color: 'rgba(232,255,244,0.08)',
                WebkitTextStroke: '1.5px rgba(57,211,83,0.4)',
              }}
            >
              .exe
            </span>
          </h1>
        </div>

        {/* Typewriter role */}
        <div ref={subRef} className="opacity-0 mt-6 flex flex-col gap-3">
          <div
            className="font-mono inline-flex items-center gap-3"
            style={{ fontSize: 'clamp(0.9rem, 2vw, 1.3rem)' }}
          >
            <span className="text-textMuted">$ run</span>
            <span style={{ color: '#00ff88' }}>{typed}</span>
            <span
              className="cursor-blink inline-block bg-accent"
              style={{ width: '2px', height: '1.1em', verticalAlign: 'middle' }}
            />
          </div>

          {/* One-liner */}
          <p
            className="font-mono max-w-lg"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 0.9rem)', color: 'rgba(122,175,160,0.85)', lineHeight: 1.6 }}
          >
            <span style={{ color: 'rgba(57,211,83,0.6)' }}>// </span>
            Building secure systems across multiple domains.<br className="hidden sm:block" />
            Dev · Security · Ops — end to end.
          </p>
        </div>

        {/* CTAs */}
        <div ref={ctaRef} className="opacity-0 mt-8 flex flex-wrap gap-3 items-center">
          <a
            href="#projects"
            className="group relative px-6 py-3 font-mono text-sm font-bold rounded-lg overflow-hidden transition-all duration-300"
            style={{
              background: 'linear-gradient(90deg, #39d353, #0dcfc0)',
              color: '#050f0a',
              boxShadow: '0 0 30px rgba(57,211,83,0.35)',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 50px rgba(57,211,83,0.7)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 30px rgba(57,211,83,0.35)'}
          >
            $ ./view-projects.sh
          </a>

          <a
            href="/resume-bhhc.pdf"
            download
            className="px-6 py-3 font-mono text-sm rounded-lg border transition-all duration-300"
            style={{
              borderColor: 'rgba(0,255,136,0.4)',
              color: '#00ff88',
              background: 'rgba(0,255,136,0.04)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,255,136,0.12)'; e.currentTarget.style.borderColor = 'rgba(0,255,136,0.7)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,255,136,0.04)'; e.currentTarget.style.borderColor = 'rgba(0,255,136,0.4)'; }}
          >
            $ download-resume
          </a>

          {/* Socials */}
          <div className="flex items-center gap-2 ml-2">
            {[
              { Icon: Github, href: 'https://github.com/Chintu1308' },
              { Icon: Linkedin, href: 'https://linkedin.com/in/bhhc' },
              { Icon: Mail, href: 'mailto:bhhc1308@gmail.com' },
            ].map(({ Icon, href }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-cardBorder text-textMuted hover:text-accent hover:border-accent/50 hover:bg-accent/5 transition-all duration-200"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Status badge — DevSecOps professional */}
        <div className="mt-10 inline-flex self-start items-center gap-2 px-4 py-2 rounded-full border font-mono text-xs"
          style={{ borderColor: 'rgba(13,207,192,0.3)', background: 'rgba(13,207,192,0.05)', color: 'rgba(13,207,192,0.85)' }}
        >
          <span className="w-2 h-2 rounded-full" style={{ background: '#0dcfc0', animation: 'glow-pulse 2s ease-in-out infinite', boxShadow: '0 0 6px #0dcfc0' }} />
          DevSecOps · Full-Stack · Multi-Domain Builder
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 transition-opacity duration-500"
        style={{ opacity: scrolled ? 0 : 1 }}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-textMuted uppercase">Scroll</span>
        <div
          className="w-px h-12 relative overflow-hidden"
          style={{ background: 'rgba(0,255,136,0.15)' }}
        >
          <div
            className="absolute inset-x-0 top-0 h-4"
            style={{
              background: 'linear-gradient(180deg, #39d353, transparent)',
              animation: 'float 1.8s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      {/* ── Bottom fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(transparent, #050f0a)' }}
      />

      {/* ── Engine Stamp ── */}
      <div className="absolute bottom-8 right-8 font-mono text-[10px] text-textMuted text-right leading-relaxed z-10 hidden md:block" style={{ color: 'rgba(122,175,160,0.6)' }}>
        data-engine="three.js r184"<br/>
        sys.status="NOMINAL"<br/>
        <span style={{ color: 'rgba(57,211,83,0.4)' }}>// render sequence complete</span>
      </div>
    </section>
  );
}

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BootScreen from './components/BootScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import Blog from './components/Blog';
import BuildProgress from './components/BuildProgress';
import Contact from './components/Contact';
import Footer from './components/Footer';
import UnderConstruction from './city/UnderConstruction';
import SEO from './components/SEO';

gsap.registerPlugin(ScrollTrigger);

/* ── Cinematic dual-layer cursor ── */
function Cursor() {
  const dotRef  = useRef();
  const ringRef = useRef();

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let mx = 0, my = 0;
    let rx = 0, ry = 0;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${mx}px`;
        dotRef.current.style.top  = `${my}px`;
      }
    };

    // Lag ring with RAF
    const tick = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`;
        ringRef.current.style.top  = `${ry}px`;
      }
      raf = requestAnimationFrame(tick);
    };
    let raf = requestAnimationFrame(tick);

    const enter = () => ringRef.current?.classList.add('hovered');
    const leave = () => ringRef.current?.classList.remove('hovered');

    window.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

/* ── Section-divider with glow ── */
function Divider({ color = 'var(--primary)' }) {
  return (
    <div className="relative w-full max-w-7xl mx-auto h-px overflow-visible px-4 sm:px-6">
      <div
        className="w-full"
        style={{
          height: '1px',
          background: `linear-gradient(90deg, transparent 0%, ${color}30 30%, ${color}60 50%, ${color}30 70%, transparent 100%)`,
        }}
      />
      <div
        className="absolute inset-x-4 sm:inset-x-6 -top-2 h-5 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 60% 100% at 50% 100%, ${color}10, transparent)` }}
      />
    </div>
  );
}

export default function App() {
  const [booting, setBooting] = useState(false);
  const [cityMode, setCityMode] = useState(() => {
    try { return localStorage.getItem('bhhc_cityMode') === 'true'; } catch { return false; }
  });

  useEffect(() => {
    if (!sessionStorage.getItem('bhhc_booted')) setBooting(true);
  }, []);

  useEffect(() => {
    try { localStorage.setItem('bhhc_cityMode', cityMode); } catch {}
  }, [cityMode]);

  const handleBootComplete = () => {
    sessionStorage.setItem('bhhc_booted', '1');
    setBooting(false);
  };

  return (
    <>
      <SEO />
      <Cursor />
      {booting && <BootScreen onComplete={handleBootComplete} />}

      <div style={{ opacity: booting ? 0 : 1, transition: 'opacity 0.7s ease', pointerEvents: booting ? 'none' : 'auto' }}>
        <Navbar cityMode={cityMode} setCityMode={setCityMode} />

        {cityMode ? (
          <UnderConstruction onBack={() => setCityMode(false)} />
        ) : (
          <main className="w-full overflow-x-hidden">
            <BuildProgress />
            <Hero />
            <StatsBar />
            <Divider color="#0dcfc0" />
            <About />
            <Divider color="#39d353" />
            <Experience />
            <Divider color="#0dcfc0" />
            <Projects />
            <Divider color="#a3e635" />
            <Skills />
            <Divider color="#818cf8" />
            <Achievements />
            <Divider color="#f0c040" />
            <Blog />
            <Divider color="#0dcfc0" />
            <Contact />
            <Footer />
          </main>
        )}
      </div>
    </>
  );
}

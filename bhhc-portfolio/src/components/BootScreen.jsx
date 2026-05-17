import { useEffect, useRef, useState } from 'react';

const ASCII_LOGO = `
 ██████╗ ██╗  ██╗██╗  ██╗ ██████╗    ███╗   ███╗███████╗
 ██╔══██╗██║  ██║██║  ██║██╔════╝    ████╗ ████║██╔════╝
 ██████╔╝███████║███████║██║         ██╔████╔██║█████╗  
 ██╔══██╗██╔══██║██╔══██║██║         ██║╚██╔╝██║██╔══╝  
 ██████╔╝██║  ██║██║  ██║╚██████╗    ██║ ╚═╝ ██║███████╗
 ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝   ╚═╝     ╚═╝╚══════╝`;


// Waving frames — face stays, only the greeting line changes
const WAVE_CAPTIONS = [
  ' \\o/  Hey! I\'m BHHC!',
  '  o/  Hey! I\'m BHHC!',
  ' \\o/  Hey! I\'m BHHC!',
  '  o\\  Hey! I\'m BHHC!',
];

const POST_LINES = [
  { text: "───────────────────────────────────────────────────────", delay: 80 },
  { text: "  BHHC BIOS v4.0.27  ·  Personal Portfolio OS", delay: 80 },
  { text: "  bhhc.me  —  Bongu Hari Hara Charan", delay: 80 },
  { text: "───────────────────────────────────────────────────────", delay: 80 },
  { text: "", delay: 40 },
  { text: "  CPU     »  Creative Problem Solver @ 3.6GHz", delay: 100 },
  { text: "  RAM     »  8192MB Ambition Detected              [OK]", delay: 100 },
  { text: "  GPU     »  Visual Thinker PRO                    [OK]", delay: 100 },
  { text: "  STORAGE »  100GB Projects Loaded                 [OK]", delay: 100 },
  { text: "  NET     »  Open to Opportunities                 [OK]", delay: 100 },
  { text: "", delay: 40 },
  { text: "───────────────────────────────────────────────────────", delay: 80 },
  { text: "  Scanning modules...", delay: 200 },
  { text: "", delay: 40 },
  { text: "  [██] Full-Stack Engine   React · Spring Boot     READY", delay: 120 },
  { text: "  [██] IoT Module          MQTT · WebSocket · DB   READY", delay: 120 },
  { text: "  [██] DevSecOps Core      Git · AWS · CI/CD       READY", delay: 120 },
  { text: "  [██] Security Layer      OWASP · RBAC · Auth     ARMED", delay: 120 },
  { text: "  [██] Patent Module       Filed Jan 2026          ACTIVE", delay: 120 },
  { text: "  [██] Hackathon Mode      WoW Vizag · HackModel   WINNER ×2", delay: 120 },
  { text: "  [██] Cloud Services      AWS · Vercel            ONLINE", delay: 80 },
  { text: "  [██] DevSecOps Mode      Security · Automation   ARMED", delay: 120 },
  { text: " ", delay: 0 },
  { text: "───────────────────────────────────────────────────────", delay: 80 },
  { text: "  Loading BHHC OS...", delay: 200 },
  { text: "", delay: 40 },
  { text: "PROGRESS_BAR", delay: 1200 },
  { text: "", delay: 80 },
  { text: "  > All systems operational.", delay: 100 },
  { text: "  > Welcome to bhhc.me — Press any key or wait.", delay: 100 },
  { text: "───────────────────────────────────────────────────────", delay: 80 },
];

export default function BootScreen({ onComplete }) {
  const [logoVisible, setLogoVisible] = useState(false);
  const [visibleLines, setVisibleLines] = useState([]);
  const [fading, setFading] = useState(false);
  const [waveFrame, setWaveFrame] = useState(0);
  const skipRef = useRef(false);
  const timeoutsRef = useRef([]);

  const triggerComplete = () => {
    if (skipRef.current) return;
    skipRef.current = true;
    setFading(true);
    setTimeout(() => onComplete(), 700);
  };

  // ASCII wave animation loop
  useEffect(() => {
    const id = setInterval(() => {
      setWaveFrame(f => (f + 1) % WAVE_CAPTIONS.length);
    }, 400);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const t0 = setTimeout(() => setLogoVisible(true), 150);
    timeoutsRef.current.push(t0);

    let cumulativeDelay = 150 + 800;
    POST_LINES.forEach((line) => {
      cumulativeDelay += line.delay;
      const t = setTimeout(() => {
        if (skipRef.current) return;
        if (line.text === 'PROGRESS_BAR') {
          animateProgressBar();
        } else {
          setVisibleLines(prev => [...prev, line.text]);
        }
      }, cumulativeDelay);
      timeoutsRef.current.push(t);
    });

    const autoComplete = setTimeout(() => triggerComplete(), cumulativeDelay + 2000);
    timeoutsRef.current.push(autoComplete);

    return () => timeoutsRef.current.forEach(clearTimeout);
  }, []);

  const animateProgressBar = () => {
    const steps = 40;
    for (let i = 1; i <= steps; i++) {
      const t = setTimeout(() => {
        if (skipRef.current) return;
        if (i === steps) {
          setVisibleLines(prev => [
            ...prev,
            `  [${Array(40).fill('█').join('')}] 100%`,
          ]);
        }
      }, i * 25);
      timeoutsRef.current.push(t);
    }
  };

  useEffect(() => {
    const handleKey = () => triggerComplete();
    window.addEventListener('keydown', handleKey);
    window.addEventListener('click', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('click', handleKey);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
      style={{
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.7s ease',
        fontFamily: '"JetBrains Mono", monospace',
      }}
    >
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)',
        zIndex: 1,
      }} />

      {/* Main layout: terminal left, ASCII character right */}
      <div className="relative z-10 w-full max-w-[1100px] px-4 flex items-start justify-center gap-8 lg:gap-16">

        {/* ── Left: BIOS terminal ── */}
        <div className="flex flex-col items-center flex-1 min-w-0">
          {/* ASCII Logo */}
          <div style={{ opacity: logoVisible ? 1 : 0, transition: 'opacity 0.5s ease', marginBottom: '1rem', textAlign: 'center' }}>
            <pre style={{
              fontSize: 'clamp(5px, 1.1vw, 12px)',
              lineHeight: 1.3,
              background: 'linear-gradient(90deg, #39d353, #0dcfc0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 12px rgba(57,211,83,0.6))',
              animation: 'logoPulse 2s ease-in-out infinite alternate',
              margin: 0,
              whiteSpace: 'pre',
            }}>
              {ASCII_LOGO}
            </pre>
          </div>

          {/* POST Lines */}
          <div style={{ maxWidth: '580px', width: '100%', textAlign: 'left' }}>
            {visibleLines.map((line, idx) => {
              if (line.startsWith('  [████')) {
                return <div key={idx} style={{ color: '#39d353', fontSize: 'clamp(9px, 1.4vw, 12px)' }}>{line}</div>;
              }
              const isOk     = line.includes('[OK]');
              const isReady  = line.includes('READY');
              const isArmed  = line.includes('ARMED');
              const isWinner = line.includes('WINNER');
              const isActive = line.includes('ACTIVE');
              const isOnline = line.includes('ONLINE');

              let color = '#39d353';
              if (line.startsWith('───'))  color = '#1a4a2e';
              else if (isOk || isReady)    color = '#39d353';
              else if (isArmed)            color = '#f59e0b';
              else if (isWinner)           color = '#fbbf24';
              else if (isActive)           color = '#0dcfc0';
              else if (isOnline)           color = '#00ff88';

              return (
                <div key={idx} style={{ color, fontSize: 'clamp(9px, 1.4vw, 12px)', lineHeight: 1.5, whiteSpace: 'pre' }}>
                  {line || '\u00A0'}
                </div>
              );
            })}
            {visibleLines.length > 0 && (
              <span style={{ display: 'inline-block', width: '8px', height: '13px', background: '#39d353', marginLeft: '4px', verticalAlign: 'middle', animation: 'blink 1s step-end infinite' }} />
            )}
          </div>
        </div>

        {/* ── Right: Real ASCII face portrait ── */}
        <div
          className="hidden lg:flex flex-col items-center justify-center flex-shrink-0"
          style={{
            opacity: logoVisible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.6s',
            width: '240px',
            alignSelf: 'center',
          }}
        >
          {/* Retro Styled Image */}
          <div className="relative w-48 h-48 mb-4 border border-[#39d353] bg-[#041a14] overflow-hidden rounded shadow-[0_0_15px_rgba(57,211,83,0.3)]">
            {/* Scanlines overlay */}
            <div className="absolute inset-0 pointer-events-none z-10 opacity-30" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)' }}></div>
            {/* The Image */}
            <img 
              src="/src/assets/hero.png" 
              alt="BHHC" 
              className="w-full h-full object-cover mix-blend-screen"
              style={{ filter: 'grayscale(100%) sepia(100%) hue-rotate(85deg) saturate(300%) contrast(150%) brightness(0.8)' }}
            />
          </div>

          {/* Animated wave caption */}
          <div style={{
            marginTop: '8px',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '11px',
            color: '#00ff88',
            filter: 'drop-shadow(0 0 8px rgba(0,255,136,0.8))',
            letterSpacing: '0.05em',
            transition: 'opacity 0.2s',
          }}>
            {WAVE_CAPTIONS[waveFrame]}
          </div>

          {/* Name label */}
          <div style={{
            marginTop: '6px',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '9px',
            color: 'rgba(57,211,83,0.5)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            — Bongu Hari Hara Charan —
          </div>
        </div>

      </div>

      {/* Skip hint */}
      <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', color: '#1a4a2e', fontSize: '11px' }}>
        Press any key or click to skip...
      </div>

      <style>{`
        @keyframes logoPulse {
          from { filter: drop-shadow(0 0 8px rgba(57,211,83,0.4)); }
          to   { filter: drop-shadow(0 0 20px rgba(13,207,192,0.8)); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import SectionReveal from './SectionReveal';
import { useInView } from '../hooks/useTypewriter';

const TERMINAL_LINES = [
  { cmd: 'whoami', out: ['Bongu Hari Hara Charan | BHHC | Chintu'], delay: 0 },
  {
    cmd: 'cat about.txt',
    out: [
      'Final-year B.Tech CSE @ GVP College of Engineering (Autonomous)',
      'Full-stack dev who builds real products, not just assignments.',
      'Patent holder. Hackathon winner ×2. DevSecOps enthusiast.',
      'Treasurer @ AsCI. Joint Secretary @ GCCC.',
      'Always shipping something new.',
    ],
    delay: 800,
  },
  {
    cmd: 'cat interests.txt',
    out: [
      'Enterprise apps with React + Spring Boot',
      'Cloud Architecture & Infrastructure as Code',
      'DevSecOps — bridging dev, security & ops',
      'AI/ML applied to real-world safety problems',
    ],
    delay: 1800,
  },
  {
    cmd: './status --now',
    out: [
      'Location  : Visakhapatnam, India',
      'Status    : Open to internships & full-time roles',
      'Email     : bhhc1308@gmail.com',
    ],
    delay: 2800,
  },
];

function TerminalLine({ cmd, out, show, isLast }) {
  const [showOut, setShowOut] = useState(false);
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => setShowOut(true), 400);
    return () => clearTimeout(t);
  }, [show]);

  return (
    <div className="mb-5">
      {/* Prompt */}
      <div className="flex items-center gap-1 font-mono text-sm">
        <span style={{ color: '#0dcfc0' }}>bhhc@portfolio</span>
        <span className="text-textMuted">:</span>
        <span style={{ color: '#818cf8' }}>~</span>
        <span className="text-textMuted">$</span>
        <span className="ml-2" style={{ color: '#e8fff4' }}>{cmd}</span>
        {show && !showOut && (
          <span className="cursor-blink inline-block w-[2px] h-[1em] bg-accent ml-1" />
        )}
      </div>

      {/* Output */}
      {showOut && (
        <div className="mt-1.5 pl-0 space-y-0.5">
          {out.map((line, i) => (
            <div
              key={i}
              className="font-mono text-xs leading-relaxed"
              style={{
                color: 'rgba(122,175,160,0.9)',
                animation: `fadeUp 0.4s ease ${i * 80}ms both`,
              }}
            >
              <span className="text-primary mr-2">▸</span>{line}
            </div>
          ))}
        </div>
      )}

      {/* Blinking cursor at last line */}
      {isLast && showOut && (
        <div className="flex items-center gap-1 font-mono text-sm mt-3">
          <span style={{ color: '#0dcfc0' }}>bhhc@portfolio</span>
          <span className="text-textMuted">:</span>
          <span style={{ color: '#818cf8' }}>~</span>
          <span className="text-textMuted">$</span>
          <span className="cursor-blink inline-block w-[2px] h-[1em] bg-accent ml-2" />
        </div>
      )}
    </div>
  );
}

export default function About() {
  const [ref, inView] = useInView(0.2);
  const [revealedCount, setRevealedCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    TERMINAL_LINES.forEach((line, idx) => {
      setTimeout(() => setRevealedCount(idx + 1), line.delay);
    });
  }, [inView]);

  return (
    <SectionReveal
      id="about"
      chapter="02"
      label="Chapter 02 · The Origin Story"
      title="Who's BHHC?"
      sub="cat /etc/bhhc/about.txt"
      color="#0dcfc0"
      bgVariant="right"
    >
      <div className="grid lg:grid-cols-2 gap-12 items-start" ref={ref}>
        {/* Terminal window */}
        <div
          className="rounded-2xl overflow-hidden border"
          style={{
            borderColor: 'rgba(13,207,192,0.2)',
            boxShadow: '0 0 60px rgba(13,207,192,0.06), 0 0 0 1px rgba(13,207,192,0.06)',
            background: 'rgba(3,10,8,0.97)',
          }}
        >
          {/* Window chrome */}
          <div
            className="flex items-center gap-2 px-4 py-3 border-b"
            style={{ borderColor: 'rgba(13,207,192,0.1)', background: 'rgba(0,0,0,0.3)' }}
          >
            <div className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
            <div className="w-3 h-3 rounded-full bg-yellow-400 opacity-80" />
            <div className="w-3 h-3 rounded-full" style={{ background: '#39d353', opacity: 0.8 }} />
            <div className="flex-1 text-center font-mono text-xs text-textMuted">
              bhhc@portfolio:~
            </div>
          </div>

          {/* Terminal body */}
          <div className="p-6 min-h-[360px]">
            {TERMINAL_LINES.map((line, idx) => (
              <TerminalLine
                key={idx}
                cmd={line.cmd}
                out={line.out}
                show={revealedCount > idx}
                isLast={idx === TERMINAL_LINES.length - 1}
              />
            ))}
          </div>
        </div>

      {/* Right: story text + tags */}
        <div className="flex flex-col gap-8">
          {/* Narrative */}
          <div className="space-y-4">
            <p className="font-mono text-sm leading-relaxed" style={{ color: 'rgba(232,255,244,0.75)' }}>
              Started as a curious kid who took apart every gadget he could find. Now building enterprise
              platforms, securing pipelines, and winning hackathons — all before graduating.
            </p>
            <p className="font-mono text-sm leading-relaxed" style={{ color: 'rgba(122,175,160,0.85)' }}>
              BHHC is not just a developer. He's a builder and a problem-solver who doesn't
              wait for permission to start. From full-stack enterprise applications to
              securing scalable cloud infrastructure — every project has a real purpose.
            </p>
          </div>

          {/* Personality tags */}
          <div>
            <p className="font-mono text-xs text-textMuted mb-3">$ ls ./traits/</p>
            <div className="flex flex-wrap gap-2">
              {[
                ['DevSecOps Engineer', '#39d353'],
                ['Hackathon Winner', '#f0c040'],
                ['Patent Holder', '#818cf8'],
                ['Multi-Domain Builder', '#f59e0b'],
                ['Security-First', '#0dcfc0'],
                ['Open Source Contributor', '#39d353'],
                ['Treasurer @ AsCI', '#0dcfc0'],
                ['Joint Sec @ GCCC', '#818cf8'],
              ].map(([t, c]) => (
                <span
                  key={t}
                  className="badge"
                  style={{ color: c, borderColor: `${c}44`, background: `${c}0a` }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Quote */}
          <blockquote
            className="border-l-2 pl-5 font-mono text-sm italic"
            style={{ borderColor: '#0dcfc0', color: 'rgba(13,207,192,0.8)' }}
          >
            "I build things that work. Break things that don't.
             And ship before the deadline — always."
          </blockquote>
        </div>
      </div>
    </SectionReveal>
  );
}

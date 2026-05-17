import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionReveal from './SectionReveal';

gsap.registerPlugin(ScrollTrigger);

import { EXPERIENCES } from '../data/experience';

export default function Experience() {
  const lineRef = useRef();

  useEffect(() => {
    gsap.fromTo(lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1, duration: 1.4, ease: 'power3.out', transformOrigin: 'top',
        scrollTrigger: { trigger: lineRef.current, start: 'top 80%' },
      }
    );

    gsap.utils.toArray('.exp-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: i * 0.15,
          scrollTrigger: { trigger: card, start: 'top 85%' },
        }
      );
    });
  }, []);

  return (
    <SectionReveal
      id="experience"
      chapter="03"
      label="Chapter 03 · The First War"
      title="Into the Real World"
      sub="./experience --list-all"
      color="#39d353"
      bgVariant="left"
    >
      <div className="relative pl-0 sm:pl-32">
        {/* Animated timeline track */}
        <div
          ref={lineRef}
          className="hidden sm:block absolute left-20 top-0 bottom-0 w-px timeline-track"
          style={{ transformOrigin: 'top' }}
        />

        {[...EXPERIENCES].sort((a, b) => parseInt(b.year) - parseInt(a.year)).map((exp, idx) => (
          <div key={idx} className="exp-card relative mb-12 opacity-0">
            {/* Node on timeline (hidden on mobile) */}
            <div
              className="hidden sm:flex absolute -left-[58px] top-8 w-5 h-5 rounded-full border-2 items-center justify-center bg-background"
              style={{ borderColor: exp.color, boxShadow: `0 0 16px ${exp.color}80` }}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: exp.color }} />
              {/* Year label left of the timeline node */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-mono font-bold whitespace-nowrap opacity-80"
                style={{ color: exp.color }}>
                {exp.year}
              </div>
            </div>

            {/* Card */}
            <div
              className="rounded-2xl border p-5 sm:p-7 glass glass-hover"
              style={{ borderColor: `${exp.color}22` }}
            >
              {/* Header */}
              <div className="flex items-start gap-5 mb-6">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center font-display font-black text-2xl flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${exp.color}22, ${exp.color}08)`,
                    border: `1px solid ${exp.color}33`,
                    color: exp.color,
                    boxShadow: `0 0 20px ${exp.color}20`,
                  }}
                >
                  {exp.company[0]}
                </div>
                <div>
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <h3 className="font-display font-bold text-xl text-textPrimary">{exp.company}</h3>
                    <span
                      className="badge text-[10px]"
                      style={{ color: exp.color, borderColor: `${exp.color}44`, background: `${exp.color}11` }}
                    >
                      {exp.type}
                    </span>
                  </div>
                  <p className="font-mono text-sm" style={{ color: exp.color }}>{exp.role}</p>
                  <p className="font-mono text-xs text-textMuted mt-1">{exp.period} · {exp.location}</p>
                </div>
              </div>

              {/* Description */}
              <ul className="space-y-2.5 mb-6">
                {exp.description.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 font-mono text-xs text-textMuted">
                    <span className="text-primary mt-0.5 flex-shrink-0">▸</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {exp.tags.map(t => (
                  <span key={t} className="badge" style={{ color: '#0dcfc0', borderColor: 'rgba(13,207,192,0.3)', background: 'rgba(13,207,192,0.06)' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* More coming */}
        <div className="relative flex items-center gap-4 font-mono text-xs text-textMuted pl-2">
          <div
            className="absolute -left-[1.1rem] sm:-left-[2.6rem] w-4 h-4 rounded-full border border-dashed"
            style={{ borderColor: 'rgba(57,211,83,0.3)' }}
          />
          <span className="text-primary">// </span>
          More chapters being written...
          <span className="cursor-blink inline-block w-1.5 h-3 bg-primary" />
        </div>
      </div>
    </SectionReveal>
  );
}

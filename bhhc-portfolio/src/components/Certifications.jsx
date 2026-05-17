import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, CheckCircle } from 'lucide-react';
import SectionReveal from './SectionReveal';

gsap.registerPlugin(ScrollTrigger);

import { CERTIFICATIONS } from '../data/certifications';

export default function Certifications() {
  const containerRef = useRef();

  useEffect(() => {
    gsap.utils.toArray('.cert-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.15,
          scrollTrigger: { trigger: card, start: 'top 85%' },
        }
      );
    });
  }, []);

  return (
    <SectionReveal
      id="certifications"
      chapter="07"
      label="Chapter 07 · The Credentials"
      title="Certifications"
      sub="cat /var/log/certifications.log"
      color="#f0c040"
      bgVariant="right"
    >
      <div ref={containerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CERTIFICATIONS.map((cert, index) => (
          <div
            key={index}
            className="cert-card relative rounded-xl border p-6 flex flex-col gap-4 overflow-hidden"
            style={{
              background: 'rgba(5, 15, 10, 0.6)',
              borderColor: 'rgba(240, 192, 64, 0.15)',
            }}
          >
            {/* Top gradient glow */}
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ background: `linear-gradient(90deg, ${cert.statusColor}, transparent)` }}
            />

            <div className="flex justify-between items-start gap-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(240, 192, 64, 0.1)', color: '#f0c040' }}>
                <Award size={20} />
              </div>
              <span className="font-mono text-[10px] px-2 py-1 rounded-md border tracking-wide"
                style={{
                  color: cert.statusColor,
                  borderColor: `${cert.statusColor}40`,
                  background: `${cert.statusColor}10`
                }}>
                [{cert.status}]
              </span>
            </div>

            <div>
              <h3 className="font-display font-bold text-base text-textPrimary leading-tight mb-1">
                {cert.name}
              </h3>
              <p className="font-mono text-xs text-textMuted">{cert.issuer} • {cert.date}</p>
            </div>

            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              {cert.skills.map(skill => (
                <div key={skill} className="flex items-center gap-1.5 font-mono text-[11px] text-textMuted">
                  <CheckCircle size={10} style={{ color: cert.statusColor }} />
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionReveal>
  );
}

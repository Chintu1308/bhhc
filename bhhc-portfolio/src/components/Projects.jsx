import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink, GitBranch } from 'lucide-react';
import { projects, pipeline } from '../data/projects';
import SectionReveal from './SectionReveal';

gsap.registerPlugin(ScrollTrigger);

function TiltCard({ project, index }) {
  const cardRef = useRef();
  const glowRef = useRef();

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, { rotateY: x * 14, rotateX: -y * 14, transformPerspective: 900, ease: 'power2.out', duration: 0.3 });
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, ${project.color}1a 0%, transparent 60%)`;
      }
    };

    const handleLeave = () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
      if (glowRef.current) glowRef.current.style.background = 'transparent';
    };

    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseleave', handleLeave);
    return () => {
      card.removeEventListener('mousemove', handleMove);
      card.removeEventListener('mouseleave', handleLeave);
    };
  }, [project.color]);

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: index * 0.1,
        scrollTrigger: { trigger: cardRef.current, start: 'top 88%' },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="tilt-card relative flex flex-col rounded-2xl border overflow-hidden cursor-default opacity-0"
      style={{
        background: 'rgba(5,15,10,0.8)',
        borderColor: `${project.color}18`,
        transformStyle: 'preserve-3d',
      }}
    >
      <div ref={glowRef} className="absolute inset-0 pointer-events-none rounded-2xl transition-all duration-100" />

      {/* Color top bar */}
      <div className="h-0.5" style={{ background: `linear-gradient(90deg, ${project.color}, transparent 80%)` }} />

      {/* Number watermark */}
      <div
        className="absolute top-4 right-4 font-display font-black text-6xl leading-none opacity-[0.04] pointer-events-none"
        style={{ color: project.color }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      <div className="p-7 flex flex-col gap-4 flex-1">
        {/* Icon + links */}
        <div className="flex items-center justify-between">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${project.color}22, ${project.color}08)`,
              border: `1px solid ${project.color}33`,
              boxShadow: `0 0 20px ${project.color}22`,
            }}
          >
            <div className="w-5 h-5 rounded-md" style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}88)` }} />
          </div>
          <div className="flex gap-2">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-cardBorder text-textMuted hover:text-accent hover:border-accent/40 transition-all duration-200">
                <Github size={13} />
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-cardBorder text-textMuted hover:text-accent hover:border-accent/40 transition-all duration-200">
                <ExternalLink size={13} />
              </a>
            )}
          </div>
        </div>

        {/* Title */}
        <div>
          <h3 className="font-display font-bold text-base text-textPrimary leading-tight">{project.title}</h3>
          <p className="font-mono text-xs mt-1" style={{ color: project.color }}>{project.subtitle}</p>
        </div>

        {/* Description */}
        <p className="font-mono text-xs text-textMuted leading-relaxed flex-1">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t" style={{ borderColor: `${project.color}15` }}>
          {project.tags.map(tag => (
            <span key={tag} className="badge" style={{ color: project.color, borderColor: `${project.color}33`, background: `${project.color}0a` }}>
              {tag}
            </span>
          ))}
        </div>
        {project.internship && <p className="font-mono text-[10px] text-textMuted italic">* Private repo · internship project</p>}
      </div>
    </div>
  );
}

function Pipeline() {
  const ref = useRef();
  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 88%' } }
    );
  }, []);

  return (
    <div ref={ref} className="opacity-0 rounded-2xl border p-6 glass" style={{ borderColor: 'rgba(57,211,83,0.1)' }}>
      <div className="flex items-center gap-2 mb-5">
        <GitBranch size={14} className="text-accent" />
        <span className="font-mono text-sm text-accent">$ git branch --upcoming</span>
      </div>
      <div className="space-y-3">
        {pipeline.map((item, i) => (
          <div key={i} className="flex items-center justify-between gap-4 px-4 py-2.5 rounded-xl border font-mono text-xs"
            style={{ borderColor: `${item.color}20`, background: `${item.color}06` }}>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color, boxShadow: `0 0 6px ${item.color}` }} />
              <span className="text-textMuted">{item.branch}</span>
            </div>
            <span className="badge" style={{ color: item.color, borderColor: `${item.color}44`, background: `${item.color}11` }}>
              [{item.status}]
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <SectionReveal
      id="projects"
      chapter="04"
      label="Chapter 04 · The Proof of Work"
      title="What I've Shipped"
      sub="git log --all --oneline --author=BHHC"
      color="#0dcfc0"
      bgVariant="center"
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {projects.map((p, i) => <TiltCard key={p.id} project={p} index={i} />)}
      </div>
      <Pipeline />
    </SectionReveal>
  );
}

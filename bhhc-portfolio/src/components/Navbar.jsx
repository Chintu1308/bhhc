import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Github, Linkedin, Mail, Menu, X, Terminal } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About',        href: '#about' },
  { label: 'Experience',   href: '#experience' },
  { label: 'Projects',     href: '#projects' },
  { label: 'Skills',       href: '#skills' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Blog',         href: '#blog' },
  // { label: 'Certifications',href: '#certifications' },
  { label: 'Contact',      href: '#contact' },
];

export default function Navbar({ cityMode, setCityMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navRef = useRef();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.querySelector(l.href));
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach(s => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // Navbar entrance animation
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(5, 15, 10, 0.92)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,255,136,0.08)' : 'none',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div
            className="w-7 h-7 rounded flex items-center justify-center transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #39d353, #0dcfc0)',
              boxShadow: '0 0 12px rgba(57,211,83,0.5)',
            }}
          >
            <Terminal size={14} className="text-background" />
          </div>
          <span
            className="font-display font-black text-base"
            style={{
              background: 'linear-gradient(90deg, #39d353, #0dcfc0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 8px rgba(57,211,83,0.4))',
            }}
          >
            BHHC
          </span>
          <span className="font-mono text-xs text-textMuted hidden sm:block">.exe</span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(link => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative px-3 py-1.5 font-mono text-xs transition-all duration-200 rounded group"
                  style={{ color: isActive ? '#00ff88' : '#7aafa0' }}
                >
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded"
                      style={{ background: 'rgba(0,255,136,0.06)', border: '1px solid rgba(0,255,136,0.2)' }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                  {/* Hover underline */}
                  <span
                    className="absolute bottom-0 left-3 right-3 h-px opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ background: 'linear-gradient(90deg, #39d353, #0dcfc0)' }}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right: City toggle + Socials + Resume */}
        <div className="hidden md:flex items-center gap-2">
          {/* City Mode Toggle */}
          <button
            onClick={() => setCityMode(p => !p)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border font-mono text-xs transition-all duration-300"
            style={{
              borderColor: cityMode ? 'rgba(0,255,136,0.5)' : 'rgba(0,255,136,0.2)',
              background: cityMode ? 'rgba(0,255,136,0.1)' : 'transparent',
              color: cityMode ? '#00ff88' : '#7aafa0',
              boxShadow: cityMode ? '0 0 12px rgba(0,255,136,0.2)' : 'none',
            }}
          >
            <span>{cityMode ? '🏙️' : '📄'}</span>
            <span className="hidden lg:block">{cityMode ? 'City' : 'Portfolio'}</span>
            {/* Toggle pill */}
            <div
              className="w-8 h-4 rounded-full relative transition-colors duration-300 flex-shrink-0"
              style={{ background: cityMode ? '#39d353' : 'rgba(0,255,136,0.15)' }}
            >
              <div
                className="absolute top-0.5 w-3 h-3 rounded-full bg-background transition-all duration-300"
                style={{ left: cityMode ? '17px' : '2px' }}
              />
            </div>
          </button>

          {/* Divider */}
          <div className="w-px h-5 bg-cardBorder mx-1" />

          {/* Socials */}
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
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-transparent text-textMuted hover:text-accent hover:border-accent/30 hover:bg-accent/5 transition-all duration-200"
            >
              <Icon size={15} />
            </a>
          ))}

          {/* Resume */}
          <a
            href="/resume-bhhc.pdf"
            download
            className="ml-1 px-3 py-1.5 rounded-lg font-mono text-xs font-bold border border-accent/50 text-accent hover:bg-accent/10 transition-all duration-200"
            style={{ boxShadow: '0 0 8px rgba(0,255,136,0.1)' }}
          >
            Resume
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-cardBorder text-textMuted hover:text-accent hover:border-accent/40 transition-all duration-200"
          onClick={() => setMobileOpen(p => !p)}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-300"
        style={{ maxHeight: mobileOpen ? '400px' : '0' }}
      >
        <div
          className="border-t px-4 py-4 space-y-1"
          style={{
            background: 'rgba(5,15,10,0.97)',
            backdropFilter: 'blur(20px)',
            borderColor: 'rgba(0,255,136,0.1)',
          }}
        >
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="block px-3 py-2 rounded-lg font-mono text-sm text-textMuted hover:text-accent hover:bg-accent/5 transition-all duration-200"
              onClick={() => setMobileOpen(false)}
            >
              <span className="text-primary text-xs mr-2">▸</span>
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-3 pt-3 border-t border-cardBorder mt-3">
            <a href="https://github.com/Chintu1308" target="_blank" rel="noopener noreferrer" className="text-textMuted hover:text-accent transition-colors"><Github size={16} /></a>
            <a href="https://linkedin.com/in/bhhc" target="_blank" rel="noopener noreferrer" className="text-textMuted hover:text-accent transition-colors"><Linkedin size={16} /></a>
            <a href="mailto:bhhc1308@gmail.com" className="text-textMuted hover:text-accent transition-colors"><Mail size={16} /></a>
            <a href="/resume-bhhc.pdf" download className="ml-auto px-3 py-1 rounded border border-accent/40 text-accent text-xs font-mono hover:bg-accent/10 transition-colors">Resume</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

function useUptime() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);
  const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

export default function Footer() {
  const uptime = useUptime();

  return (
    <footer
      className="border-t py-10 mt-12"
      style={{ borderColor: 'rgba(0,255,136,0.1)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="font-mono text-xs text-textMuted space-y-2 text-center">
          <div className="text-accent font-bold font-display text-base mb-4">BHHC.exe</div>

          <div>
            &gt; Built with too much caffeine ☕
          </div>

          <div className="flex items-center justify-center gap-4 py-3">
            <a href="https://github.com/Chintu1308" target="_blank" rel="noopener noreferrer"
              className="hover:text-accent transition-colors flex items-center gap-1.5">
              <Github size={14} /> GitHub
            </a>
            <span className="text-cardBorder">|</span>
            <a href="https://linkedin.com/in/bhhc" target="_blank" rel="noopener noreferrer"
              className="hover:text-accent transition-colors flex items-center gap-1.5">
              <Linkedin size={14} /> LinkedIn
            </a>
            <span className="text-cardBorder">|</span>
            <a href="https://instagram.com/binge_watcher._" target="_blank" rel="noopener noreferrer"
              className="hover:text-accent transition-colors flex items-center gap-1.5">
              <Instagram size={14} /> Instagram
            </a>
            <span className="text-cardBorder">|</span>
            <a href="mailto:bhhc1308@gmail.com"
              className="hover:text-accent transition-colors flex items-center gap-1.5">
              <Mail size={14} /> Email
            </a>
          </div>

          <div className="text-textMuted">
            &gt; uptime:{' '}
            <span className="text-primary font-bold">{uptime}</span>
            <span className="inline-block w-1.5 h-3 bg-primary ml-1 cursor-blink align-middle" />
          </div>
        </div>
      </div>
    </footer>
  );
}

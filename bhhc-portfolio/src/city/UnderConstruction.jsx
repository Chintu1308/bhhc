import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function UnderConstruction({ onBack }) {
  const containerRef = useRef();
  const textRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: 'power2.out' }
    );

    // Simple typing effect for the terminal lines
    const lines = textRef.current.children;
    gsap.fromTo(lines, 
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.15, ease: 'power2.out' }
    );

    return () => tl.kill();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: '#030806' }}
    >
      {/* Background grid effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(13, 207, 192, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(13, 207, 192, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* Radial glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(57, 211, 83, 0.05) 0%, transparent 60%)'
        }}
      />

      <div className="relative z-10 max-w-2xl w-full border border-[rgba(57,211,83,0.3)] bg-[rgba(5,15,10,0.8)] backdrop-blur-md rounded-xl p-8 overflow-hidden shadow-[0_0_40px_rgba(57,211,83,0.1)]">
        
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-8 border-b border-[rgba(57,211,83,0.2)] pb-4">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <span className="font-mono text-xs text-textMuted ml-2 tracking-wider">city_engine_v2.exe</span>
        </div>

        {/* Content */}
        <div ref={textRef} className="font-mono text-sm leading-relaxed space-y-4">
          <div style={{ color: '#39d353' }}>
            <span className="opacity-50">root@bhhc:~$</span> ./init_city_mode
          </div>
          <div className="text-yellow-400">
            [WARNING] System Architecture Upgrade in Progress
          </div>
          <div className="text-[#0dcfc0]">
            Building physics engine... [OK]
          </div>
          <div className="text-[#0dcfc0]">
            Compiling PBR materials... [OK]
          </div>
          <div className="text-[#0dcfc0]">
            Spawning hovercar... [OK]
          </div>
          <div className="text-red-400 mt-4">
            [ERR] Deployment blocked. Sector 7 G requires further optimization.
          </div>
          
          <div className="mt-8 border-l-2 border-yellow-500/50 pl-4 py-2">
            <h2 className="text-xl font-display font-bold text-white mb-2 tracking-wide">
              CITY MODE IS UNDER CONSTRUCTION 🚧
            </h2>
            <p className="text-textMuted text-xs">
              The flagship interactive 3D portfolio experience is currently being polished for its final production release. Please check back later.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-12 flex justify-end">
          <button
            onClick={onBack}
            className="group relative px-6 py-3 bg-[#39d353]/10 hover:bg-[#39d353]/20 border border-[#39d353]/30 hover:border-[#39d353] rounded-lg font-mono text-xs font-bold text-[#39d353] transition-all duration-300 flex items-center gap-3 overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#39d353]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative">Return to Portfolio</span>
            <span className="relative">⏎</span>
          </button>
        </div>
      </div>
    </div>
  );
}

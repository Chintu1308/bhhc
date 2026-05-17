import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Blog() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = textRef.current.children;
      
      gsap.fromTo(lines, 
        { opacity: 0, y: 20, filter: 'blur(10px)' },
        { 
          opacity: 1, 
          y: 0, 
          filter: 'blur(0px)',
          duration: 1.5, 
          stagger: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          }
        }
      );
    });
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="blog" className="py-24 relative overflow-hidden flex flex-col items-center justify-center min-h-[40vh]">
      <div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, #39d353 0%, transparent 80%)'
        }}
      />
      
      <div ref={containerRef} className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <div className="mb-12">
          <p className="font-mono text-textMuted text-sm mb-2">
            <span className="text-primary">07.</span> Journal
          </p>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-[#e8fff4]">
            [ Incoming Transmission ]
          </h2>
        </div>

        <div ref={textRef} className="font-mono text-sm md:text-base leading-loose tracking-wider space-y-4 text-[#0dcfc0]">
          <p className="opacity-0">&gt; The architecture is still compiling.</p>
          <p className="opacity-0">&gt; Thoughts traverse the network, seeking a node.</p>
          <p className="opacity-0">&gt; A digital journal, waiting to be written in binary.</p>
          <p className="opacity-0">&gt; Check back when the signal stabilizes...</p>
        </div>
      </div>
    </section>
  );
}

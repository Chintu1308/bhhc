import { useEffect } from 'react';

export default function Blog() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden pt-16">
      
      {/* Go Back button */}
      <a 
        href="#"
        className="absolute top-24 left-8 px-4 py-2 rounded-lg border border-accent/30 text-accent font-mono text-sm hover:bg-accent/10 transition-colors z-50"
      >
        $ cd ..
      </a>

      {/* Book Animation Scene */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Book CSS Animation */}
        <div className="book-loader mb-12">
          <div className="book-wrapper">
            <div className="book-cover left-cover"></div>
            <div className="book-page left-page"></div>
            <div className="book-page right-page">
              <div className="page-text">
                <span className="text-primary font-mono text-[10px]">&gt; error</span>
              </div>
            </div>
            <div className="book-cover right-cover"></div>
          </div>
        </div>

        {/* Message */}
        <div className="text-center font-mono space-y-4">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-[#e8fff4]">
            Writer's Block
          </h1>
          <p className="text-textMuted max-w-md mx-auto leading-relaxed text-sm">
            Take some time to configure... The author is currently staring at a blank terminal trying to center a div.
          </p>
          <div className="mt-8 flex justify-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>

      <style>{`
        .book-loader {
          perspective: 800px;
        }
        .book-wrapper {
          width: 140px;
          height: 100px;
          position: relative;
          transform-style: preserve-3d;
          animation: floatBook 4s ease-in-out infinite;
        }
        .book-cover, .book-page {
          position: absolute;
          width: 50%;
          height: 100%;
          top: 0;
          transform-origin: left center;
          border-radius: 2px 8px 8px 2px;
        }
        .left-cover, .left-page {
          left: 50%;
          transform-origin: left center;
        }
        .right-cover, .right-page {
          left: 50%;
          transform-origin: left center;
        }
        
        .book-cover {
          background: #0dcfc0;
          border: 2px solid #041a14;
          box-shadow: inset 4px 0 10px rgba(0,0,0,0.5);
          z-index: 10;
        }
        .book-page {
          background: #e8fff4;
          border: 1px solid #7aafa0;
          z-index: 5;
        }
        
        /* Initial states */
        .left-cover { transform: rotateY(-180deg); background: #39d353; border-radius: 8px 2px 2px 8px; }
        .left-page { transform: rotateY(-175deg); border-radius: 8px 2px 2px 8px; }
        
        .page-text {
          padding: 10px;
          opacity: 0;
          animation: showText 6s infinite;
        }

        /* Animations */
        @keyframes floatBook {
          0%, 100% { transform: translateY(0) rotateX(20deg); }
          50% { transform: translateY(-15px) rotateX(25deg); }
        }

        .right-cover {
          animation: openCover 6s ease-in-out infinite;
        }
        .right-page {
          animation: openPage 6s ease-in-out infinite;
        }

        @keyframes openCover {
          0%, 15%, 85%, 100% { transform: rotateY(0deg); }
          30%, 70% { transform: rotateY(-160deg); }
        }
        
        @keyframes openPage {
          0%, 20%, 80%, 100% { transform: rotateY(-2deg); }
          35%, 65% { transform: rotateY(-150deg); }
        }
        
        @keyframes showText {
          0%, 35%, 65%, 100% { opacity: 0; }
          40%, 60% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

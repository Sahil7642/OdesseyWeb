import React, { useEffect, useRef, useState } from 'react';

const WalkingCursor = () => {
  const cursorRef = useRef(null);
  const trailContainerRef = useRef(null);
  const [isWalking, setIsWalking] = useState(false);
  const walkingTimeoutRef = useRef(null);

  // Tracks the last position a trail dot was dropped
  const lastTrailPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Hide the default cursor everywhere
    document.body.style.cursor = 'none';
    
    // Also hide it on interactive elements so our custom cursor stays visible
    const style = document.createElement('style');
    style.innerHTML = `
      * { cursor: none !important; }
      a, button, input, select, textarea { cursor: none !important; }
    `;
    document.head.appendChild(style);

    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;

      // 1. Move the Main Stick Figure Cursor
      if (cursorRef.current) {
        // Offset by -10px so the tip of the stick figure's head acts as the actual "pointer"
        cursorRef.current.style.transform = `translate3d(${x - 10}px, ${y - 10}px, 0)`;
      }

      // 2. Trigger the "Walking" Animation
      setIsWalking(true);
      clearTimeout(walkingTimeoutRef.current);
      walkingTimeoutRef.current = setTimeout(() => {
        setIsWalking(false); // Stop walking if mouse stops for 100ms
      }, 100);

      // 3. Generate the Fading Trail (Throttled by distance to save performance)
      const dist = Math.hypot(x - lastTrailPos.current.x, y - lastTrailPos.current.y);
      
      // Only drop a new trail dot if the mouse moved more than 15 pixels
      if (dist > 15 && trailContainerRef.current) {
        lastTrailPos.current = { x, y };

        const dot = document.createElement('div');
        dot.className = 'cursor-trail-dot';
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
        trailContainerRef.current.appendChild(dot);

        // Trigger CSS transition
        setTimeout(() => {
          dot.style.opacity = '0';
          dot.style.transform = 'translate(-50%, -50%) scale(0.2)';
        }, 10); // Start fade immediately

        // Clean up DOM element after animation ends
        setTimeout(() => {
          if (trailContainerRef.current?.contains(dot)) {
            trailContainerRef.current.removeChild(dot);
          }
        }, 600); // Matches the CSS transition duration
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = 'auto';
      document.head.removeChild(style);
      clearTimeout(walkingTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <div ref={trailContainerRef} style={{ pointerEvents: 'none', zIndex: 99998, position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }} />
      
      <div 
        ref={cursorRef} 
        style={{ 
          position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 99999,
          willChange: 'transform' // Hardware acceleration for smooth movement
        }}
      >
        {/* The SVG Stick Figure */}
        <svg 
          viewBox="0 0 24 24" 
          width="28" 
          height="28" 
          stroke="#111827" 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className={isWalking ? 'walking-animation' : ''}
        >
          {/* Head */}
          <circle cx="12" cy="5" r="2.5"></circle>
          {/* Body */}
          <line x1="12" y1="7.5" x2="12" y2="15"></line>
          {/* Arms */}
          <line x1="12" y1="10" x2="7" y2="13"></line>
          <line x1="12" y1="10" x2="17" y2="13"></line>
          {/* Legs */}
          <line x1="12" y1="15" x2="8" y2="22"></line>
          <line x1="12" y1="15" x2="16" y2="22"></line>
        </svg>
      </div>

      <style>{`
        /* Trail Dot Styling */
        .cursor-trail-dot {
          position: absolute;
          width: 8px;
          height: 8px;
          background-color: #16a34a; /* Odessey Green */
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%) scale(1);
          opacity: 0.6;
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        /* Wiggling 'Walk' Animation for the stick figure */
        .walking-animation {
          animation: walkWiggle 0.3s infinite alternate ease-in-out;
          transform-origin: center center;
        }

        @keyframes walkWiggle {
          0% { transform: rotate(-15deg) translateY(-2px); }
          100% { transform: rotate(15deg) translateY(2px); }
        }
      `}</style>
    </>
  );
};

export default WalkingCursor;
import React from 'react';

const CosmicBg = ({ className = '', children, ...props }) => {
  return (
    <div 
      className={`relative w-full h-full bg-[#090515] overflow-hidden ${className}`} 
      {...props}
    >
      {/* Deep Space Gradient Base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a103c] via-[#090515] to-[#000000]" />

      {/* Nebula Glow 1 (Purple/Blue) */}
      <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[50%] rounded-full bg-purple-900/20 blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
      
      {/* Nebula Glow 2 (Cyan/Blue) */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-900/10 blur-[120px]" />

      {/* SVG Stars Layer */}
      <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none">
        <defs>
          <radialGradient id="star-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Randomly positioned stars */}
        <circle cx="10%" cy="15%" r="1" fill="white" className="animate-twinkle" style={{ animationDelay: '0s' }} />
        <circle cx="25%" cy="10%" r="1.5" fill="white" className="animate-twinkle" style={{ animationDelay: '1s' }} />
        <circle cx="40%" cy="25%" r="1" fill="white" className="animate-twinkle" style={{ animationDelay: '2s' }} />
        <circle cx="80%" cy="5%" r="1.5" fill="white" className="animate-twinkle" style={{ animationDelay: '0.5s' }} />
        <circle cx="90%" cy="30%" r="1" fill="white" className="animate-twinkle" style={{ animationDelay: '1.5s' }} />
        <circle cx="15%" cy="60%" r="1" fill="white" className="animate-twinkle" style={{ animationDelay: '3s' }} />
        <circle cx="70%" cy="80%" r="1.5" fill="white" className="animate-twinkle" style={{ animationDelay: '2.5s' }} />
        <circle cx="50%" cy="50%" r="1" fill="white" className="animate-twinkle" style={{ animationDelay: '1s' }} />
        <circle cx="85%" cy="90%" r="1" fill="white" className="animate-twinkle" style={{ animationDelay: '0s' }} />
        
        {/* Larger glowing star */}
        <circle cx="85%" cy="15%" r="2" fill="url(#star-glow)" className="animate-pulse" />
      </svg>

      {/* Noise Texture Overlay for grain effect */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJnoiPjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjY1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2cpIiBvcGFjaXR5PSIwLjUiLz48L3N2Zz4=')] pointer-events-none" />

      {/* Content Layer */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default CosmicBg;

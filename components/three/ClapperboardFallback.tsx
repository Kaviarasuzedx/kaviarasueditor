/** Always-visible accessible-to-the-browser SVG fallback for mobile, low motion, and no WebGL. */
export function ClapperboardFallback() {
  return (
    <svg viewBox="0 0 520 520" role="img" aria-label="Illustrated film clapperboard" className="h-full w-full overflow-visible drop-shadow-[0_45px_75px_rgba(0,0,0,0.75)]">
      <defs>
        <linearGradient id="slate" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#3b3e45" /><stop offset="1" stopColor="#101217" /></linearGradient>
        <linearGradient id="metal" x1="0" x2="1"><stop stopColor="#fff8e7" /><stop offset="1" stopColor="#a1a7aa" /></linearGradient>
        <filter id="board-glow"><feGaussianBlur stdDeviation="17" /></filter>
      </defs>
      <ellipse cx="262" cy="295" rx="176" ry="144" fill="#ffb800" opacity=".15" filter="url(#board-glow)" />
      <g transform="rotate(-11 258 258)">
        <rect x="90" y="150" width="350" height="255" rx="15" fill="#08090c" stroke="#71767c" strokeWidth="4" />
        <rect x="104" y="165" width="322" height="226" rx="7" fill="url(#slate)" />
        {[220,265,310,355].map(y => <path key={y} d={`M130 ${y} H400`} stroke="#555b64" strokeWidth="1.5" />)}
        <rect x="125" y="182" width="4" height="184" fill="#ffb800" />
        <rect x="84" y="116" width="363" height="53" rx="7" fill="#17191e" stroke="#777c83" strokeWidth="4" />
        <g transform="rotate(-11 96 120)">
          <rect x="91" y="76" width="355" height="54" rx="6" fill="url(#metal)" />
          {[0,1,2,3,4,5].map(i => <path key={i} d={`M${104 + i*58} 76 l25 0 -33 54 -25 0 z`} fill="#242830" />)}
        </g>
        <circle cx="100" cy="138" r="11" fill="#ffb800" />
        <path d="M368 374 H405" stroke="#ffb800" strokeWidth="4" strokeLinecap="round" />
      </g>
    </svg>
  );
}

import { useId } from "react";

export function ClapperboardFallback() {
  const id = useId();
  const slate = `${id}-slate`;
  const hinge = `${id}-hinge`;
  const stripes = `${id}-stripes`;
  const armStripes = `${id}-arm-stripes`;

  return (
    <svg viewBox="0 0 520 520" role="img" aria-label="Illustrated film clapperboard" className="h-full w-full drop-shadow-[0_25px_30px_rgba(0,0,0,0.65)]">
      <defs>
        <linearGradient id={slate} x2="70%" y2="100%">
          <stop stopColor="#444448" />
          <stop offset="1" stopColor="#222429" />
        </linearGradient>
        <linearGradient id={hinge} x2="100%" y2="100%">
          <stop stopColor="#555456" />
          <stop offset="1" stopColor="#202127" />
        </linearGradient>
        <pattern id={stripes} x="83" y="141" width="56" height="32" patternUnits="userSpaceOnUse">
          <rect width="56" height="32" fill="#242426" />
          <path d="M24 0H49L31 32H6Z" fill="#e1ded3" />
        </pattern>
        <pattern id={armStripes} x="83" y="104" width="56" height="32" patternUnits="userSpaceOnUse">
          <rect width="56" height="32" fill="#242426" />
          <path d="M6 0H31L49 32H24Z" fill="#e1ded3" />
        </pattern>
      </defs>
      <g transform="rotate(-5 260 260)">
        <rect x="89" y="174" width="348" height="227" rx="6" fill="#17181b" />
        <rect x="84" y="170" width="348" height="221" rx="6" fill={`url(#${slate})`} stroke="#5d5c5b" />
        <path d="M99 196H417V376H99ZM99 229H417M99 273H417M99 307H417M99 341H417M205 229V273M311 229V273" fill="none" stroke="#cfcac0" />
        <g fill="#e3ded4" fontFamily="sans-serif" fontWeight="bold" fontSize="8">
          <text x="258" y="220" textAnchor="middle" fontSize="13">KAVIARASU FILMS</text>
          <text x="107" y="242">ROLL</text>
          <text x="213" y="242">SCENE</text>
          <text x="319" y="242">TAKE</text>
          <text x="107" y="286">DIRECTOR</text>
          <text x="107" y="320">CAMERA</text>
          <text x="107" y="354">DATE</text>
        </g>
        <rect x="83" y="141" width="350" height="32" rx="4" fill={`url(#${stripes})`} stroke="#575654" />
        <rect x="83" y="104" width="350" height="32" rx="4" fill={`url(#${armStripes})`} stroke="#575654" transform="rotate(-15 95 136)" />
        <rect x="86" y="123" width="25" height="45" rx="4" fill={`url(#${hinge})`} stroke="#646365" />
        <circle cx="98.5" cy="134" r="4.5" fill="#a8a5a0" />
        <circle cx="98.5" cy="157" r="4.5" fill="#a8a5a0" />
      </g>
    </svg>
  );
}

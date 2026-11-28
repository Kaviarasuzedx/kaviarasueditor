import styles from "./AdsArtwork.module.css";

const referenceArtwork = `<svg viewBox="0 0 420 355" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Animated black and gold brand product">
<defs>
  <radialGradient id="bg"><stop stop-color="#71500b" stop-opacity=".65"/><stop offset="1" stop-color="#101011"/></radialGradient>
  <linearGradient id="bottle" x2="1" y2="1"><stop stop-color="#393939"/><stop offset=".7" stop-color="#111113"/></linearGradient>
  <linearGradient id="gold"><stop stop-color="#8a5716"/><stop offset=".5" stop-color="#edc473"/><stop offset="1" stop-color="#a26b17"/></linearGradient>
  <linearGradient id="sweep"><stop stop-color="white" stop-opacity="0"/><stop offset=".5" stop-color="white" stop-opacity=".65"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient>
  <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#ffffff" stroke-opacity=".035"/></pattern>
  <clipPath id="label"><rect x="158" y="185" width="104" height="53" rx="5"/></clipPath>
</defs>
<rect width="420" height="355" fill="url(#bg)" class="halo"/><rect width="420" height="355" fill="url(#grid)"/>
<g class="orbit" fill="none" stroke="#be902e"><circle cx="210" cy="171" r="139" opacity=".4"/><path d="M210 32 A139 139 0 0 1 347 150" stroke-width="2" opacity=".85"/><circle cx="210" cy="32" r="3" fill="#f1cf83"/></g>
<g class="reverse"><circle cx="210" cy="171" r="108" fill="none" stroke="#bb8a29" stroke-dasharray="3 8" opacity=".5"/><circle cx="102" cy="171" r="2.5" fill="#e9ba62"/><path d="M65 80L121 118 M315 118L340 80" stroke="#b98a25" stroke-width="2" opacity=".6"/></g>
<ellipse cx="210" cy="295" rx="86" ry="8" fill="#000" opacity=".5"/><g class="product"><path d="M163 116L248 110L283 276H130Z" fill="url(#bottle)" stroke="url(#gold)" stroke-width="2"/><rect x="183" y="81" width="55" height="39" rx="9" fill="#353535" stroke="url(#gold)" stroke-width="1.5"/><rect x="158" y="185" width="104" height="53" rx="5" fill="url(#gold)"/><g clip-path="url(#label)"><g class="shine"><rect x="165" y="170" width="35" height="85" fill="url(#sweep)" transform="skewX(-15)"/></g></g><text class="brand" x="210" y="216" fill="#151515" text-anchor="middle" font-family="Arial,sans-serif" font-weight="bold" font-size="17" letter-spacing="3">BRAND</text></g><path d="M120 295H300" stroke="#c4912d" opacity=".7"/></svg>`;

type Props = { label: string };

/** The SVG and its animation are copied from reference/brand-motion.html. */
export function AdsArtwork({ label }: Props) {
  return <div className={styles.artwork} role="img" aria-label={label} dangerouslySetInnerHTML={{ __html: referenceArtwork }} />;
}

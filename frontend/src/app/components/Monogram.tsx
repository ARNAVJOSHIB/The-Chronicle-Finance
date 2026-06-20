export default function Monogram({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer ring */}
      <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="2" fill="none" className="text-ink" />
      {/* Inner ring */}
      <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-ink/30" />
      {/* C */}
      <text
        x="28" y="62"
        fontFamily="'Playfair Display', serif"
        fontSize="36"
        fontWeight="700"
        fill="currentColor"
        className="text-ink"
      >C</text>
      {/* F */}
      <text
        x="48" y="62"
        fontFamily="'Playfair Display', serif"
        fontSize="36"
        fontWeight="700"
        fill="currentColor"
        className="text-ink"
      >F</text>
      {/* Gold rule accent */}
      <line x1="20" y1="70" x2="80" y2="70" stroke="currentColor" strokeWidth="1.5" className="text-gold" />
    </svg>
  );
}

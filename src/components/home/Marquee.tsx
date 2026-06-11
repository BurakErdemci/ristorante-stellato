const ITEMS = [
  "Tre Stelle Michelin",
  "The World's 50 Best — No.4",
  "Gambero Rosso Tre Forchette",
  "Wine Spectator Grand Award",
];

export default function Marquee() {
  const row = (
    <div className="flex items-center px-6 whitespace-nowrap text-[11px] tracking-[.34em] uppercase text-bone/65">
      ✦✦✦
      {ITEMS.map((item) => (
        <span key={item}>
          <span className="px-[18px] text-gold">·</span>
          {item}
        </span>
      ))}
      <span className="px-[18px] text-gold">·</span>
    </div>
  );

  return (
    <div
      className="border-y border-line py-5 overflow-hidden bg-ink-soft relative z-3"
      aria-hidden="true"
    >
      <div className="marquee-track">
        {row}
        {row}
      </div>
    </div>
  );
}

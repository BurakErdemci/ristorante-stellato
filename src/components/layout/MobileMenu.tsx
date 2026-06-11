"use client";

import { useTranslation } from "@/components/LanguageProvider";
import { locales, type Locale } from "@/i18n";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (hash: string) => void;
}

export default function MobileMenu({ open, onClose, onNavigate }: MobileMenuProps) {
  const { locale, setLocale, t } = useTranslation();
  const links = [
    { label: t.nav.story, hash: "#storia" },
    { label: t.nav.menu, hash: "#menu" },
    { label: t.nav.cantina, hash: "#cantina" },
    { label: t.nav.sera, hash: "#sera" },
  ];

  return (
    <div
      className={`fixed inset-0 z-150 bg-ink flex flex-col items-center justify-center gap-[30px] transition-opacity duration-[450ms] ease-(--ease-stellato) ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <button
        className="absolute top-[26px] right-[26px] text-[13px] tracking-[.3em] uppercase text-gold"
        onClick={onClose}
      >
        {t.reservationForm.close} ✕
      </button>

      {links.map((l) => (
        <a
          key={l.hash}
          href={l.hash}
          className="font-serif text-[34px]"
          onClick={(e) => {
            e.preventDefault();
            onClose();
            onNavigate(l.hash);
          }}
        >
          {l.label}
        </a>
      ))}
      <a
        href="#riserva"
        className="font-serif text-[34px] text-gold"
        onClick={(e) => {
          e.preventDefault();
          onClose();
          onNavigate("#riserva");
        }}
      >
        {t.nav.reservation}
      </a>

      <div className="flex items-center gap-3 mt-2">
        {(Object.keys(locales) as Locale[]).map((key) => (
          <button
            key={key}
            onClick={() => setLocale(key)}
            className={`px-4 py-2 text-xs tracking-[.3em] uppercase border transition-colors duration-300 ${
              locale === key
                ? "border-gold text-gold"
                : "border-line text-bone/50 hover:text-gold-bright hover:border-gold"
            }`}
          >
            {key.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}

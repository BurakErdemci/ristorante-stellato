"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/components/LanguageProvider";
import { useLenis } from "@/components/layout/SmoothScrollProvider";
import { locales, type Locale } from "@/i18n";
import MobileMenu from "@/components/layout/MobileMenu";

interface HeaderProps {
  /** "home": şeffaf başlar, scroll'da gizlenir · "back": her zaman opak + geri linki */
  variant?: "home" | "back";
}

export default function Header({ variant = "home" }: HeaderProps) {
  const { locale, setLocale, t } = useTranslation();
  const lenisRef = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastY = useRef(0);

  const links = [
    { label: t.nav.story, hash: "#storia" },
    { label: t.nav.menu, hash: "#menu" },
    { label: t.nav.cantina, hash: "#cantina" },
    { label: t.nav.sera, hash: "#sera" },
  ];

  useEffect(() => {
    if (variant !== "home") return;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setHidden(y > 400 && y > lastY.current);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  const scrollToHash = (hash: string) => {
    const target = document.querySelector(hash);
    if (!target) return;
    const lenis = lenisRef.current;
    if (lenis) lenis.scrollTo(target as HTMLElement, { offset: -70, duration: 1.4 });
    else target.scrollIntoView({ behavior: "smooth" });
  };

  const solid = variant === "back" || scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-100 border-b transition-all duration-500 ease-(--ease-stellato) ${
          solid
            ? "bg-ink/55 backdrop-blur-xl border-line"
            : "bg-transparent border-transparent"
        } ${hidden ? "-translate-y-full" : "translate-y-0"}`}
      >
        <nav className="w-[min(1380px,94vw)] mx-auto flex items-center justify-between py-[18px]">
          <Link href="/" className="font-serif text-[19px] tracking-[.3em]">
            STELLA<b className="text-gold font-medium">TO</b>
            <span className="text-gold">.</span>
          </Link>

          {variant === "home" ? (
            <>
              <div className="hidden md:flex gap-[42px] text-[11px] tracking-[.28em] uppercase">
                {links.map((l) => (
                  <a
                    key={l.hash}
                    href={l.hash}
                    data-hover
                    className="relative py-1 opacity-70 hover:opacity-100 transition-opacity duration-300 group"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToHash(l.hash);
                    }}
                  >
                    {l.label}
                    <span className="absolute left-0 bottom-0 h-px w-full bg-gold scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left transition-transform duration-[450ms] ease-(--ease-stellato)" />
                  </a>
                ))}
              </div>

              <div className="hidden md:flex items-center gap-5">
                <div className="flex items-center gap-2 text-[10px] tracking-[.2em] uppercase">
                  {(Object.keys(locales) as Locale[]).map((key) => (
                    <button
                      key={key}
                      data-hover
                      onClick={() => setLocale(key)}
                      aria-label={locales[key].label}
                      className={`px-1 transition-colors duration-300 ${
                        locale === key ? "text-gold-bright" : "text-bone/40 hover:text-bone"
                      }`}
                    >
                      {key.toUpperCase()}
                    </button>
                  ))}
                </div>
                <a
                  href="#riserva"
                  data-hover
                  className="text-[10px] tracking-[.3em] uppercase border border-gold text-gold-bright px-[26px] py-3 hover:bg-gold hover:text-ink transition-colors duration-[400ms]"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHash("#riserva");
                  }}
                >
                  {t.nav.reservation}
                </a>
              </div>

              <button
                className="md:hidden flex flex-col gap-[6px] p-2"
                aria-label={t.nav.menu}
                onClick={() => setMobileOpen(true)}
              >
                <span className="w-[26px] h-px bg-bone" />
                <span className="w-[26px] h-px bg-bone" />
                <span className="w-[26px] h-px bg-bone" />
              </button>
            </>
          ) : (
            <Link
              href="/"
              data-hover
              className="inline-flex items-center gap-[10px] text-[11px] tracking-[.28em] uppercase opacity-70 hover:opacity-100 hover:text-gold-bright transition-[opacity,color] duration-300"
            >
              ← {t.nav.home}
            </Link>
          )}
        </nav>
      </header>

      {variant === "home" && (
        <MobileMenu
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          onNavigate={scrollToHash}
        />
      )}
    </>
  );
}

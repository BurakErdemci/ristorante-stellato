"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "@/components/LanguageProvider";

export default function Footer() {
  const { t } = useTranslation();
  const footRef = useRef<HTMLElement>(null);
  const giantRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantRef.current,
        { yPercent: 40 },
        {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: footRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    }, footRef);
    return () => ctx.revert();
  }, []);

  const links = [
    { label: "INSTAGRAM", href: "#" },
    { label: "MICHELIN GUIDE", href: "#" },
    { label: t.footer.press, href: "#" },
    { label: t.footer.career, href: "#" },
  ];

  return (
    <footer ref={footRef} className="border-t border-line pt-[70px] bg-ink-soft overflow-hidden">
      <div className="w-[min(1280px,92vw)] mx-auto flex justify-between gap-[30px] flex-wrap items-start">
        <Link href="/" className="font-serif text-xl tracking-[.3em]">
          STELLA<b className="text-gold font-medium">TO</b>
          <span className="text-gold">.</span>
        </Link>
        <div className="flex gap-9 text-[11px] tracking-[.3em] uppercase">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              data-hover
              className="opacity-60 hover:opacity-100 hover:text-gold-bright transition-[opacity,color] duration-300"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="text-xs text-bone/40 tracking-[.1em]">{t.contact.copyright}</div>
      </div>

      <div
        ref={giantRef}
        aria-hidden="true"
        className="foot-giant mt-[60px] text-center font-serif font-medium text-[clamp(70px,16.5vw,260px)] leading-[.78] tracking-[.04em] translate-y-[18%] select-none"
      >
        STELLATO
      </div>
    </footer>
  );
}

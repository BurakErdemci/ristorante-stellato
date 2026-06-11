"use client";

import { useRef } from "react";
import Link from "next/link";
import { useTranslation } from "@/components/LanguageProvider";
import { useReveal } from "@/lib/useReveal";

export default function Riserva() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  const info = [
    { k: t.riserva.addrLabel, v: t.riserva.addr1, s: t.riserva.addr2 },
    { k: t.riserva.phoneLabel, v: "+90 216 123 45 67", s: "info@stellato.com" },
    { k: t.riserva.hoursLabel, v: t.riserva.hoursValue, s: t.riserva.hoursNote },
    { k: t.riserva.dressLabel, v: t.riserva.dressValue, s: t.riserva.dressNote },
  ];

  return (
    <section ref={sectionRef} id="riserva" className="relative border-t border-line py-[140px] overflow-hidden">
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(300px,55vw,720px)] text-gold/4 leading-none pointer-events-none select-none"
      >
        ✦
      </span>

      <div className="w-[min(1280px,92vw)] mx-auto grid md:grid-cols-[1.2fr_.8fr] gap-[clamp(48px,7vw,120px)] relative">
        <div>
          <span className="eyebrow rv">{t.riserva.eyebrow}</span>
          <h2 className="rv text-[clamp(42px,6vw,92px)] leading-[1.02] mt-[22px]">
            {t.riserva.title1}
            <br />
            <span className="italic font-normal text-gold">{t.riserva.title2}</span>
            <br />
            {t.riserva.title3}
          </h2>
          <p className="rv mt-[26px] max-w-[46ch] text-bone/70">{t.riserva.p}</p>
          <Link
            href="/rezervasyon"
            data-hover
            className="rv mt-[46px] inline-flex items-center gap-[18px] hover:gap-7 text-xs tracking-[.34em] uppercase text-ink bg-gold hover:bg-gold-bright px-10 py-5 transition-[background-color,gap] duration-[400ms] ease-(--ease-stellato)"
          >
            {t.nav.reservationCta} <span className="font-serif">→</span>
          </Link>
        </div>

        <div className="rv border-l border-line pl-[clamp(28px,4vw,56px)] max-md:border-l-0 max-md:pl-0 max-md:border-t max-md:pt-5">
          {info.map((row, i) => (
            <div
              key={row.k}
              className={`py-[26px] border-b border-line ${i === 0 ? "pt-[6px]" : ""}`}
            >
              <div className="text-[10px] tracking-[.38em] uppercase text-gold mb-[10px]">
                {row.k}
              </div>
              <div className="font-serif text-xl leading-[1.5]">
                {row.v}
                <small className="block font-sans text-[13px] text-bone/50 mt-1 tracking-[.04em]">
                  {row.s}
                </small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

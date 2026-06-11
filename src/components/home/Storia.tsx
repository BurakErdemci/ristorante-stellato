"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslation } from "@/components/LanguageProvider";
import { useReveal } from "@/lib/useReveal";

export default function Storia() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section ref={sectionRef} id="storia" className="bg-bone text-ink pt-[140px] pb-[150px]">
      <div className="w-[min(1280px,92vw)] mx-auto">
        <span className="eyebrow rv text-wine">{t.storia.eyebrow}</span>

        <div className="grid md:grid-cols-[1.05fr_.95fr] gap-[clamp(48px,7vw,110px)] items-center mt-16">
          <div>
            <h2 className="rv text-[clamp(40px,5.6vw,84px)] leading-[1.04]">
              {t.storia.title1}
              <br />
              <span className="italic font-normal text-wine">{t.storia.title2}</span>
              <br />
              {t.storia.title3}
            </h2>
            <p className="storia-lead rv mt-7 text-[17px] leading-[1.9] text-ink/80 max-w-[54ch]">
              {t.about.paragraph1}
            </p>
            <p className="rv mt-7 text-[17px] leading-[1.9] text-ink/80 max-w-[54ch]">
              {t.about.paragraph2}
            </p>
            <div className="rv mt-[42px] flex items-baseline gap-[18px]">
              <span className="font-serif italic text-[26px]">Giovanni Rossi</span>
              <span className="text-[11px] tracking-[.34em] uppercase text-ink/50">
                {t.storia.chefRole}
              </span>
            </div>
          </div>

          <div className="rv relative max-md:order-first">
            <div className="reveal-img relative overflow-hidden aspect-4/5">
              <Image
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1200&auto=format&fit=crop"
                alt={t.storia.chefImageAlt}
                fill
                sizes="(max-width: 768px) 92vw, 45vw"
                className="object-cover object-center saturate-[.86] contrast-[1.04]"
              />
            </div>
            <div className="absolute -left-[34px] bottom-[46px] max-md:left-4 max-md:bottom-4 bg-ink text-bone py-[26px] px-[30px] max-md:py-[18px] max-md:px-[22px] max-w-[250px] shadow-[0_30px_60px_rgba(8,16,22,.25)]">
              <div className="font-serif text-[42px] text-gold leading-none">40</div>
              <div className="text-[10px] tracking-[.32em] uppercase mt-2 text-bone/65">
                {t.storia.badgeLabel}
              </div>
            </div>
          </div>
        </div>

        <div className="rv mt-[130px] text-center px-[6vw]">
          <p className="font-serif italic text-[clamp(24px,3.4vw,44px)] leading-[1.35] max-w-[22ch] mx-auto">
            “{t.about.quote}”
          </p>
          <p className="mt-6 text-[11px] tracking-[.4em] uppercase text-ink/45">
            {t.about.quoteAuthor}
          </p>
        </div>
      </div>
    </section>
  );
}

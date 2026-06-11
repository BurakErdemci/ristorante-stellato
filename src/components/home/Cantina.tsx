"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "@/components/LanguageProvider";
import { useReveal } from "@/lib/useReveal";

export default function Cantina() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  useReveal(sectionRef);

  // arka plan paralaksı
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cantina"
      className="relative min-h-[72vh] flex items-center justify-center overflow-hidden text-center"
    >
      <div
        ref={bgRef}
        className="absolute inset-x-0 -inset-y-[10%] bg-cover bg-center brightness-[.4] saturate-[.8] will-change-transform"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1800&auto=format&fit=crop')",
        }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-ink via-transparent to-ink" />

      <div className="relative z-2 px-[6vw]">
        <span className="eyebrow eyebrow-center rv justify-center">{t.cantina.eyebrow}</span>
        <p className="rv font-serif italic text-[clamp(26px,4vw,52px)] leading-[1.3] max-w-[24ch] mx-auto mt-6">
          {t.cantina.q1} <em className="text-gold-bright">{t.cantina.q2}</em> {t.cantina.q3}
        </p>
        <p className="rv mt-[26px] text-[11px] tracking-[.42em] uppercase text-bone/60">
          Wine Spectator Grand Award · 2019 — 2026
        </p>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import Preloader from "@/components/layout/Preloader";
import { useTranslation } from "@/components/LanguageProvider";
import { useReducedMotion } from "@/lib/useReducedMotion";

// THREE.js SSR'da çalışmaz; yalnızca istemcide yükle
const Starfield = dynamic(() => import("@/components/three/Starfield"), { ssr: false });

const TITLE = "STELLATO";

export default function Hero() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const reduced = useReducedMotion();

  // giriş öncesi başlangıç durumları (preloader perdesi arkasında)
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.set(".hero-ch", { yPercent: 120, opacity: 0 });
      gsap.set(".rv", { opacity: 0, y: 24 });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  // preloader perdesi kalkarken hero girişi
  useEffect(() => {
    if (!revealed || reduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.45 });
      tl.to(".hero-ch", { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.05, ease: "power4.out" })
        .to(".rv", { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" }, "-=.7");
    }, sectionRef);
    return () => ctx.revert();
  }, [revealed, reduced]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-svh flex items-center justify-center overflow-hidden"
    >
      <Preloader onReveal={() => setRevealed(true)} />

      {/* arka plan: yıldız alanı (reduced-motion'da statik gradyan) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,#101a30,#081016_70%)]" />
      {!reduced && <Starfield play={revealed} />}

      {/* kenar karartmaları */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_120%,rgba(94,34,51,.22),transparent_55%),linear-gradient(to_bottom,rgba(8,16,22,.2),transparent_30%,transparent_70%,var(--ink))]" />

      <div className="relative z-2 text-center px-[6vw]">
        <span className="eyebrow eyebrow-center rv justify-center">{t.home.heroEyebrow}</span>
        <h1
          aria-label={TITLE}
          className="font-serif text-[clamp(58px,12.5vw,182px)] leading-[.96] tracking-[.06em] my-[26px] mb-[10px] text-bone [text-shadow:0_0_80px_rgba(201,163,106,.16)]"
        >
          {[...TITLE].map((ch, i) => (
            <span key={i} aria-hidden="true" className="hero-ch inline-block will-change-transform">
              {ch}
            </span>
          ))}
        </h1>
        <p className="rv font-serif italic text-[clamp(18px,2.4vw,28px)] text-gold-bright tracking-[.04em]">
          - {t.home.tagline} -
        </p>
        <p className="rv mt-[34px] text-[11px] tracking-[.5em] uppercase text-bone/50">
          {t.home.since}
        </p>
      </div>

      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 z-2 flex flex-col items-center gap-3 text-[10px] tracking-[.4em] uppercase text-bone/45">
        <span>{t.home.scrollHint}</span>
        <div className="w-px h-[60px] bg-linear-to-b from-gold to-transparent" />
      </div>
    </section>
  );
}

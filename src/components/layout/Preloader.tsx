"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useTranslation } from "@/components/LanguageProvider";

const LETTERS = ["S", "T", "E", "L", "L", "A", "T", "O"];

interface PreloaderProps {
  /** Perde yukarı kalkmaya başladığında tetiklenir; hero girişi buna senkronlanır. */
  onReveal?: () => void;
}

export default function Preloader({ onReveal }: PreloaderProps) {
  const { t } = useTranslation();
  const rootRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const onRevealRef = useRef(onReveal);

  useEffect(() => {
    onRevealRef.current = onReveal;
  }, [onReveal]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !rootRef.current) {
      if (rootRef.current) rootRef.current.style.display = "none";
      onRevealRef.current?.();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.to(".pl-letter", { y: 0, duration: 0.9, stagger: 0.06, ease: "power4.out" })
        .to(".pl-sub", { opacity: 1, duration: 0.6 }, "-=.3")
        .to(rootRef.current, {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
          delay: 0.4,
          onStart: () => onRevealRef.current?.(),
        })
        .add(() => setDone(true));
    }, rootRef);

    return () => ctx.revert();
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-200 bg-ink flex flex-col items-center justify-center gap-[18px]"
      aria-hidden="true"
    >
      <div className="flex overflow-hidden">
        {LETTERS.map((ch, i) => (
          <span
            key={i}
            className="pl-letter font-serif text-[clamp(34px,6vw,64px)] tracking-[.18em] text-bone translate-y-[110%]"
          >
            {ch}
          </span>
        ))}
      </div>
      <div className="pl-sub text-[10px] tracking-[.5em] uppercase text-gold opacity-0">
        * {t.home.tagline} *
      </div>
    </div>
  );
}

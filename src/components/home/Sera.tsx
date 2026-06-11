"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslation } from "@/components/LanguageProvider";
import { useReveal } from "@/lib/useReveal";
import type { Translations } from "@/i18n";

type MomentKey = keyof Translations["sera"]["moments"];

const MOMENTS: {
  key: MomentKey;
  time: string;
  layout: "full" | "left" | "right";
  image: string;
}[] = [
  {
    key: "aperitivo",
    time: "18:00",
    layout: "full",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=2000&auto=format&fit=crop",
  },
  {
    key: "cucina",
    time: "20:15",
    layout: "left",
    image: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?q=80&w=1400&auto=format&fit=crop",
  },
  {
    key: "dolce",
    time: "22:30",
    layout: "right",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1400&auto=format&fit=crop",
  },
  {
    key: "candela",
    time: "23:00",
    layout: "full",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2000&auto=format&fit=crop",
  },
];

export default function Sera() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section ref={sectionRef} id="sera" className="pt-[140px] pb-[60px]">
      <div className="w-[min(1280px,92vw)] mx-auto">
        <div className="mb-[90px]">
          <span className="eyebrow rv">{t.sera.eyebrow}</span>
          <h2 className="rv text-[clamp(40px,5.6vw,80px)] mt-[22px]">
            {t.sera.title1}
            <br />
            <span className="italic font-normal text-gold">{t.sera.title2}</span>
          </h2>
        </div>

        {MOMENTS.map((m) => {
          const tm = t.sera.moments[m.key];
          const wrapClass =
            m.layout === "full"
              ? "w-screen ml-[calc(50%-50vw)] h-[clamp(420px,80vh,760px)]"
              : m.layout === "left"
                ? "w-[min(76%,860px)] h-[clamp(360px,62vh,620px)] max-md:w-full"
                : "w-[min(76%,860px)] h-[clamp(360px,62vh,620px)] ml-auto max-md:w-full";
          return (
            <div key={m.key} className="mb-[clamp(90px,12vh,150px)]">
              <div className="rv flex items-baseline gap-[clamp(20px,4vw,60px)] flex-wrap mb-[30px]">
                <span className="font-serif italic text-[clamp(30px,4vw,54px)] text-gold">
                  {m.time}
                </span>
                <span className="font-serif text-[clamp(26px,3.4vw,46px)]">{tm.title}</span>
                <span className="ml-auto max-md:ml-0 max-md:w-full flex gap-7 text-[10px] tracking-[.34em] uppercase text-bone/45">
                  <span>{tm.meta1}</span>
                  <span>{tm.meta2}</span>
                </span>
              </div>
              <div className={`reveal-img relative overflow-hidden ${wrapClass}`}>
                <Image
                  src={m.image}
                  alt={`${tm.title} - ${tm.meta1}`}
                  fill
                  sizes={m.layout === "full" ? "100vw" : "(max-width: 768px) 92vw, 70vw"}
                  className="object-cover saturate-[.92] will-change-transform"
                />
              </div>
              <p
                className={`mt-[18px] text-sm text-bone/50 max-w-[48ch] tracking-[.02em] ${
                  m.layout === "right" ? "ml-auto text-right" : ""
                }`}
              >
                {tm.note}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

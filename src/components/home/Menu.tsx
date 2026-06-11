"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useTranslation } from "@/components/LanguageProvider";
import { useReveal } from "@/lib/useReveal";
import { MENU } from "@/data/menu";

export default function Menu() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [catIdx, setCatIdx] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  useReveal(sectionRef);

  const category = MENU[catIdx];
  const activeItem = category.items[activeIdx] ?? category.items[0];

  // kategori değişiminde liste girişi
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!listRef.current) return;
    const tween = gsap.fromTo(
      listRef.current.children,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power3.out" }
    );
    return () => {
      tween.kill();
    };
  }, [catIdx]);

  const selectCat = (i: number) => {
    setCatIdx(i);
    setActiveIdx(0);
  };

  return (
    <section ref={sectionRef} id="menu" className="pt-[150px] pb-[120px]">
      <div className="w-[min(1280px,92vw)] mx-auto">
        <div className="flex items-end justify-between gap-10 flex-wrap">
          <div>
            <span className="eyebrow rv">{t.menuSection.eyebrow}</span>
            <h2 className="rv text-[clamp(40px,5.6vw,80px)] leading-[1.05] mt-[22px]">
              {t.menuSection.title1}
              <br />
              <span className="italic font-normal text-gold">{t.menuSection.title2}</span>
            </h2>
          </div>
          <div className="rv flex gap-2 flex-wrap" role="tablist" aria-label={t.menuSection.categoryLabel}>
            {MENU.map((cat, i) => (
              <button
                key={cat.key}
                role="tab"
                aria-selected={i === catIdx}
                data-hover
                onClick={() => selectCat(i)}
                className={`text-[11px] tracking-[.3em] uppercase px-6 py-[13px] border transition-colors duration-[350ms] ${
                  i === catIdx
                    ? "bg-gold border-gold text-ink"
                    : "border-line text-bone/55 hover:text-bone hover:border-gold/50"
                }`}
              >
                {t.menu.categories[cat.key]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-[clamp(40px,6vw,90px)] mt-[70px] items-start">
          <div ref={listRef}>
            {category.items.map((item, i) => {
              const isActive = i === activeIdx;
              return (
                <button
                  key={item.key}
                  type="button"
                  onMouseEnter={() => setActiveIdx(i)}
                  onFocus={() => setActiveIdx(i)}
                  className={`block w-full text-left py-[30px] px-1 border-b border-line cursor-default ${
                    i === 0 ? "border-t" : ""
                  }`}
                >
                  <div className="flex items-baseline">
                    <span
                      className={`font-serif text-[clamp(22px,2.4vw,30px)] inline-block transition-[color,transform] duration-[350ms] ease-(--ease-stellato) ${
                        isActive ? "text-gold-bright translate-x-[10px]" : "text-bone/85"
                      }`}
                    >
                      {t.menu.items[item.key].name}
                    </span>
                  </div>
                  <p
                    className={`mt-2 text-sm tracking-[.02em] max-w-[52ch] transition-colors duration-[350ms] ${
                      isActive ? "text-bone/65" : "text-bone/45"
                    }`}
                  >
                    {t.menu.items[item.key].desc}
                  </p>
                </button>
              );
            })}
          </div>

          <div
            className="rv max-lg:hidden sticky top-[110px] aspect-4/5 overflow-hidden bg-ink-soft relative"
            aria-hidden="true"
          >
            {category.items.map((item, i) => (
              <Image
                key={item.key}
                src={item.image}
                alt=""
                fill
                sizes="380px"
                className={`object-cover transition-[opacity,transform] duration-700 ease-(--ease-stellato) ${
                  i === activeIdx ? "opacity-100 scale-100" : "opacity-0 scale-[1.06]"
                }`}
              />
            ))}
            <div className="absolute left-0 right-0 bottom-0 z-2 pt-[50px] px-[22px] pb-[18px] bg-linear-to-b from-transparent to-ink/80 text-[10px] tracking-[.36em] uppercase text-gold-bright">
              {t.menu.items[activeItem.key].name}
            </div>
          </div>
        </div>

        <div className="rv mt-12 flex justify-between gap-5 flex-wrap text-xs tracking-[.18em] uppercase text-bone/40">
          <span>{t.menuSection.tastingNote}</span>
          <span>{t.menuSection.wineNote}</span>
        </div>
      </div>
    </section>
  );
}

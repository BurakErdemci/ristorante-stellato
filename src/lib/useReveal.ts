import { type RefObject, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Kapsam içindeki .rv öğelerini scroll'da yukarı kaydırarak,
 * .reveal-img sargılarını perde (clip-path) efektiyle açar.
 * Reduced-motion'da hiçbir şey yapmaz (CSS öğeleri görünür bırakır).
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".rv").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".reveal-img").forEach((wrap) => {
        const img = wrap.querySelector("img");
        gsap.fromTo(
          wrap,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top 92%",
              end: "top 45%",
              scrub: 0.6,
            },
          }
        );
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.18 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: wrap,
                start: "top 92%",
                end: "top 45%",
                scrub: 0.6,
              },
            }
          );
        }
      });
    }, scope);

    return () => ctx.revert();
  }, [scope]);
}

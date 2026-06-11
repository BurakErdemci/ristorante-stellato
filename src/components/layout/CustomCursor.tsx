"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/** Altın nokta + halka imleç. Yalnızca fine-pointer cihazlarda görünür (CSS). */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!finePointer || !dotRef.current || !ringRef.current) return;

    const ring = ringRef.current;
    const dx = gsap.quickTo(dotRef.current, "x", { duration: 0.08, ease: "power2.out" });
    const dy = gsap.quickTo(dotRef.current, "y", { duration: 0.08, ease: "power2.out" });
    const rx = gsap.quickTo(ring, "x", { duration: 0.32, ease: "power3.out" });
    const ry = gsap.quickTo(ring, "y", { duration: 0.32, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      ring.classList.toggle("is-hover", !!target.closest("a,button,[data-hover]"));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}

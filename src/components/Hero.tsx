"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/components/LanguageProvider";

const MichelinStar = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0.5L14.5 8.5L23 9L16.5 14.5L18.5 23L12 18.5L5.5 23L7.5 14.5L1 9L9.5 8.5L12 0.5Z" />
  </svg>
);

// Tasarım Sabitleri
// eslint-disable-next-line @typescript-eslint/no-unused-vars

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { t } = useTranslation();

  // Parallax Efekti için Scroll Hook'ları
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });


  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-stellato-black"
    >
      {/* --- Arka Plan & Parallax --- */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black z-10" />

        <motion.img
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
          alt="Atmosphere"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* --- İçerik --- */}
      <div className="relative z-20 container mx-auto px-6 text-center mt-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
       {/* Yıldızlar */}
    <div className="flex justify-center items-center gap-4 mb-8">
     {[1, 2, 3].map((i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: 0.5 + (i * 0.2), type: "spring", stiffness: 200 }}
      className="relative"
    >
      {/* Yıldızın Arkasına Glow (Parlama) Efekti */}
      <div className="absolute inset-0 bg-stellato-gold blur-[15px] opacity-40"></div>
      <MichelinStar className="w-8 h-8 md:w-12 md:h-12 text-stellato-gold drop-shadow-lg relative z-10" />
    </motion.div>
  ))}
</div>

{/* Üst Etiket */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1.2 }}
  className="flex flex-col items-center mb-8"
>
  <span className="text-white/90 text-xs sm:text-sm tracking-[0.3em] uppercase font-medium border-b border-stellato-gold/50 pb-2 mb-1">
    {t.hero.badge}
  </span>
  <span className="text-stellato-gold text-[10px] uppercase tracking-[0.5em] font-bold">
    {t.hero.badgeSub}
  </span>
</motion.div>


          <h2 className="text-white/70 text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-6 font-light">
            Experience the Essence of Italy
          </h2>

      <h1 className="font-serif text-white leading-[0.95] drop-shadow-2xl text-5xl sm:text-7xl md:text-8xl lg:text-9xl mb-8">
        Sapori <span className="italic text-stellato-gold font-serif pr-2">d&apos;Oro</span>
        </h1>


          <p className="max-w-xl mx-auto text-white/60 font-light leading-8 mb-10 text-sm sm:text-base md:text-lg tracking-wide">
            {t.hero.description}
          </p>


          <div className="flex flex-col items-center gap-8">
            <Link
              href="#menu"
              className="inline-block border border-stellato-gold/50 text-stellato-gold px-10 py-3.5 text-[11px] font-bold tracking-[0.25em] uppercase hover:bg-stellato-gold hover:text-black transition-all duration-500"
            >
              {t.hero.cta}
            </Link>


            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 60 }}
              transition={{ delay: 1, duration: 1 }}
              className="w-px bg-linear-to-b from-stellato-gold to-transparent opacity-50"
            ></motion.div>
          </div>
        </motion.div>
      </div>


      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 2, duration: 1 },
          y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/40"
      >
        <ChevronDown size={32} strokeWidth={1} />
      </motion.div>
    </section>
  );
}

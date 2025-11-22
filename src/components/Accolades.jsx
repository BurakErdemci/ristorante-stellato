"use client";
import { motion } from 'framer-motion';

const AWARDS = [
  { id: 1, text: "3 MICHELIN STARS", sub: "2018 - 2025", icon: "★" },
  { id: 2, text: "THE WORLD'S 50 BEST", sub: "No. 4 Global Ranking", icon: "✦" },
  { id: 3, text: "GAMBERO ROSSO", sub: "Tre Forchette", icon: "Ψ" },
  { id: 4, text: "WINE SPECTATOR", sub: "Grand Award", icon: "🍇" },
];

export default function Accolades() {
  return (
    <section className="bg-stellato-gold py-6 relative overflow-hidden border-y border-[#b8962e]">
      {/* Arkaplan Deseni */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-wrap justify-around items-center gap-8 md:gap-12">
          {AWARDS.map((award, i) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="flex flex-col items-center text-center group cursor-default"
            >
              <div className="flex items-center gap-2 text-stellato-black">
    
                <span className="text-xl font-serif font-bold">{award.icon}</span>
                <span className="font-serif font-bold text-sm md:text-base tracking-widest text-stellato-black">
                  {award.text}
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-stellato-black/70 font-medium mt-1 group-hover:text-black transition-colors">
                {award.sub}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
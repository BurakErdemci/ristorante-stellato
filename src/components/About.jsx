"use client";
import { motion } from 'framer-motion';
import { Star, ChefHat, Award } from 'lucide-react';

export default function About() {
  return (
    <>
      {/* --- ABOUT SECTION --- */}
      <section id="hikayemiz" className="py-24 md:py-32 bg-[#0a0a0a] relative overflow-hidden">
        
        {/* Arkaplan Dokusu */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* --- GÖRSEL ALANI --- */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group pl-4 pt-4"
            >
              {/* Altın Çerçeve */}
              <div className="absolute top-0 left-0 w-full h-full border border-stellato-gold/30 transition-transform duration-700 group-hover:translate-x-3 group-hover:translate-y-3 z-0"></div>
              
              {/* Ana Görsel */}
              <div className="relative z-10 overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1000&auto=format&fit=crop" 
                  alt="Chef Giovanni Rossi" 
                  // grayscale-0 (mobilde renkli), md:grayscale (masaüstünde siyah-beyaz başla)
                  className="w-full h-[500px] lg:h-[600px] object-cover grayscale-0 md:grayscale filter transition-all duration-1000 md:group-hover:grayscale-0 md:group-hover:scale-105"
                />
                
                {/* Chef Badge */}
                <div className="absolute bottom-6 right-6 bg-stellato-black/80 backdrop-blur-md p-4 md:p-6 border border-white/10 shadow-xl text-right">
                  <div className="flex justify-end gap-1 mb-2">
                    {[1,2,3].map(i => (
                      <Star key={i} size={12} fill="#D4AF37" className="text-stellato-gold" />
                    ))}
                  </div>
                  <p className="font-serif text-lg md:text-xl text-white leading-none mb-1">Giovanni Rossi</p>
                  <p className="text-[10px] text-stellato-gold uppercase tracking-widest">Executive Chef</p>
                </div>
              </div>
            </motion.div>

            {/* --- METİN ALANI --- */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-stellato-gold tracking-[0.3em] uppercase text-xs font-bold block mb-6">
                Bizim Hikayemiz
              </span>

              <h2 className="font-serif text-4xl md:text-6xl text-white mb-8 leading-tight">
                Mükemmelliğin <br /> 
                <span className="italic text-stellato-gold opacity-90">İtalyan Dokunuşu</span>
              </h2>

              <div className="space-y-6 text-stone-400 font-light leading-8 text-base md:text-lg text-justify">
                <p>
                  Ristorante Stellato, köklerini Toskana'nın verimli topraklarından alır. 
                  1985'ten beri sadece en taze mevsimsel malzemeleri kullanarak, 
                  geleneksel tarifleri modern tekniklerle yeniden yorumluyoruz.
                </p>
                <p>
                  Mutfak bizim için bir kimya laboratuvarı değil, bir sanat atölyesidir. 
                  Her tabak, toprağa duyduğumuz saygının ve misafirlerimize olan tutkumuzun bir yansımasıdır.
                </p>
              </div>

              {/* İMZA & ÖDÜL ALANI (MOBİL İÇİN FLEX-COL) */}
              <div className="mt-12 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-8 border-t border-white/10 pt-8">
                
                {/* İmza */}
                <div className="flex flex-col gap-2">
                   <span className="font-serif italic text-3xl text-stone-500 select-none">Giovanni Rossi</span>
                </div>

                {/* Dikey Çizgi (Mobilde gizli, Masaüstünde açık) */}
                <div className="hidden md:block w-px h-12 bg-white/10"></div>

                {/* Michelin Badge */}
                <div className="flex items-center gap-4 group cursor-default w-full md:w-auto bg-white/5 md:bg-transparent p-3 md:p-0 rounded md:rounded-none border border-white/5 md:border-none">
                  <div className="w-12 h-12 rounded-full bg-stellato-gold/10 flex items-center justify-center border border-stellato-gold/30 group-hover:bg-stellato-gold transition-colors duration-500 shrink-0">
                    <ChefHat size={24} className="text-stellato-gold group-hover:text-black transition-colors duration-500" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-serif text-base text-white">Michelin Rehberi</p>
                    <p className="text-[10px] text-stone-500 uppercase tracking-widest group-hover:text-stellato-gold transition-colors">2025 Seçkisi</p>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- PARALLAX QUOTE DIVIDER --- */}
      <div
        className="relative py-32 bg-fixed bg-center bg-cover flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1550966871-3ed3c6221741?q=80&w=1200&auto=format&fit=crop')"
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10 container mx-auto px-6 text-center"
        >
            <Award className="mx-auto text-stellato-gold mb-6" size={40} strokeWidth={1} />
            <blockquote className="font-serif text-2xl md:text-5xl text-white italic leading-snug max-w-4xl mx-auto">
                "Yemek yapmak bir aşk eylemidir, tarifleri değil kalbinizi takip etmelisiniz."
            </blockquote>
            <cite className="block mt-8 text-xs md:text-sm text-stone-300 uppercase tracking-[0.2em] not-italic">
                — Ristorante Stellato Felsefesi
            </cite>
        </motion.div>
      </div>
    </>
  );
}
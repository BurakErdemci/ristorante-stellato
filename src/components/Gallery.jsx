"use client";
import { motion } from 'framer-motion';
import { Instagram, ArrowUpRight } from 'lucide-react';

// Görseller ve Grid Düzeni Ayarları
// colSpan ve rowSpan ile "Bento Grid" yapısı kuruyoruz.
const GALLERY_ITEMS = [
  {
    src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200&auto=format&fit=crop",
    alt: "Signature Cocktails",
    title: "İmza Kokteyller",
    className: "md:col-span-2 md:row-span-1" // Geniş
  },
  {
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop",
    alt: "Interior Ambience",
    title: "Ana Salon",
    className: "md:col-span-1 md:row-span-2" // Uzun (Dikey)
  },
  {
   
    src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=800&auto=format&fit=crop",

    alt: "Chef Plating",
    title: "Şefin Dokunuşu",
    className: "md:col-span-1 md:row-span-1"
  },

  {
    src: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=800&auto=format&fit=crop",
    alt: "Family Auidince",
    title: "Aile Ortamı",
    className: "md:col-span-1 md:row-span-1"
  },
  {
    src: "https://images.unsplash.com/photo-1592861956120-e524fc739696?q=80&w=1200&auto=format&fit=crop",
    alt: "Private Dining",
    title: "Özel Davetler",
    className: "md:col-span-2 md:row-span-1" // Geniş
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-32 bg-stellato-black relative overflow-hidden">
      
      {/* Arkaplan Deseni */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')]"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* --- Header --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-stellato-gold text-xs tracking-[0.3em] uppercase font-bold block mb-4"
            >
              Atmosfer
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-4xl md:text-6xl text-white leading-tight"
            >
              Stellato <span className="italic text-stone-500">Deneyimi</span>
            </motion.h2>
          </div>

          <motion.a 
            href="https://instagram.com" 
            target="_blank"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-stone-400 hover:text-stellato-gold transition-colors group pb-2"
          >
            <Instagram size={20} />
            <span className="text-xs uppercase tracking-widest">Instagram'da Takip Et</span>
            <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.a>
        </div>

        {/* --- Bento Grid Gallery --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px]">
          {GALLERY_ITEMS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`relative group overflow-hidden rounded-sm ${item.className}`}
            >
              {/* Resim */}
              <img 
                src={item.src} 
                alt={item.alt} 
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-colors duration-500 flex flex-col items-center justify-center p-6">
                
                {/* Çerçeve Efekti */}
                <div className="absolute inset-4 border border-white/20 scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500"></div>

                {/* İçerik */}
                <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 text-center z-10">
                  <span className="text-stellato-gold text-[10px] uppercase tracking-[0.25em] block mb-2">
                    Ristorante Stellato
                  </span>
                  <h3 className="font-serif text-2xl text-white italic">
                    {item.title}
                  </h3>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
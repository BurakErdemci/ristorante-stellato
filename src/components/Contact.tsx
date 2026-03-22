"use client";
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, ArrowUp } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/components/LanguageProvider';

export default function Contact() {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-stellato-black border-t border-theme-border-faint pt-24 pb-12 relative">
      <div className="container mx-auto px-6 md:px-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">

          {/* --- 1. Kolon: Marka ve Vizyon --- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <Link href="/" className="block group">
              <h3 className="font-serif text-3xl text-stellato-cream tracking-wider">
                STELLATO<span className="text-stellato-gold">.</span>
              </h3>
            </Link>
            <p className="text-theme-muted font-light leading-relaxed text-sm text-justify">
              {t.contact.description}
            </p>
          </motion.div>

          {/* --- 2. Kolon: İletişim --- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-stellato-gold uppercase tracking-[0.25em] mb-8 text-xs font-bold">{t.contact.title}</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group cursor-pointer">
                <MapPin size={20} className="text-stellato-gold shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <span className="text-theme-muted text-sm font-light group-hover:text-stellato-cream transition-colors">
                  {t.contact.address.split(', ').map((line, i, arr) => (
                    <span key={i}>{line}{i < arr.length - 1 && <br/>}</span>
                  ))}
                </span>
              </li>
              <li className="flex items-center gap-4 group cursor-pointer">
                <Phone size={20} className="text-stellato-gold shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-theme-muted text-sm font-light group-hover:text-stellato-cream transition-colors">
                  +90 216 123 45 67
                </span>
              </li>
              <li className="flex items-center gap-4 group cursor-pointer">
                <Mail size={20} className="text-stellato-gold shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-theme-muted text-sm font-light group-hover:text-stellato-cream transition-colors">
                  info@stellato.com
                </span>
              </li>
            </ul>
          </motion.div>

          {/* --- 3. Kolon: Çalışma Saatleri --- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-stellato-gold uppercase tracking-[0.25em] mb-8 text-xs font-bold">{t.contact.hours}</h4>
            <ul className="space-y-6">
              <li className="flex gap-4 items-start">
                <Clock size={20} className="text-stellato-gold shrink-0 mt-1" />
                <div>
                  <span className="block text-theme-secondary text-sm font-medium mb-1">{t.contact.monThu}</span>
                  <span className="text-xs text-theme-muted font-light tracking-wide">{t.contact.monThuTime}</span>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <Clock size={20} className="text-stellato-gold shrink-0 mt-1" />
                <div>
                  <span className="block text-theme-secondary text-sm font-medium mb-1">{t.contact.friSun}</span>
                  <span className="text-xs text-theme-muted font-light tracking-wide">{t.contact.friSunTime}</span>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* --- 4. Kolon: Sosyal Medya --- */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h4 className="text-stellato-gold uppercase tracking-[0.25em] mb-8 text-xs font-bold">{t.contact.followUs}</h4>
            <div className="flex gap-4">
              {[
                { icon: <Instagram size={18} />, href: "#" },
                { icon: <Twitter size={18} />, href: "#" },
                { icon: <Facebook size={18} />, href: "#" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 border border-theme-border rounded-full flex items-center justify-center text-theme-muted hover:bg-stellato-gold hover:text-black hover:border-stellato-gold hover:scale-110 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* --- Alt Bilgi (Copyright & Back to Top) --- */}
        <div className="border-t border-theme-border-faint pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-theme-muted text-[10px] uppercase tracking-[0.2em]">
            {t.contact.copyright}
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-stellato-gold text-[10px] uppercase tracking-widest hover:text-stellato-cream transition-colors group"
          >
            {t.contact.scrollTop}
            <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>

      </div>
    </footer>
  );
}

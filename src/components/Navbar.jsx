"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 

const NAV_LINKS = [
  { name: 'Ana Sayfa', href: '#home' },
  { name: 'Hikayemiz', href: '#about' },
  { name: 'Menü', href: '#menu' },
  { name: 'Galeri', href: '#gallery' },
  { name: 'İletişim', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  

  const pathname = usePathname(); 
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-700 ease-in-out border-b ${
          scrolled || !isHomePage 
            ? "bg-stellato-black/90 backdrop-blur-md py-4 border-white/5 shadow-2xl"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">

          {/* --- LOGO --- */}
          <Link
            href="/"
            className="font-serif text-2xl md:text-3xl text-white tracking-[0.15em] font-bold z-50 relative group transition-colors duration-300 hover:text-stellato-gold"
          >
            STELLATO
            <span className="text-stellato-gold text-4xl leading-none ml-1 inline-block transition-transform duration-500 group-hover:rotate-180">.</span>
          </Link>

          {/* --- DESKTOP MENU --- */}
          <nav className="hidden md:flex items-center gap-12">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={isHomePage ? link.href : `/${link.href}`}
                className="relative group py-2"
              >
                <span className="text-[11px] text-stone-300 font-medium tracking-[0.25em] uppercase transition-colors duration-300 group-hover:text-stellato-gold">
                  {link.name}
                </span>
                {/* Hover Alt Çizgi */}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-stellato-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}

            {/* Rezervasyon Butonu */}
            <Link
              href="/rezervasyon"
              className="ml-6 px-8 py-2.5 border border-stellato-gold/80 text-stellato-gold text-[10px] tracking-[0.25em] uppercase font-semibold hover:bg-stellato-gold hover:text-stellato-black transition-all duration-500"
            >
              Rezervasyon
            </Link>
          </nav>

          {/* --- MOBILE TOGGLE --- */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden z-50 text-white hover:text-stellato-gold transition-colors duration-300"
          >
            {mobileMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      {/* --- MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center z-40"
          >
             <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

            <nav className="flex flex-col items-center space-y-8 relative z-10">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                >
                  <Link
                    
                    href={isHomePage ? link.href : `/${link.href}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-4xl md:text-5xl text-stone-300 hover:text-stellato-gold hover:italic transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="pt-8"
              >
                <Link
                  href="/rezervasyon"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-10 py-4 bg-stellato-gold text-stellato-black text-xs uppercase tracking-[0.25em] font-bold hover:bg-white transition-colors duration-300"
                >
                  Rezervasyon Yap
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
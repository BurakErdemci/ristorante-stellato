"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/components/ThemeProvider';
import { useTranslation } from '@/components/LanguageProvider';
import { locales, type Locale } from '@/i18n';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useTranslation();

  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const navLinks = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.story, href: '#about' },
    { name: t.nav.menu, href: '#menu' },
    { name: t.nav.gallery, href: '#gallery' },
    { name: t.nav.contact, href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close language menu on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-700 ease-in-out border-b ${
          scrolled || !isHomePage
            ? "bg-stellato-black/90 backdrop-blur-md py-4 border-theme-border-faint shadow-2xl"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">

          {/* --- LOGO --- */}
          <Link
            href="/"
            className="font-serif text-2xl md:text-3xl text-stellato-cream tracking-[0.15em] font-bold z-50 relative group transition-colors duration-300 hover:text-stellato-gold"
          >
            STELLATO
            <span className="text-stellato-gold text-4xl leading-none ml-1 inline-block transition-transform duration-500 group-hover:rotate-180">.</span>
          </Link>

          {/* --- DESKTOP MENU --- */}
          <nav className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={isHomePage ? link.href : `/${link.href}`}
                className="relative group py-2"
              >
                <span className="text-[11px] text-theme-secondary font-medium tracking-[0.25em] uppercase transition-colors duration-300 group-hover:text-stellato-gold">
                  {link.name}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-px bg-stellato-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}

            {/* Dil Seçici */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 p-2 text-theme-muted hover:text-stellato-gold transition-colors duration-300"
                aria-label={t.nav.langToggle}
              >
                <Globe size={16} strokeWidth={1.5} />
                <span className="text-[10px] tracking-widest uppercase font-semibold">{locale}</span>
              </button>

              <AnimatePresence>
                {langMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 bg-elevated border border-theme-border rounded-sm shadow-2xl overflow-hidden min-w-[140px]"
                  >
                    {(Object.keys(locales) as Locale[]).map((key) => (
                      <button
                        key={key}
                        onClick={() => { setLocale(key); setLangMenuOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs tracking-wider uppercase transition-colors duration-200 ${
                          locale === key
                            ? "text-stellato-gold bg-stellato-gold/10"
                            : "text-theme-secondary hover:text-stellato-gold hover:bg-theme-overlay"
                        }`}
                      >
                        <span className="text-base">{locales[key].flag}</span>
                        {locales[key].label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tema Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-theme-muted hover:text-stellato-gold transition-colors duration-300"
              aria-label={t.nav.themeToggle}
            >
              {theme === "dark" ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
            </button>

            {/* Rezervasyon Butonu */}
            <Link
              href="/rezervasyon"
              className="ml-2 px-8 py-2.5 border border-stellato-gold/80 text-stellato-gold text-[10px] tracking-[0.25em] uppercase font-semibold hover:bg-stellato-gold hover:text-stellato-black transition-all duration-500"
            >
              {t.nav.reservation}
            </Link>
          </nav>

          {/* --- MOBILE TOGGLE --- */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden z-50 text-stellato-cream hover:text-stellato-gold transition-colors duration-300"
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
            className="fixed inset-0 bg-elevated flex flex-col items-center justify-center z-40"
          >
             <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

            <nav className="flex flex-col items-center space-y-8 relative z-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                >
                  <Link
                    href={isHomePage ? link.href : `/${link.href}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-4xl md:text-5xl text-theme-secondary hover:text-stellato-gold hover:italic transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile: Dil Seçici */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="flex items-center gap-3"
              >
                {(Object.keys(locales) as Locale[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => setLocale(key)}
                    className={`px-4 py-2 text-xs tracking-widest uppercase font-semibold border transition-colors duration-300 ${
                      locale === key
                        ? "border-stellato-gold text-stellato-gold"
                        : "border-theme-border text-theme-muted hover:text-stellato-gold hover:border-stellato-gold"
                    }`}
                  >
                    {locales[key].flag} {key.toUpperCase()}
                  </button>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="pt-4 flex items-center gap-6"
              >
                <Link
                  href="/rezervasyon"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-10 py-4 bg-stellato-gold text-stellato-black text-xs uppercase tracking-[0.25em] font-bold hover:bg-white transition-colors duration-300"
                >
                  {t.nav.reservationCta}
                </Link>
                <button
                  onClick={toggleTheme}
                  className="p-3 border border-theme-border text-theme-muted hover:text-stellato-gold hover:border-stellato-gold transition-colors duration-300"
                  aria-label={t.nav.themeToggle}
                >
                  {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";
import { motion } from 'framer-motion';
import { Info, ShieldCheck, Shirt, Clock, Phone } from 'lucide-react'; 
import Navbar from '@/components/Navbar';
import ReservationForm from '@/components/ReservationForm';

export default function ReservationPage() {
  return (
    <main className="min-h-screen bg-stellato-black relative overflow-hidden selection:bg-stellato-gold selection:text-black">
      <Navbar />
      
      {/* --- ARKA PLAN (Parallax Hissi) --- */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-stellato-black/85 z-10" />
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop" 
          alt="Restaurant Interior"
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      {/* --- İÇERİK ALANI --- */}
      <div className="relative z-20 container mx-auto px-6 pt-32 pb-20">
        
        {/* Başlık Kısmı */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-stellato-gold text-xs md:text-sm uppercase tracking-[0.3em] font-bold block mb-4"
          >
            Online Rezervasyon
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl text-white"
          >
            Masanızı Ayırtın
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-px w-24 bg-stellato-gold mx-auto mt-8 opacity-60"
          />
        </div>

        {/* --- GRİD LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* SOL: REZERVASYON FORMU */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-8"
          >
            <div className="bg-[#0a0a0a] border border-white/10 p-6 md:p-10 rounded-sm shadow-2xl relative overflow-hidden">
               {/* Üst Işık Efekti */}
               <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-stellato-gold/50 to-transparent opacity-50"></div>
               <ReservationForm />
            </div>
          </motion.div>

          {/* SAĞ: BİLGİ & KURALLAR (Sidebar) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-4 space-y-8"
          >
            
            {/* Bilgi Kartı */}
            <div className="bg-[#0a0a0a]/50 backdrop-blur-sm border border-white/5 p-8 rounded-sm">
              <h3 className="font-serif text-2xl text-white mb-6 flex items-center gap-3">
                <Info size={20} className="text-stellato-gold" />
                Rezervasyon Politikası
              </h3>
              <ul className="space-y-5 text-sm text-stone-400 font-light leading-relaxed">
                <li className="flex gap-3">
                  <Shirt size={18} className="text-stellato-gold shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white block mb-1">Kıyafet Kodu</strong>
                    Smart Casual. Şort, terlik ve spor kıyafetler kabul edilmemektedir.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Clock size={18} className="text-stellato-gold shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white block mb-1">Masa Süresi</strong>
                    Masalarımız 2.5 saat süreyle rezerve edilmektedir.
                  </span>
                </li>
                <li className="flex gap-3">
                  <ShieldCheck size={18} className="text-stellato-gold shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white block mb-1">İptal Politikası</strong>
                    Rezervasyon iptalleri en geç 24 saat öncesinden bildirilmelidir.
                  </span>
                </li>
              </ul>
            </div>

            {/* İletişim Kartı */}
            <div className="bg-stellato-gold/5 border border-stellato-gold/20 p-8 rounded-sm">
              <h3 className="font-serif text-xl text-white mb-4">Özel Davetler?</h3>
              <p className="text-stone-400 text-sm mb-6 leading-relaxed">
                Geniş gruplar ve özel organizasyonlar için lütfen doğrudan iletişime geçin.
              </p>
              <a href="tel:+902121234567" className="flex items-center gap-3 text-stellato-gold text-sm uppercase tracking-widest font-bold hover:text-white transition-colors">
                <Phone size={16} />
                +90 212 123 45 67
              </a>
            </div>

          </motion.div>

        </div>
      </div>
    </main>
  );
}
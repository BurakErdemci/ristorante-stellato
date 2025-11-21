"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Info } from 'lucide-react';

// MASALARIN KAPASİTELERİNİ BURADA GÜNCELLEMEYİ UNUTMA
// (Senin projendeki gerçek kapasiteler neyse onu yaz)
const TABLES = [
  { id: 1, seats: 2, x: 12, y: 15, type: 'round', zone: 'Manzara' },
  { id: 2, seats: 2, x: 12, y: 35, type: 'round', zone: 'Manzara' },
  { id: 3, seats: 4, x: 12, y: 55, type: 'round', zone: 'Manzara' },
  { id: 4, seats: 4, x: 12, y: 75, type: 'round', zone: 'Manzara' },
  { id: 5, seats: 2, x: 35, y: 25, type: 'square', zone: 'Salon' },
  { id: 6, seats: 2, x: 35, y: 65, type: 'square', zone: 'Salon' },
  { id: 7, seats: 4, x: 55, y: 25, type: 'rect', zone: 'Salon' },
  { id: 8, seats: 4, x: 55, y: 45, type: 'round', zone: 'Salon (Merkez)' },
  { id: 9, seats: 4, x: 55, y: 65, type: 'rect', zone: 'Salon' },
  { id: 10, seats: 6, x: 85, y: 20, type: 'booth', zone: 'VIP Loca' },
  { id: 11, seats: 6, x: 85, y: 50, type: 'booth', zone: 'VIP Loca' },
  { id: 12, seats: 5, x: 85, y: 80, type: 'booth', zone: 'Özel Köşe' },
  { id: 13, seats: 2, x: 35, y: 85, type: 'square', zone: 'Giriş' },
];

// ✅ requiredSeats prop'unu ekledik
export default function TableSelection({ occupiedTables = [], selectedTable, onSelect, requiredSeats = 1 }) {
  const [hoveredTable, setHoveredTable] = useState(null);

  return (
    <div className="w-full max-w-4xl mx-auto">
      
      {/* ÜST BİLGİ */}
      <div className="flex flex-wrap justify-between items-center mb-6 px-2">
        <h3 className="font-serif text-xl text-white">Kat Planı</h3>
        <div className="flex gap-4 text-[10px] uppercase tracking-widest text-stone-400">
          <div className="flex items-center gap-2"><span className="w-3 h-3 bg-white/10 border border-white/30 rounded-sm"></span> Uygun</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 bg-stellato-gold rounded-sm shadow-[0_0_10px_#D4AF37]"></span> Seçili</div>
          {/* Yeni Durum: Kapasite Yetersiz */}
          <div className="flex items-center gap-2"><span className="w-3 h-3 bg-transparent border border-white/10 opacity-20 rounded-sm"></span> Küçük</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 bg-white/5 opacity-30 rounded-sm"></span> Dolu</div>
        </div>
      </div>

      {/* KROKİ ALANI */}
      <div className="relative w-full aspect-16/10 bg-stellato-black border border-white/10 rounded-xl shadow-2xl overflow-hidden group">
        
        {/* ... (Giriş, Bar, Mutfak detayları buraya aynen gelecek, kod kısalığı için atladım) ... */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

        {/* MASALAR */}
        {TABLES.map((table) => {
          const isOccupied = occupiedTables.includes(table.id);
          const isSelected = selectedTable === table.id;
          // ✅ KAPASİTE KONTROLÜ: Eğer masa kapasitesi, seçilen kişi sayısından küçükse
          const isTooSmall = table.seats < requiredSeats;
          
          // Tıklanabilir mi? (Dolu değilse VE küçük değilse)
          const isClickable = !isOccupied && !isTooSmall;

          let shapeClass = "rounded-sm";
          if (table.type === 'round') shapeClass = "rounded-full";
          if (table.type === 'booth') shapeClass = "rounded-l-xl rounded-r-sm border-r-4 border-r-white/20";

          return (
            <motion.button
              key={table.id}
              onMouseEnter={() => setHoveredTable(table)}
              onMouseLeave={() => setHoveredTable(null)}
              // ✅ Sadece tıklanabilirse işlem yap
              onClick={() => isClickable && onSelect(table.id)}
              disabled={!isClickable}
              
              initial={{ scale: 0, opacity: 0 }}
              // ✅ Küçük veya dolu masaları soluklaştır
              animate={{ scale: 1, opacity: isClickable ? 1 : 0.3 }}
              whileHover={isClickable ? { scale: 1.05 } : {}}
              whileTap={isClickable ? { scale: 0.95 } : {}}
              transition={{ delay: table.id * 0.03 }}

              className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center transition-all duration-300 backdrop-blur-sm border
                ${shapeClass}
                ${isSelected 
                    ? 'bg-stellato-gold border-stellato-gold text-black shadow-[0_0_25px_rgba(212,175,55,0.5)] z-20' 
                    : isTooSmall
                        ? 'bg-transparent border-white/5 text-white/10 cursor-not-allowed' // Küçük masa stili
                        : isOccupied
                            ? 'bg-stone-800/40 border-white/5 cursor-not-allowed text-white/10' // Dolu masa stili
                            : 'bg-white/5 border-white/20 text-stone-300 hover:bg-white/10 hover:border-stellato-gold/50 hover:text-white z-10' // Uygun masa
                }
              `}
              style={{
                left: `${table.x}%`,
                top: `${table.y}%`,
                width: table.type === 'booth' ? '70px' : table.seats > 4 ? '80px' : '45px',
                height: table.type === 'rect' ? '60px' : table.type === 'booth' ? '50px' : '45px',
              }}
            >
              {/* Masa No */}
              <span className={`font-serif font-bold ${isSelected ? 'text-base' : 'text-sm'}`}>{table.id}</span>
              
              {/* Küçük masalarda '2P' gibi kapasiteyi silik göster */}
              <span className="text-[8px] opacity-70">{table.seats}P</span>

              {/* Uyarı İkonu (Kapasite Yetersizse) */}
              {isTooSmall && !isOccupied && (
                  <div className="absolute -top-2 -right-2 text-red-500/50 text-[10px]">✕</div>
              )}
            </motion.button>
          );
        })}

        {/* TOOLTIP */}
        <AnimatePresence>
          {hoveredTable && !occupiedTables.includes(hoveredTable.id) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute z-50 pointer-events-none bg-black/90 border border-stellato-gold/30 px-4 py-2 rounded shadow-2xl"
              style={{ 
                left: `${hoveredTable.x}%`, 
                top: `calc(${hoveredTable.y}% - 60px)`,
                transform: 'translateX(-50%)' 
              }}
            >
              <div className="text-stellato-gold font-serif whitespace-nowrap">{hoveredTable.zone}</div>
              <div className="flex items-center gap-2 text-[10px] text-stone-400">
                <Users size={10} />
                <span className={hoveredTable.seats < requiredSeats ? "text-red-400" : "text-white"}>
                    {hoveredTable.seats} Kişilik
                    {hoveredTable.seats < requiredSeats && " (Yetersiz)"}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
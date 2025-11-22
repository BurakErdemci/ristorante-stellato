"use client";
import { useState } from 'react';
import { Check, X, Trash2, Search, Filter, Calendar, Users, MessageSquare, AlertTriangle, Clock } from 'lucide-react';
import { updateReservationStatus, deleteReservation } from '@/actions/reservationActions';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminReservations({ initialData }) {
  const [reservations, setReservations] = useState(initialData || []);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loadingId, setLoadingId] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  // Status Güncelleme
  const handleStatusUpdate = async (id, newStatus) => {
    setLoadingId(id);
    await updateReservationStatus(id, newStatus);
    setReservations(prev => prev.map(res => res._id === id ? { ...res, status: newStatus } : res));
    setLoadingId(null);
  };

  // Silme İşlemi
  const confirmDelete = async () => {
    const id = deleteConfirmation;
    if (!id) return;
    setLoadingId(id);
    setDeleteConfirmation(null);
    await deleteReservation(id);
    setReservations(prev => prev.filter(res => res._id !== id));
    setLoadingId(null);
  };

  // Filtreleme
  const filteredData = reservations.filter(res => {
    const matchesFilter = filter === 'all' || res.status === filter;
    const term = search.toLowerCase();
    const matchesSearch = 
      (res.name || "").toLowerCase().includes(term) || 
      (res.email || "").toLowerCase().includes(term) || 
      (res.tableId && res.tableId.toString().includes(term));
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'confirmed': return <span className="px-3 py-1 rounded-full text-[10px] uppercase bg-green-500/10 text-green-400 border border-green-500/20">Onaylandı</span>;
      case 'cancelled': return <span className="px-3 py-1 rounded-full text-[10px] uppercase bg-red-500/10 text-red-400 border border-red-500/20">İptal</span>;
      default: return <span className="px-3 py-1 rounded-full text-[10px] uppercase bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">Bekliyor</span>;
    }
  };

  return (
    <div className="w-full relative">
      
      {/* --- TOOLBAR  --- */}
      <div className="p-4 md:p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        
        {/* Tabs - Kaydırılabilir */}
        <div className="flex gap-2 bg-white/5 p-1 rounded-lg w-full md:w-auto overflow-x-auto no-scrollbar">
          {['all', 'pending', 'confirmed', 'cancelled'].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setFilter(tab)} 
              className={`px-4 py-2 text-xs uppercase tracking-wider rounded-md transition-all whitespace-nowrap ${
                filter === tab ? 'bg-stellato-gold text-black font-bold shadow-lg' : 'text-stone-400 hover:text-white'
              }`}
            >
              {tab === 'all' ? 'Tümü' : tab === 'pending' ? 'Bekleyen' : tab === 'confirmed' ? 'Onaylı' : 'İptal'}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
          <input 
            type="text" 
            placeholder="Ara..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:border-stellato-gold focus:outline-none" 
          />
        </div>
      </div>

      {/* --- TABLO --- */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-stone-400 text-[10px] uppercase tracking-widest border-b border-white/5">
              <th className="p-5 min-w-20">Masa</th>
              <th className="p-5 min-w-[150px]">Müşteri</th>
              <th className="p-5 min-w-[140px]">Tarih</th>
              <th className="p-5 min-w-[150px]">Not</th>
              <th className="p-5 min-w-[100px]">Durum</th>
              <th className="p-5 min-w-[120px] text-right">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <AnimatePresence>
              {filteredData.map((res) => (
                <motion.tr key={res._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="hover:bg-white/2 group">
                  
                  {/* Masa No */}
                  <td className="p-5 font-serif text-stellato-gold font-bold text-lg">
                    {res.tableId || '-'}
                  </td>
                  
                  {/* Müşteri Bilgisi */}
                  <td className="p-5">
                    <div className="text-white font-medium">{res.name}</div>
                    <div className="text-xs text-stone-500 font-mono">{res.phone}</div>
                  </td>
                  
                  {/* Tarih  */}
                  <td className="p-5 text-xs text-stone-400">
                    <div className="flex items-center gap-1 mb-1">
                        <Calendar size={12} /> {new Date(res.date).toLocaleDateString('tr-TR')}
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock size={12} /> {new Date(res.date).toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'})}
                    </div>
                  </td>
                  
                  {/* Notlar */}
                  <td className="p-5 text-xs text-stone-500 max-w-[150px] truncate">
                    {res.notes || '-'}
                  </td>
                  
                  {/* Durum Badge */}
                  <td className="p-5">
                    {getStatusBadge(res.status)}
                  </td>
                  
                  {/* İşlemler */}
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                        {loadingId === res._id ? <span className="text-xs text-stellato-gold animate-pulse">...</span> : (
                        <>
                            {res.status !== 'confirmed' && (
                                <button onClick={() => handleStatusUpdate(res._id, 'confirmed')} className="p-2 bg-green-500/10 text-green-500 rounded hover:bg-green-500 hover:text-white transition-all"><Check size={14}/></button>
                            )}
                            {res.status !== 'cancelled' && (
                                <button onClick={() => handleStatusUpdate(res._id, 'cancelled')} className="p-2 bg-red-500/10 text-red-500 rounded hover:bg-red-500 hover:text-white transition-all"><X size={14}/></button>
                            )}
                            <button onClick={() => setDeleteConfirmation(res._id)} className="p-2 text-stone-500 hover:text-red-500 ml-2"><Trash2 size={14}/></button>
                        </>
                        )}
                    </div>
                  </td>

                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Silme Modalı */}
      <AnimatePresence>
        {deleteConfirmation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-[#0a0a0a] border border-stellato-gold/30 p-8 rounded-lg max-w-sm w-full text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-stellato-gold to-transparent"></div>
              <AlertTriangle size={32} className="text-red-500 mx-auto mb-4" />
              <h3 className="text-white font-serif text-xl mb-2">Kayıt Silinsin mi?</h3>
              <p className="text-stone-400 text-sm mb-6">Bu işlem geri alınamaz.</p>
              <div className="flex gap-4 justify-center">
                <button onClick={() => setDeleteConfirmation(null)} className="px-4 py-2 border border-white/10 text-stone-300 rounded hover:bg-white/5 text-sm uppercase tracking-widest">Vazgeç</button>
                <button onClick={confirmDelete} className="px-4 py-2 bg-red-900/80 text-red-100 rounded hover:bg-red-700 text-sm uppercase tracking-widest">Sil</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
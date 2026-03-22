"use client";
import { useState } from 'react';
import { Check, X, Trash2, Search, Calendar, AlertTriangle, Clock } from 'lucide-react';
import { updateReservationStatus, deleteReservation } from '@/actions/reservationActions';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/components/LanguageProvider';
import type { Reservation } from '@/types';

interface AdminReservationsProps {
  initialData: Reservation[];
}

export default function AdminReservations({ initialData }: AdminReservationsProps) {
  const [reservations, setReservations] = useState<Reservation[]>(initialData || []);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    setLoadingId(id);
    await updateReservationStatus(id, newStatus);
    setReservations(prev => prev.map(res => res._id === id ? { ...res, status: newStatus as Reservation['status'] } : res));
    setLoadingId(null);
  };

  const confirmDelete = async () => {
    const id = deleteConfirmation;
    if (!id) return;
    setLoadingId(id);
    setDeleteConfirmation(null);
    await deleteReservation(id);
    setReservations(prev => prev.filter(res => res._id !== id));
    setLoadingId(null);
  };

  const filteredData = reservations.filter(res => {
    const matchesFilter = filter === 'all' || res.status === filter;
    const term = search.toLowerCase();
    const matchesSearch =
      (res.name || "").toLowerCase().includes(term) ||
      (res.email || "").toLowerCase().includes(term) ||
      (res.tableId && res.tableId.toString().includes(term));
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'confirmed': return <span className="px-3 py-1 rounded-full text-[10px] uppercase bg-green-500/10 text-green-400 border border-green-500/20">{t.admin.statusConfirmed}</span>;
      case 'cancelled': return <span className="px-3 py-1 rounded-full text-[10px] uppercase bg-red-500/10 text-red-400 border border-red-500/20">{t.admin.statusCancelled}</span>;
      default: return <span className="px-3 py-1 rounded-full text-[10px] uppercase bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">{t.admin.statusPending}</span>;
    }
  };

  return (
    <div className="w-full relative">

      {/* --- TOOLBAR  --- */}
      <div className="p-4 md:p-6 border-b border-theme-border-faint flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

        <div className="flex gap-2 bg-theme-overlay p-1 rounded-lg w-full md:w-auto overflow-x-auto no-scrollbar">
          {['all', 'pending', 'confirmed', 'cancelled'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 text-xs uppercase tracking-wider rounded-md transition-all whitespace-nowrap ${
                filter === tab ? 'bg-stellato-gold text-black font-bold shadow-lg' : 'text-theme-muted hover:text-stellato-cream'
              }`}
            >
              {tab === 'all' ? t.admin.all : tab === 'pending' ? t.admin.pending : tab === 'confirmed' ? t.admin.confirmed : t.admin.cancelled}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-muted" />
          <input
            type="text"
            placeholder={t.admin.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black/50 border border-theme-border rounded-lg pl-10 pr-4 py-2 text-sm text-stellato-cream focus:border-stellato-gold focus:outline-none"
          />
        </div>
      </div>

      {/* --- TABLO --- */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-theme-overlay text-theme-muted text-[10px] uppercase tracking-widest border-b border-theme-border-faint">
              <th className="p-5 min-w-20">{t.admin.table}</th>
              <th className="p-5 min-w-[150px]">{t.admin.customer}</th>
              <th className="p-5 min-w-[140px]">{t.admin.dateCol}</th>
              <th className="p-5 min-w-[150px]">{t.admin.note}</th>
              <th className="p-5 min-w-[100px]">{t.admin.status}</th>
              <th className="p-5 min-w-[120px] text-right">{t.admin.action}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <AnimatePresence>
              {filteredData.map((res) => (
                <motion.tr key={res._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="hover:bg-white/2 group">

                  <td className="p-5 font-serif text-stellato-gold font-bold text-lg">
                    {res.tableId || '-'}
                  </td>

                  <td className="p-5">
                    <div className="text-stellato-cream font-medium">{res.name}</div>
                    <div className="text-xs text-theme-muted font-mono">{res.phone}</div>
                  </td>

                  <td className="p-5 text-xs text-theme-muted">
                    <div className="flex items-center gap-1 mb-1">
                        <Calendar size={12} /> {new Date(res.date).toLocaleDateString('tr-TR')}
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock size={12} /> {new Date(res.date).toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'})}
                    </div>
                  </td>

                  <td className="p-5 text-xs text-theme-muted max-w-[150px] truncate">
                    {res.notes || '-'}
                  </td>

                  <td className="p-5">
                    {getStatusBadge(res.status)}
                  </td>

                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                        {loadingId === res._id ? <span className="text-xs text-stellato-gold animate-pulse">...</span> : (
                        <>
                            {res.status !== 'confirmed' && (
                                <button onClick={() => handleStatusUpdate(res._id, 'confirmed')} className="p-2 bg-green-500/10 text-green-500 rounded hover:bg-green-500 hover:text-stellato-cream transition-all"><Check size={14}/></button>
                            )}
                            {res.status !== 'cancelled' && (
                                <button onClick={() => handleStatusUpdate(res._id, 'cancelled')} className="p-2 bg-red-500/10 text-red-500 rounded hover:bg-red-500 hover:text-stellato-cream transition-all"><X size={14}/></button>
                            )}
                            <button onClick={() => setDeleteConfirmation(res._id)} className="p-2 text-theme-muted hover:text-red-500 ml-2"><Trash2 size={14}/></button>
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
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-elevated border border-stellato-gold/30 p-8 rounded-lg max-w-sm w-full text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-stellato-gold to-transparent"></div>
              <AlertTriangle size={32} className="text-red-500 mx-auto mb-4" />
              <h3 className="text-stellato-cream font-serif text-xl mb-2">{t.admin.deleteConfirm}</h3>
              <p className="text-theme-muted text-sm mb-6">{t.admin.deleteWarning}</p>
              <div className="flex gap-4 justify-center">
                <button onClick={() => setDeleteConfirmation(null)} className="px-4 py-2 border border-theme-border text-theme-secondary rounded hover:bg-theme-overlay text-sm uppercase tracking-widest">{t.admin.cancel}</button>
                <button onClick={confirmDelete} className="px-4 py-2 bg-red-900/80 text-red-100 rounded hover:bg-red-700 text-sm uppercase tracking-widest">{t.admin.delete}</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Clock, Check, ChevronRight, ChevronLeft, AlertCircle, Phone } from 'lucide-react';
import { createReservation, getReservedTables } from '@/actions/reservationActions';
import TableSelection from './TableSelection';

// TAKVİM KÜTÜPHANESİ
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import tr from 'date-fns/locale/tr';
registerLocale('tr', tr);

const TIME_SLOTS = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];

export default function ReservationForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [occupiedTables, setOccupiedTables] = useState([]);
  
  const [showGroupModal, setShowGroupModal] = useState(false);
  
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [formData, setFormData] = useState({
    guests: 2,
    time: "",
    tableId: null,
    name: "",
    email: "",
    phone: "",
    notes: ""
  });

  const formatDate = (date) => date.toISOString().split('T')[0];

  useEffect(() => {
    const fetchOccupiedTables = async () => {
      if (selectedDate && formData.time) {
        setLoading(true);
        const dateStr = formatDate(selectedDate);
        const result = await getReservedTables(dateStr, formData.time);
        
        if (result.success) {
          setOccupiedTables(result.occupiedTableIds);
        }
        setLoading(false);
      }
    };

    fetchOccupiedTables();
    setFormData(prev => ({ ...prev, tableId: null }));
  }, [selectedDate, formData.time]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const validateStep = () => {
    setError("");
    if (step === 1) {
      const today = new Date();
      today.setHours(0,0,0,0);
      if (!selectedDate || selectedDate < today) return "Geçmiş bir tarih seçemezsiniz.";
    }
    if (step === 2 && !formData.time) return "Lütfen bir saat seçiniz.";
    if (step === 3 && !formData.tableId) return "Lütfen bir masa seçiniz.";
    return null;
  };

  const nextStep = () => {
    const err = validateStep();
    if (err) { setError(err); return; }
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setError("");
    setStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9\s\+\(\)-]{10,}$/;

    if (!formData.name || formData.name.length < 2) return setError("Lütfen geçerli bir isim giriniz.");
    if (!formData.email || !emailRegex.test(formData.email)) return setError("Lütfen geçerli bir e-posta giriniz.");
    if (!formData.phone || !phoneRegex.test(formData.phone)) return setError("Lütfen geçerli bir telefon giriniz.");
    
    setLoading(true);
    setError("");

    const submissionData = new FormData();
    submissionData.append("name", formData.name);
    submissionData.append("email", formData.email);
    submissionData.append("phone", formData.phone);
    submissionData.append("date", `${formatDate(selectedDate)}T${formData.time}`);
    submissionData.append("guests", formData.guests);
    submissionData.append("notes", formData.notes);
    submissionData.append("tableId", formData.tableId);

    try {
      const result = await createReservation(null, submissionData);

      if (result.success) {
        setStep(5);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const StepIndicator = () => (
    <div className="flex justify-center items-center mb-8 px-4">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className="flex items-center">
          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border font-serif text-sm transition-all duration-300 ${
            step >= s ? "bg-stellato-gold border-stellato-gold text-black font-bold scale-110" : "border-white/20 text-white/40"
          }`}>
            {step > s ? <Check size={16} /> : s}
          </div>
          {s < 4 && <div className={`w-8 md:w-16 h-px mx-2 transition-colors duration-300 ${step > s ? "bg-stellato-gold" : "bg-white/10"}`} />}
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto relative">
      
      {step < 5 && <StepIndicator />}

      <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 p-6 md:p-10 rounded-sm shadow-2xl relative overflow-hidden min-h-[450px]">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-stellato-gold/50 to-transparent opacity-50"></div>

        <AnimatePresence mode="wait">
          
          {/* ADIM 1 */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
              <h2 className="font-serif text-2xl md:text-3xl text-white text-center mb-8">
                Ne zaman misafirimiz olacaksınız?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4 group relative z-20">
                  <label className="flex items-center gap-2 text-stellato-gold text-xs uppercase tracking-widest">
                    <Calendar size={14} /> Tarih
                  </label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                      setError("");
                    }}
                    locale="tr"
                    minDate={new Date()}
                    dateFormat="d MMMM yyyy"
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-stellato-gold focus:outline-none cursor-pointer font-light text-lg"
                    wrapperClassName="w-full"
                  />
                </div>

                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-stellato-gold text-xs uppercase tracking-widest">
                    <Users size={14} /> Kişi Sayısı
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={(e) => {
                        if(e.target.value === "7+") {
                            setShowGroupModal(true);
                            return;
                        }
                        handleChange(e);
                    }}
                    className="w-full bg-[#0a0a0a] border-b border-white/20 py-3 text-white focus:border-stellato-gold focus:outline-none cursor-pointer font-light text-lg appearance-none"
                  >
                    {[1,2,3,4,5,6].map(n => (
                      <option key={n} value={n}>{n} Kişi</option>
                    ))}
                    <option value="7+">7+ (Grup)</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* ADIM 2 */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
              <h2 className="font-serif text-2xl md:text-3xl text-white text-center mb-2">Saatinizi Belirleyin</h2>
              <div className="text-center text-white/50 text-sm mb-6">
                {selectedDate.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })} günü için müsait saatler:
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {TIME_SLOTS.map((time) => (
                  <button
                    key={time}
                    onClick={() => {
                      setFormData(prev => ({ ...prev, time }));
                      setError("");
                    }}
                    className={`p-4 border transition-all duration-300 rounded-sm flex items-center justify-center gap-2 text-sm md:text-base ${
                      formData.time === time
                        ? "bg-stellato-gold border-stellato-gold text-black font-bold scale-105 shadow-lg"
                        : "border-white/10 text-white hover:border-stellato-gold/50 hover:bg-white/5"
                    }`}
                  >
                    <Clock size={16} />
                    {time}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ADIM 3 */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
              <h2 className="font-serif text-2xl md:text-3xl text-white text-center mb-2">Masanızı Seçin</h2>
              {loading ? (
                <div className="text-center py-20 text-stellato-gold animate-pulse flex flex-col items-center gap-4">
                  <div className="w-8 h-8 border-2 border-stellato-gold border-t-transparent rounded-full animate-spin"></div>
                  Masa durumu kontrol ediliyor...
                </div>
              ) : (
                <TableSelection 
                  occupiedTables={occupiedTables} 
                  selectedTable={formData.tableId} 
                  requiredSeats={formData.guests}
                  onSelect={(id) => {
                    setFormData(prev => ({ ...prev, tableId: id }));
                    setError("");
                  }}
                />
              )}
            </motion.div>
          )}

          {/* ADIM 4 */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <h2 className="font-serif text-2xl md:text-3xl text-white text-center mb-8">Bilgilerinizi Tamamlayın</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] uppercase text-stellato-gold tracking-widest block">Ad Soyad</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-stellato-gold focus:outline-none font-light" />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] uppercase text-stellato-gold tracking-widest block">Telefon</label>
                    <input type="tel" name="phone" placeholder="05..." value={formData.phone} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-stellato-gold focus:outline-none font-light" />
                </div>
              </div>

              <div className="space-y-2">
                  <label className="text-[10px] uppercase text-stellato-gold tracking-widest block">E-Posta</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-stellato-gold focus:outline-none font-light" />
              </div>

              <div className="space-y-2">
                  <label className="text-[10px] uppercase text-stellato-gold tracking-widest block">Özel Notlar</label>
                  <textarea name="notes" rows="2" value={formData.notes} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:border-stellato-gold focus:outline-none resize-none font-light" />
              </div>
            </motion.div>
          )}

          {/* ADIM 5 */}
          {step === 5 && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 space-y-6">
              <div className="w-20 h-20 bg-stellato-gold/10 border border-stellato-gold rounded-full flex items-center justify-center mx-auto text-stellato-gold">
                <Check size={40} />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-stellato-gold">Teşekkürler!</h2>
              <p className="text-stone-300 text-base md:text-lg max-w-md mx-auto leading-relaxed">
                Rezervasyon talebiniz başarıyla alındı. <br/>
                Konfirmasyon için size kısa süre içinde dönüş yapacağız.
              </p>
              <button onClick={() => window.location.href = '/'} className="mt-8 px-8 py-3 bg-stellato-gold text-black text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
                Ana Sayfaya Dön
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }}
            className="mt-6 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-center rounded text-xs flex items-center justify-center gap-2"
          >
            <AlertCircle size={14} /> {error}
          </motion.div>
        )}

        {step < 5 && (
          <div className="flex justify-between mt-12 pt-6 border-t border-white/5">
            {step > 1 ? (
              <button onClick={prevStep} className="flex items-center text-stone-500 hover:text-white transition-colors px-4 py-2 text-sm uppercase tracking-widest">
                <ChevronLeft size={16} className="mr-2" /> Geri
              </button>
            ) : <div></div>}

            <button
              onClick={step === 4 ? handleSubmit : nextStep}
              disabled={loading}
              className="bg-stellato-gold text-black px-8 py-3 text-xs font-bold uppercase tracking-[0.25em] hover:bg-white transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-stellato-gold/20"
            >
              {loading ? "İşleniyor..." : step === 4 ? "Tamamla" : "Devam Et"}
              {!loading && step !== 4 && <ChevronRight size={16} className="ml-2" />}
            </button>
          </div>
        )}
      </div>

      {/* --- MODERN GRUP REZERVASYONU UYARISI (MODAL) --- */}
      <AnimatePresence>
        {showGroupModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#0a0a0a] border border-stellato-gold/30 p-8 rounded-lg max-w-md w-full text-center shadow-[0_0_50px_rgba(212,175,55,0.15)] relative overflow-hidden"
            >
               {/* Altın Parıltı */}
               <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-stellato-gold to-transparent opacity-50"></div>

               <div className="w-16 h-16 bg-stellato-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-stellato-gold/20">
                  <Users size={32} className="text-stellato-gold" />
               </div>

               <h3 className="font-serif text-2xl text-white mb-3">Grup Rezervasyonu</h3>
               <p className="text-stone-400 text-sm mb-8 leading-relaxed">
                 7 kişi ve üzeri gruplar için özel hazırlık yapabilmemiz adına lütfen bizimle doğrudan iletişime geçin.
               </p>

               <div className="flex flex-col gap-3">
                  <a href="tel:+902121234567" className="w-full py-3 bg-stellato-gold text-black text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors rounded flex items-center justify-center gap-2">
                      <Phone size={16} /> Hemen Ara
                  </a>
                  <button 
                    onClick={() => setShowGroupModal(false)} 
                    className="w-full py-3 border border-white/10 text-stone-400 text-xs font-bold uppercase tracking-widest hover:text-white hover:bg-white/5 transition-colors rounded"
                  >
                      Kapat
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
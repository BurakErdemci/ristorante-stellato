"use client";

import { useState, useEffect, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Clock, Check, ChevronRight, ChevronLeft, AlertCircle, Phone } from 'lucide-react';
import { createReservation, getReservedTables } from '@/actions/reservationActions';
import TableSelection from './TableSelection';
import { useTranslation } from '@/components/LanguageProvider';

// TAKVİM KÜTÜPHANESİ
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { tr } from 'date-fns/locale/tr';
registerLocale('tr', tr);

const TIME_SLOTS = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];

interface FormData {
  guests: number;
  time: string;
  tableId: number | null;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export default function ReservationForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [occupiedTables, setOccupiedTables] = useState<number[]>([]);

  const [showGroupModal, setShowGroupModal] = useState(false);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const { t, locale } = useTranslation();

  const [formData, setFormData] = useState<FormData>({
    guests: 2,
    time: "",
    tableId: null,
    name: "",
    email: "",
    phone: "",
    notes: ""
  });

  const formatDate = (date: Date): string => date.toISOString().split('T')[0];

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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const validateStep = (): string | null => {
    setError("");
    if (step === 1) {
      const today = new Date();
      today.setHours(0,0,0,0);
      if (!selectedDate || selectedDate < today) return t.reservationForm.pastDateError;
    }
    if (step === 2 && !formData.time) return t.reservationForm.selectTimeError;
    if (step === 3 && !formData.tableId) return t.reservationForm.selectTableError;
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

    if (!formData.name || formData.name.length < 2) return setError(t.actions.nameMinLength);
    if (!formData.email || !emailRegex.test(formData.email)) return setError(t.actions.invalidEmail);
    if (!formData.phone || !phoneRegex.test(formData.phone)) return setError(t.actions.invalidPhone);

    setLoading(true);
    setError("");

    const submissionData = new FormData();
    submissionData.append("name", formData.name);
    submissionData.append("email", formData.email);
    submissionData.append("phone", formData.phone);
    submissionData.append("date", `${formatDate(selectedDate)}T${formData.time}`);
    submissionData.append("guests", formData.guests.toString());
    submissionData.append("notes", formData.notes);
    submissionData.append("tableId", formData.tableId!.toString());

    try {
      const result = await createReservation(null, submissionData);

      if (result.success) {
        setStep(5);
      } else {
        setError(result.message || t.actions.serverError);
      }
    } catch {
      setError(t.actions.serverError);
    } finally {
      setLoading(false);
    }
  };

  const dateLocaleMap: Record<string, string> = { tr: 'tr-TR', en: 'en-US', it: 'it-IT' };
  const dateLocaleStr = dateLocaleMap[locale] || 'tr-TR';

  const StepIndicator = () => (
    <div className="flex justify-center items-center mb-8 px-4">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className="flex items-center">
          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border font-serif text-sm transition-all duration-300 ${
            step >= s ? "bg-stellato-gold border-stellato-gold text-black font-bold scale-110" : "border-theme-border text-stellato-cream/40"
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

      <div className="bg-elevated/80 backdrop-blur-md border border-theme-border p-6 md:p-10 rounded-sm shadow-2xl relative overflow-hidden min-h-[450px]">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-stellato-gold/50 to-transparent opacity-50"></div>

        <AnimatePresence mode="wait">

          {/* ADIM 1 */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
              <h2 className="font-serif text-2xl md:text-3xl text-stellato-cream text-center mb-8">
                {t.reservationForm.whenTitle}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4 group relative z-20">
                  <label className="flex items-center gap-2 text-stellato-gold text-xs uppercase tracking-widest">
                    <Calendar size={14} /> {t.reservationForm.date}
                  </label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date: Date | null) => {
                      if (date) {
                        setSelectedDate(date);
                        setError("");
                      }
                    }}
                    locale="tr"
                    minDate={new Date()}
                    dateFormat="d MMMM yyyy"
                    className="w-full bg-transparent border-b border-theme-border py-3 text-stellato-cream focus:border-stellato-gold focus:outline-none cursor-pointer font-light text-lg"
                    wrapperClassName="w-full"
                  />
                </div>

                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-stellato-gold text-xs uppercase tracking-widest">
                    <Users size={14} /> {t.reservationForm.guests}
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
                    className="w-full bg-elevated border-b border-theme-border py-3 text-stellato-cream focus:border-stellato-gold focus:outline-none cursor-pointer font-light text-lg appearance-none"
                  >
                    {[1,2,3,4,5,6].map(n => (
                      <option key={n} value={n}>{n} {t.reservationForm.guestSuffix}</option>
                    ))}
                    <option value="7+">{t.reservationForm.groupOption}</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* ADIM 2 */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
              <h2 className="font-serif text-2xl md:text-3xl text-stellato-cream text-center mb-2">{t.reservationForm.selectTime}</h2>
              <div className="text-center text-stellato-cream/50 text-sm mb-6">
                {selectedDate.toLocaleDateString(dateLocaleStr, { day: 'numeric', month: 'long' })} {t.reservationForm.availableSlots}
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
                        : "border-theme-border text-stellato-cream hover:border-stellato-gold/50 hover:bg-theme-overlay"
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
              <h2 className="font-serif text-2xl md:text-3xl text-stellato-cream text-center mb-2">{t.reservationForm.selectTable}</h2>
              {loading ? (
                <div className="text-center py-20 text-stellato-gold animate-pulse flex flex-col items-center gap-4">
                  <div className="w-8 h-8 border-2 border-stellato-gold border-t-transparent rounded-full animate-spin"></div>
                  {t.reservationForm.checkingTables}
                </div>
              ) : (
                <TableSelection
                  occupiedTables={occupiedTables}
                  selectedTable={formData.tableId}
                  requiredSeats={formData.guests}
                  onSelect={(id: number) => {
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
              <h2 className="font-serif text-2xl md:text-3xl text-stellato-cream text-center mb-8">{t.reservationForm.completeInfo}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] uppercase text-stellato-gold tracking-widest block">{t.reservationForm.name}</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-transparent border-b border-theme-border py-2 text-stellato-cream focus:border-stellato-gold focus:outline-none font-light" />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] uppercase text-stellato-gold tracking-widest block">{t.reservationForm.phone}</label>
                    <input type="tel" name="phone" placeholder="05..." value={formData.phone} onChange={handleChange} className="w-full bg-transparent border-b border-theme-border py-2 text-stellato-cream focus:border-stellato-gold focus:outline-none font-light" />
                </div>
              </div>

              <div className="space-y-2">
                  <label className="text-[10px] uppercase text-stellato-gold tracking-widest block">{t.reservationForm.email}</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-transparent border-b border-theme-border py-2 text-stellato-cream focus:border-stellato-gold focus:outline-none font-light" />
              </div>

              <div className="space-y-2">
                  <label className="text-[10px] uppercase text-stellato-gold tracking-widest block">{t.reservationForm.notes}</label>
                  <textarea name="notes" rows={2} value={formData.notes} onChange={handleChange} className="w-full bg-transparent border-b border-theme-border py-2 text-stellato-cream focus:border-stellato-gold focus:outline-none resize-none font-light" />
              </div>
            </motion.div>
          )}

          {/* ADIM 5 */}
          {step === 5 && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 space-y-6">
              <div className="w-20 h-20 bg-stellato-gold/10 border border-stellato-gold rounded-full flex items-center justify-center mx-auto text-stellato-gold">
                <Check size={40} />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-stellato-gold">{t.reservationForm.thankYou}</h2>
              <p className="text-theme-secondary text-base md:text-lg max-w-md mx-auto leading-relaxed">
                {t.reservationForm.successMessage}
              </p>
              <button onClick={() => window.location.href = '/'} className="mt-8 px-8 py-3 bg-stellato-gold text-black text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
                {t.reservationForm.backToHome}
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
          <div className="flex justify-between mt-12 pt-6 border-t border-theme-border-faint">
            {step > 1 ? (
              <button onClick={prevStep} className="flex items-center text-theme-muted hover:text-stellato-cream transition-colors px-4 py-2 text-sm uppercase tracking-widest">
                <ChevronLeft size={16} className="mr-2" /> {t.reservationForm.back}
              </button>
            ) : <div></div>}

            <button
              onClick={step === 4 ? handleSubmit : nextStep}
              disabled={loading}
              className="bg-stellato-gold text-black px-8 py-3 text-xs font-bold uppercase tracking-[0.25em] hover:bg-white transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-stellato-gold/20"
            >
              {loading ? t.reservationForm.processing : step === 4 ? t.reservationForm.complete : t.reservationForm.continue}
              {!loading && step !== 4 && <ChevronRight size={16} className="ml-2" />}
            </button>
          </div>
        )}
      </div>

      {/* --- GRUP REZERVASYONU MODAL --- */}
      <AnimatePresence>
        {showGroupModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-elevated border border-stellato-gold/30 p-8 rounded-lg max-w-md w-full text-center shadow-[0_0_50px_rgba(212,175,55,0.15)] relative overflow-hidden"
            >
               <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-stellato-gold to-transparent opacity-50"></div>

               <div className="w-16 h-16 bg-stellato-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-stellato-gold/20">
                  <Users size={32} className="text-stellato-gold" />
               </div>

               <h3 className="font-serif text-2xl text-stellato-cream mb-3">{t.reservationForm.groupTitle}</h3>
               <p className="text-theme-muted text-sm mb-8 leading-relaxed">
                 {t.reservationForm.groupMessage}
               </p>

               <div className="flex flex-col gap-3">
                  <a href="tel:+902121234567" className="w-full py-3 bg-stellato-gold text-black text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors rounded flex items-center justify-center gap-2">
                      <Phone size={16} /> {t.reservationForm.callNow}
                  </a>
                  <button
                    onClick={() => setShowGroupModal(false)}
                    className="w-full py-3 border border-theme-border text-theme-muted text-xs font-bold uppercase tracking-widest hover:text-stellato-cream hover:bg-theme-overlay transition-colors rounded"
                  >
                      {t.reservationForm.close}
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

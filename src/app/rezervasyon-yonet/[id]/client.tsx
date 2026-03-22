"use client";

import { cancelReservationByUser } from "@/actions/reservationActions";
import Navbar from "@/components/Navbar";
import { useTranslation } from "@/components/LanguageProvider";
import { Calendar, Clock, Users, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Reservation } from "@/types";

interface Props {
  reservation: Reservation;
  id: string;
}

export default function ReservationManageClient({ reservation, id }: Props) {
  const { t, locale } = useTranslation();
  const router = useRouter();
  const [cancelling, setCancelling] = useState(false);

  const dateLocaleMap: Record<string, string> = { tr: "tr-TR", en: "en-US", it: "it-IT" };
  const loc = dateLocaleMap[locale] || "tr-TR";

  const handleCancel = async () => {
    setCancelling(true);
    await cancelReservationByUser(id);
    router.refresh();
  };

  return (
    <main className="force-dark min-h-screen bg-stellato-black text-white selection:bg-stellato-gold selection:text-black">
      <Navbar />

      <div className="container mx-auto px-6 pt-32 pb-20 flex justify-center">
        <div className="w-full max-w-2xl bg-elevated border border-theme-border-faint p-8 md:p-12 rounded-sm shadow-2xl relative overflow-hidden">
          {/* Üst Altın Çizgi */}
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-stellato-gold to-transparent" />

          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl md:text-4xl text-stellato-gold mb-2">
              {t.reservationManage.title}
            </h1>
            <p className="text-theme-muted text-sm uppercase tracking-widest">
              {t.reservationManage.greeting} {reservation.name}
            </p>
          </div>

          {/* Durum Göstergesi */}
          <div className="flex justify-center mb-10">
            {reservation.status === "confirmed" && (
              <div className="flex items-center gap-2 text-green-500 bg-green-500/10 px-6 py-2 rounded-full border border-green-500/20">
                <CheckCircle size={20} />
                <span className="uppercase tracking-widest text-sm font-bold">
                  {t.reservationManage.statusConfirmed}
                </span>
              </div>
            )}
            {reservation.status === "pending" && (
              <div className="flex items-center gap-2 text-yellow-500 bg-yellow-500/10 px-6 py-2 rounded-full border border-yellow-500/20">
                <Clock size={20} />
                <span className="uppercase tracking-widest text-sm font-bold">
                  {t.reservationManage.statusPending}
                </span>
              </div>
            )}
            {reservation.status === "cancelled" && (
              <div className="flex items-center gap-2 text-red-500 bg-red-500/10 px-6 py-2 rounded-full border border-red-500/20">
                <XCircle size={20} />
                <span className="uppercase tracking-widest text-sm font-bold">
                  {t.reservationManage.statusCancelled}
                </span>
              </div>
            )}
          </div>

          {/* Detaylar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-center">
            <div className="bg-white/5 p-4 rounded border border-white/5">
              <Calendar className="mx-auto text-stellato-gold mb-2" />
              <p className="text-theme-muted text-xs uppercase tracking-widest mb-1">
                {t.reservationManage.date}
              </p>
              <p className="text-xl font-serif text-stellato-cream">
                {new Date(reservation.date).toLocaleDateString(loc)}
              </p>
            </div>
            <div className="bg-white/5 p-4 rounded border border-white/5">
              <Clock className="mx-auto text-stellato-gold mb-2" />
              <p className="text-theme-muted text-xs uppercase tracking-widest mb-1">
                {t.reservationManage.time}
              </p>
              <p className="text-xl font-serif text-stellato-cream">
                {new Date(reservation.date).toLocaleTimeString(loc, { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
            <div className="bg-white/5 p-4 rounded border border-white/5">
              <Users className="mx-auto text-stellato-gold mb-2" />
              <p className="text-theme-muted text-xs uppercase tracking-widest mb-1">
                {t.reservationManage.guests}
              </p>
              <p className="text-xl font-serif text-stellato-cream">
                {reservation.guests} {t.reservationManage.guests}
              </p>
            </div>
          </div>

          {/* İptal Butonu */}
          {reservation.status !== "cancelled" && (
            <div className="border-t border-white/10 pt-8 text-center">
              <div className="bg-red-900/20 border border-red-500/20 p-4 rounded mb-6 flex items-start gap-3 text-left">
                <AlertTriangle className="text-red-500 shrink-0" size={20} />
                <p className="text-red-200 text-sm">{t.reservationManage.cancelInfo}</p>
              </div>

              <button
                type="button"
                onClick={handleCancel}
                disabled={cancelling}
                className="bg-transparent border border-red-500 text-red-500 px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
              >
                {t.reservationManage.cancelButton}
              </button>
            </div>
          )}

          {reservation.status === "cancelled" && (
            <div className="text-center text-theme-muted text-sm">
              <p>{t.reservationManage.cancelledMessage}</p>
              <a href="/rezervasyon" className="text-stellato-gold underline mt-2 inline-block">
                {t.reservationManage.newReservation}
              </a>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

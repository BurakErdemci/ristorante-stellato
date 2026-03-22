"use client";

import Navbar from "@/components/Navbar";
import AdminReservations from "@/components/AdminReservations";
import AdminHeader from "@/components/AdminHeader";
import { Users, Clock, CheckCircle, AlertCircle, LucideIcon } from "lucide-react";
import { useTranslation } from "@/components/LanguageProvider";
import type { Reservation } from "@/types";

const StatCard = ({ title, value, icon: Icon, color }: { title: string; value: number; icon: LucideIcon; color: string }) => (
  <div className="bg-elevated border border-theme-border-faint p-6 rounded-lg flex items-center justify-between group hover:border-stellato-gold/30 transition-colors">
    <div>
      <p className="text-theme-muted text-xs uppercase tracking-widest mb-2">{title}</p>
      <p className="text-3xl font-serif text-stellato-cream">{value}</p>
    </div>
    <div className={`p-3 rounded-full ${color} bg-opacity-10`}>
      <Icon size={24} className={color.replace("bg-", "text-")} />
    </div>
  </div>
);

interface Props {
  reservations: Reservation[];
}

export default function AdminClient({ reservations }: Props) {
  const { t, locale } = useTranslation();

  const dateLocaleMap: Record<string, string> = { tr: "tr-TR", en: "en-US", it: "it-IT" };
  const loc = dateLocaleMap[locale] || "tr-TR";

  const total = reservations.length;
  const pending = reservations.filter((r) => r.status === "pending").length;
  const confirmed = reservations.filter((r) => r.status === "confirmed").length;
  const totalGuests = reservations.reduce((acc, curr) => acc + Number(curr.guests || 0), 0);

  return (
    <main className="min-h-screen bg-stellato-black text-theme-secondary selection:bg-stellato-gold selection:text-black">
      <Navbar />

      <div className="container mx-auto px-6 pt-32 pb-20">
        {/* Başlık */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 pb-6 border-b border-theme-border-faint">
          <div>
            <h1 className="font-serif text-4xl text-stellato-cream mb-2">
              {t.admin.panel} <span className="text-stellato-gold">.</span>
            </h1>
            <p className="text-theme-muted text-sm">{t.admin.panelDesc}</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right hidden md:block">
              <p className="text-stellato-gold text-xs uppercase tracking-widest mb-1">{t.admin.today}</p>
              <p className="text-stellato-cream text-lg font-serif">
                {new Date().toLocaleDateString(loc, { weekday: "long", day: "numeric", month: "long" })}
              </p>
            </div>
            <AdminHeader />
          </div>
        </div>

        {/* İstatistik Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard title={t.admin.totalReservations} value={total} icon={Users} color="bg-blue-500" />
          <StatCard title={t.admin.pendingApproval} value={pending} icon={AlertCircle} color="bg-yellow-500" />
          <StatCard title={t.admin.confirmedTables} value={confirmed} icon={CheckCircle} color="bg-green-500" />
          <StatCard title={t.admin.totalGuests} value={totalGuests} icon={Clock} color="bg-purple-500" />
        </div>

        {/* Ana Tablo Alanı */}
        <div className="bg-elevated border border-theme-border rounded-xl overflow-hidden shadow-2xl">
          <AdminReservations initialData={reservations || []} />
        </div>
      </div>
    </main>
  );
}

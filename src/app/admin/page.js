import { getReservations } from '@/actions/reservationActions';
import Navbar from '@/components/Navbar';
import AdminReservations from '@/components/AdminReservations'; 
import { Users, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Admin Paneli | Ristorante Stellato',
};

// İstatistik Kartı Componenti
const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-lg flex items-center justify-between group hover:border-stellato-gold/30 transition-colors">
    <div>
      <p className="text-stone-500 text-xs uppercase tracking-widest mb-2">{title}</p>
      <p className="text-3xl font-serif text-white">{value}</p>
    </div>
    <div className={`p-3 rounded-full ${color} bg-opacity-10`}>
      <Icon size={24} className={color.replace('bg-', 'text-')} />
    </div>
  </div>
);

export default async function AdminPage() {

  const { data: reservations = [] } = await getReservations();

  // İstatistikler
  const total = reservations.length;
  const pending = reservations.filter(r => r.status === 'pending').length; 
  const confirmed = reservations.filter(r => r.status === 'confirmed').length;
  const totalGuests = reservations.reduce((acc, curr) => acc + Number(curr.guests || 0), 0);

  return (
    <main className="min-h-screen bg-stellato-black text-stone-300 selection:bg-stellato-gold selection:text-black">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 pb-20">
        
        {/* Başlık */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 pb-6 border-b border-white/5">
          <div>
            <h1 className="font-serif text-4xl text-white mb-2">
              Yönetim Paneli <span className="text-stellato-gold">.</span>
            </h1>
            <p className="text-stone-500 text-sm">Restoran doluluk ve rezervasyon durumu.</p>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-stellato-gold text-xs uppercase tracking-widest mb-1">Bugün</p>
            <p className="text-white text-lg font-serif">{new Date().toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
          </div>
        </div>

        {/* İstatistik Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard title="Toplam Rezervasyon" value={total} icon={Users} color="bg-blue-500" />
          <StatCard title="Bekleyen Onay" value={pending} icon={AlertCircle} color="bg-yellow-500" />
          <StatCard title="Kesinleşen Masa" value={confirmed} icon={CheckCircle} color="bg-green-500" />
          <StatCard title="Toplam Misafir" value={totalGuests} icon={Clock} color="bg-purple-500" />
        </div>

        {/* Ana Tablo Alanı */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
        
          <AdminReservations initialData={reservations || []} />
          
        </div>
      </div>
    </main>
  );
}
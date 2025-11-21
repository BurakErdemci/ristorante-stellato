export const dynamic = 'force-dynamic'; 


import { getReservationById, cancelReservationByUser } from '@/actions/reservationActions';
import Navbar from '@/components/Navbar';
import { Calendar, Clock, Users, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { redirect } from 'next/navigation';

// ✅ Params artık Promise olduğu için 'await' ile karşılıyoruz
export default async function ManageReservationPage({ params }) {
  
  // 1. DÜZELTME BURADA: params'ı await ediyoruz
  const { id } = await params; 

  // ID ile veriyi çek
  const reservation = await getReservationById(id);

  // Kayıt yoksa veya ID hatalıysa ana sayfaya at
  if (!reservation) {
    redirect('/');
  }

  // İptal İşlemi (Server Action)
  async function cancelAction() {
    "use server";
    await cancelReservationByUser(id);
    // Sayfayı yenilemek yerine parametre ile yönlendirip durumu güncelleyelim
    redirect(`/rezervasyon-yonet/${id}?status=cancelled`);
  }

  return (
    <main className="min-h-screen bg-stellato-black text-white selection:bg-stellato-gold selection:text-black">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 pb-20 flex justify-center">
        <div className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 p-8 md:p-12 rounded-sm shadow-2xl relative overflow-hidden">
          {/* Üst Altın Çizgi */}
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-stellato-gold to-transparent"></div>

          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl md:text-4xl text-stellato-gold mb-2">Rezervasyon Detayı</h1>
            <p className="text-stone-500 text-sm uppercase tracking-widest">Sayın {reservation.name}</p>
          </div>

          {/* Durum Göstergesi */}
          <div className="flex justify-center mb-10">
            {reservation.status === 'confirmed' && (
              <div className="flex items-center gap-2 text-green-500 bg-green-500/10 px-6 py-2 rounded-full border border-green-500/20">
                <CheckCircle size={20} /> <span className="uppercase tracking-widest text-sm font-bold">Onaylandı</span>
              </div>
            )}
            {reservation.status === 'pending' && (
              <div className="flex items-center gap-2 text-yellow-500 bg-yellow-500/10 px-6 py-2 rounded-full border border-yellow-500/20">
                <Clock size={20} /> <span className="uppercase tracking-widest text-sm font-bold">Bekliyor</span>
              </div>
            )}
            {reservation.status === 'cancelled' && (
              <div className="flex items-center gap-2 text-red-500 bg-red-500/10 px-6 py-2 rounded-full border border-red-500/20">
                <XCircle size={20} /> <span className="uppercase tracking-widest text-sm font-bold">İptal Edildi</span>
              </div>
            )}
          </div>

          {/* Detaylar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-center">
            <div className="bg-white/5 p-4 rounded border border-white/5">
              <Calendar className="mx-auto text-stellato-gold mb-2" />
              <p className="text-stone-400 text-xs uppercase tracking-widest mb-1">Tarih</p>
              <p className="text-xl font-serif">{new Date(reservation.date).toLocaleDateString('tr-TR')}</p>
            </div>
            <div className="bg-white/5 p-4 rounded border border-white/5">
              <Clock className="mx-auto text-stellato-gold mb-2" />
              <p className="text-stone-400 text-xs uppercase tracking-widest mb-1">Saat</p>
              <p className="text-xl font-serif">{new Date(reservation.date).toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'})}</p>
            </div>
            <div className="bg-white/5 p-4 rounded border border-white/5">
              <Users className="mx-auto text-stellato-gold mb-2" />
              <p className="text-stone-400 text-xs uppercase tracking-widest mb-1">Kişi</p>
              <p className="text-xl font-serif">{reservation.guests} Kişi</p>
            </div>
          </div>

          {/* İptal Butonu */}
          {reservation.status !== 'cancelled' && (
            <div className="border-t border-white/10 pt-8 text-center">
              <div className="bg-red-900/20 border border-red-500/20 p-4 rounded mb-6 flex items-start gap-3 text-left">
                <AlertTriangle className="text-red-500 shrink-0" size={20} />
                <p className="text-red-200 text-sm">
                  Planlarınız değişti mi? Aşağıdaki butona tıklayarak rezervasyonunuzu iptal edebilirsiniz. Bu işlem geri alınamaz.
                </p>
              </div>
              
              <form action={cancelAction}>
                <button 
                  type="submit"
                  className="bg-transparent border border-red-500 text-red-500 px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                >
                  Rezervasyonu İptal Et
                </button>
              </form>
            </div>
          )}

          {reservation.status === 'cancelled' && (
            <div className="text-center text-stone-500 text-sm">
              <p>Bu rezervasyon iptal edilmiştir. Sizi başka bir zaman ağırlamayı umuyoruz.</p>
              <a href="/rezervasyon" className="text-stellato-gold underline mt-2 inline-block">Yeni Rezervasyon Yap</a>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
'use server';

import dbConnect from '@/lib/db';
import Reservation from '@/models/Reservation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
// ✅ YENİ: Mail gönderme fonksiyonunu import ediyoruz
import { sendReservationEmail } from '@/lib/mail';

// Validasyon Şeması (Senin kodun aynen duruyor)
const reservationSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır."),
  email: z.string().email("Geçerli bir e-posta adresi giriniz."),
  phone: z.string().min(10, "Telefon numarası eksik veya hatalı."),
  date: z.string(),
  guests: z.coerce.number().min(1, "Kişi sayısı en az 1 olmalıdır."),
  tableId: z.coerce.number().min(1, "Lütfen bir masa seçiniz."),
  notes: z.string().optional().or(z.literal('')),
});

// ✅ createReservation
export async function createReservation(prevState, formData) {
  try {
    await dbConnect();

    const rawData = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      date: formData.get('date'), 
      guests: formData.get('guests'),
      notes: formData.get('notes'),
      tableId: formData.get('tableId'),
    };

    const validated = reservationSchema.safeParse(rawData);
    
    if (!validated.success) {
      return { 
        success: false, 
        message: validated.error.issues[0].message 
      };
    }

    // 1. Veritabanına Kayıt
    const newReservation = await Reservation.create(validated.data);
    
    // 2. ✅ MAİL GÖNDERME İŞLEMİ (EKLENDİ)
    // Tarih objesinden saati ayırıyoruz
    const dateObj = new Date(validated.data.date);
    const timeStr = dateObj.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

    // Mail fonksiyonunu çağırıyoruz
    // await kullanmıyoruz ki kullanıcı beklemek zorunda kalmasın (Hız için)
    sendReservationEmail(
      validated.data.email,
      validated.data.name,
      validated.data.date,
      timeStr,
      validated.data.guests,
      newReservation._id.toString() // Yönetim linki için ID lazım
    );

    revalidatePath('/admin');

    return { 
      success: true, 
      message: 'Rezervasyon başarıyla alındı ve bilgilendirme e-postası gönderildi.',
      reservationId: newReservation._id.toString() 
    };

  } catch (error) {
    console.error('Hata:', error);
    return { success: false, message: 'Sunucu hatası oluştu.' };
  }
}

// --- MEVCUT FONKSİYONLAR (AYNEN DURUYOR) ---

export async function getReservations() {
  try {
    await dbConnect();
    const reservations = await Reservation.find({}).sort({ createdAt: -1 });
    return { success: true, data: JSON.parse(JSON.stringify(reservations)) };
  } catch (error) {
    return { success: false, data: [] };
  }
}

export async function updateReservationStatus(id, newStatus) {
  try {
    await dbConnect();
    await Reservation.findByIdAndUpdate(id, { status: newStatus });
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteReservation(id) {
  try {
    await dbConnect();
    await Reservation.findByIdAndDelete(id);
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getReservedTables(dateStr, timeStr) {
  try {
    await dbConnect();
    const reservations = await Reservation.find({
      date: `${dateStr}T${timeStr}`,
      status: { $ne: 'cancelled' }
    }).select('tableId');
    const occupiedTableIds = reservations.map(r => r.tableId);
    return { success: true, occupiedTableIds };
  } catch (error) {
    return { success: false, occupiedTableIds: [] };
  }
}

// --- ✅ YENİ EKLENENLER (YÖNETİM SAYFASI İÇİN) ---

// ID ile tek bir rezervasyonu getirir (Müşteri detay sayfası için)
export async function getReservationById(id) {
  try {
    await dbConnect();
    const reservation = await Reservation.findById(id);
    if (!reservation) return null;
    return JSON.parse(JSON.stringify(reservation));
  } catch (error) {
    return null;
  }
}

// Müşterinin kendi rezervasyonunu iptal etmesini sağlar
export async function cancelReservationByUser(id) {
  try {
    await dbConnect();
    await Reservation.findByIdAndUpdate(id, { status: 'cancelled' });
    revalidatePath('/admin'); // Admin de güncel durumu görsün
    return { success: true };
  } catch (error) {
    return { success: false, error: 'İptal işlemi başarısız.' };
  }
}
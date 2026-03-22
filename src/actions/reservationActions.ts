'use server';

import dbConnect from '@/lib/db';
import Reservation from '@/models/Reservation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { sendReservationEmail } from '@/lib/mail';
import { rateLimit } from '@/lib/rate-limit';
import { headers } from 'next/headers';
import type { ActionResult, Reservation as ReservationType } from '@/types';

// Validasyon Şeması
const reservationSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır."),
  email: z.string().email("Geçerli bir e-posta adresi giriniz."),
  phone: z.string().min(10, "Telefon numarası eksik veya hatalı."),
  date: z.string(),
  guests: z.coerce.number().min(1, "Kişi sayısı en az 1 olmalıdır."),
  tableId: z.coerce.number().min(1, "Lütfen bir masa seçiniz."),
  notes: z.string().optional().or(z.literal('')),
});

export async function createReservation(prevState: ActionResult | null, formData: FormData): Promise<ActionResult> {
  try {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') ?? 'anonymous';
    const { success: allowed } = rateLimit(ip);
    if (!allowed) {
      return { success: false, message: 'Çok fazla istek gönderdiniz. Lütfen bir dakika bekleyin.' };
    }

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

    // Veritabanına Kayıt
    const newReservation = await Reservation.create(validated.data);

    // Mail Gönderme (Fire-and-Forget / Arka Planda)

    try {
      const dateObj = new Date(validated.data.date);
      const timeStr = dateObj.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });


      sendReservationEmail(
        validated.data.email,
        validated.data.name,
        validated.data.date,
        timeStr,
        validated.data.guests,
        newReservation._id.toString()
      );
    } catch (mailError) {
      console.error("Mail gönderme hatası (Kritik değil):", mailError);
    }

    revalidatePath('/admin');

    return {
      success: true,
      message: 'Rezervasyon başarıyla alındı!',
      reservationId: newReservation._id.toString()
    };

  } catch (error) {
    console.error('Hata:', error);
    return { success: false, message: 'Sunucu hatası oluştu.' };
  }
}

// --- DİĞER FONKSİYONLAR ---

export async function getReservations(): Promise<{ success: boolean; data: ReservationType[] }> {
  try {
    await dbConnect();
    const reservations = await Reservation.find({}).sort({ createdAt: -1 });
    return { success: true, data: JSON.parse(JSON.stringify(reservations)) };
  } catch (error) {
    return { success: false, data: [] };
  }
}

export async function updateReservationStatus(id: string, newStatus: string): Promise<ActionResult> {
  try {
    await dbConnect();
    await Reservation.findByIdAndUpdate(id, { status: newStatus });
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteReservation(id: string): Promise<ActionResult> {
  try {
    await dbConnect();
    await Reservation.findByIdAndDelete(id);
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

export async function getReservedTables(dateStr: string, timeStr: string): Promise<{ success: boolean; occupiedTableIds: number[] }> {
  try {
    await dbConnect();
    const reservations = await Reservation.find({
      date: `${dateStr}T${timeStr}`,
      status: { $ne: 'cancelled' }
    }).select('tableId');
    const occupiedTableIds = reservations.map((r: { tableId: number }) => r.tableId);
    return { success: true, occupiedTableIds };
  } catch (error) {
    return { success: false, occupiedTableIds: [] };
  }
}

// ID ile Tek Rezervasyon Getir (Yönetim Sayfası İçin)
export async function getReservationById(id: string): Promise<ReservationType | null> {
  try {
    await dbConnect();
    const reservation = await Reservation.findById(id);
    if (!reservation) return null;
    return JSON.parse(JSON.stringify(reservation));
  } catch (error) {
    return null;
  }
}

// Kullanıcı İptal Fonksiyonu
export async function cancelReservationByUser(id: string): Promise<ActionResult> {
  try {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') ?? 'anonymous';
    const { success: allowed } = rateLimit(ip);
    if (!allowed) {
      return { success: false, error: 'Çok fazla istek gönderdiniz. Lütfen bir dakika bekleyin.' };
    }

    await dbConnect();
    await Reservation.findByIdAndUpdate(id, { status: 'cancelled' });
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'İptal işlemi başarısız.' };
  }
}

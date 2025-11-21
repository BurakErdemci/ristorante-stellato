import nodemailer from 'nodemailer';

// ✅ OPTİMİZASYON: Port 587 ve verify işleminin kaldırılması
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587, // 465 yerine 587 (Vercel'de daha hızlı handshake yapar)
  secure: false, // 587 için false olmalı
  requireTLS: true, // Ancak güvenlik için TLS'i zorluyoruz
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendReservationEmail(to, name, date, time, guests, reservationId) {
  // Link
  const manageLink = `${process.env.NEXT_PUBLIC_BASE_URL}/rezervasyon-yonet/${reservationId}`;

  const htmlContent = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #333; background-color: #0a0a0a; color: #fff;">
      <div style="padding: 20px; text-align: center; border-bottom: 1px solid #333;">
        <h1 style="color: #D4AF37; margin: 0;">RISTORANTE STELLATO</h1>
      </div>
      <div style="padding: 30px;">
        <h2 style="color: #D4AF37;">Sayın ${name},</h2>
        <p>Rezervasyonunuz başarıyla oluşturuldu.</p>
        <div style="background-color: #111; padding: 15px; border-left: 4px solid #D4AF37; margin: 20px 0;">
          <p><strong>Tarih:</strong> ${new Date(date).toLocaleDateString('tr-TR')}</p>
          <p><strong>Saat:</strong> ${time}</p>
          <p><strong>Kişi:</strong> ${guests}</p>
        </div>
        <a href="${manageLink}" style="display: inline-block; background-color: #D4AF37; color: #000; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 4px; margin-top: 10px;">
          Yönet / İptal Et
        </a>
      </div>
      <div style="padding: 20px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #333;">
        © 2025 Ristorante Stellato
      </div>
    </div>
  `;

  try {
    // Verify (Test) kısmını kaldırdık, direkt gönderiyoruz.
    await transporter.sendMail({
      from: `"Ristorante Stellato" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: 'Rezervasyon Onaylandı ✔️',
      html: htmlContent,
    });
    console.log('✅ Mail başarıyla gönderildi!');
  } catch (error) {
    console.error('❌ Mail gönderme hatası:', error);
  }
}


import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendReservationEmail(to, name, date, time, guests, reservationId) {
  console.log("1. Mail süreci başladı...");
  console.log("Gönderilecek adres:", to);
  
  // Link
  const manageLink = `${process.env.NEXT_PUBLIC_BASE_URL}/rezervasyon-yonet/${reservationId}`;

  // BAĞLANTI TESTİ (Verify)
  try {
    await new Promise((resolve, reject) => {
      transporter.verify(function (error, success) {
        if (error) {
          console.log("🚨 BAĞLANTI HATASI (Verify):", error);
          reject(error);
        } else {
          console.log("✅ Sunucu bağlantısı hazır");
          resolve(success);
        }
      });
    });
  } catch (error) {
    console.error("Bağlantı kurulamadı, mail gönderilmeyecek.");
    return;
  }

  const htmlContent = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #333; background-color: #0a0a0a; color: #fff;">
      <div style="padding: 20px; text-align: center; border-bottom: 1px solid #333;">
        <h1 style="color: #D4AF37; margin: 0;">RISTORANTE STELLATO</h1>
      </div>
      <div style="padding: 30px;">
        <h2 style="color: #D4AF37;">Sayın ${name},</h2>
        <p>Rezervasyonunuz başarıyla oluşturuldu.</p>
        <p><strong>Tarih:</strong> ${new Date(date).toLocaleDateString('tr-TR')} - <strong>Saat:</strong> ${time}</p>
        <a href="${manageLink}" style="display: inline-block; background-color: #D4AF37; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-top: 10px;">Yönet / İptal Et</a>
      </div>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"Ristorante Stellato" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: 'Rezervasyon Onayı',
      html: htmlContent,
    });
    console.log('✅ MAIL GÖNDERİLDİ! Message ID:', info.messageId);
  } catch (error) {
    console.error('❌ GÖNDERME HATASI:', error);
  }
}

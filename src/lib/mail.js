import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // SSL kullanımı
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendReservationEmail(to, name, date, time, guests, reservationId) {
  // Yönetim Linki
  const manageLink = `${process.env.NEXT_PUBLIC_BASE_URL}/rezervasyon-yonet/${reservationId}`;

  const htmlContent = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #333; background-color: #0a0a0a; color: #fff;">
      <div style="padding: 20px; text-align: center; border-bottom: 1px solid #333;">
        <h1 style="color: #D4AF37; margin: 0;">RISTORANTE STELLATO</h1>
      </div>
      
      <div style="padding: 30px;">
        <h2 style="color: #D4AF37;">Sayın ${name},</h2>
        <p>Rezervasyonunuz başarıyla oluşturuldu. Sizi ağırlamaktan mutluluk duyacağız.</p>
        
        <div style="background-color: #111; padding: 15px; border-left: 4px solid #D4AF37; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Tarih:</strong> ${new Date(date).toLocaleDateString('tr-TR')}</p>
          <p style="margin: 5px 0;"><strong>Saat:</strong> ${time}</p>
          <p style="margin: 5px 0;"><strong>Kişi Sayısı:</strong> ${guests}</p>
        </div>

        <p>Planlarınız değişirse aşağıdaki linkten rezervasyonunuzu yönetebilirsiniz:</p>
        
        <a href="${manageLink}" style="display: inline-block; background-color: #D4AF37; color: #000; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 4px; margin-top: 10px;">
          Rezervasyonu Yönet / İptal Et
        </a>
      </div>
      
      <div style="padding: 20px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #333;">
        © 2025 Ristorante Stellato
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Ristorante Stellato" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: 'Rezervasyon Onayı ve Detaylar',
      html: htmlContent,
    });
    console.log('✅ Mail başarıyla gönderildi!');
  } catch (error) {
    console.error('❌ Mail gönderme hatası:', error);
  }
}
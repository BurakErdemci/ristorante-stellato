# 🍝 Ristorante Stellato | Ultra-Luxury Restaurant Reservation System

![Next.js](https://img.shields.io/badge/Next.js-15-black) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC) ![MongoDB](https://img.shields.io/badge/MongoDB-Database-green) ![License](https://img.shields.io/badge/License-MIT-yellow)

Ristorante Stellato, **Next.js 15** ve **Server Actions** kullanılarak geliştirilmiş, Michelin yıldızlı bir İtalyan restoranı için tasarlanmış **Full-Stack Rezervasyon Yönetim Sistemidir.**

🔗 **Canlı Demo:** [https://ristorante-stellato.vercel.app](https://ristorante-stellato.vercel.app)

## 🌟 Öne Çıkan Özellikler

### 🔹 Müşteri Tarafı
*   **İnteraktif Masa Seçimi:** Krokiler üzerinden görsel masa seçimi. Kapasite kontrolü (Örn: 4 kişilik grup, 2 kişilik masayı seçemez).
*   **Adımlı (Multi-Step) Rezervasyon Formu:** Tarih, Saat, Masa ve İletişim bilgileriyle akıcı UX.
*   **Premium Takvim & Zaman Yönetimi:** Geçmiş tarihleri ve dolu saatleri engelleyen akıllı sistem.
*   **Hibrit Bildirim Sistemi:** Rezervasyon sonrası otomatik **E-Posta (Nodemailer)** gönderimi.
*   **Rezervasyon Yönetimi:** Müşteriye özel link ile rezervasyon görüntüleme ve iptal etme imkanı.

### 🔹 Yönetim (Admin) Paneli
*   **Dashboard:** Günlük rezervasyon, doluluk oranı ve bekleyen onay istatistikleri.
*   **Gelişmiş Filtreleme:** Bekleyen, Onaylı, İptal durumuna göre sekmeli yapı.
*   **Canlı Arama:** İsim, E-posta veya Masa numarasına göre anlık filtreleme.
*   **Güvenli İşlemler:** Yanlışlıkla silmeyi önleyen özel onay modalları.

## 🛠️ Kullanılan Teknolojiler

*   **Framework:** Next.js 15 (App Router)
*   **Dil:** JavaScript / React
*   **Styling:** Tailwind CSS v4 & Framer Motion (Animasyonlar)
*   **Database:** MongoDB & Mongoose
*   **Validation:** Zod (Backend veri güvenliği için)
*   **Mail Service:** Nodemailer (Gmail SMTP)
*   **Icons:** Lucide React

## 🚀 Kurulum (Localhost)

Projeyi kendi bilgisayarınızda çalıştırmak için:

1.  Projeyi klonlayın:
    ```bash
    git clone https://github.com/KULLANICI_ADI/ristorante-stellato.git
    cd ristorante-stellato
    ```

2.  Bağımlılıkları yükleyin:
    ```bash
    npm install
    ```

3.  `.env` dosyasını oluşturun ve aşağıdaki bilgileri girin:
    ```env
    MONGODB_URI=your_mongodb_connection_string
    EMAIL_USER=your_gmail_address
    EMAIL_PASS=your_gmail_app_password
    NEXT_PUBLIC_BASE_URL=http://localhost:3000
    ```

4.  Uygulamayı başlatın:
    ```bash
    npm run dev
    ```

## 📸 Ekran Görüntüleri



---
Bu proje **Burak Emre Erdemci** tarafından geliştirilmiştir.

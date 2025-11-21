# 🍝 Ristorante Stellato

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)

**Modern Full-Stack Rezervasyon Yönetim Sistemi**

Michelin yıldızlı İtalyan restoranı için tasarlanmış, interaktif masa seçimi ve gelişmiş yönetim paneli içeren profesyonel rezervasyon platformu.

[🌐 Canlı Demo](https://ristorante-stellato-puum.vercel.app) • [📸 Screenshots](./screenshots.md) • [🚀 Kurulum](#-kurulum)

</div>

---

## 📋 İçindekiler

- [Hakkında](#-hakkında)
- [Özellikler](#-özellikler)
- [Teknoloji Stack](#-teknoloji-stack)
- [Kurulum](#-kurulum)
- [Kullanım](#-kullanım)
- [Proje Yapısı](#-proje-yapısı)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Veritabanı Şeması](#-veritabanı-şeması)
- [Roadmap](#-roadmap)
- [Katkıda Bulunma](#-katkıda-bulunma)
- [Lisans](#-lisans)
- [İletişim](#-i̇letişim)

---

## 🎯 Hakkında

**Ristorante Stellato**, Next.js 15 ve Server Actions kullanılarak geliştirilmiş, gerçek dünya ihtiyaçlarına yönelik bir Full-Stack rezervasyon yönetim sistemidir. Proje, modern web geliştirme pratiklerini ve premium kullanıcı deneyimini bir araya getirerek hem müşterilere hem de restoran yönetimine kesintisiz bir deneyim sunar.

### ⭐ Neden Bu Proje Özel?

- 🎨 **İnteraktif Masa Seçimi**: Krokilerde görsel masa seçimi ve otomatik kapasite kontrolü
- 📱 **Modern UX**: Multi-step form ile akıcı rezervasyon süreci
- 🔄 **Real-time Validasyon**: Dolu saatleri ve geçmiş tarihleri engelleyen akıllı sistem
- 📧 **Otomatik Bildirimler**: Email ile rezervasyon onayı ve müşteriye özel takip linki
- 📊 **Güçlü Dashboard**: İstatistik, filtreleme ve canlı arama özellikleri
- 🚀 **Production Ready**: Vercel'de canlı, MongoDB Atlas ile güvenli veri yönetimi

---

## ✨ Özellikler

### 🎫 Müşteri Tarafı

#### 1️⃣ İnteraktif Masa Seçimi
```
✅ Restoran krokisinde görsel seçim
✅ Kapasite kontrolü (4 kişi → 2 kişilik masa seçilemez)
✅ Dolu masaların otomatik işaretlenmesi
✅ Hover efektleri ile detay görüntüleme
```

#### 2️⃣ Multi-Step Rezervasyon Formu
- **Adım 1**: Tarih ve saat seçimi
- **Adım 2**: Masa seçimi (interaktif kroki)
- **Adım 3**: İletişim bilgileri
- **Adım 4**: Rezervasyon özeti ve onay

#### 3️⃣ Akıllı Takvim Sistemi
```javascript
✅ Geçmiş tarihleri engelleme
✅ Dolu saatleri otomatik kapatma
✅ Restoran çalışma saatleri kontrolü
✅ Özel gün ve tatil yönetimi
```

#### 4️⃣ Email Notification
- Anında rezervasyon onay maili
- Müşteriye özel rezervasyon takip linki
- Rezervasyon detayları (tarih, saat, masa, kişi sayısı)
- Self-service iptal imkanı

### 🎛️ Admin Tarafı

#### 📊 Dashboard İstatistikleri
```
📈 Günlük toplam rezervasyon
📊 Doluluk oranı (%)
⏳ Bekleyen onaylar
💰 Gelir tahmini
```

#### 🔍 Gelişmiş Yönetim
- **Filtreleme**: Bekleyen | Onaylı | İptal Edilmiş
- **Canlı Arama**: İsim, email veya masa numarasına göre
- **Toplu İşlemler**: Seçili rezervasyonları onayla/iptal et
- **Güvenli Silme**: Confirmation modal ile yanlışlıkla silmeyi önleme

---

## 🛠️ Teknoloji Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: JavaScript / React 18
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Form Handling**: React Hook Form + Zod

### Backend
- **API**: Next.js Server Actions
- **Database**: MongoDB
- **ODM**: Mongoose
- **Validation**: Zod Schema
- **Email**: Nodemailer (Gmail SMTP)

### DevOps
- **Hosting**: Vercel
- **Database**: MongoDB Atlas
- **Version Control**: Git & GitHub
- **CI/CD**: Vercel Auto Deploy

---

## 🚀 Kurulum

### Gereksinimler

```bash
Node.js >= 18.0.0
npm >= 9.0.0
MongoDB hesabı (MongoDB Atlas)
Gmail hesabı (App Password ile)
```

### 1. Projeyi Klonlayın

```bash
git clone https://github.com/BurakErdemci/ristorante-stellato.git
cd ristorante-stellato
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

### 3. Environment Variables Ayarlayın

`.env.local` dosyası oluşturun:

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ristorante

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-digit-app-password

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

> 💡 **Gmail App Password Nasıl Alınır?**
> 1. Google Account > Security
> 2. 2-Step Verification'ı aktif edin
> 3. App Passwords bölümüne gidin
> 4. Mail > Other seçin ve 16 haneli şifreyi alın

### 4. Development Server'ı Başlatın

```bash
npm run dev
```

Tarayıcınızda açın: [http://localhost:3000](http://localhost:3000)

### 5. Production Build (Opsiyonel)

```bash
npm run build
npm start
```

---

## 📖 Kullanım

### Müşteri Rezervasyon Akışı

1. Ana sayfada **"Rezervasyon Yap"** butonuna tıklayın
2. Tarih ve saat seçin (geçmiş tarihler disabled)
3. İnteraktif krokide uygun masayı seçin
4. İletişim bilgilerinizi girin
5. Özeti kontrol edin ve onaylayın
6. Email'inize gelen onay mesajını kontrol edin
7. Email'deki link ile rezervasyonunuzu takip edin

### Admin Panel Yönetimi

1. Admin dashboard'a erişin: `/admin` (authentication eklendikten sonra)
2. Bekleyen rezervasyonları görüntüleyin
3. Filtreleme ve arama ile istediğiniz rezervasyonu bulun
4. Rezervasyonu onayla/reddet/iptal et
5. Sistem otomatik email bildirimi gönderir

---

## 📁 Proje Yapısı

```
ristorante-stellato/
├── app/
│   ├── (routes)/
│   │   ├── page.js              # Ana sayfa
│   │   ├── reservation/         # Rezervasyon sayfaları
│   │   └── admin/               # Admin dashboard
│   ├── api/                     # API routes
│   ├── actions/                 # Server Actions
│   └── layout.js                # Root layout
├── components/
│   ├── ui/                      # UI componentleri
│   ├── forms/                   # Form componentleri
│   ├── admin/                   # Admin componentleri
│   └── TableSelection.jsx       # İnteraktif masa seçimi
├── lib/
│   ├── mongodb.js               # Database connection
│   ├── email.js                 # Email service
│   └── utils.js                 # Yardımcı fonksiyonlar
├── models/
│   └── Reservation.js           # Mongoose schema
├── public/
│   ├── images/                  # Görseller
│   └── icons/                   # İkonlar
├── .env.local                   # Environment variables
├── next.config.js               # Next.js config
├── tailwind.config.js           # Tailwind config
└── package.json
```

---

## 🔐 Environment Variables

| Değişken | Açıklama | Örnek |
|----------|----------|-------|
| `MONGODB_URI` | MongoDB bağlantı string'i | `mongodb+srv://...` |
| `EMAIL_USER` | Gmail hesap adresi | `example@gmail.com` |
| `EMAIL_PASS` | Gmail App Password (16 haneli) | `abcd efgh ijkl mnop` |
| `NEXT_PUBLIC_BASE_URL` | Uygulama base URL | `http://localhost:3000` |

---

## 🔌 API Endpoints

### Server Actions (Next.js 15)

```javascript
// Rezervasyon Oluşturma
POST /actions/createReservation
Body: { name, email, phone, date, time, guests, tableNumber }

// Rezervasyon Getirme
GET /actions/getReservation?token={uniqueToken}

// Rezervasyon İptal Etme
POST /actions/cancelReservation
Body: { token }

// Admin - Tüm Rezervasyonları Getirme
GET /actions/getAllReservations

// Admin - Rezervasyon Onaylama
POST /actions/confirmReservation
Body: { id }
```

---

## 🗄️ Veritabanı Şeması

### Reservation Model

```javascript
{
  _id: ObjectId,
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  guests: {
    type: Number,
    required: true,
    min: 1,
    max: 12
  },
  tableNumber: {
    type: Number,
    required: true
  },
  tableCapacity: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  specialRequests: String,
  uniqueToken: {
    type: String,
    unique: true,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

### İndeksler

```javascript
email: 1
date: 1, time: 1
uniqueToken: 1
status: 1
```

---

## 🗺️ Roadmap

### ✅ Tamamlanan Özellikler
- [x] İnteraktif masa seçimi
- [x] Multi-step rezervasyon formu
- [x] Email notification sistemi
- [x] Admin dashboard
- [x] MongoDB entegrasyonu
- [x] Vercel deployment

### 🔄 Devam Eden
- [ ] Admin authentication (NextAuth.js)
- [ ] Rate limiting middleware
- [ ] Unit & integration tests
- [ ] API documentation (Swagger)

### 🎯 Planlanan
- [ ] Rezervasyon güncelleme
- [ ] Waiting list (bekleme listesi)
- [ ] SMS bildirimleri (Twilio)
- [ ] QR kod menü entegrasyonu
- [ ] Multi-language support (i18n)
- [ ] Online ödeme (Stripe)
- [ ] Customer loyalty program
- [ ] Analytics dashboard

---

## 🤝 Katkıda Bulunma

Katkılar memnuniyetle karşılanır! 🎉

### Nasıl Katkıda Bulunulur?

1. Projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

### Commit Kuralları

```
feat: Yeni özellik
fix: Bug düzeltmesi
docs: Dokümantasyon değişikliği
style: Kod formatı değişikliği
refactor: Kod iyileştirmesi
test: Test ekleme/düzeltme
chore: Build/config değişiklikleri
```

---

## 📄 Lisans

Bu proje [MIT](LICENSE) lisansı altında lisanslanmıştır.

---

## 📞 İletişim

**Burak Emre Erdemci**

- GitHub: [@BurakErdemci](https://github.com/BurakErdemci)
- LinkedIn: [Burak Erdemci](https://www.linkedin.com/in/burak-erdemci-a3994833b)
- Email: erdemciburakemre@gmail.com

**Proje Linki**: [https://github.com/BurakErdemci/ristorante-stellato](https://github.com/BurakErdemci/ristorante-stellato)

---

## 🙏 Teşekkürler

Bu proje, modern web geliştirme pratiklerini öğrenmek ve gerçek dünya senaryolarını simüle etmek amacıyla geliştirilmiştir.

**Özel teşekkürler:**
- JavaScript kursu eğitmenlerim
- Open source community
- [Vercel](https://vercel.com) - Harika deployment platform
- [MongoDB](https://mongodb.com) - Güvenilir database hosting
- [Lucide](https://lucide.dev) - Minimal icon seti

---

<div align="center">

**⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!**

[![Star History Chart](https://api.star-history.com/svg?repos=BurakErdemci/ristorante-stellato&type=Date)](https://star-history.com/#BurakErdemci/ristorante-stellato&Date)

Made with ❤️ by [Burak Erdemci](https://github.com/BurakErdemci)

</div>
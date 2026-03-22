# 🍝 Ristorante Stellato

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![NextAuth](https://img.shields.io/badge/NextAuth-v5-blueviolet?style=for-the-badge)
![Vitest](https://img.shields.io/badge/Vitest-4.1-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
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
- [Authentication](#-authentication)
- [Testing](#-testing)
- [Roadmap](#-roadmap)
- [Katkıda Bulunma](#-katkıda-bulunma)
- [Lisans](#-lisans)
- [İletişim](#-i̇letişim)

---

## 🎯 Hakkında

**Ristorante Stellato**, Next.js 16 ve Server Actions kullanılarak geliştirilmiş, gerçek dünya ihtiyaçlarına yönelik bir Full-Stack rezervasyon yönetim sistemidir. Proje, modern web geliştirme pratiklerini ve premium kullanıcı deneyimini bir araya getirerek hem müşterilere hem de restoran yönetimine kesintisiz bir deneyim sunar.

### ⭐ Neden Bu Proje Özel?

- 🎨 **İnteraktif Masa Seçimi**: Krokilerde görsel masa seçimi ve otomatik kapasite kontrolü
- 📱 **Modern UX**: Multi-step form ile akıcı rezervasyon süreci
- 🔄 **Real-time Validasyon**: Dolu saatleri ve geçmiş tarihleri engelleyen akıllı sistem
- 📧 **Otomatik Bildirimler**: Email ile rezervasyon onayı ve müşteriye özel takip linki
- 📊 **Güçlü Dashboard**: İstatistik, filtreleme ve canlı arama özellikleri
- 🔐 **Güvenli Auth**: NextAuth v5 ile korunan admin paneli, gizli URL routing
- 🌍 **Çoklu Dil**: Türkçe, İngilizce ve İtalyanca tam dil desteği (i18n)
- 🎨 **Dark/Light Tema**: Göz yormayan sıcak krem tonlu açık tema ve premium koyu tema
- 📱 **PWA Desteği**: Offline erişim, ana ekrana ekleme, service worker
- 🛡️ **Rate Limiting**: IP tabanlı istek sınırlama ile spam koruması
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

#### 5️⃣ Çoklu Dil Desteği (i18n)
- **3 Dil**: Türkçe (varsayılan), İngilizce, İtalyanca
- **Navbar'da dil seçici**: Bayrak ve isimli dropdown menü
- **LocalStorage ile kalıcılık**: Seçilen dil hatırlanır
- **Tam kapsam**: Tüm UI metinleri, menü açıklamaları, form etiketleri, hata mesajları
- **Locale-aware tarih formatı**: Seçilen dile göre tarih/saat gösterimi

#### 6️⃣ Dark/Light Tema
- **Navbar'da tema toggle**: Tek tıkla geçiş
- **Sıcak tonlar**: Açık tema göz yormayan krem/bej tonlarında
- **Fotoğraflı sayfalar korunur**: Rezervasyon ve login sayfaları her zaman koyu kalır (`force-dark`)
- **LocalStorage ile kalıcılık**: Tercih hatırlanır

#### 7️⃣ PWA (Progressive Web App)
- **Ana ekrana ekleme**: Mobilde native uygulama hissi
- **Service Worker**: Statik asset'ler ve sayfalar offline cache'lenir
- **Web App Manifest**: İkon, tema rengi ve splash screen yapılandırması

#### 8️⃣ Rate Limiting
- **IP tabanlı**: Sliding window algoritması ile istek sınırlama
- **Rezervasyon koruması**: Spam form gönderimini engeller
- **İptal koruması**: Kötü niyetli toplu iptal girişimlerini engeller
- **Bağımsız**: Harici bağımlılık gerektirmez (in-memory Map)

### 🎛️ Admin Tarafı

#### 🔐 Güvenli Erişim
- **NextAuth v5** ile Credentials tabanlı kimlik doğrulama
- **Gizli URL**: Admin paneli `/admin` yerine tahmin edilemez bir slug ile erişilir
- **Middleware koruması**: Doğrudan `/admin` erişimi ana sayfaya yönlendirilir
- **Session yönetimi**: Oturum açma/kapama, otomatik yönlendirme

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
- **Framework**: Next.js 16 (App Router, React Compiler)
- **Language**: TypeScript (strict mode)
- **UI Library**: React 19.2
- **Styling**: Tailwind CSS v4 (CSS custom properties ile tema sistemi)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Validation**: Zod 4
- **i18n**: Custom React Context (TR/EN/IT — bağımlılık gerektirmez)
- **PWA**: Service Worker + Web App Manifest

### Backend
- **API**: Next.js Server Actions
- **Auth**: NextAuth v5 (Auth.js) — Credentials Provider
- **Database**: MongoDB + Mongoose
- **Validation**: Zod Schema
- **Email**: Nodemailer (Gmail SMTP)

### Testing
- **Framework**: Vitest 4
- **DOM**: jsdom
- **Utilities**: React Testing Library
- **Coverage**: Rezervasyon validasyonu, masa seçim mantığı, admin filtreleme

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

`.env.example` dosyasını kopyalayın ve değerleri doldurun:

```bash
cp .env.example .env.local
```

```env
# MongoDB
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/restaurant

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-digit-app-password

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# NextAuth (secret oluşturmak için: openssl rand -base64 32)
AUTH_SECRET=your-generated-secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-secure-password

# Gizli admin panel yolu (tahmin edilemez bir slug belirleyin)
NEXT_PUBLIC_ADMIN_ROUTE=your-secret-slug
```

> 💡 **Gmail App Password Nasıl Alınır?**
> 1. Google Account > Security
> 2. 2-Step Verification'ı aktif edin
> 3. App Passwords bölümüne gidin
> 4. Mail > Other seçin ve 16 haneli şifreyi alın

### 4. Demo Verileri Yükleyin (Opsiyonel)

```bash
npm run seed
```

Bu komut MongoDB'ye 8 örnek rezervasyon ekler (farklı statüler, tarihler ve notlarla).

### 5. Development Server'ı Başlatın

```bash
npm run dev
```

Tarayıcınızda açın: [http://localhost:3000](http://localhost:3000)

### 6. Production Build (Opsiyonel)

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

1. Gizli admin URL'ine gidin: `/{NEXT_PUBLIC_ADMIN_ROUTE}` (`.env.local`'de tanımlı)
2. Admin e-posta ve şifresi ile giriş yapın
3. Bekleyen rezervasyonları görüntüleyin
4. Filtreleme ve arama ile istediğiniz rezervasyonu bulun
5. Rezervasyonu onayla/reddet/iptal et
6. Sağ üstteki "Çıkış Yap" butonu ile oturumu kapatın

> ⚠️ `/admin` yazan kullanıcılar otomatik olarak ana sayfaya yönlendirilir. Admin paneline yalnızca gizli URL üzerinden erişilebilir.

---

## 📁 Proje Yapısı

```
ristorante-stellato/
├── public/
│   ├── icons/                       # PWA ikonları (192x192, 512x512)
│   ├── manifest.json                # PWA Web App Manifest
│   └── sw.js                        # Service Worker (cache stratejisi)
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Ana sayfa
│   │   ├── layout.tsx               # Root layout (ThemeProvider + LanguageProvider)
│   │   ├── globals.css              # Tema değişkenleri (dark/light/force-dark)
│   │   ├── rezervasyon/
│   │   │   └── page.tsx             # Rezervasyon formu (force-dark)
│   │   ├── rezervasyon-yonet/
│   │   │   └── [id]/
│   │   │       ├── page.tsx         # Server: veri çekme
│   │   │       └── client.tsx       # Client: i18n destekli UI
│   │   ├── admin/
│   │   │   ├── page.tsx             # Server: veri çekme
│   │   │   ├── client.tsx           # Client: i18n destekli dashboard
│   │   │   └── login/page.tsx       # Admin giriş sayfası (force-dark)
│   │   └── api/
│   │       └── auth/[...nextauth]/  # NextAuth API routes
│   ├── components/
│   │   ├── Navbar.tsx               # Navigasyon + dil seçici + tema toggle
│   │   ├── Hero.tsx                 # Hero section
│   │   ├── MenuSection.tsx          # Menü galerisi (çevrilebilir yemek adları)
│   │   ├── TableSelection.tsx       # İnteraktif masa seçimi
│   │   ├── ReservationForm.tsx      # Multi-step form
│   │   ├── AdminReservations.tsx    # Admin tablo yönetimi
│   │   ├── AdminHeader.tsx          # Çıkış butonu
│   │   ├── LanguageProvider.tsx     # i18n context (TR/EN/IT)
│   │   ├── ThemeProvider.tsx        # Dark/Light tema context
│   │   ├── ServiceWorkerRegister.tsx # PWA service worker kaydı
│   │   └── ...                      # Diğer componentler
│   ├── i18n/
│   │   ├── tr.ts                    # Türkçe çeviriler (base type)
│   │   ├── en.ts                    # İngilizce çeviriler
│   │   ├── it.ts                    # İtalyanca çeviriler
│   │   └── index.ts                 # Locale tanımları ve export
│   ├── actions/
│   │   └── reservationActions.ts    # Server Actions (CRUD + rate limit)
│   ├── models/
│   │   └── Reservation.ts          # Mongoose schema
│   ├── lib/
│   │   ├── db.ts                    # MongoDB bağlantısı
│   │   ├── mail.ts                  # Email servisi
│   │   └── rate-limit.ts           # IP tabanlı rate limiter
│   ├── types/
│   │   └── index.ts                 # TypeScript type tanımları
│   ├── auth.ts                      # NextAuth v5 yapılandırması
│   └── middleware.ts                # Route koruması & gizli URL rewrite
├── scripts/
│   └── seed.ts                      # Demo veri yükleme scripti
├── .env.example                     # Örnek environment variables
├── tsconfig.json                    # TypeScript yapılandırması
├── vitest.config.ts                 # Vitest yapılandırması
└── package.json
```

---

## 🔐 Environment Variables

| Değişken | Açıklama | Örnek |
|----------|----------|-------|
| `MONGO_URI` | MongoDB bağlantı string'i | `mongodb+srv://...` |
| `EMAIL_USER` | Gmail hesap adresi | `example@gmail.com` |
| `EMAIL_PASS` | Gmail App Password (16 haneli) | `abcd efgh ijkl mnop` |
| `NEXT_PUBLIC_BASE_URL` | Uygulama base URL | `http://localhost:3000` |
| `AUTH_SECRET` | NextAuth oturum şifreleme anahtarı | `openssl rand -base64 32` |
| `ADMIN_EMAIL` | Admin giriş e-postası | `admin@example.com` |
| `ADMIN_PASSWORD` | Admin giriş şifresi | `SecurePass123!` |
| `NEXT_PUBLIC_ADMIN_ROUTE` | Gizli admin panel URL slug'ı | `gestione-x8k2m` |

---

## 🔌 API Endpoints

### Server Actions (Next.js 16)

```typescript
// Rezervasyon Oluşturma (FormData ile)
createReservation(prevState, formData) → ActionResult

// Tüm Rezervasyonları Getirme (Admin)
getReservations() → { success, data: Reservation[] }

// Rezervasyon Durum Güncelleme
updateReservationStatus(id, newStatus) → ActionResult

// Rezervasyon Silme
deleteReservation(id) → ActionResult

// Dolu Masaları Sorgulama
getReservedTables(dateStr, timeStr) → { success, occupiedTableIds }

// Müşteri Tarafı Rezervasyon Görüntüleme
getReservationById(id) → Reservation | null

// Müşteri Tarafı Rezervasyon İptali
cancelReservationByUser(id) → ActionResult
```

### Auth API (NextAuth v5)

```
GET/POST  /api/auth/[...nextauth]   # NextAuth handler (session, csrf, signin, signout)
```

---

## 🗄️ Veritabanı Şeması

### Reservation Model

```typescript
interface IReservation {
  name: string;          // Müşteri adı
  email: string;         // E-posta
  phone: string;         // Telefon
  date: Date;            // Rezervasyon tarihi ve saati
  guests: number;        // Kişi sayısı (1-10)
  tableId: number;       // Masa numarası
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;        // Özel notlar
  createdAt: Date;       // Oluşturulma tarihi
}
```


---

## 🔐 Authentication

Admin paneli **NextAuth v5 (Auth.js)** ile korunmaktadır.

### Mimari

- **Provider**: Credentials (e-posta + şifre, `.env` tabanlı)
- **Middleware**: Tüm admin rotaları middleware seviyesinde korunur
- **Gizli URL**: Admin paneli tahmin edilemez bir slug ile erişilir (`NEXT_PUBLIC_ADMIN_ROUTE`)
- **Doğrudan engel**: `/admin` URL'ine erişim otomatik olarak ana sayfaya yönlendirir
- **Internal rewrite**: Gizli URL, middleware tarafından fiziksel `/admin` sayfalarına rewrite edilir

### Güvenlik Akışı

```
Kullanıcı /{gizli-slug} → Middleware → Giriş yapmış mı?
                                          ├─ Evet → Rewrite → /admin (internal)
                                          └─ Hayır → Redirect → /{gizli-slug}/login

Kullanıcı /admin → Middleware → Redirect → / (ana sayfa)
```

---

## 🧪 Testing

Proje **Vitest** ile test edilmektedir. Toplam **53 test** 4 test dosyasında yer almaktadır.

### Test Dosyaları

| Dosya | Test Sayısı | Kapsam |
|-------|-------------|--------|
| `reservation-validation.test.ts` | 12 | Zod şema validasyonu (isim, email, telefon, kişi sayısı, masa seçimi) |
| `table-selection.test.ts` | 20 | Masa verileri, kapasite filtreleme, doluluk kontrolü, tıklanabilirlik, bölge dağılımı |
| `admin-filter.test.ts` | 16 | Durum filtreleri, arama (isim/email/masa), birleşik filtre+arama, durum geçişleri |
| `rate-limit.test.ts` | 5 | Rate limiter sliding window, IP bazlı sınırlama, süre sonrası sıfırlama |

### Testleri Çalıştırma

```bash
npm test              # Tek seferlik çalıştırma
npm run test:watch    # İzleme modunda çalıştırma
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
- [x] TypeScript migration (strict mode)
- [x] Admin authentication (NextAuth v5)
- [x] Gizli admin URL routing
- [x] Seed script (demo veri)
- [x] Unit testler (Vitest — 53 test)
- [x] Rate limiting middleware (IP tabanlı sliding window)
- [x] Dark/Light tema geçişi (CSS custom properties + ThemeProvider)
- [x] PWA desteği (Service Worker, Web App Manifest, offline cache)
- [x] Multi-language support (i18n — Türkçe/İngilizce/İtalyanca)

### 📜 Mevcut Scriptler

| Komut | Açıklama |
|-------|----------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Production server |
| `npm run seed` | Demo verileri MongoDB’ye yükle |
| `npm test` | Unit testleri çalıştır |
| `npm run test:watch` | Testleri izleme modunda çalıştır |
| `npm run lint` | ESLint kontrolü |

### 🎯 Bilinen Problemler
- E-posta bildirimleri için Resend kullanılmıştır. Free tier'da Resend de sadece kendi API key aldığın e-postana mail gelmektedir.


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
- Open source community
- [Vercel](https://vercel.com) - Harika deployment platform
- [MongoDB](https://mongodb.com) - Güvenilir database hosting
- [Lucide](https://lucide.dev) - Minimal icon seti



<div align="center">

**⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!**

[![Star History Chart](https://api.star-history.com/svg?repos=BurakErdemci/ristorante-stellato&type=Date)](https://star-history.com/#BurakErdemci/ristorante-stellato&Date)

Made with ❤️ by [Burak Erdemci](https://github.com/BurakErdemci)

</div>

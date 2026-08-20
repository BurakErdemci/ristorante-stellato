# Architecture and project structure

The full stack breakdown and the directory layout.

---

## 🛠️ Teknoloji Stack

### Frontend
- **Framework**: Next.js 16 (App Router, React Compiler)
- **Language**: TypeScript (strict mode)
- **UI Library**: React 19.2
- **Styling**: Tailwind CSS v4 (CSS custom properties ile "ink & gold" token sistemi)
- **3D / WebGL**: Three.js (r128) — yıldız alanı + 3D salon planı
- **Animasyon**: GSAP 3.12 + ScrollTrigger (timeline, reveal, paralaks, kamera tween'leri)
- **Smooth Scroll**: Lenis (tek `SmoothScrollProvider`, ScrollTrigger ile senkron)
- **Tipografi**: `next/font/google` — Bodoni Moda (display) + Jost (gövde)
- **Admin animasyonları**: Framer Motion (admin paneli & login)
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

## 📁 Proje Yapısı

```
ristorante-stellato/
├── public/
│   ├── icons/                       # PWA ikonları (192x192, 512x512)
│   ├── manifest.json                # PWA Web App Manifest
│   └── sw.js                        # Service Worker (cache stratejisi)
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Ana sayfa (section'ları birleştirir)
│   │   ├── layout.tsx               # Root layout (fontlar + LanguageProvider + SmoothScrollProvider)
│   │   ├── globals.css              # "ink & gold" token sistemi + force-dark (admin)
│   │   ├── rezervasyon/
│   │   │   └── page.tsx             # 3D rezervasyon deneyimi (metadata)
│   │   ├── rezervasyon-yonet/
│   │   │   └── [id]/
│   │   │       ├── page.tsx         # Server: veri çekme
│   │   │       └── client.tsx       # Client: i18n destekli UI
│   │   ├── admin/
│   │   │   ├── page.tsx             # Server: veri çekme
│   │   │   ├── client.tsx           # Client: i18n destekli dashboard
│   │   │   └── login/page.tsx       # Admin giriş sayfası
│   │   └── api/
│   │       └── auth/[...nextauth]/  # NextAuth API routes
│   ├── components/
│   │   ├── home/                    # Ana sayfa section'ları
│   │   │   ├── Hero.tsx             #   Sinematik hero (Starfield'i dynamic yükler)
│   │   │   ├── Marquee.tsx          #   Ödül şeridi
│   │   │   ├── Storia.tsx           #   Hikaye bölümü
│   │   │   ├── Menu.tsx             #   Sticky panel + crossfade menü
│   │   │   ├── Cantina.tsx          #   Mahzen (paralaks)
│   │   │   ├── Sera.tsx             #   "Bir akşam" editoryal anlar
│   │   │   ├── Riserva.tsx          #   Rezervasyon CTA + bilgi
│   │   │   └── Footer.tsx           #   Footer (dev başlık paralaksı)
│   │   ├── layout/                  # Genel layout bileşenleri
│   │   │   ├── Header.tsx           #   Navigasyon + dil seçici (home/back varyantları)
│   │   │   ├── MobileMenu.tsx       #   Mobil menü
│   │   │   ├── CustomCursor.tsx     #   Altın imleç (fine-pointer)
│   │   │   ├── Preloader.tsx        #   Açılış perdesi
│   │   │   └── SmoothScrollProvider.tsx  # Lenis + ScrollTrigger entegrasyonu
│   │   ├── three/                   # WebGL sahneleri (ssr:false)
│   │   │   ├── Starfield.tsx        #   Hero yıldız alanı + takımyıldız
│   │   │   └── DiningRoom.tsx       #   3D salon planı (raycast, kamera, kutlama)
│   │   ├── reservation/
│   │   │   └── ReservationExperience.tsx  # 4 adımlı akış + 3D sahne paneli
│   │   ├── AdminReservations.tsx    # Admin tablo yönetimi
│   │   ├── AdminHeader.tsx          # Çıkış butonu
│   │   ├── LanguageProvider.tsx     # i18n context (TR/EN/IT)
│   │   └── ServiceWorkerRegister.tsx # PWA service worker kaydı
│   ├── data/
│   │   ├── menu.ts                  # Menü verisi (i18n anahtarları + görseller)
│   │   └── tables.ts               # Masa şeması, saat slotları, kapasite
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
│   │   ├── rate-limit.ts           # IP tabanlı rate limiter
│   │   ├── availability.ts         # Masa doluluğu arayüzü (mock → backend)
│   │   ├── useReveal.ts            # Scroll reveal hook'u (GSAP)
│   │   └── useReducedMotion.ts     # prefers-reduced-motion hook'u
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

---

[← Back to the README](../README.md)

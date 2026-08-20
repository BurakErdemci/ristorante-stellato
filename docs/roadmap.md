# Roadmap

What is planned next. Turkish, as originally written.

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
- [x] Sinematik yeniden tasarım (Three.js yıldız alanı + 3D salon planı)
- [x] GSAP + Lenis ile smooth-scroll ve scroll-trigger animasyonları
- [x] `prefers-reduced-motion` ve mobil için koşullu render
- [x] PWA desteği (Service Worker, Web App Manifest, offline cache)
- [x] Multi-language support (i18n — Türkçe/İngilizce/İtalyanca)

### 🔭 Gelecek Planları
- [ ] 3D salon doluluğunu canlı backend'e bağlama (`getAvailability` → Server Action)
- [ ] Masaya özel görünüm: seçilen masanın yakın çekim kamera preset'i

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

---

[← Back to the README](../README.md)

# Feature reference

The complete feature list, section by section. The README carries only the
highlights.

---

## ✨ Özellikler

### 🎫 Müşteri Tarafı

#### 1️⃣ Sinematik Ana Sayfa (Three.js + GSAP + Lenis)
```
✅ WebGL yıldız alanı: katmanlı parçacıklar, fare paralaksı, scroll'da dalış
✅ Scroll ile çizilen takımyıldız (constellation) animasyonu
✅ Preloader → hero giriş koreografisi (harf harf staggered reveal)
✅ Lenis smooth-scroll, GSAP ScrollTrigger ile senkron
✅ Sticky menü paneli, crossfade görsel galerisi
✅ Özel altın imleç (cursor dot + ring)
```

#### 2️⃣ Gerçek Zamanlı 3D Salon Planı
```
✅ WebGL ile modellenmiş salon: masalar, sandalyeler, mumlar, pencere/teras
✅ Mum yanan masalar müsait — sönük masalar bu akşam dolu
✅ Raycast ile hover (tooltip) ve dokunarak seçim
✅ Kapasite kontrolü (4 kişi → 2 kişilik masa seçilemez)
✅ Saate göre değişen sahne ışığı (alacakaranlıktan geceye)
✅ Onayda masadan yükselen altın tozu kutlaması
```

#### 3️⃣ 4 Adımlı Rezervasyon Akışı
- **Adım 1**: Tarih (3 aya kadar) ve saat seçimi + kişi sayısı
- **Adım 2**: 3D salon planından masa seçimi
- **Adım 3**: İletişim bilgileri
- **Adım 4**: Rezervasyon özeti, kod ve onay

> Her adım geçişinde kamera salonun farklı bir açısına süzülür (kamera koreografisi).

#### 4️⃣ Akıllı Doluluk & Takvim
```javascript
✅ Geçmiş tarihleri engelleme (yalnızca bugünden itibaren)
✅ Tarih + saate göre değişen masa doluluğu
✅ Ayrık `getAvailability(date, time)` arayüzü — mock'tan backend'e geçiş tek noktadan
✅ Seçili masa, misafir sayısı artınca otomatik bırakılır
```

#### 5️⃣ Email Notification
- Anında rezervasyon onay maili
- Misafire özel rezervasyon takip linki
- Rezervasyon detayları (tarih, saat, masa, kişi sayısı)
- Self-service iptal imkanı

#### 6️⃣ Çoklu Dil Desteği (i18n)
- **3 Dil**: Türkçe (varsayılan), İngilizce, İtalyanca — **tüm arayüz tam çevrilidir**
- **Header'da dil seçici**: TR / EN / IT
- **LocalStorage ile kalıcılık**: Seçilen dil hatırlanır
- **Tam kapsam**: Tüm UI metinleri, bölüm etiketleri, menü açıklamaları, form etiketleri, 3D sahne tooltip'leri, hata mesajları
- **Locale-aware tarih formatı**: Seçilen dile göre tarih/saat gösterimi

#### 7️⃣ Erişilebilirlik & Performans
- **`prefers-reduced-motion`**: Animasyonlar ve WebGL sahneleri kapatılır, içerik statik gradyan/görsellerle sunulur
- **Koşullu render**: 3D sahneler `next/dynamic` ile `ssr:false` yüklenir (SSR'da `window`/`THREE` patlamaz)
- **Görünürlükte render**: Yıldız alanı yalnızca hero ekrandayken çizilir (IntersectionObserver)
- **Kaynak temizliği**: Tüm WebGL geometry/material/renderer ve GSAP context'leri unmount'ta dispose/revert edilir

#### 8️⃣ PWA (Progressive Web App)
- **Ana ekrana ekleme**: Mobilde native uygulama hissi
- **Service Worker**: Statik asset'ler ve sayfalar offline cache'lenir
- **Web App Manifest**: İkon, tema rengi ve splash screen yapılandırması

#### 9️⃣ Rate Limiting
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

---

[← Back to the README](../README.md)

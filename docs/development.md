# Local development

Everything needed to run the project locally, plus the test suite.

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

1. Ana sayfada **"Rezervasyon"** butonuna tıklayın
2. Tarih (3 aya kadar), saat ve kişi sayısını seçin
3. 3D salon planında mum yanan (müsait) bir masaya dokunun
4. İletişim bilgilerinizi girin
5. Özeti kontrol edin ve onaylayın — masanızdan altın tozu yükselir
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

---

[← Back to the README](../README.md)
